(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll("[data-set-lang]");
  const storedLanguage = localStorage.getItem("portfolio-language");
  const initialLanguage = storedLanguage === "fr" ? "fr" : "zh";

  function setLanguage(language) {
    root.dataset.siteLang = language;
    root.lang = language === "zh" ? "zh-CN" : "fr";
    localStorage.setItem("portfolio-language", language);

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.setLang === language)
      );
    });

    document.querySelectorAll("[data-zh][data-fr]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
  }

  setLanguage(initialLanguage);
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  document.querySelectorAll(".zoomable").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!lightbox || !lightboxImage || !image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.showModal();
      lightboxClose?.focus();
    });
  });

  lightboxClose?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-inner")) {
      lightbox.close();
    }
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  }
})();
