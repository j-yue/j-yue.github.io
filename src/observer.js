(function () {
  const OPTIONS = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const header = document.querySelector(".header");

  const observer = new IntersectionObserver(handleIntersect, OPTIONS);
  observer.observe(header);

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;
      if (target === header) {
        toggleFabScroll(isIntersecting);
      }
    });
  }

  //helper for toggleFabScroll()
  function toggleSwapClasses(el, old, next) {
    el.classList.remove(old);
    el.classList.add(next);
  }

  function toggleFabScroll(isIntersecting) {
    const scroll = document.querySelector(".fab__scroll");
    const [visible, hidden] = ["fab__scroll--visible", "fab__scroll--hidden"];
    isIntersecting
      ? toggleSwapClasses(scroll, visible, hidden)
      : toggleSwapClasses(scroll, hidden, visible);
  }
})();
