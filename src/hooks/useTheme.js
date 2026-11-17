import { useCallback, useEffect, useState } from "react";

const KEY = "slotify-theme";
const systemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

// Returns the active theme and a toggle. With no saved choice the site follows the system setting.
export function useTheme() {
  const read = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const [choice, setChoice] = useState(read);
  const [system, setSystem] = useState(systemTheme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const on = () => setSystem(mq.matches ? "light" : "dark");
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useEffect(() => {
    if (choice) document.documentElement.dataset.theme = choice;
    else delete document.documentElement.dataset.theme;
  }, [choice]);

  const theme = choice || system;
  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch {}
    setChoice(next);
  }, [theme]);

  return { theme, toggle };
}
