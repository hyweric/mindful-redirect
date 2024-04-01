import { Redirect } from './utils.js';
document.addEventListener('DOMContentLoaded', function() {
    const proceedForm = document.getElementById('proceedForm');

    proceedForm.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        console.log('proceed');
    });

    const yesButton = document.querySelector('button[type="Proceed"]');
    const noButton = document.querySelector('button[type="Don\'t Proceed"]');

    yesButton.addEventListener('click', function() {
        console.log('Yes, proceed');
        Redirect.continueToTab();
    });

    noButton.addEventListener('click', function() {
        console.log('No, don\'t proceed');
        Redirect.closeTab();
    });
}
);
