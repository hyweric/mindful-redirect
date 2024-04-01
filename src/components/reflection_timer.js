document.addEventListener('DOMContentLoaded', function() {
    const reflectionTimerBtn = document.getElementById('reflectionTimerBtn');
    let pressStartTime;
    let pressTimer;
    var time = 5;  // seconds
    
    reflectionTimerBtn.addEventListener('mousedown', function() {
        pressStartTime = Date.now();
        pressTimer = setTimeout(handlePress, time * 1000); // 15 seconds
    });

    reflectionTimerBtn.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });

    function handlePress() {
        window.location.href = 'proceed.html';
    }
});
