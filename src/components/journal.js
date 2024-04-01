document.addEventListener('DOMContentLoaded', function() {
    const journalForm = document.getElementById('journalForm');

    journalForm.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        const MIN_WORD_LIMIT = 5; // change later 

        // Get the journal entry from the form
        const journalEntry = document.getElementById('journalEntry').value;
        length = journalEntry.trim().split(/\s+/).length;

        if (length < MIN_WORD_LIMIT) {
            console.log("Current Length: " + length + "   Minimum limit: " + MIN_WORD_LIMIT);
            console.log("journal entry:" + journalEntry);
        }
        else {
            saveJournalEntry(journalEntry);
            console.log('proceed');
            window.location.href = 'proceed.html';
        }
        
    });

    function saveJournalEntry(entry) {
        console.log('Journal entry saved:', entry);
    }
});
