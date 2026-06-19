function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}
function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

const windows = document.querySelectorAll('.window');

windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        
        windows.forEach(w => w.style.zIndex = 1);
        win.style.zIndex = 10;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        
        win.style.left = `${newX}px`;
        win.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

function playTone(freq) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}