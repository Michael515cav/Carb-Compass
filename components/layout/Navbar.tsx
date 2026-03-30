'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Compass } from 'lucide-react'

const links = [
  { href: '/nutrition',      label: 'Nutrition lookup' },
  { href: '/calculator',     label: 'BGL calculator' },
  { href: '/freebie-foods',  label: 'Freebie foods' },
  { href: '/recipes',        label: 'Recipes' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <nav style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 1.5rem',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          color: 'var(--green-700)',
        }}>
          <Compass size={28} strokeWidth={1.5} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--green-800)',
            letterSpacing: '-0.01em',
          }}>
            Carb Compass
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              color: pathname === href ? 'var(--green-700)' : 'var(--ink-muted)',
              background: pathname === href ? 'var(--green-50)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/dashboard" style={{
            marginLeft: '0.5rem',
            padding: '8px 18px',
            borderRadius: 10,
            fontSize: '0.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            background: 'var(--green-600)',
            color: '#fff',
            transition: 'background 0.15s',
          }}>
            My account
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink)', padding: 4 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '1rem 1.5rem',
        }} className="md:hidden">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'block',
              padding: '10px 0',
              textDecoration: 'none',
              color: pathname === href ? 'var(--green-700)' : 'var(--ink-muted)',
              fontWeight: pathname === href ? 600 : 400,
              borderBottom: '1px solid var(--border)',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/dashboard" onClick={() => setOpen(false)} style={{
            display: 'block',
            marginTop: '1rem',
            padding: '12px 0',
            textAlign: 'center',
            borderRadius: 10,
            background: 'var(--green-600)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 500,
          }}>
            My account
          </Link>
        </div>
      )}
    </header>
  )
}
