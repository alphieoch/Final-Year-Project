const dropzone = document.getElementById('dropzone');
const audioPlayer = document.getElementById('audioPlayer');
const bassSlider = document.getElementById('bassSlider');
const midSlider = document.getElementById('midSlider');
const trebleSlider = document.getElementById('trebleSlider');

let audioContext;
let sourceNode;
let bassFilter;
let midFilter;
let trebleFilter;

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = '#eee';
});

dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = '';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = '';

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('audio/')) {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        audioPlayer.style.display = 'block';
        initAudioContext();
    } else {
        alert('Please drop an audio file.');
    }
});

function initAudioContext() {
    audioContext = new AudioContext();
    sourceNode = audioContext.createMediaElementSource(audioPlayer);

    bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 500;
    bassFilter.gain.value = 0;

    midFilter = audioContext.createBiquadFilter();
    midFilter.type = 'peaking';
    midFilter.frequency.value = 1500;
    midFilter.Q.value = 1;
    midFilter.gain.value = 0;

    trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    sourceNode.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(trebleFilter);
    trebleFilter.connect(audioContext.destination);
}

bassSlider.addEventListener('input', () => {
    bassFilter.gain.value = bassSlider.value;
});

midSlider.addEventListener('input', () => {
    midFilter.gain.value = midSlider.value;
});

trebleSlider.addEventListener('input', () => {
    trebleFilter.gain.value = trebleSlider.value;
});