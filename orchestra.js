// === YouTube API и управление звуком ===

// Инициализация YouTube API
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('bg-video', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

// После загрузки — начинаем с mute
function onPlayerReady(event) {
  player.mute();
  const muteBtn = document.getElementById('mute-btn');

  muteBtn.addEventListener('click', () => {
    if (player.isMuted()) {
      player.unMute();
      muteBtn.textContent = '🔊';
      muteBtn.classList.add('active'); // добавляем подсветку
    } else {
      player.mute();
      muteBtn.textContent = '🔇';
      muteBtn.classList.remove('active'); // убираем подсветку
    }
  });
}

// Загружаем YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);



// === Управление обычным видео (если используется не YouTube, а локальный .mp4) ===
const localVideo = document.getElementById('heroVideo');
const localMuteBtn = document.getElementById('mute-btn');

if (localVideo && localMuteBtn) {
  localMuteBtn.addEventListener('click', () => {
    if (localVideo.muted) {
      localVideo.muted = false;
      localMuteBtn.textContent = '🔊';
      localMuteBtn.classList.add('active');
    } else {
      localVideo.muted = true;
      localMuteBtn.textContent = '🔇';
      localMuteBtn.classList.remove('active');
    }
  });
}
