export const Redirect = {
    toPrevTab() {
        chrome.storage.sync.get(['currentURL', 'currentURLFull', 'whitelist'], function (items) {
            const whitelist = items.whitelist || [];

            if (items.currentURL) {
                whitelist.push({
                    url: items.currentURL,
                    timestamp: Date.now()
                });

                chrome.storage.sync.set({ whitelist: whitelist }, function () {
                    if (items.currentURLFull) {
                        window.location.href = items.currentURLFull;
                    }
                });
            } else if (items.currentURLFull) {
                window.location.href = items.currentURLFull;
            }
        });
    },

    closeTab() {
        window.close();
    }
};
