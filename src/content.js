if (window.location.hostname === "www.youtube.com" ||
    window.location.hostname === "discord.com" ||
    window.location.hostname === "www.reddit.com") {
    console.log('redirected');
    redirectIfMatchedTab();
}

function redirectIfMatchedTab() {
    console.log("Redirecting if matched tab...");

    chrome.runtime.sendMessage({message: "redirectIfMatchedTab"}, (response) => {
        console.log(response);
    });
}