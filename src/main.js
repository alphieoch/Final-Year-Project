const dropzone = document.getElementById('dropzone');
const audioPlayer = document.getElementById('audioPlayer');
const bassSlider = document.getElementById('bassSlider');
const midSlider = document.getElementById('midSlider');
const trebleSlider = document.getElementById('trebleSlider');
const panSlider = document.getElementById('panSlider');

let audioContext;
let sourceNode;
let bassFilter;
let midFilter;
let trebleFilter;
let pannerNode;

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
    e.stopPropaga