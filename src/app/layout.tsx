import { Inter, Poppins } from 'next/font/google';  // Add imports
import { Geist, Geist_Mono } from 'next/font/google';  // Existing
import './globals.css';
import { ThemeProvider } from '@/components/providers'  // ← Import here

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

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
//       </head>
//       <body>{children}</body>
//     </html>
//   )
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark' || theme === 'light') {
                      return theme;
                    }
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
      <body className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
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

  // Add suppress for theme in ~ln 32
  // Themeprovider at ~ln 34 wraps children