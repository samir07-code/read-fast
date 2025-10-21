const input = document.getElementById('input');
const speedInput = document.getElementById('speed');
const submitBtn = document.getElementById('btn');

const outputDiv = document.getElementById('output');
const output = document.getElementById('word');
const speedDisplay = document.getElementById('speedDisplay');

const progressBar = document.getElementById('progressBar');
const timer = document.getElementById('timer');

const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const closeBtn = document.getElementById('closeBtn');

const hiddenClass = 'hidden';

let speed = 200; // default WPM

increaseBtn.addEventListener('click', () => {
    speed += 20;
    speedInput.value = speed;
    speedDisplay.textContent = `Speed: ${speed} WPM`;
});

decreaseBtn.addEventListener('click', () => {
    speed = Math.max(20, speed - 20);
    speedInput.value = speed;
    speedDisplay.textContent = `Speed: ${speed} WPM`;
});


let canClickSubmit = true;

submitBtn.addEventListener('click', () => {
    if (!canClickSubmit) return;

    const text = input.value;
    speed = parseInt(speedInput.value) || 200;

    if (!text) {
        alert('Please enter some text to read.');
        return;
    }

    submitBtn.disabled = true;
    canClickSubmit = false;


    const words = text.split(/\s+/);
    let index = 0;
    let interval = 60000 / speed; // milliseconds per word

    outputDiv.classList.remove(hiddenClass);

    let startTime = Date.now();
    let lastUpdateTime = Date.now();
    let elapsedTime = 0;

    let isPaused = false;

    function pause(){
        isPaused = !isPaused;
        if (isPaused) {
            pauseBtn.value = '▶';
        } else {
            pauseBtn.value = '⏸';
            startTime = Date.now();
            lastUpdateTime = Date.now();
        }
    }

    function reset(){
        index = 0;
        elapsedTime = 0;
        startTime = Date.now();
        lastUpdateTime = Date.now();

        if (isPaused) {
            pause();
        }
    }

    function close(){
        clearInterval(timerInterval);
        index = words.length; // to stop display
        
        output.textContent = "-";
        speedDisplay.textContent = "Speed: - WPM";
        timer.textContent = "00:00:000";
        progressBar.style.width = `0%`;

        outputDiv.classList.add(hiddenClass);

        resetBtn.removeEventListener('click', reset);
        pauseBtn.removeEventListener('click', pause);
        closeBtn.removeEventListener('click', close);

        canClickSubmit = true;
        submitBtn.disabled = false;
    }

    resetBtn.addEventListener('click', reset);
    pauseBtn.addEventListener('click', pause);
    closeBtn.addEventListener('click', close);

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}:${(ms % 1000).toString().padStart(3, '0')}`;
    }


    output.textContent = words[index];

    let timerInterval;
    setTimeout(() => {
        timerInterval = setInterval(() => {
            if (!isPaused) {
                let dt = Date.now() - startTime;
                elapsedTime += dt;
                timer.textContent = `Time: ${formatTime(elapsedTime + dt)}`;
                startTime = Date.now();

                interval = 60000 / speed; // milliseconds per word
                if (Date.now() - lastUpdateTime >= interval) {
                    lastUpdateTime = Date.now();
                    index++;
                }
            }

            if (index >= words.length || outputDiv.classList.contains(hiddenClass)) {
                close();
                return;
            }

            output.textContent = words[index];

            speedDisplay.textContent = `Speed: ${speed} WPM`;
            progressBar.style.width = `${(index / words.length) * 100}%`;
        }, 50);
    }, 1500);
});