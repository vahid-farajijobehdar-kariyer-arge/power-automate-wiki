// ── Back-to-top button ───────────────────────────────────────
(function () {
  const btn = document.createElement('button');
  btn.innerText = '↑';
  btn.title = 'Back to top';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '2rem', right: '2rem',
    width: '40px', height: '40px', borderRadius: '50%',
    background: '#0078d4', color: '#fff', border: 'none',
    fontSize: '1.2rem', cursor: 'pointer', opacity: '0',
    transition: 'opacity .3s', zIndex: '999', boxShadow: '0 2px 8px rgba(0,0,0,.2)',
  });
  document.body.appendChild(btn);
  const section = document.querySelector('.content') || document.querySelector('main') || document.body;
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 300 ? '1' : '0';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Estimated reading time ───────────────────────────────────
window.$docsify = window.$docsify || {};
(function () {
  const originalBefore = window.$docsify.plugins || [];
  window.$docsify.plugins = [
    ...originalBefore,
    function (hook) {
      hook.afterEach(function (html, next) {
        const words = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
        const mins = Math.max(1, Math.ceil(words / 200));
        next(
          `<p style="color:#6a737d;font-size:.8em;border-top:1px solid #e1e4e8;padding-top:8px;margin-top:2em">
            ⏱ ${mins} min read &nbsp;|&nbsp; 📝 ~${words} words
          </p>` + html
        );
      });
    },
  ];
})();
