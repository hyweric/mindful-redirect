chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "redirectIfMatchedTab") {
        redirectIfMatchedTab();
    }
});

function redirectIfMatchedTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
            const url = tabs[0].url;
            if (shouldRedirect(url)) {
                chrome.tabs.update({ url: chrome.runtime.getURL("mainWind.html") });
            }
        } else {
            console.error("No active tabs found.");
        }
    });
}

function shouldRedirect(url) {
    return true;
}