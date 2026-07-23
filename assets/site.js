const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const yearLabels = document.querySelectorAll("[data-current-year]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;
const preferenceKey = "kaynak-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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

updateHeader();
