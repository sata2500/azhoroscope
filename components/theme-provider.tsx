'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Tema Sağlayıcı Bileşeni
 * next-themes kütüphanesini sarmalayarak tema yönetimini sağlar
 * 
 * @param children - Alt bileşenler
 * @param props - next-themes ThemeProvider özellikleri
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
