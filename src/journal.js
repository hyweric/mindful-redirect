document.addEventListener('DOMContentLoaded', function() {
    const journalForm = document.getElementById('journalForm');
    const exportCSVButton = document.querySelector('button[type="ECSV"]');
    const exportTXTButton = document.querySelector('button[type="ETXT"]');
    var activated = false;
    
    exportCSVButton.addEventListener('click', function() {
        console.log('csv data export');
        exportCSVData();
    });
    exportTXTButton.addEventListener('click', function() {
        console.log('txt data export');
        exportTXTData();
    });

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
            if (activated == false){
                const errorText = document.createElement('p');
                errorText.textContent = 'Please write at least ' + MIN_WORD_LIMIT + ' words.';
                errorText.className = 'error-text';
                journalForm.insertBefore(errorText, journalForm.querySelector('button[type="submit"]'));
                activated = true;
                console.log('error message displayed');
            }

        }
        else {
            saveJournalEntry(journalEntry, journalEntry2);
            console.log('journal logged');
            
            window.location.href = '/reveal.js-master/proceed.html';
        }
    });

    function saveJournalEntry(entry, entry2) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        var time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        var dateTime = date+' '+time;
    
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            
        journalEntries.push({
            date: dateTime,
            reason: entry,
            reflection: entry2
        });
    
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    }

    function exportCSVData() {
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let csvContent = "data:text/csv;charset=utf-8,Date,Reason,Reflection\n";
    
        // Create CSV rows for each journal entry
        for (let i = 0; i < journalEntries.length; i++) {
            let entry = journalEntries[i];
    
            // Handle existing commas in the text by enclosing the values in double quotes
            let date = '"' + entry.date + '"';
            let reason = '"' + entry.reason + '"';
            let reflection = '"' + entry.reflection + '"';
    
            csvContent += date + "," + reason + "," + reflection + "\n";
        }
    
        let csvElement = document.createElement('a');
        csvElement.setAttribute('href', encodeURI(csvContent));
        csvElement.setAttribute('download', 'journalEntries.csv');
        csvElement.click();
    }
    

    function exportTXTData() {
        let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        let txtContent = "data:text/plain;charset=utf-8,";
    
        // Create TXT rows for each journal entry
        for (let i = 0; i < journalEntries.length; i++) {
            let entry = journalEntries[i];
    
            // Convert each entry into a string format
            let entryString = 'Date: ' + entry.date + '\n' +
                              'Reason: ' + entry.reason + '\n' +
                              'Reflection: ' + entry.reflection + '\n\n';
    
            txtContent += entryString;
        }
    
        let txtElement = document.createElement('a');
        txtElement.setAttribute('href', encodeURI(txtContent));
        txtElement.setAttribute('download', 'journalEntries.txt');
        txtElement.click();
    }
    
});

const canvas = document.getElementById('sineCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animateWaves();

// Single wave
function drawSineWave(phase, amplitude, frequency, speed, rotationAngle, Xshift, YShift) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    
    for (let x = 0; x < canvas.width*2; x += 10) {
        const y = amplitude * Math.sin(frequency * x + phase) + canvas.height / 2; 
        const rotatedX = Math.cos(rotationAngle) * x - Math.sin(rotationAngle) * y + Xshift;
        const rotatedY = Math.sin(rotationAngle) * x + Math.cos(rotationAngle) * y + YShift;
        if (x === 0) {
            ctx.moveTo(rotatedX, rotatedY);
        } else {
            ctx.lineTo(rotatedX, rotatedY);
        }
    }
    ctx.stroke(); 
    
    return phase + speed;
}

function animateWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    for (let i = 1; i <= 8; i++) {
        animateWaves['phase' + i] =  drawSineWave(animateWaves['phase' + i] || i * 20, 30, 0.02, i/3 * 0.01, Math.PI / 4, i + 50* (i-2), 0 - 200 * (i-0.5)); }
        // varying speed looks cool imo

    requestAnimationFrame(animateWaves);
}

