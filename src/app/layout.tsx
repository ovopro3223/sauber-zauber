import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Cursor } from '@/components/ui/Cursor';
import { Navbar } from '@/components/sections/Navbar';
import { AmbientLights } from '@/components/ui/AmbientLights';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Sauber & Zauber — Andere schrubben, wir zaubern.',
  description:
    'Premium-Reinigung in Berlin. Haus, Büro, Glas, nach Bauphasen und Möbel — diskret, gründlich, magisch sauber.',
  metadataBase: new URL('https://sauberundzauber.de'),
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    title: 'Sauber & Zauber — Andere schrubben, wir zaubern.',
    description: 'Premium-Reinigungsdienste in Berlin — diskret, gründlich, magisch sauber.',
    type: 'website',
    locale: 'de_DE',
  },
};

export const viewport: Viewport = {
  themeColor: '#03100b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${sans.variable} ${display.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="relative overflow-x-hidden antialiased hide-cursor">
        <LanguageProvider>
          <ThemeProvider>
            <CursorProvider>
              <LoadingScreen />
              <Cursor />
              <AmbientLights />
              <SmoothScroll>
                <ScrollProgress />
                <Navbar />
                <main className="relative z-10">{children}</main>
              </SmoothScroll>
            </CursorProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
