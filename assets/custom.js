/* ── Back-to-top button ───────────────────────────────────────── */
(function () {
  var btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '1.8rem', right: '1.8rem',
    width: '42px', height: '42px', borderRadius: '50%',
    background: 'linear-gradient(135deg,#0078d4,#3b82f6)',
    color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: '700',
    cursor: 'pointer', opacity: '0', pointerEvents: 'none',
    transition: 'opacity .3s, transform .2s', zIndex: '999',
    boxShadow: '0 4px 14px rgba(0,120,212,.4)', fontFamily: 'Inter,sans-serif',
  });
  document.body.appendChild(btn);
  window.addEventListener('scroll', function () {
    var show = window.scrollY > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });
  btn.addEventListener('mouseenter', function () { btn.style.transform = 'scale(1.12) translateY(-2px)'; });
  btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

/* ── Language switcher ────────────────────────────────────────── */
(function () {
  var STORE = 'pa-wiki-lang';
  var lang  = localStorage.getItem(STORE) || 'tr';

  /* Split "TR text / EN text" on the first " / " */
  function splitBi(str) {
    var i = str.indexOf(' / ');
    return i === -1 ? null : [str.slice(0, i).trim(), str.slice(i + 3).trim()];
  }

  /* Walk all text nodes inside root; transform any that contain " / " */
  function applyLangToRoot(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (node) {
      var el = node.parentElement;
      if (!el) return;

      /* On first encounter, cache the original bilingual string */
      var original = el.getAttribute('data-bi');
      if (!original) {
        if (!node.textContent.includes(' / ')) return;
        original = node.textContent;
        el.setAttribute('data-bi', original);
      }

      var parts = splitBi(original);
      if (!parts) return;
      node.textContent = lang === 'tr' ? parts[0] : parts[1];
    });
  }

  function refreshAll() {
    applyLangToRoot(document.querySelector('.sidebar-nav'));
    applyLangToRoot(document.querySelector('.app-nav'));
  }

  /* ── Language toggle button ── */
  function updateBtn() {
    var btn = document.getElementById('pa-lang-btn');
    if (!btn) return;
    btn.textContent = lang === 'tr' ? '🇬🇧 English' : '🇹🇷 Türkçe';
    btn.title       = lang === 'tr' ? 'Switch to English' : 'Türkçeye geç';
  }

  function createBtn() {
    if (document.getElementById('pa-lang-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'pa-lang-btn';
    Object.assign(btn.style, {
      position: 'fixed', bottom: '5.2rem', right: '1.8rem',
      padding: '0 14px', height: '36px', borderRadius: '18px',
      background: 'linear-gradient(135deg,#0078d4,#3b82f6)',
      color: '#fff', border: 'none', fontSize: '12px',
      fontWeight: '700', letterSpacing: '0.04em', cursor: 'pointer',
      zIndex: '9999', boxShadow: '0 4px 14px rgba(0,120,212,.4)',
      fontFamily: 'Inter,sans-serif', transition: 'transform .2s, box-shadow .2s',
      whiteSpace: 'nowrap',
    });
    btn.onmouseenter = function () {
      btn.style.transform = 'scale(1.05) translateY(-1px)';
      btn.style.boxShadow = '0 6px 20px rgba(0,120,212,.5)';
    };
    btn.onmouseleave = function () {
      btn.style.transform = '';
      btn.style.boxShadow = '0 4px 14px rgba(0,120,212,.4)';
    };
    btn.onclick = function () {
      lang = lang === 'tr' ? 'en' : 'tr';
      localStorage.setItem(STORE, lang);
      updateBtn();
      refreshAll();
    };
    document.body.appendChild(btn);
    updateBtn();
  }

  /* ── Register as a proper Docsify plugin (hook.doneEach is the correct API) ── */
  window.$docsify = window.$docsify || {};
  (window.$docsify.plugins = window.$docsify.plugins || []).push(function (hook) {
    hook.doneEach(function () {
      createBtn();
      refreshAll();
    });
  });
})();
