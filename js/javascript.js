// Obtener elementos del DOM
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeControl = document.getElementById('volume-control');
const musicPlayer = document.getElementById('music-player');

// Cargar el estado de la reproducción desde localStorage
const savedTime = localStorage.getItem('musicTime');
const isPlaying = localStorage.getItem('isPlaying') === 'true';

if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}

if (isPlaying) {
    audio.play();
    playPauseBtn.textContent = '⏸️ Pausar';
} else {
    audio.pause();
    playPauseBtn.textContent = '▶️ Reproducir';
}

// Iniciar con menos volumen
audio.volume = 0.1;
volumeControl.value = 0.1;

// Controlar la reproducción y pausa
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️ Pausar';
        localStorage.setItem('isPlaying', 'true');
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️ Reproducir';
        localStorage.setItem('isPlaying', 'false');
    }
});

// Controlar el volumen
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Mostrar el reproductor al pasar el mouse cerca
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const playerRect = musicPlayer.getBoundingClientRect();

    // Mostrar si el mouse está cerca del reproductor
    if (
        mouseX >= playerRect.left - 50 && mouseX <= playerRect.right + 50 &&
        mouseY >= playerRect.top - 50 && mouseY <= playerRect.bottom + 50
    ) {
        musicPlayer.style.opacity = '1';
    } else {
        musicPlayer.style.opacity = '0';
    }
});

// Guardar el tiempo actual de la canción en localStorage antes de cambiar de página
window.addEventListener('beforeunload', () => {
    localStorage.setItem('musicTime', audio.currentTime);
});

// Mover el botón "No"
const noButton = document.querySelector('.no');

noButton.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.position = 'absolute';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

noButton.addEventListener('click', () => {
    window.location.href = './views/no.html'; // Cambia 'otrapagina.html' por la URL que desees
});