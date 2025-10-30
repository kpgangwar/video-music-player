const playlist = [
  { src: "videos/video1.mp4", title: "Peaceful Nature", artist: "Relaxing Beats", thumb: "videos/thumb1.jpg" },
  { src: "videos/video2.mp4", title: "City Nights", artist: "Urban Vibes", thumb: "videos/thumb2.jpg" },
  { src: "videos/video3.mp4", title: "Ocean Waves", artist: "Calm Sea", thumb: "videos/thumb3.jpg" },
  { src: "videos/video4.mp4", title: "Ocean Waves", artist: "Calm Sea", thumb: "videos/thumb4.jpg" },
];

const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const playlistEl = document.getElementById("playlist");
const themeToggle = document.getElementById("theme-toggle");

let currentIndex = 0;
let isPlaying = false;

// Load track
function loadTrack(index) {
  const track = playlist[index];
  if (!track) return;
  video.src = track.src;
  updatePlaylistHighlight();
}

// Play & Pause

function playTrack() {
  video.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}
function pauseTrack() {
  video.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
}

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseTrack() : playTrack();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  playTrack();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  playTrack();
});

// Volume controls
volumeSlider.addEventListener("input", () => {
  video.volume = parseFloat(volumeSlider.value);
  updateMuteIcon();
});
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  updateMuteIcon();
});
function updateMuteIcon() {
  muteBtn.textContent = video.muted || video.volume === 0 ? "🔇" : "🔊";
}

// Progress bar
video.addEventListener("timeupdate", () => {
  if (video.duration) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";
  }
});
progress.addEventListener("click", (e) => {
  const rect = progress.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  video.currentTime = percent * video.duration;
});

// Playlist creation
function createPlaylist() {
  playlistEl.innerHTML = "";
  playlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("track");
    div.innerHTML = `
      <img src="${item.thumb || ""}" alt="thumb">
      <div class="track-info">
        <span><strong>${item.title}</strong></span>
        <span>${item.artist}</span>
      </div>
    `;
    div.addEventListener("click", () => {
      currentIndex = index;
      loadTrack(index);
      playTrack();
    });
    playlistEl.appendChild(div);
  });
  updatePlaylistHighlight();
}
function updatePlaylistHighlight() {
  document.querySelectorAll(".track").forEach((t, i) => {
    t.classList.toggle("active", i === currentIndex);
  });
}

// Auto next video
video.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  playTrack();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});

// 🎬 Screen (video) click par play/pause toggle
video.addEventListener("click", () => {
  if (video.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

// 🎧 Sync button state with video events
video.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
});

video.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
});


// Initialize
createPlaylist();
loadTrack(currentIndex);
