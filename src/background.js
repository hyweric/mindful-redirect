console.log("background.js");
var allowedURLs = [];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received input: ", request.text);
    allowedURLs = request.text.split("\n");
    allowedURLs = allowedURLs.filter(url => url.trim() !== "");
    for (let i = 0; i < allowedURLs.length; i++) {
        allowedURLs[i] = allowedURLs[i].trim();
        console.log(i +": "+ allowedURLs[i]);
    }
    if (request.message === "redirectIfMatchedTab") {
        redirectIfMatchedTab();
    }
});

function redirectIfMatchedTab() {
    console.log("function redirectIfMatchedTab in background.js");
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var url = tabs[0].url;
        if (shouldRedirect(url)) {
            chrome.tabs.update({ url: chrome.runtime.getURL("mainWind.html") });
        }
        } 
    );
}  
function shouldRedirect(url) {
    
    console.log("function shouldRedirect: " + url);
    for (let j = 0; j < allowedURLs.length; j++) {
        console.log("Checking URL: " + url + ": " + j);
        if (allowedURLs[j].includes(url)) {
            return true;
        }
    }
    return false;
}