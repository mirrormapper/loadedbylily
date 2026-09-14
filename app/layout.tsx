import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://loadedbylily.com"),
  title: "Loaded by Lily | Weekend cookies in Tamworth",
  description:
    "Homemade loaded cookies baked each weekend in Tamworth. Thick dough, real fillings, hand-finished tops. Order before Friday.",
  openGraph: {
    title: "Loaded by Lily",
    description:
      "Homemade loaded cookies baked each weekend in Tamworth.",
    url: "https://loadedbylily.com",
    siteName: "Loaded by Lily",
    images: [{ url: "/cookies/hero.jpg", width: 1920, height: 1080 }],
    locale: "en_AU",
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-cacao font-sans text-sugar">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
