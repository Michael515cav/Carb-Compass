'use client'
import Link from 'next/link'
import { Compass, Search, Calculator, Apple, BookOpen, ArrowRight, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--green-950) 0%, var(--green-800) 100%)',
        padding: '6rem 1.5rem 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'var(--green-700)', opacity: 0.2,
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'var(--green-600)', opacity: 0.15,
        }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div className="animate-fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 999,
            padding: '6px 16px', marginBottom: '1.5rem',
          }}>
            <Compass size={16} color="var(--green-400)" />
            <span style={{ color: 'var(--green-200)', fontSize: '0.85rem', fontWeight: 500 }}>
              Built by a T1D parent, for T1D families
            </span>
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Navigate T1D nutrition<br />
            <em style={{ color: 'var(--green-400)', fontStyle: 'italic' }}>with confidence</em>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            color: 'var(--green-200)',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: 560,
            margin: '0 auto 2.5rem',
          }}>
            Nutrition lookup, insulin dose calculator, freebie foods list, and high-protein low-carb recipes — all in one place.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/nutrition" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--green-400)', color: 'var(--green-950)',
              padding: '14px 28px', borderRadius: 12,
              textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
              transition: 'transform 0.15s',
            }}>
              Look up a food <ArrowRight size={18} />
            </Link>
            <Link href="/calculator" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.12)', color: '#fff',
              padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none', fontWeight: 500, fontSize: '1rem',
            }}>
              Calculate a dose
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          color: 'var(--green-900)',
          marginBottom: '0.75rem',
        }}>
          Everything you need, nothing you don't
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--ink-muted)', marginBottom: '3rem', fontSize: '1.05rem' }}>
          Three years of hard-won knowledge, organized into four simple tools.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              icon: Search,
              href: '/nutrition',
              title: 'Nutrition lookup',
              desc: 'Search over 1 million foods from the USDA database. Get exact carb, protein, fat, and calorie counts per serving.',
              color: 'var(--green-500)',
              bg: 'var(--green-50)',
            },
            {
              icon: Calculator,
              href: '/calculator',
              title: 'BGL / Insulin calculator',
              desc: 'Enter your current blood glucose, target, correction factor, and carbs eaten. Get your recommended dose in seconds.',
              color: '#3b82f6',
              bg: '#eff6ff',
            },
            {
              icon: Apple,
              href: '/freebie-foods',
              title: 'Freebie foods',
              desc: 'A curated list of foods under 5g net carbs per serving — the T1D community\'s secret weapon for snacking without dosing.',
              color: '#f59e0b',
              bg: '#fffbeb',
            },
            {
              icon: BookOpen,
              href: '/recipes',
              title: 'High-protein recipes',
              desc: 'Low-carb, high-protein meals designed to keep blood glucose stable. Macros included on every recipe.',
              color: '#ef4444',
              bg: '#fef2f2',
            },
          ].map(({ icon: Icon, href, title, desc, color, bg }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '1rem',
                }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  color: 'var(--green-900)',
                  marginBottom: '0.5rem',
                }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.65, flex: 1 }}>
                  {desc}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: color, fontWeight: 500, fontSize: '0.875rem',
                  marginTop: '1rem',
                }}>
                  Explore <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Medical disclaimer */}
      <section style={{
        background: 'var(--green-50)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        maxWidth: 900,
        margin: '0 auto 4rem',
        padding: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}>
        <Shield size={24} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontWeight: 600, color: 'var(--green-800)', marginBottom: '0.25rem' }}>
            Medical disclaimer
          </p>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Carb Compass provides general nutritional information and calculation tools for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your endocrinologist or diabetes care team before making changes to your insulin regimen.
          </p>
        </div>
      </section>
    </div>
  )
}
