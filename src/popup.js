const saveOptions = () => {
    const redirectWebsite = document.getElementById('redirectWebsite').value; // note:
    const timer = document.getElementById('timer').value;
    const routine = document.getElementById('routine').value;
    const blockedWebsites = document.getElementById('blockedWebsites').value;
  
    chrome.storage.sync.set(
      { redirectWebsite, timer, routine, blockedWebsites}, // here
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
        { redirectWebsite: 'https://google.com/', timer: '15', routine: '', customMessage: '', blockedWebsites: 'youtube.com'}, // here
        (items) => {
            document.getElementById('redirectWebsite').value = items.redirectWebsite || 'https://google.com/';// here
            document.getElementById('timer').value = items.timer || '15';
            document.getElementById('routine').value = items.routine || '';
            document.getElementById('blockedWebsites').value = items.blockedWebsites || 'youtube.com';
        }
    );
};

try {
    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
} catch (error) {
    console.error('bad stuff', error);
}

chrome.storage.sync.get(['blockedWebsites' ], function(items) {
    console.log(items.blockedWebsites);
    chrome.runtime.sendMessage({ text: items.blockedWebsites});
});