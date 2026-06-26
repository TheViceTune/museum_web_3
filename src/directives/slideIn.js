export default {
  mounted(el, binding) {
    // Direction: 'bottom' (default), 'left', 'right', 'top'
    const direction = binding.arg || "bottom";
    const delay = binding.value || 0;

    el.dataset.slideDirection = direction;
    el.dataset.delay = delay;
    el.classList.add("slide-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
  },
};
