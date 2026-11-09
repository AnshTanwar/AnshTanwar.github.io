const links = [...document.querySelectorAll(".toc a")];
const sections = links
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);

const setCurrent = (id) => {
  links.forEach((link) => {
    const on = link.hash === `#${id}`;
    link.classList.toggle("is-on", on);
    if (on) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
};

const sync = () => {
  if (!sections.length) return;
  const nav = document.querySelector(".toc");
  const line = (nav?.getBoundingClientRect().bottom || 56) + 8;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  }
  setCurrent(current);
};

sync();
window.addEventListener("scroll", sync, { passive: true });
window.addEventListener("hashchange", () => requestAnimationFrame(sync));
