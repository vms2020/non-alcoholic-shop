import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export const THEME_STORAGE_KEY = 'zpp-theme'

type Theme = 'light' | 'dark'

/**
 * Runs inline in <head> before first paint so the saved (or system) theme is
 * applied without a light-mode flash. Falls back to the OS preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`

export function ThemeToggle() {
  // Unknown until mounted; the inline script has already set the class.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-ink/15 bg-paper hover:border-ink/40 transition"
    >
      <Sun className="absolute left-2 size-4 text-muted" aria-hidden />
      <Moon className="absolute right-2 size-4 text-muted" aria-hidden />
      <span
        className={`relative z-10 grid size-7 place-items-center rounded-full bg-ink text-paper shadow transition-transform duration-300 ${
          isDark ? 'translate-x-[1.85rem]' : 'translate-x-0.5'
        } ${theme === null ? 'opacity-0' : ''}`}
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </span>
    </button>
  )
}
