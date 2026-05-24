document.addEventListener('DOMContentLoaded', function () {
    const journalForm = document.getElementById('journalForm');
    const exportCSVButton = document.querySelector('button[type="ECSV"]');
    const exportTXTButton = document.querySelector('button[type="ETXT"]');

    exportCSVButton.addEventListener('click', exportCSVData);
    exportTXTButton.addEventListener('click', exportTXTData);

    journalForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const journalEntry = document.getElementById('journalEntry').value.trim();

        saveJournalEntry(journalEntry);
        window.location.href = 'confirm.html';
    });

    function getDateTime() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return date + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }

    function saveJournalEntry(entry) {
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

        journalEntries.push({
            date: getDateTime(),
            reflection: entry
        });

        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    }

    function csvSafe(value) {
        return '"' + String(value || '').replaceAll('"', '""') + '"';
    }

    function exportCSVData() {
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let csvContent = 'data:text/csv;charset=utf-8,Date,Reflection\n';

        journalEntries.forEach(function (entry) {
            csvContent += csvSafe(entry.date) + ',' + csvSafe(entry.reflection || entry.reason) + '\n';
        });

        const csvElement = document.createElement('a');
        csvElement.setAttribute('href', encodeURI(csvContent));
        csvElement.setAttribute('download', 'journalEntries.csv');
        csvElement.click();
    }

    function exportTXTData() {
        const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let txtContent = 'data:text/plain;charset=utf-8,';

        journalEntries.forEach(function (entry) {
            txtContent +=
                'Date: ' + entry.date + '\n' +
                'Reflection: ' + (entry.reflection || entry.reason || '') + '\n\n';
        });

        const txtElement = document.createElement('a');
        txtElement.setAttribute('href', encodeURI(txtContent));
        txtElement.setAttribute('download', 'journalEntries.txt');
        txtElement.click();
    }
});
