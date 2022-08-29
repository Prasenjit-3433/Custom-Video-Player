const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTimeElement = document.querySelector('.time-elapsed');
const durationElement = document.querySelector('.time-duration');
const playbackSpeedElement = document.querySelector('.player-speed');
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

let lastVolume = 1;

// Change Volume Icon
function setVolumeIcon(volume) {
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }
}

// Mute / Unmute
function toggleMute() {
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        setVolumeIcon(0);
    }else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        setVolumeIcon(lastVolume);
    }
}

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

    lastVolume = volume;
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = playbackSpeedElement.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

  // Target the video element specificly because we want the video itself to be centered vertically while 
  // the player is still take up the entire page:
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }

  // revert all the things done in fullscreen:
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    }else {
        closeFullscreen();
    }

    // revert value
    fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('canplay', updateProgress);
video.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
playbackSpeedElement.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);