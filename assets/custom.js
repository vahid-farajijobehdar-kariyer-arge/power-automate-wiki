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

  /* ── Helpers ── */

  function splitBi(str) {
    var i = str.indexOf(' / ');
    return i === -1 ? null : [str.slice(0, i).trim(), str.slice(i + 3).trim()];
  }

  /* Returns true if the node is inside a <pre> or <code> block */
  function insideCode(node) {
    var el = node.parentElement;
    while (el) {
      var t = el.tagName;
      if (t === 'PRE' || t === 'CODE') return true;
      el = el.parentElement;
    }
    return false;
  }

  /* ── 1. Split "TR text / EN text" labels in nav + headings + tables ── */

  function applyLangToRoot(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (node) {
      if (insideCode(node)) return;
      var el = node.parentElement;
      if (!el) return;

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

  /* ── 2. Tag **TR:** / **EN:** content blocks for CSS show/hide ── */

  function applyLangToContent() {
    var section = document.querySelector('.markdown-section');
    if (!section) return;

    var currentLang = null;

    Array.from(section.children).forEach(function (el) {
      var tag = el.tagName.toLowerCase();

      /* Reset at headings and horizontal rules */
      if (/^h[1-4]$/.test(tag) || tag === 'hr') {
        currentLang = null;
        return;
      }

      /* Detect a language-marker paragraph: starts with <strong>TR…</strong> or <strong>EN…</strong> */
      if (tag === 'p') {
        var firstEl = el.firstElementChild;
        if (firstEl && firstEl.tagName === 'STRONG') {
          var t = firstEl.textContent.trim();
          if (/^TR[\s:\u2014\-]/.test(t) || t === 'TR') {
            currentLang = 'tr';
            el.setAttribute('data-lang', 'tr');
            return;
          }
          if (/^EN[\s:\u2014\-]/.test(t) || t === 'EN') {
            currentLang = 'en';
            el.setAttribute('data-lang', 'en');
            return;
          }
        }
      }

      /* Carry the current language tag to following siblings (lists, blockquotes, etc.) */
      if (currentLang) {
        el.setAttribute('data-lang', currentLang);
      }
    });
  }

  /* ── 3. Set body class + run both transforms ── */

  function refreshAll() {
    document.body.classList.toggle('lang-tr', lang === 'tr');
    document.body.classList.toggle('lang-en', lang === 'en');

    applyLangToRoot(document.querySelector('.sidebar-nav'));
    applyLangToRoot(document.querySelector('.app-nav'));
    applyLangToRoot(document.querySelector('.markdown-section'));
    applyLangToContent();
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

  /* ── Register as a proper Docsify plugin ── */
  window.$docsify = window.$docsify || {};
  (window.$docsify.plugins = window.$docsify.plugins || []).push(function (hook) {
    hook.doneEach(function () {
      createBtn();
      refreshAll();
    });
  });
})();
