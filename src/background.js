chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "redirectIfMatchedTab") {
        redirectIfMatchedTab();
    }
});

function redirectIfMatchedTab() {
    console.log("Redirecting if matched tab...");

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
    const allowedURLs = ["youtube.com", "google.com", "discord.com"]; 
    if (url && allowedURLs.some(allowedURL => url.includes(allowedURL))) {
        return true;
    }
    return false;
}