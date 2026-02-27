/* ── Back-to-top button ───────────────────────────────────────── */
(function () {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '1.8rem',
    right: '1.8rem',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0078d4, #3b82f6)',
    color: '#fff',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity .3s, transform .2s',
    zIndex: '999',
    boxShadow: '0 4px 14px rgba(0,120,212,.4)',
    fontFamily: 'Inter, sans-serif',
  });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.12) translateY(-2px)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'scale(1) translateY(0)'; });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Language switcher ────────────────────────────────────────── */
(function () {
  const STORE_KEY = 'pa-wiki-lang';
  let lang = localStorage.getItem(STORE_KEY) || 'tr';

  /* Split "TR text / EN text" → [trPart, enPart] */
  function splitBi(text) {
    const idx = text.indexOf(' / ');
    if (idx === -1) return null;
    return [text.slice(0, idx).trim(), text.slice(idx + 3).trim()];
  }

  /* Walk a DOM subtree and translate every text node that has " / " */
  function applyLang(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (node) {
      /* Restore original from cache, or treat current text as original */
      const original = node._biOriginal !== undefined
        ? node._biOriginal
        : node.textContent;

      const parts = splitBi(original);
      if (!parts) return;

      /* Cache original on first encounter */
      if (node._biOriginal === undefined) node._biOriginal = original;

      node.textContent = lang === 'tr' ? parts[0] : parts[1];
    });
  }

  function refreshAll() {
    applyLang(document.querySelector('.sidebar-nav'));
    applyLang(document.querySelector('.app-nav'));
  }

  /* ── Language toggle button ── */
  function createLangBtn() {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    updateBtnLabel(btn);
    Object.assign(btn.style, {
      position:    'fixed',
      bottom:      '5.2rem',      /* sits above the back-to-top button */
      right:       '1.8rem',
      padding:     '0 14px',
      height:      '36px',
      borderRadius: '18px',
      background:  'linear-gradient(135deg, #0078d4, #3b82f6)',
      color:       '#fff',
      border:      'none',
      fontSize:    '12px',
      fontWeight:  '700',
      letterSpacing: '0.04em',
      cursor:      'pointer',
      zIndex:      '999',
      boxShadow:   '0 4px 14px rgba(0,120,212,.4)',
      fontFamily:  'Inter, sans-serif',
      transition:  'transform .2s, box-shadow .2s',
      whiteSpace:  'nowrap',
    });
    btn.addEventListener('mouseenter', function () {
      btn.style.transform  = 'scale(1.05) translateY(-1px)';
      btn.style.boxShadow  = '0 6px 20px rgba(0,120,212,.5)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'scale(1) translateY(0)';
      btn.style.boxShadow = '0 4px 14px rgba(0,120,212,.4)';
    });
    btn.addEventListener('click', function () {
      lang = lang === 'tr' ? 'en' : 'tr';
      localStorage.setItem(STORE_KEY, lang);
      updateBtnLabel(btn);
      refreshAll();
    });
    document.body.appendChild(btn);
  }

  function updateBtnLabel(btn) {
    btn.textContent = lang === 'tr' ? '🇬🇧 English' : '🇹🇷 Türkçe';
    btn.title = lang === 'tr' ? 'Switch to English' : 'Türkçeye geç';
  }

  /* ── Hook into Docsify lifecycle ── */
  window.$docsify = window.$docsify || {};
  const _doneEach = window.$docsify.doneEach;
  window.$docsify.doneEach = function () {
    if (_doneEach) _doneEach.call(this);
    /* Sidebar re-renders on every navigation — re-apply lang each time */
    refreshAll();
    if (!document.getElementById('lang-toggle')) createLangBtn();
  };
})();
