(() => {
  function setAppHeight() {
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`,
    );
  }
  setAppHeight();
  window.addEventListener("resize", setAppHeight);
  window.addEventListener("orientationchange", setAppHeight);
})();

(() => {
  const menu = document.querySelector("[data-menu]");
  const panel = document.querySelector("[data-menu-panel]");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeEls = document.querySelectorAll("[data-menu-close]");
  if (!menu || !panel || !openBtn) return;

  let lastActive = null;

  function setOpen(open) {
    if (open) {
      lastActive = document.activeElement;
      menu.hidden = false;
      document.body.style.overflow = "hidden";
      queueMicrotask(() => panel.focus());
    } else {
      menu.hidden = true;
      document.body.style.overflow = "";
      lastActive && lastActive.focus();
    }
  }

  openBtn.addEventListener("click", () => setOpen(true));
  closeEls.forEach((el) => el.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setOpen(false);
  });
})();

(() => {
  const searchInput = document.querySelector("[data-post-search]");
  const results = document.querySelector("[data-post-results]");
  if (!searchInput || !results) return;

  const MAX_RESULTS = 8;
  const posts = [
    { title: "About", url: "/about/" },
    { title: "NetInt", url: "/posts/netint/" },
    { title: "SkillSwap", url: "/posts/skillswap/" },
    { title: "WinAPX", url: "/posts/winapx/" },
    { title: "ScheduleAI'd", url: "/posts/scheduleaid/" },
  ];

  function render(list) {
    results.innerHTML = "";
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "overlay__result";
      empty.textContent = "No matches";
      results.appendChild(empty);
      return;
    }

    const limited = list.slice(0, MAX_RESULTS);
    limited.forEach((post) => {
      const a = document.createElement("a");
      a.className = "overlay__result";
      a.href = post.url;
      a.textContent = post.title;
      results.appendChild(a);
    });

    if (list.length > MAX_RESULTS) {
      const more = document.createElement("div");
      more.className = "overlay__result overlay__result--meta";
      more.textContent = `+${list.length - MAX_RESULTS} more; refine search to narrow.`;
      results.appendChild(more);
    }
  }

  function onInput() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      render(posts);
      return;
    }
    render(posts.filter((p) => p.title.toLowerCase().includes(q)));
  }

  searchInput.addEventListener("input", onInput);
  render(posts);
})();
