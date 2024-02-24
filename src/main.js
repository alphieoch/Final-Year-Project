// Element References
const audioPlayer = document.getElementById("audioPlayer");
const bassSlider = document.getElementById("bass");
const midSlider = document.getElementById("mid");
const trebleSlider = document.getElementById("treble");
const volumeControl = document.getElementById("volume");
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectMessage = document.getElementById('selectMessage');
const trackName = document.getElementById('trackName');
const reverbLevel = document.getElementById('reverbLevel');
const loadTrackButton = document.getElementById('loadTrackButton'); // Load Track Button

// Web Audio API Setup
const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audioPlayer);
const gainNode = audioCtx.createGain();

// EQ Filters
const bassFilter = audioCtx.createBiquadFilter();
bassFilter.type = "lowshelf";
bassFilter.frequency.value = 250;
const midFilter = audioCtx.createBiquadFilter();
midFilter.type = "peaking";
midFilter.frequency.value = 1000;
const trebleFilter = audioCtx.createBiquadFilter();
trebleFilter.type = "highshelf";
trebleFilter.frequency.value = 4000;

// Reverb Setup
const reverbNode = audioCtx.createConvolver();
const reverbGain = audioCtx.createGain();

// Volume Control
const volumeGain = audioCtx.createGain();

// Audio Node Connections
source.connect(bassFilter).connect(midFilter).connect(trebleFilter).connect(reverbGain).connect(volumeGain).connect(gainNode).connect(audioCtx.destination);
reverbGain.connect(audioCtx.destination);

// File Handling
let audioFileURL = null;
let currentTrackName = "No Track Selected";

function handleAudioFile(file) {
    audioFileURL = URL.createObjectURL(file);
    currentTrackName = file.name.split('.').slice(0, -1).join('.');
    updateTrackNameDisplay();
    console.log("Track loaded:", currentTrackName);
}

function updateTrackNameDisplay() {
    trackName.textContent = "Now Playing: " + currentTrackName;
}

// Event Listeners (EQ, Reverb, Volume, and Load Track Button)
bassSlider.addEventListener('input', updateEQ);
midSlider.addEventListener('input', updateEQ);
trebleSlider.addEventListener('input', updateEQ);
reverbLevel.addEventListener('input', updateReverb);
volumeControl.addEventListener('input', updateVolume);
loadTrackButton.addEventListener('click', loadTrack); // Load Track Button Listener

function loadTrack() {
    if (audioFileURL) {
        audioPlayer.src = audioFileURL;
        audioPlayer.load(); // Ensure the audio is loaded
        selectMessage.textContent = "Track Loaded! Ready to Play.";
        console.log("Track ready to play:", currentTrackName);
    } else {
        alert("Please select a track first.");
    }
}

// EQ, Reverb, and Volume Update Functions
function updateEQ() {
    bassFilter.gain.value = bassSlider.value;
    midFilter.gain.value = midSlider.value;
    trebleFilter.gain.value = trebleSlider.value;
    console.log("EQ Updated: Bass", bassSlider.value, "Mid", midSlider.value, "Treble", trebleSlider.value);
}

function updateReverb() {
    reverbGain.gain.value = reverbLevel.value;
    console.log("Reverb Level:", reverbLevel.value);
}

function updateVolume() {
    volumeGain.gain.value = volumeControl.value;
    console.log("Volume Level:", volumeControl.value);
}

// Drop Zone and File Input Handling
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragging');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragging');
    const files = e.dataTransfer.files;
    if (files.length) {
        handleAudioFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleAudioFile(e.target.files[0]);
    }
});

// Reverb Impulse Response Loading
// Implement getReverbImpulseResponse function as needed

console.log("Audio player setup completed.");
