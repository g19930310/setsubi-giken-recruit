/*
SECTION 01〜12 静的HTML教材。
SECTION 06のみカルーセル操作でJavaScriptを使用します。
Supabase / CMS / 外部通信はまだ未実装です。
*/
(() => {
  const carousel = document.querySelector('[data-voices-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-voices-track]');
  const slides = [...carousel.querySelectorAll('[data-voice-slide]')];
  const prev = document.querySelector('[data-voices-prev]');
  const next = document.querySelector('[data-voices-next]');
  const thumbs = [...document.querySelectorAll('[data-voice-thumb]')];
  const dots = [...document.querySelectorAll('[data-voice-dot]')];
  let index = 0;

  const maxIndex = () => Math.max(0, slides.length - 1);

  function render() {
    index = Math.max(0, Math.min(index, maxIndex()));
    const first = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    const slideWidth = first ? first.getBoundingClientRect().width : 0;
    track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;

    thumbs.forEach((thumb, i) => {
      const active = i === index;
      thumb.classList.toggle('is-active', active);
      if (!thumb.disabled) thumb.setAttribute('aria-selected', String(active));
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  prev?.addEventListener('click', () => { index = index <= 0 ? maxIndex() : index - 1; render(); });
  next?.addEventListener('click', () => { index = index >= maxIndex() ? 0 : index + 1; render(); });
  thumbs.forEach((thumb) => thumb.addEventListener('click', () => { index = Number(thumb.dataset.voiceThumb || 0); render(); }));
  dots.forEach((dot) => dot.addEventListener('click', () => { index = Number(dot.dataset.voiceDot || 0); render(); }));
  window.addEventListener('resize', render, { passive: true });

  render();
})();


/* SECTION 12｜エントリーフォーム
   教材用のため外部送信は行いません。
   必須項目とメール形式のみブラウザ標準 + JSで確認します。 */
(() => {
  const form = document.querySelector('#entry-form');
  const status = document.querySelector('#entry-form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.classList.remove('is-error', 'is-success');

    if (!form.checkValidity()) {
      status.textContent = '必須項目をご確認ください。';
      status.classList.add('is-error');
      const firstInvalid = form.querySelector(':invalid');
      firstInvalid?.focus();
      return;
    }

    status.textContent = '入力内容を確認できました。現在は教材版のため、外部送信は行いません。';
    status.classList.add('is-success');
  });
})();
