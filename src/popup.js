const saveOptions = () => {
    const redirectWebsite = document.getElementById('redirectWebsite').value; // note:
    const timer = document.getElementById('timer').value;
    const routine = document.getElementById('routine').value;
    const blockedWebsites = document.getElementById('blockedWebsites').value;
    const timeout = document.getElementById('timeout').value;
  
    chrome.storage.sync.set(
      { redirectWebsite, timer, routine, blockedWebsites, timeout}, // here
      () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {status.textContent = '';}, 750);
      }
    );
};

// Store in chrome storage
const restoreOptions = () => {
    chrome.storage.sync.get(
        { redirectWebsite: 'google.com', timer: '15', routine: 'Write a Custom Message Here', blockedWebsites: 'youtube.com \ninstagram.com \npinterest.com', timeout: '60'}, // here
        (items) => {
            document.getElementById('redirectWebsite').value = items.redirectWebsite || 'google.com';// here
            document.getElementById('timer').value = items.timer || '15';
            document.getElementById('routine').value = items.routine || 'Write a Custom Message Here';
            document.getElementById('blockedWebsites').value = items.blockedWebsites || 'youtube.com \ninstagram.com \npinterest.com';
            document.getElementById('timeout').value = items.timeout || '60'; 
        }
    );
};

try {
    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
} catch (error) {
    console.log(error);
}

chrome.storage.sync.get(['blockedWebsites' ], function(items) {
    chrome.runtime.sendMessage({ text: items.blockedWebsites});
});

const updateWhitelist = (whitelist) => {
    const whitelistElement = document.getElementById('whitelist');
    const sortedWhitelist = whitelist.sort((a, b) => b.timestamp - a.timestamp);
    const recentWhitelist = sortedWhitelist.slice(0, 3); // 3 most recent
    recentWhitelist.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.url} - ${new Date(item.timestamp).toLocaleString()}`;
        whitelistElement.appendChild(li);
    });
};

chrome.storage.sync.get(['whitelist'], (items) => {
    const whitelist = items.whitelist || [];
    updateWhitelist(whitelist);
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.whitelist) {
        const whitelist = changes.whitelist.newValue || [];
        updateWhitelist(whitelist);
    }
});