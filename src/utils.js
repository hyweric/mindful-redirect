var tab = "https://google.com/";
export const Redirect = { 
    continueToTab() {
        chrome.storage.sync.get(['redirectWebsite'], function(items) {
            console.log(items.redirectWebsite);
            window.location.href = tab;
        });
        
    },
    closeTab() {
        window.close(); // only works when directly added by add-on
    }
}