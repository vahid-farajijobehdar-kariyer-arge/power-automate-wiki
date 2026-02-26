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
