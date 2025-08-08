import type { Theme } from "@/types/app";
import { ref, onMounted } from "vue";

const THEME_KEY = "todo-app-theme";

export function useTheme() {
  const theme = ref<Theme>("light");

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(THEME_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme.value === "light" ? "dark" : "light");
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  };

  // Watch for system theme changes
  onMounted(() => {
    initTheme();

    // Set up media query listener after mounting
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
  });

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  };
}
