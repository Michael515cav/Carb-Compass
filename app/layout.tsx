import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'Carb Compass — T1D Nutrition & Insulin Calculator',
    template: '%s | Carb Compass',
  },
  description: 'Trusted nutrition lookup, insulin dose calculator, freebie foods list, and high-protein low-carb recipes for people living with Type 1 Diabetes and their families.',
  keywords: ['type 1 diabetes', 'T1D nutrition', 'insulin calculator', 'freebie foods', 'low carb recipes', 'BGL calculator', 'carb counting'],
  openGraph: {
    siteName: 'Carb Compass',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
