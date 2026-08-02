const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const yearLabels = document.querySelectorAll("[data-current-year]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;
const preferenceKey = "kaynak-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const isGerman = root.lang === "de";

const readThemePreference = () => {
  try {
    const preference = window.localStorage.getItem(preferenceKey);
    return preference === "light" || preference === "dark" ? preference : null;
  } catch {
    return null;
  }
};

const saveThemePreference = (theme) => {
  try {
    window.localStorage.setItem(preferenceKey, theme);
  } catch {
    // The active theme still applies when browser storage is unavailable.
  }
};

const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
themeToggle.type = "button";
themeToggle.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span>';

const updateThemeToggle = () => {
  const darkModeIsActive = root.dataset.theme === "dark";
  const label = isGerman
    ? darkModeIsActive
      ? "Helles Erscheinungsbild aktivieren"
      : "Dunkles Erscheinungsbild aktivieren"
    : darkModeIsActive
      ? "Switch to light appearance"
      : "Switch to dark appearance";

  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeToggle.setAttribute("aria-pressed", String(darkModeIsActive));
};

const applyTheme = (theme, { persist = false } = {}) => {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  themeColor?.setAttribute("content", theme === "dark" ? "#080a0f" : "#f6f7f9");

  if (persist) {
    saveThemePreference(theme);
  }

  updateThemeToggle();
};

const changeTheme = (theme, options) => {
  root.classList.add("theme-changing");

  const commitChange = () => applyTheme(theme, options);

  if (!reduceMotion.matches && typeof document.startViewTransition === "function") {
    document.startViewTransition(commitChange);
  } else {
    commitChange();
  }

  window.setTimeout(() => root.classList.remove("theme-changing"), 500);
};

navigation?.append(themeToggle);
applyTheme(
  root.dataset.theme === "dark" || root.dataset.theme === "light"
    ? root.dataset.theme
    : systemTheme.matches
      ? "dark"
      : "light",
);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  changeTheme(nextTheme, { persist: true });
});

systemTheme.addEventListener("change", (event) => {
  if (readThemePreference() === null) {
    changeTheme(event.matches ? "dark" : "light");
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === preferenceKey) {
    const storedTheme = readThemePreference();
    changeTheme(storedTheme ?? (systemTheme.matches ? "dark" : "light"));
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
};

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

yearLabels.forEach((label) => {
  label.textContent = String(new Date().getFullYear());
});

const motionShouldBeRestrained = () =>
  reduceMotion.matches || Boolean(navigator.connection?.saveData);

root.classList.toggle("motion-restrained", motionShouldBeRestrained());

const revealTargets = document.querySelectorAll(
  [
    ".hero-grid > :first-child",
    ".hero-visual",
    ".section-heading",
    ".fact-card",
    ".company-grid > *",
    ".product-stage",
    ".value-card",
    ".responsibility-card",
    ".contact-panel",
  ].join(","),
);

revealTargets.forEach((target, index) => {
  target.dataset.reveal = "";
  target.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
});

if (revealTargets.length > 0) {
  root.classList.add("motion-ready");

  if (motionShouldBeRestrained() || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

const heroVisuals = document.querySelectorAll(".hero-visual");

const resetHeroDepth = (visual) => {
  const neutralDepth = {
    "--orb-x": "0px",
    "--orb-y": "0px",
    "--phone-x": "0px",
    "--phone-y": "0px",
    "--phone-rotate": "0deg",
    "--note-top-x": "0px",
    "--note-top-y": "0px",
    "--note-bottom-x": "0px",
    "--note-bottom-y": "0px",
    "--caption-x": "0px",
    "--caption-y": "0px",
  };

  Object.entries(neutralDepth).forEach(([property, value]) => {
    visual.style.setProperty(property, value);
  });
};

heroVisuals.forEach((visual) => {
  let pointerFrame = 0;

  visual.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || motionShouldBeRestrained()) return;

    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    window.cancelAnimationFrame(pointerFrame);
    pointerFrame = window.requestAnimationFrame(() => {
      visual.style.setProperty("--orb-x", `${x * 11}px`);
      visual.style.setProperty("--orb-y", `${y * 10}px`);
      visual.style.setProperty("--phone-x", `${x * 20}px`);
      visual.style.setProperty("--phone-y", `${y * 15}px`);
      visual.style.setProperty("--phone-rotate", `${x * 1.8}deg`);
      visual.style.setProperty("--note-top-x", `${x * 28}px`);
      visual.style.setProperty("--note-top-y", `${y * 22}px`);
      visual.style.setProperty("--note-bottom-x", `${x * -22}px`);
      visual.style.setProperty("--note-bottom-y", `${y * -18}px`);
      visual.style.setProperty("--caption-x", `${x * 16}px`);
      visual.style.setProperty("--caption-y", `${y * 13}px`);
    });
  });

  visual.addEventListener("pointerleave", () => resetHeroDepth(visual));
  visual.addEventListener("pointercancel", () => resetHeroDepth(visual));
});

document.querySelectorAll(".product-stage").forEach((stage) => {
  let spotlightFrame = 0;

  stage.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || motionShouldBeRestrained()) return;

    const bounds = stage.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    window.cancelAnimationFrame(spotlightFrame);
    spotlightFrame = window.requestAnimationFrame(() => {
      stage.style.setProperty("--spotlight-x", `${x}%`);
      stage.style.setProperty("--spotlight-y", `${y}%`);
      stage.style.setProperty("--spotlight-opacity", "1");
    });
  });

  stage.addEventListener("pointerleave", () => {
    stage.style.setProperty("--spotlight-opacity", "0.72");
  });
});

document.addEventListener("visibilitychange", () => {
  root.classList.toggle("page-inactive", document.hidden);
});

updateHeader();
