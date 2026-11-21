(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  // Fractured top edge for every section with data-edge (its top colour)
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  document.querySelectorAll('[data-edge]').forEach((sec) => {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'edge');
    svg.setAttribute('viewBox', '0 0 1000 30');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    const pts = [];
    for (let x = 0; x <= 1000; x += 18 + rand() * 46) pts.push(`${x.toFixed(1)},${(6 + rand() * 20).toFixed(1)}`);
    pts.push(`1000,${(6 + rand() * 20).toFixed(1)}`);
    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('points', `0,30 ${pts.join(' ')} 1000,30`);
    const line = document.createElementNS(NS, 'polyline');
    line.setAttribute('points', pts.join(' '));
    svg.append(poly, line);
    svg.style.setProperty('--edgec', sec.dataset.edge);
    sec.prepend(svg);
  });

  // Sticky nav appears after the hero
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => nav.classList.toggle('is-on', !e.isIntersecting), { threshold: 0.15 }).observe(hero);

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  const links = document.getElementById('nav-links');
  const setMenu = (open) => { toggle.setAttribute('aria-expanded', open); links.classList.toggle('is-open', open); };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

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

  // Light gun: every mouse click is a shot
  const hud = document.querySelector('.hud');
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
