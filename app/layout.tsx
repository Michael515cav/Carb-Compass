import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

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
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
