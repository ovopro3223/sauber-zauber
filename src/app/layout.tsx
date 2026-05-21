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
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sauber & Zauber — Luxury Cleaning, Reimagined',
  description:
    'Sauber & Zauber delivers white-glove, choreographed cleaning experiences for refined homes, ateliers, and private offices across Germany.',
  metadataBase: new URL('https://sauber-zauber.de'),
  openGraph: {
    title: 'Sauber & Zauber — Luxury Cleaning, Reimagined',
    description:
      'White-glove, choreographed cleaning for refined homes, ateliers, and private offices.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#07090e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
