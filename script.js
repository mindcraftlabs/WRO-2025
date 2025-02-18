let timer;
let time = 0;

function startChrono() {
    stopChrono(); // Stop any existing timer
    timer = setInterval(updateChrono, 1000);
}

function stopChrono() {
    clearInterval(timer);
}

function resetChrono() {
    stopChrono();
    time = 0;
    document.getElementById('time').textContent = formatTime(time);
    document.getElementById('pointsOverTime').textContent = '0 points in 00:00';
}

function updateChrono() {
    time++;
    document.getElementById('time').textContent = formatTime(time);
    updatePointsOverTime(); // Update points over time display
    if (time >= 90) {
        stopChrono();
        document.getElementById('alarmSound').play(); // Play the alarm sound
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


function resetAll() {
    document.getElementById('calculatorForm').reset();
    document.getElementById('totalPoints').textContent = '0';
    document.getElementById('time').textContent = '00:00';
    document.getElementById('pointsOverTime').textContent = '0 points in 00:00';
    document.getElementById('remarkText').textContent = '';
    resetChrono(); // Reset the chronometer
}

function updatePointsOverTime() {
    const points = document.getElementById('totalPoints').textContent;
    const timeText = document.getElementById('time').textContent;
    document.getElementById('pointsOverTime').textContent = `${points} points in ${timeText}`;
}