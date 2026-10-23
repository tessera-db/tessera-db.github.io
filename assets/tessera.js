/* Tessera site: theme switch (Liquid Glass / Dark / Light), view tabs, policy contents highlight. */
(function () {
  var KEY = 'tessera-theme';
  var THEMES = ['glass', 'dark', 'light'];
  var BAR = { glass: '#0b1230', dark: '#0B1020', light: '#F2F4FA' };
  var root = document.documentElement;
  var base = root.getAttribute('data-base') || '';

  function current() { return root.getAttribute('data-theme') || 'glass'; }

  function paint(theme) {
    // screenshots that follow the theme
    document.querySelectorAll('img[data-shot]').forEach(function (img) {
      img.src = base + 'assets/shots/' + theme + '-' + img.getAttribute('data-shot') + '.webp';
    });
    document.querySelectorAll('[data-set-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === theme));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', BAR[theme]);
  }

  function setTheme(theme) {
    if (THEMES.indexOf(theme) < 0) theme = 'glass';
    root.classList.add('theming');
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) { /* storage blocked: theme still applies for this visit */ }
    paint(theme);
    clearTimeout(setTheme.t);
    setTheme.t = setTimeout(function () { root.classList.remove('theming'); }, 450);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-theme]');
    if (b) setTheme(b.getAttribute('data-set-theme'));
  });

  paint(current());

  // ---- view tabs on the home page ----
  var tabs = document.querySelectorAll('.tabs [role="tab"]');
  if (tabs.length) {
    var shot = document.getElementById('view-shot');
    var title = document.getElementById('view-title');
    var text = document.getElementById('view-text');
    function select(btn, focus) {
      tabs.forEach(function (t) {
        var on = t === btn;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      shot.setAttribute('data-shot', btn.getAttribute('data-shot'));
      shot.alt = btn.getAttribute('data-alt');
      shot.src = base + 'assets/shots/' + current() + '-' + btn.getAttribute('data-shot') + '.webp';
      title.textContent = btn.getAttribute('data-title');
      text.textContent = btn.getAttribute('data-text');
      if (focus) btn.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  }

  // ---- privacy policy: highlight the section being read ----
  var links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('on'); });
          var a = map[en.target.id];
          if (a) a.classList.add('on');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
