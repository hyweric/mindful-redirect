chrome.storage.sync.get(['blockedWebsites', 'whitelist', 'timeout'], function(items) {
    let url = String(window.location.hostname);
    let fullURL = String(window.location.href);
    chrome.storage.sync.set({ currentURL: url});
    chrome.storage.sync.set({ currentURLFull: fullURL});
    
    console.log(items.blockedWebsites);
    chrome.runtime.sendMessage({ text: items.blockedWebsites});

    let timeOut = items.timeout;

    allowedURLs = items.blockedWebsites.split("\n");
    allowedURLs = allowedURLs.filter(url => url.trim() !== ""); // Blanks
    
    if (items.whitelist) {
        var currentTime = Date.now();
        for (var i = 0; i < items.whitelist.length; i++) {
            var whitelistURL = items.whitelist[i].url;
            var whitelistTimestamp = items.whitelist[i].timestamp;
            if (url === whitelistURL && currentTime - whitelistTimestamp <= timeOut * 1000) {
                return;
            }
        }
    }

    for (let i = 0; i < allowedURLs.length; i++) {
        allowedURLs[i] = allowedURLs[i].trim();
        console.log(i +": "+ allowedURLs[i]);
        if (url.includes(allowedURLs[i]) || allowedURLs[i].includes(url))
        {
            redirectIfMatchedTab();
        }
        else{
            console.log('no match', url, allowedURLs[i]);
        }
    }

    function redirectIfMatchedTab() {
        chrome.runtime.sendMessage({message: "redirectIfMatchedTab"}, (response) => {
            console.log(response);
        });
    }
});