/* CFC-SG v2 · motion.js */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-on-scroll').forEach(el => el.classList.add('in-view'));
    return;
  }

  // 1. Scroll fade-up with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.fade-on-scroll').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fade-on-scroll').forEach(function (el) { el.classList.add('in-view'); });
  }

  // 2. Topbar shrink on scroll
  var topbar = document.getElementById('topbar');
  var lastShrunk = false;
  function onScroll() {
    var shrunk = window.scrollY > 40;
    if (shrunk !== lastShrunk) {
      if (topbar) topbar.classList.toggle('shrunk', shrunk);
      lastShrunk = shrunk;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Stat counter animation
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (!target || isNaN(target)) return;
    var duration = 1400;
    var start = null;
    var initial = 0;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(initial + (target - initial) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { counterIO.observe(el); });
  }
})();
