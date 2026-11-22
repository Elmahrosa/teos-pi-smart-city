import Script from "next/script"
import type { Metadata } from "next"
import type React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Elmahrosa Smart City | Pi Next Hackathon 2026",
  description:
    "Egypt's first Pi-powered civic platform. Report, sign, and build your city transparently. Demo experience for Pi Next Hackathon 2026.",
  applicationName: "Elmahrosa Smart City",
  openGraph: {
    title: "Elmahrosa Smart City",
    description: "Report, sign, and build your city transparently.",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#071322" />
      </head>
      <body>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  )
}
