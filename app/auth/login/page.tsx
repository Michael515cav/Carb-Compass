'use client'
import { useState } from 'react'
import { Compass, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    const supabase = createClient()

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Check your email to confirm your account.')
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px 12px 44px',
    border: '1px solid var(--border)', borderRadius: 10,
    fontSize: '1rem', fontFamily: 'var(--font-body)',
    background: 'var(--surface)', color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.15s',
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
            <Compass size={32} color="var(--green-600)" strokeWidth={1.5} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.75rem',
            color: 'var(--green-900)', marginBottom: '0.5rem',
          }}>
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem' }}>
            {mode === 'signin'
              ? 'Sign in to access your saved data'
              : 'Save your insulin ratios and food history'}
          </p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Mode toggle */}
          <div style={{
            display: 'flex', background: 'var(--surface-2)',
            borderRadius: 10, padding: 4, marginBottom: '1.5rem',
          }}>
            {(['signin', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                style={{
                  flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer',
                  borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  fontWeight: mode === m ? 600 : 400,
                  background: mode === m ? 'var(--surface)' : 'transparent',
                  color: mode === m ? 'var(--green-700)' : 'var(--ink-muted)',
                  boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}>
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <Mail size={18} color="var(--ink-muted)" style={{ position: 'absolute', left: 14, top: 13, pointerEvents: 'none' }} />
              <input
                type="email" required placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <Lock size={18} color="var(--ink-muted)" style={{ position: 'absolute', left: 14, top: 13, pointerEvents: 'none' }} />
              <input
                type={showPw ? 'text' : 'password'} required placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 14, top: 13, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: 0 }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 8, padding: '10px 14px', marginBottom: '1rem',
                color: '#b91c1c', fontSize: '0.875rem',
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {error}
              </div>
            )}
            {success && (
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                background: 'var(--green-50)', border: '1px solid var(--green-200)',
                borderRadius: 8, padding: '10px 14px', marginBottom: '1rem',
                color: 'var(--green-700)', fontSize: '0.875rem',
              }}>
                <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {success}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px',
              background: loading ? 'var(--green-300, #89d8b0)' : 'var(--green-600)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)', transition: 'background 0.15s',
            }}>
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--ink-muted)', fontSize: '0.875rem' }}>
          All tools are free to use without an account.{' '}
          <Link href="/nutrition" style={{ color: 'var(--green-600)', textDecoration: 'none', fontWeight: 500 }}>
            Try nutrition lookup →
          </Link>
        </p>
      </div>
    </div>
  )
}
