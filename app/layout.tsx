import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';

/**
 * Site meta verileri
 * SEO ve sosyal medya paylaşımları için kullanılır
 */
export const metadata: Metadata = {
  title: {
    default: 'AZ-Horoscope | Yapay Zeka Destekli Astroloji Platformu',
    template: '%s | AZ-Horoscope',
  },
  description:
    'Gerçek astronomik verilerle çalışan, yapay zeka destekli kişiselleştirilmiş burç yorumları ve doğum haritası analizi platformu.',
  keywords: [
    'astroloji',
    'burç yorumu',
    'doğum haritası',
    'günlük burç',
    'yapay zeka',
    'horoscope',
  ],
  authors: [{ name: 'Salih TANRISEVEN' }],
  creator: 'AZ-Horoscope',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://azhoroscope.com',
    siteName: 'AZ-Horoscope',
    title: 'AZ-Horoscope | Yapay Zeka Destekli Astroloji Platformu',
    description:
      'Gerçek astronomik verilerle çalışan, yapay zeka destekli kişiselleştirilmiş burç yorumları ve doğum haritası analizi platformu.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Kök Layout Bileşeni
 * Tüm sayfalar bu layout içinde render edilir
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
