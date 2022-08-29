const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTimeElement = document.querySelector('.time-elapsed');
const durationElement = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
    if(video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, Show play button
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}`: seconds;
    return `${minutes}:${seconds}`;
}

// Update progress bar as the video plays
function updateProgress() {
    const {currentTime, duration} = video;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeElement.textContent = `${displayTime(currentTime)} / `;
    durationElement.textContent = displayTime(duration);
}

// Click to seek within the video
function setProgress(event) {
    const newTime = event.offsetX / progressRange.offsetWidth;
    // Change of `currentTime` triggers `timeupdate` event that updates rest of everything:
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

// Volume Bar
function changeVolume(event) {
    let volume = event.offsetX / this.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }else if(volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // Change Icon depanding on volume:
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    }
}

// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('canplay', updateProgress);
video.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);