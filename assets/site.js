// Fade sections in as they scroll into view. Content stays visible if this script never runs.
(() => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });

  // Anything already on screen shows immediately; only content below the fold animates.
  for (const item of items) {
    if (item.getBoundingClientRect().top < window.innerHeight) item.classList.add('is-visible');
    observer.observe(item);
  }
  document.documentElement.classList.add('js');
})();
