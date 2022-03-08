const tag = (tagName) => document.querySelector(tagName);
const id = (ID) => document.getElementById(ID);

const music = tag("audio"),
  image = tag("img");

const title = id("title"),
  artist = id("artist");

const prevBtn = id("prev"),
  playBtn = id("play"),
  nextBtn = id("next");

const progressContainer = id("progress-container"),
  progress = id("progress"),
  currentTimeElement = id("current-time"),
  durationElement = id("duration");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Lucus",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Brian",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight",
    artist: "Jay",
  },
  {
    name: "metric-1",
    displayName: "Metric",
    artist: "Joy",
  },
];

// Check if playing
let isPlaying = false;

//   Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

//    Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");

  music.pause();
};

//update DOM

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;

  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Prev song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select first song
loadSong(songs[songIndex]);

// Track Music and Time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar

const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
