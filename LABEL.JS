// формат времени mm:ss
const fmt = s => {
  if (!isFinite(s)) return "0:00";
  s = Math.max(0, Math.floor(s));
  const m = Math.floor(s / 60);
  const ss = String(s % 60).padStart(2, "0");
  return `${m}:${ss}`;
};

let active = null;

document.querySelectorAll('.track').forEach(track => {
  const src = track.dataset.src.trim();
  const audio = new Audio(src);
  audio.preload = "metadata";

  const btn = track.querySelector('.btn.play');
  const cur = track.querySelector('.time .cur');
  const dur = track.querySelector('.time .dur');
  const bar = track.querySelector('.bar');
  const fill = bar.querySelector('span');

  // загружаем длительность
  audio.addEventListener('loadedmetadata', () => {
    dur.textContent = fmt(audio.duration);
  });

  // обновляем таймкод
  audio.addEventListener('timeupdate', () => {
    cur.textContent = fmt(audio.currentTime);
    const pr = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = pr + '%';
  });

  // сброс при завершении
  audio.addEventListener('ended', () => {
    track.classList.remove('playing');
    btn.textContent = 'Play';
    fill.style.width = '0%';
    cur.textContent = '0:00';
  });

  // кнопка play/pause
  btn.addEventListener('click', () => {
    if (active && active !== audio) {
      active.pause();
      const prev = [...document.querySelectorAll('.track')].find(t => t._audio === active);
      if (prev) {
        prev.classList.remove('playing');
        prev.querySelector('.btn.play').textContent = 'Play';
      }
    }

    if (audio.paused) {
      audio.play().catch(()=>{});
      track.classList.add('playing');
      btn.textContent = 'Pause';
      active = audio;
    } else {
      audio.pause();
      track.classList.remove('playing');
      btn.textContent = 'Play';
    }
  });

  // переход по клику на прогресс
  bar.addEventListener('click', (e) => {
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    if (isFinite(audio.duration)) {
      audio.currentTime = ratio * audio.duration;
    }
  });

  track._audio = audio;
});