import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/portfolio.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"; // ✅ Import it

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "Harsh | Portfolio",
  description: "Welcome to my portfolio website",
  metadataBase: new URL("https://heyharsh.vercel.app"),
  openGraph: {
    title: "Harsh | Portfolio",
    description: "Explore my projects, blogs, and contact information.",
    url: "https://heyharsh.vercel.app",
    siteName: "Harsh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh | Portfolio",
    description: "Welcome to my personal portfolio and blog site.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} portfolio-theme`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </head>

      <body className="portfolio-theme antialiased">
        {/* ✅ Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-360522071"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-360522071', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GoogleAnalyticsTracker />{" "}
          {/* ✅ Pageview tracking on route change */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
