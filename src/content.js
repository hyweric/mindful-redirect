console.log('content.js');
redirectIfMatchedTab();

function redirectIfMatchedTab() {
    console.log("function redirectIfMatchedTab in CONTENT");
    chrome.storage.sync.get(['blockedWebsites' ], function(items) {
        console.log(items.blockedWebsites);
        chrome.runtime.sendMessage({ text: items.blockedWebsites});
    });
    chrome.runtime.sendMessage({message: "redirectIfMatchedTab"}, (response) => {
        console.log("kek");
    });
}