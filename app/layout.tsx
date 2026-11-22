import Script from "next/script"
import type { Metadata } from "next"
import type React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Elmahrosa Smart City | Alexandria Civic Vision",
  description: "A community-built civic smart city platform in Alexandria, Egypt. Built for Pi Network - no land sale or investment offer.",
  applicationName: "Elmahrosa Smart City",
  metadataBase: new URL("https://teos-pi-smart-city.vercel.app"),
  openGraph: {
    title: "Elmahrosa Smart City — Alexandria Civic Vision",
    description: "A community-led civic platform for Alexandria on Pi Network.",
    type: "website",
    images: ["/icon.svg"],
  },
  twitter: { card: "summary", title: "Elmahrosa Smart City", description: "Alexandria civic vision on Pi Network" },
  icons: { icon: "/icon.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head><meta name="theme-color" content="#071322" /></head>
      <body><Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />{children}</body>
    </html>
  )
}

