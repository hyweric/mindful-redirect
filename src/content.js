console.log('content.js');
console.log('outside' + window.location.hostname)

chrome.storage.sync.get(['blockedWebsites'], function(items) {
    let url = String(window.location.hostname);
    console.log(items.blockedWebsites);
    chrome.runtime.sendMessage({ text: items.blockedWebsites});

    allowedURLs = items.blockedWebsites.split("\n");
    // allowedURLs = allowedURLs.filter(url => url.trim() !== ""); // Blanks

    for (let i = 0; i < allowedURLs.length; i++) {
        allowedURLs[i] = allowedURLs[i].trim();
        console.log(i +": "+ allowedURLs[i]);
        if (url.includes(allowedURLs[i]))
        {
            redirectIfMatchedTab();
        }
        else{
            console.log('no match');
        }
    }

    function redirectIfMatchedTab() {
        console.log("Redirecting if matched tab...");
    
        chrome.runtime.sendMessage({message: "redirectIfMatchedTab"}, (response) => {
            console.log(response);
        });
    }
});

