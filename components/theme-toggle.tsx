'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

/**
 * Tema Değiştirici Bileşeni
 * Kullanıcının açık/koyu tema arasında geçiş yapmasını sağlar
 */
export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Hydration sorunlarını önlemek için bileşenin mount olmasını bekle
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Bileşen mount olmadan önce boş render
  if (!mounted) {
    return (
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background"
        aria-label="Tema değiştir"
      >
        <span className="sr-only">Tema değiştir</span>
      </button>
    );
  }

  /**
   * Tema döngüsü: light -> dark -> system -> light
   */
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  /**
   * Tema ikonunu belirle
   */
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      default:
        return '💻';
    }
  };

  /**
   * Tema etiketini belirle
   */
  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Açık tema';
      case 'dark':
        return 'Koyu tema';
      default:
        return 'Sistem teması';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-lg transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
    >
      {getThemeIcon()}
    </button>
  );
}
