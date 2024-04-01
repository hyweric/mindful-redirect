export const Redirect = { 
    continueToTab() {
        var tab = "https://discord.com/channels/@me"; // change later 
        window.location.href = tab;
    },
    closeTab() {
        // window.close(); // doesn't work because add-ons cannot close themselves unless opened by the add-on
        var tab = "https://google.com/" // this will do tho ig 
        window.location.href = tab;
    }
}