import { Redirect } from '../utils.js';

document.addEventListener('DOMContentLoaded', function() {

    const yesButton1 = document.querySelector('button[type="Proceed1"]');
    const noButton1 = document.querySelector('button[type="Don\'t Proceed1"]');

    yesButton1.addEventListener('click', function() {
        console.log('Yes, proceed');
        Redirect.continueToTab();
    });

    noButton1.addEventListener('click', function() {
        console.log('No, don\'t proceed');
        Redirect.closeTab();
    });
}
);