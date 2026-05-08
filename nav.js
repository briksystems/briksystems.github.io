/* =============================================
   BRIK SYSTEMS — nav.js
   Script compartido de navegación
   ============================================= */

(function () {
  // Marca el link activo según la página actual
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Toggle idioma (placeholder para implementación futura)
  document.querySelectorAll('.lang button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.lang button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    });
  });
})();
