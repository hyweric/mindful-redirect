const defaultOptions = {
    timer: '15',
    routine: 'Take one breath. Ask yourself if opening this site helps you right now.',
    blockedWebsites: 'youtube.com\ninstagram.com\ntiktok.com',
    timeout: '60'
};

const saveOptions = () => {
    const blockedWebsites = document.getElementById('blockedWebsites').value;
    const timer = document.getElementById('timer').value;
    const routine = document.getElementById('routine').value;
    const timeout = document.getElementById('timeout').value;

    chrome.storage.sync.set(
        { timer, routine, blockedWebsites, timeout },
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 900);
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(defaultOptions, (items) => {
        document.getElementById('blockedWebsites').value = items.blockedWebsites;
        document.getElementById('timer').value = items.timer;
        document.getElementById('routine').value = items.routine;
        document.getElementById('timeout').value = items.timeout;
    });
};

const updateWhitelist = (whitelist) => {
    const whitelistElement = document.getElementById('whitelist');
    whitelistElement.innerHTML = '';

    const recentWhitelist = [...whitelist]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);

    if (recentWhitelist.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'None yet';
        whitelistElement.appendChild(li);
        return;
    }

    recentWhitelist.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.url} - ${new Date(item.timestamp).toLocaleString()}`;
        whitelistElement.appendChild(li);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.getElementById('save').addEventListener('click', saveOptions);

    chrome.storage.sync.get(['whitelist'], (items) => {
        updateWhitelist(items.whitelist || []);
    });
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.whitelist) {
        updateWhitelist(changes.whitelist.newValue || []);
    }
});
