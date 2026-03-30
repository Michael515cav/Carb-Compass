import Link from 'next/link'
import { Compass } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{
      background: 'var(--green-950)',
      color: 'var(--green-200)',
      padding: '3rem 1.5rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <Compass size={22} color="var(--green-400)" strokeWidth={1.5} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>
                Carb Compass
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--green-300, #89d8b0)', maxWidth: 260 }}>
              Practical nutrition tools for T1D families, built from lived experience — not theory.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: '0.75rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</p>
            {[
              ['/nutrition', 'Nutrition lookup'],
              ['/calculator', 'BGL / Insulin calculator'],
              ['/freebie-foods', 'Freebie foods'],
              ['/recipes', 'Recipes'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'var(--green-300, #89d8b0)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 6 }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: '0.75rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account</p>
            {[
              ['/auth/login', 'Sign in'],
              ['/dashboard', 'My dashboard'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'var(--green-300, #89d8b0)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 6 }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#fff', marginBottom: '0.75rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Disclaimer</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--green-400)', lineHeight: 1.7 }}>
              Carb Compass is for informational purposes only. Always work with your endocrinologist or diabetes care team for medical decisions.
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--green-800)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--green-500)' }}>
            © {new Date().getFullYear()} Carb Compass. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--green-600)' }}>
            Nutrition data sourced from the USDA FoodData Central database.
          </p>
        </div>
      </div>
    </footer>
  )
}
