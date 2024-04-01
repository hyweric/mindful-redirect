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
        continueToTab();
    });

    noButton.addEventListener('click', function() {
        console.log('No, don\'t proceed');
        closeTab();
    });

    function continueToTab() {
        tab = "https://discord.com/channels/@me"; // change later 
        window.location.href = tab;
    }
    function closeTab() {
        // window.close(); // doesn't work because add-ons cannot close themselves unless opened by the add-on
        tab = "https://google.com/" // this will do tho ig 
        window.location.href = tab;
    }

}
);