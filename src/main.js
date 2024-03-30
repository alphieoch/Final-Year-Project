const dropzone = document.getElementById('dropzone');
const audioPlayer = document.getElementById('audioPlayer');

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
    } else {
        alert('Please drop an audio file.');
    }
});