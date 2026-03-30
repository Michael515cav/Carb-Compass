'use client'
import { useState, useCallback } from 'react'
import { Search, X, ChevronDown, ChevronUp, Bookmark, Info } from 'lucide-react'

interface FoodResult {
  fdcId: string; name: string; brandOwner?: string; dataType: string
  carbs: number | null; protein: number | null; fat: number | null
  fiber: number | null; calories: number | null; sugar: number | null
}

const COMMON_SEARCHES = ['chicken breast', 'white rice', 'banana', 'whole milk', 'broccoli', 'oatmeal', 'sweet potato', 'almonds']

export default function NutritionPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FoodResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [servingSize, setServingSize] = useState<Record<string, number>>({})

  const search = useCallback(async (q: string) => {
    if (!q.trim()) return
    setLoading(true); setError(''); setSearched(true)
    try {
      const res = await fetch(`/api/food-search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.foods || [])
    } catch (e) {
      setError('Could not fetch results. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    search(query)
  }

  function getServing(id: string) { return servingSize[id] ?? 100 }

  function scale(val: number | null, id: string) {
    if (val === null) return '—'
    return ((val * getServing(id)) / 100).toFixed(1)
  }

  function netCarbs(food: FoodResult, id: string) {
    const carbs = food.carbs ?? 0
    const fiber = food.fiber ?? 0
    return (((carbs - fiber) * getServing(id)) / 100).toFixed(1)
  }

  function carbLabel(nc: string) {
    const n = parseFloat(nc)
    if (n <= 5) return { text: 'Freebie zone', color: 'var(--green-600)', bg: 'var(--green-50)' }
    if (n <= 15) return { text: 'Low carb', color: '#0284c7', bg: '#e0f2fe' }
    if (n <= 30) return { text: 'Moderate', color: '#d97706', bg: '#fef3c7' }
    return { text: 'High carb', color: '#dc2626', bg: '#fee2e2' }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--green-900)', marginBottom: '0.5rem' }}>
          Nutrition lookup
        </h1>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Search over 1 million foods from the USDA FoodData Central database. All values are per 100g unless adjusted.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={20} color="var(--ink-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for a food…"
            style={{
              width: '100%', padding: '16px 56px 16px 52px',
              border: '2px solid var(--border)', borderRadius: 14,
              fontSize: '1.05rem', fontFamily: 'var(--font-body)',
              background: 'var(--surface)', color: 'var(--ink)',
              outline: 'none', transition: 'border-color 0.15s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setResults([]); setSearched(false) }}
              style={{ position: 'absolute', right: 52, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: 4 }}>
              <X size={18} />
            </button>
          )}
          <button type="submit" style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--green-600)', color: '#fff', border: 'none',
            borderRadius: 10, padding: '8px 16px', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem',
          }}>
            Search
          </button>
        </form>

        {/* Quick searches */}
        {!searched && (
          <div>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Common searches:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {COMMON_SEARCHES.map(s => (
                <button key={s} onClick={() => { setQuery(s); search(s) }}
                  style={{
                    padding: '6px 14px', borderRadius: 999,
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    color: 'var(--ink-muted)', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--green-50)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--green-300, #89d8b0)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ marginTop: '2rem' }}>
          {[1,2,3].map(i => (
            <div key={i} className="skeleton" style={{ height: 72, marginBottom: 12, borderRadius: 12 }} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p style={{ color: '#dc2626', marginTop: '2rem', background: '#fee2e2', padding: '12px 16px', borderRadius: 10 }}>{error}</p>}

      {/* No results */}
      {searched && !loading && results.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--ink-muted)' }}>
          <Search size={40} color="var(--border)" style={{ marginBottom: '1rem' }} />
          <p>No results found for "{query}". Try a different search term.</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Showing {results.length} results for "{query}"
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {results.map(food => {
              const nc = netCarbs(food, food.fdcId)
              const label = carbLabel(nc)
              const isExpanded = expanded === food.fdcId

              return (
                <div key={food.fdcId} className="card" style={{ padding: '1rem 1.25rem', cursor: 'pointer' }}
                  onClick={() => setExpanded(isExpanded ? null : food.fdcId)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--green-900)', textTransform: 'capitalize' }}>
                          {food.name.toLowerCase()}
                        </h3>
                        <span style={{ fontSize: '0.7rem', color: label.color, background: label.bg, padding: '2px 8px', borderRadius: 999, fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {label.text}
                        </span>
                      </div>
                      {food.brandOwner && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 2 }}>{food.brandOwner}</p>}
                    </div>
                    {/* Key macros summary */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-700)', lineHeight: 1 }}>{nc}g</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>net carbs</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{scale(food.calories, food.fdcId)}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>kcal</p>
                      </div>
                      {isExpanded ? <ChevronUp size={18} color="var(--ink-muted)" /> : <ChevronDown size={18} color="var(--ink-muted)" />}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}
                      onClick={e => e.stopPropagation()}>
                      {/* Serving size adjuster */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', fontWeight: 500 }}>Serving size (g):</label>
                        {[50, 100, 150, 200].map(g => (
                          <button key={g} onClick={() => setServingSize(p => ({ ...p, [food.fdcId]: g }))}
                            style={{
                              padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                              border: '1px solid', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                              fontWeight: getServing(food.fdcId) === g ? 600 : 400,
                              borderColor: getServing(food.fdcId) === g ? 'var(--green-500)' : 'var(--border)',
                              background: getServing(food.fdcId) === g ? 'var(--green-50)' : 'var(--surface)',
                              color: getServing(food.fdcId) === g ? 'var(--green-700)' : 'var(--ink-muted)',
                            }}>
                            {g}g
                          </button>
                        ))}
                        <input type="number" min={1} max={1000}
                          value={getServing(food.fdcId)}
                          onChange={e => setServingSize(p => ({ ...p, [food.fdcId]: Number(e.target.value) }))}
                          style={{ width: 72, padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink)' }}
                        />
                      </div>

                      {/* Macro grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        {[
                          { label: 'Calories', val: scale(food.calories, food.fdcId), unit: 'kcal', color: '#6366f1' },
                          { label: 'Total carbs', val: scale(food.carbs, food.fdcId), unit: 'g', color: '#f59e0b' },
                          { label: 'Fiber', val: scale(food.fiber, food.fdcId), unit: 'g', color: 'var(--green-500)' },
                          { label: 'Net carbs', val: nc, unit: 'g', color: 'var(--green-700)' },
                          { label: 'Protein', val: scale(food.protein, food.fdcId), unit: 'g', color: '#3b82f6' },
                          { label: 'Fat', val: scale(food.fat, food.fdcId), unit: 'g', color: '#ef4444' },
                          { label: 'Sugar', val: scale(food.sugar, food.fdcId), unit: 'g', color: '#ec4899' },
                        ].map(({ label, val, unit, color }) => (
                          <div key={label} style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '0.75rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.25rem', fontWeight: 700, color, lineHeight: 1 }}>{val}</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: 2 }}>{unit}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 2 }}>{label}</p>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Info size={13} /> USDA FDC ID: {food.fdcId} · {food.dataType}
                        </span>
                        <button style={{
                          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
                          padding: '6px 14px', background: 'var(--green-50)', border: '1px solid var(--green-200)',
                          borderRadius: 8, color: 'var(--green-700)', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                        }}>
                          <Bookmark size={14} /> Save to history
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
