document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculatorForm");
    const totalPointsDisplay = document.getElementById("totalPoints");
    const pointsOverTime = document.getElementById("pointsOverTime");
    const remarkText = document.getElementById("remarkText");
    const timeDisplay = document.getElementById("time");
    let timer;
    let seconds = 0;

    function calculatePoints() {
        let total = 0;
        total += parseInt(document.getElementById("fuelComplete").value) * 10;
        total += parseInt(document.getElementById("fuelPartial").value) * 5;
        total += parseInt(document.getElementById("rocketOrbit").value) * 10;
        total += parseInt(document.getElementById("spaceDebris").value) * 12;
        total += parseInt(document.getElementById("satelliteCorrect").value) * 15;
        total += parseInt(document.getElementById("satelliteWrong").value) * 20;
        total += parseInt(document.getElementById("rocketFlight").value) * 5;
        total += parseInt(document.getElementById("astronautSafety").value) * 8;
        total += parseInt(document.getElementById("barrierIntact").value) * 3;
        
        totalPointsDisplay.textContent = total;
        pointsOverTime.textContent = `${total} points in ${formatTime(seconds)}`;
        updateRemark(total);
    }

    function updateRemark(points) {
        if (points >= 80) {
            remarkText.textContent = "Excellent!";
        } else if (points >= 50) {
            remarkText.textContent = "Good Job!";
        } else {
            remarkText.textContent = "Keep Trying!";
        }
    }

    function formatTime(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startChrono() {
        clearInterval(timer);
        seconds = 0;
        timer = setInterval(() => {
            seconds++;
            timeDisplay.textContent = formatTime(seconds);
            pointsOverTime.textContent = `${totalPointsDisplay.textContent} points in ${formatTime(seconds)}`;
        }, 1000);
    }

    function stopChrono() {
        clearInterval(timer);
    }

    function resetAll() {
        form.reset();
        calculatePoints();
        stopChrono();
        seconds = 0;
        timeDisplay.textContent = "00:00";
        pointsOverTime.textContent = "0 points in 00:00";
        remarkText.textContent = "";
    }

    function screenshot() {
        html2canvas(document.body).then(canvas => {
            let link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = "screenshot.png";
            link.click();
        });
    }

    form.addEventListener("change", calculatePoints);
    window.startChrono = startChrono;
    window.stopChrono = stopChrono;
    window.resetAll = resetAll;
    window.screenshot = screenshot;
    calculatePoints();
});
