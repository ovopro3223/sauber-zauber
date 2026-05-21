import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Cursor } from '@/components/ui/Cursor';
import { Navbar } from '@/components/sections/Navbar';
import { AmbientLights } from '@/components/ui/AmbientLights';

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
  title: 'Sauber & Zauber — Cleaning Atelier · Munich',
  description:
    'A private cleaning atelier composing white-glove, choreographed cleaning rituals for refined homes, studios, and discreet offices.',
  metadataBase: new URL('https://sauber-zauber.de'),
  openGraph: {
    title: 'Sauber & Zauber — Cleaning Atelier · Munich',
    description:
      'White-glove, choreographed cleaning rituals for refined homes, studios, and discreet offices.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#060f0c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="relative overflow-x-hidden antialiased hide-cursor">
        <ThemeProvider>
          <CursorProvider>
            <LoadingScreen />
            <Cursor />
            <AmbientLights />
            <SmoothScroll>
              <Navbar />
              <main className="relative z-10">{children}</main>
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
