document.addEventListener('DOMContentLoaded', function() {
    const journalForm = document.getElementById('journalForm');
    const exportCSVButton = document.querySelector('button[type="ECSV"]');
    const exportTXTButton = document.querySelector('button[type="ETXT"]');

    journalForm.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        const MIN_WORD_LIMIT = 5; // change later 

        // Get the journal entry from the form
        const journalEntry = document.getElementById('journalEntry').value;
        const journalEntry2 = document.getElementById('journalEntry2').value;
        
        length = journalEntry.trim().split(/\s+/).length;
        length2 = journalEntry2.trim().split(/\s+/).length;

        if (length < MIN_WORD_LIMIT || length2 < MIN_WORD_LIMIT) {
            console.log("Current Length: " + length + "   Minimum limit: " + MIN_WORD_LIMIT);
            console.log("journal entry:" + journalEntry);
            alert('Please write at least ' + MIN_WORD_LIMIT + ' words.');
        }
        else {
            saveJournalEntry(journalEntry);
            console.log('journal logged');
            
            window.location.href = 'proceed.html';
        }
       
    },
    

    exportCSVButton.addEventListener('click', function() {
        console.log('data export');
        exportCSVData();
    }),
    exportTXTButton.addEventListener('click', function() {
        console.log('data export');
        exportTXTData();
    }
    
    ));
    

    function saveJournalEntry(entry) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        console.log(dateTime);

    
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            
        journalEntries.push(dateTime + '\n');
        journalEntries.push(entry);

        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    }
    function exportCSVData() {
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let csvContent = "data:text/csv;charset=utf-8," + journalEntries.join("\n");

        let csvElement = document.createElement('a');
        csvElement.setAttribute('href', encodeURI(csvContent));
        csvElement.setAttribute('download', 'journalEntries.csv');
        csvElement.click();
    }

    function exportTXTData() {
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let txtContent = "data:text/plain;charset=utf-8," + journalEntries.join("\n");

        let txtElement = document.createElement('a');
        txtElement.setAttribute('href', encodeURI(txtContent));
        txtElement.setAttribute('download', 'journalEntries.txt');
        txtElement.click();
    }
    
});
