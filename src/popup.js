const saveOptions = () => {
    const redirectWebsite = document.getElementById('redirectWebsite').value;
    const timer = document.getElementById('timer').value;
    const routine = document.getElementById('routine').value;
  
    chrome.storage.sync.set(
      { redirectWebsite, timer, routine },
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
        { redirectWebsite: 'https://google.com/', timer: '15', routine: '' }, // default values
        (items) => {
            document.getElementById('redirectWebsite').value = items.redirectWebsite || 'https://google.com/';
            document.getElementById('timer').value = items.timer || '15';
            document.getElementById('routine').value = items.routine || '';
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
