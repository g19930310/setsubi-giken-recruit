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
  let isWrapping = false;

  // 端まで来たときに空白や「ワープ」が見えないよう、
  // 先頭の前に「最後の複製」を1枚、末尾の後に「先頭2枚の複製」を追加しておく。
  // これにより前後どちらに送っても常に隣に本物そっくりのカードがあり、
  // 筒がそのまま回転しているように見える（実際のスライド数には数えない）。
  function makeClone(sourceSlide) {
    const clone = sourceSlide.cloneNode(true);
    clone.removeAttribute('data-voice-slide');
    clone.removeAttribute('data-voice-index');
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
    return clone;
  }

  if (slides.length > 1) {
    track.insertBefore(makeClone(slides[slides.length - 1]), slides[0]);
    track.appendChild(makeClone(slides[0]));
    track.appendChild(makeClone(slides[1] || slides[0]));
  }

  const maxIndex = () => Math.max(0, slides.length - 1);

  // 先頭に複製を1枚差し込んだ分、実際の描画位置は常に+1ズレる
  function trackPositionFor(i) {
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    const slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
    return (i + 1) * (slideWidth + gap);
  }

  function updateDotsThumbs(activeIndex) {
    thumbs.forEach((thumb, i) => {
      const active = i === activeIndex;
      thumb.classList.toggle('is-active', active);
      if (!thumb.disabled) thumb.setAttribute('aria-selected', String(active));
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === activeIndex));
  }

  function render() {
    index = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${trackPositionFor(index)}px)`;
    updateDotsThumbs(index);
  }

  // 端を超えたときに、見た目上つながっている複製カードへ普通にスライドさせてから、
  // アニメーションが終わった瞬間（見た目が変わらないタイミング）で
  // 本物のカード位置へこっそり置き換える。
  function wrapTo(virtualIndex, landingIndex) {
    if (isWrapping) return;
    isWrapping = true;
    track.style.transform = `translateX(-${trackPositionFor(virtualIndex)}px)`;
    updateDotsThumbs(landingIndex);

    const finish = () => {
      track.removeEventListener('transitionend', finish);
      track.style.transition = 'none';
      index = landingIndex;
      track.style.transform = `translateX(-${trackPositionFor(index)}px)`;
      // 一度描画を確定させてからtransitionを元に戻す
      void track.offsetWidth;
      track.style.transition = '';
      isWrapping = false;
    };
    track.addEventListener('transitionend', finish, { once: true });
  }


  prev?.addEventListener('click', () => {
    if (isWrapping) return;
    if (index <= 0) { wrapTo(-1, maxIndex()); return; }
    index -= 1; render();
  });
  next?.addEventListener('click', () => {
    if (isWrapping) return;
    if (index >= maxIndex()) { wrapTo(maxIndex() + 1, 0); return; }
    index += 1; render();
  });
  thumbs.forEach((thumb) => thumb.addEventListener('click', () => { if (isWrapping) return; index = Number(thumb.dataset.voiceThumb || 0); render(); }));
  dots.forEach((dot) => dot.addEventListener('click', () => { if (isWrapping) return; index = Number(dot.dataset.voiceDot || 0); render(); }));
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
