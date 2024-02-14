const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------- //

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const showPauseIcon = () => {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

const togglePlay = () => {
  video.paused
    ? (video.play(), showPauseIcon())
    : (video.pause(), showPlayIcon());
};

// On Video End, show play button icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar ----------------------- //

// Calculate display time format
const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
};

// Click to seek within the video
const setProgress = (e) => {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// Volume Controls ----------------------- //

let lastVolume = 1;

// Volume Bar
const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volume < 0.1 ? (volume = 0) : volume;
  volume > 0.9 ? (volume = 1) : volume;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // Change Icon depending on volume
  volumeIcon.className = ``;
  volume > 0.6
    ? volumeIcon.classList.add("fas", "fa-volume-up")
    : volume < 0.6 && volume > 0
    ? volumeIcon.classList.add("fas", "fa-volume-down")
    : volume === 0
    ? volumeIcon.classList.add("fas", "fa-volume-off")
    : null;

  lastVolume = volume;
};

// Mute / Unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Change Playback Speed -------------------- //

const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;

const toggleFullscreen = () => {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
};

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("click", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
