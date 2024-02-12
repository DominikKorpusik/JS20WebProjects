const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
};

const pauseSong = () => {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
};

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `/music/${song.name}.mp3`;
  image.src = `/img/${song.name}.jpg`;
};

// Current song
let songIndex = 0;

// Prev song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

// On load - Select first song
loadSong(songs[songIndex]);

const getTimeFor = (time, element) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  seconds ? (element.textContent = `${minutes}:${seconds}`) : null;
};

// Update progress bar & time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    getTimeFor(duration, durationEl);
    getTimeFor(currentTime, currentTimeEl);
  }
};

// Set progress bar
const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
