(() => {
  const article = document.querySelector("[data-post]");
  const nav = document.querySelector("[data-toc-nav]");
  const toc = document.querySelector("[data-toc]");
  if (!article || !nav) return;

  const headings = Array.from(article.querySelectorAll("h2"));
  if (!headings.length) {
    toc && (toc.hidden = true);
    return;
  }

  const frag = document.createDocumentFragment();

  headings.forEach((h) => {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    frag.appendChild(a);
  });

  nav.appendChild(frag);
})();

(() => {
  const post = document.querySelector("[data-post]");
  if (!post) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "scrollTop";
  btn.setAttribute("aria-label", "Back to top");
  btn.textContent = "⇑";

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function toggleVisibility() {
    const show = window.scrollY > 320;
    btn.classList.toggle("scrollTop--visible", show);
  }

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  document.body.appendChild(btn);
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
})();
