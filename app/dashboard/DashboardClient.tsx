'use client'
import { useState } from 'react'
import { User, Settings, History, Bookmark, Save, LogOut, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Profile {
  display_name?: string
  icr: number
  correction_factor: number
  target_bgl: number
}

interface FoodHistory {
  id: string
  food_name: string
  carbs_per_100g: number | null
  protein_per_100g: number | null
  searched_at: string
}

interface Props {
  user: { email: string }
  profile: Profile | null
  foodHistory: FoodHistory[]
  savedRecipeIds: string[]
}

export function DashboardClient({ user, profile, foodHistory, savedRecipeIds }: Props) {
  const [activeTab, setActiveTab] = useState<'settings' | 'history' | 'saved'>('settings')
  const [icr, setIcr] = useState(profile?.icr ?? 15)
  const [cf, setCf] = useState(profile?.correction_factor ?? 50)
  const [targetBgl, setTargetBgl] = useState(profile?.target_bgl ?? 120)
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')
  const router = useRouter()

  async function saveProfile() {
    setSaving(true); setSaveMsg(''); setSaveError('')
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_profile', icr, correction_factor: cf, target_bgl: targetBgl, display_name: displayName }),
    })
    const data = await res.json()
    if (data.error) setSaveError(data.error)
    else setSaveMsg('Settings saved!')
    setSaving(false)
    setTimeout(() => setSaveMsg(''), 3000)
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const tabs = [
    { id: 'settings' as const, label: 'Settings', icon: Settings },
    { id: 'history' as const, label: `Food history (${foodHistory.length})`, icon: History },
    { id: 'saved' as const, label: `Saved recipes (${savedRecipeIds.length})`, icon: Bookmark },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1px solid var(--border)', borderRadius: 8,
    fontSize: '1rem', fontFamily: 'var(--font-body)',
    background: 'var(--surface)', color: 'var(--ink)', outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={24} color="var(--green-600)" />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--green-900)' }}>
              {displayName || 'My dashboard'}
            </h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>{user.email}</p>
          </div>
        </div>
        <button onClick={signOut} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', border: '1px solid var(--border)',
          borderRadius: 8, background: 'var(--surface)', color: 'var(--ink-muted)',
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.875rem',
        }}>
          <LogOut size={16} /> Sign out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 4, marginBottom: '2rem' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px 12px', border: 'none', cursor: 'pointer',
              borderRadius: 10, fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              fontWeight: activeTab === id ? 600 : 400,
              background: activeTab === id ? 'var(--green-600)' : 'transparent',
              color: activeTab === id ? '#fff' : 'var(--ink-muted)',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Settings tab */}
      {activeTab === 'settings' && (
        <div className="card animate-fade-in">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--green-800)', marginBottom: '0.35rem' }}>
            Your insulin settings
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
            These values are set by your diabetes care team and auto-populate the BGL calculator.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>Display name</label>
              <input type="text" placeholder="Your name" value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                Insulin-to-carb ratio — 1 unit per __ g carbs
              </label>
              <input type="number" min={1} max={100} value={icr} onChange={e => setIcr(Number(e.target.value))} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                Correction factor — 1 unit drops BGL __ mg/dL
              </label>
              <input type="number" min={1} max={200} value={cf} onChange={e => setCf(Number(e.target.value))} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                Target BGL (mg/dL)
              </label>
              <input type="number" min={60} max={300} value={targetBgl} onChange={e => setTargetBgl(Number(e.target.value))} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          </div>

          {saveMsg && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 8, padding: '10px 14px', marginBottom: '1rem', color: 'var(--green-700)', fontSize: '0.875rem' }}>
              <CheckCircle size={16} /> {saveMsg}
            </div>
          )}
          {saveError && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: '1rem', color: '#b91c1c', fontSize: '0.875rem' }}>
              <AlertCircle size={16} /> {saveError}
            </div>
          )}

          <button onClick={saveProfile} disabled={saving} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', background: saving ? 'var(--border)' : 'var(--green-600)',
            color: '#fff', border: 'none', borderRadius: 10,
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
            cursor: saving ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
          }}>
            <Save size={16} /> {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      )}

      {/* History tab */}
      {activeTab === 'history' && (
        <div className="animate-fade-in">
          {foodHistory.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--ink-muted)' }}>
              <History size={36} color="var(--border)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No food history yet</p>
              <p style={{ fontSize: '0.875rem' }}>Foods you look up will appear here when saved.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {foodHistory.map(item => (
                <div key={item.id} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--green-900)', textTransform: 'capitalize', marginBottom: 2 }}>{item.food_name.toLowerCase()}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                      {new Date(item.searched_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {item.carbs_per_100g !== null && (
                      <p style={{ fontWeight: 700, color: 'var(--green-700)', fontSize: '0.95rem' }}>{item.carbs_per_100g}g carbs<span style={{ fontWeight: 400, color: 'var(--ink-muted)', fontSize: '0.75rem' }}> /100g</span></p>
                    )}
                    {item.protein_per_100g !== null && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{item.protein_per_100g}g protein</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved recipes tab */}
      {activeTab === 'saved' && (
        <div className="animate-fade-in">
          {savedRecipeIds.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--ink-muted)' }}>
              <Bookmark size={36} color="var(--border)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No saved recipes yet</p>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>Browse recipes and tap the bookmark icon to save them here.</p>
              <a href="/recipes" style={{ color: 'var(--green-600)', textDecoration: 'none', fontWeight: 500 }}>Browse recipes →</a>
            </div>
          ) : (
            <p style={{ color: 'var(--ink-muted)' }}>You have {savedRecipeIds.length} saved recipe{savedRecipeIds.length !== 1 ? 's' : ''}. <a href="/recipes" style={{ color: 'var(--green-600)', textDecoration: 'none' }}>View all recipes →</a></p>
          )}
        </div>
      )}
    </div>
  )
}
