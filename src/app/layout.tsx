import { Inter, Poppins } from 'next/font/google';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from "next"; // Import Metadata type
import './globals.css';
import { ThemeProvider } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Official Metadata API - Replaces manual <head> tags
export const metadata: Metadata = {
  title: {
    template: '%s | Fleur',
    default: 'Fleur | Computer Engineer',
  },
  description: "Computer Engineer specializing in backend architecture and design methodology.",
  icons: {
    icon: [
      { url: '/icon1.png', type: 'image/png' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }, // Fallback
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Note: Next.js injects metadata here automatically. 
            The inline script below handles the 'Flash of Unstyled Content' (FOUC) 
            for the theme before the React app hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark' || theme === 'light') return theme;
                    if (theme === 'system' || !theme) {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                  } catch (e) {}
                  return 'light';
                }
                var resolvedTheme = getTheme();
                if (resolvedTheme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.removeAttribute('data-theme');
                }
              })();
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} // Silences extension-injected attribute errors
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}