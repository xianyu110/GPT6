const revealItems = document.querySelectorAll("[data-reveal]");
const navigationLinks = document.querySelectorAll("nav a");
const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current.target.id}`);
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => navigationObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
