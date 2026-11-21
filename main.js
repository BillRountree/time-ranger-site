(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav appears after the hero
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => nav.classList.toggle('is-on', !e.isIntersecting), { threshold: 0.15 }).observe(hero);

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // YouTube: load the player only when asked (no third-party requests before that)
  document.querySelectorAll('.yt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
      f.title = 'Time Ranger trailer';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      btn.replaceChildren(f);
    }, { once: true });
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.shot').forEach((a) => a.addEventListener('click', (ev) => {
    ev.preventDefault();
    lbImg.src = a.href; lbImg.alt = a.querySelector('img').alt;
    lb.hidden = false; lb.querySelector('button').focus();
  }));
  const closeLb = () => { lb.hidden = true; lbImg.src = ''; };
  lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

  // Light gun: every click is a shot
  const hud = document.getElementById('hud') || document.querySelector('.hud');
  const scoreEl = document.getElementById('score');
  let score = 0, hudTimer;
  addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    score += e.target.closest('a,button,img') ? 250 : 100;
    scoreEl.textContent = String(score).padStart(6, '0');
    hud.classList.add('is-on');
    clearTimeout(hudTimer); hudTimer = setTimeout(() => hud.classList.remove('is-on'), 2500);
    if (reduced) return;
    const h = document.createElement('span');
    h.className = 'hit'; h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1700);
  });

  // "Continue?" countdown when the final section is on screen
  const count = document.getElementById('count');
  let n = 9, timer;
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (!e.isIntersecting || reduced) return;
    timer = setInterval(() => { n = n <= 0 ? 9 : n - 1; count.textContent = n; }, 1000);
  }, { threshold: 0.4 }).observe(document.querySelector('.final'));
})();
