(() => {
  const preferenceKey = "kaynak-theme";
  let savedPreference = null;

  try {
    savedPreference = window.localStorage.getItem(preferenceKey);
  } catch {
    // System preference remains the privacy-friendly fallback.
  }

  const theme =
    savedPreference === "light" || savedPreference === "dark"
      ? savedPreference
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", theme === "dark" ? "#080a0f" : "#f6f7f9");
})();
