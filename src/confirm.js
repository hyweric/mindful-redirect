import { Redirect } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('continueButton').addEventListener('click', function () {
        Redirect.toPrevTab();
    });

    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = 'mainWind.html';
    });

    document.getElementById('exitButton').addEventListener('click', function () {
        Redirect.closeTab();
    });
});
