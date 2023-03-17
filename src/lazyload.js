(function () {
  const imgList = document.querySelectorAll("#projects .card__img");

  [...imgList].map((img) => {
    const gif = img.querySelector("img");
    const gifSrc = gif.getAttribute("data-portfolio-src");
    const OPTIONS = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersect, OPTIONS);
    observer.observe(gif);

    function handleIntersect(entries) {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        if (target === gif) {
          gif.setAttribute("src", gifSrc);
        }
      });
    }
  });
})();
