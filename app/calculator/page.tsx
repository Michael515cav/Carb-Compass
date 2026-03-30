'use client'
import { useState } from 'react'
import { Calculator, Info, RotateCcw, AlertTriangle } from 'lucide-react'

interface CalcResult {
  mealDose: number
  correctionDose: number
  totalDose: number
  netCarbs: number
  bgAboveTarget: number
}

export default function CalculatorPage() {
  // User settings
  const [icr, setIcr] = useState(15)           // insulin-to-carb ratio
  const [cf, setCf] = useState(50)              // correction factor (mg/dL per unit)
  const [targetBgl, setTargetBgl] = useState(120)

  // Current values
  const [currentBgl, setCurrentBgl] = useState('')
  const [totalCarbs, setTotalCarbs] = useState('')
  const [fiberCarbs, setFiberCarbs] = useState('')

  const [result, setResult] = useState<CalcResult | null>(null)
  const [calculated, setCalculated] = useState(false)

  function calculate() {
    const bgl = parseFloat(currentBgl)
    const carbs = parseFloat(totalCarbs) || 0
    const fiber = parseFloat(fiberCarbs) || 0

    if (!bgl || bgl <= 0) return

    const netCarbs = Math.max(carbs - fiber, 0)
    const mealDose = netCarbs / icr
    const bgAboveTarget = Math.max(bgl - targetBgl, 0)
    const correctionDose = bgAboveTarget / cf
    const totalDose = mealDose + correctionDose

    setResult({
      mealDose: Math.round(mealDose * 10) / 10,
      correctionDose: Math.round(correctionDose * 10) / 10,
      totalDose: Math.round(totalDose * 10) / 10,
      netCarbs: Math.round(netCarbs * 10) / 10,
      bgAboveTarget: Math.round(bgAboveTarget * 10) / 10,
    })
    setCalculated(true)
  }

  function reset() {
    setCurrentBgl(''); setTotalCarbs(''); setFiberCarbs('')
    setResult(null); setCalculated(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--border)', borderRadius: 10,
    fontSize: '1.1rem', fontFamily: 'var(--font-mono)',
    background: 'var(--surface)', color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.15s',
    fontWeight: 500,
  }

  const settingInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px',
    border: '1px solid var(--border)', borderRadius: 8,
    fontSize: '1rem', fontFamily: 'var(--font-mono)',
    background: 'var(--surface)', color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.15s',
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--green-900)', marginBottom: '0.5rem' }}>
          BGL / Insulin calculator
        </h1>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          Calculate your recommended insulin dose based on current blood glucose and carbs eaten.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-cols-stack">
          {/* Settings panel */}
          <div className="card" style={{ alignSelf: 'start' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--green-800)', marginBottom: '0.25rem' }}>
              Your settings
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
              Set by your care team. <a href="/dashboard" style={{ color: 'var(--green-600)', textDecoration: 'none' }}>Save to account →</a>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  Insulin-to-carb ratio (ICR)
                  <span title="How many grams of carbs 1 unit of insulin covers" style={{ cursor: 'help' }}><Info size={14} /></span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>1 unit per</span>
                  <input type="number" min={1} max={100} value={icr}
                    onChange={e => setIcr(Number(e.target.value))}
                    style={{ ...settingInputStyle, width: 80 }}
                    onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>g carbs</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  Correction factor (CF)
                  <span title="How many mg/dL 1 unit of insulin drops your BGL" style={{ cursor: 'help' }}><Info size={14} /></span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>1 unit drops</span>
                  <input type="number" min={1} max={200} value={cf}
                    onChange={e => setCf(Number(e.target.value))}
                    style={{ ...settingInputStyle, width: 80 }}
                    onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>mg/dL</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                  Target BGL (mg/dL)
                </label>
                <input type="number" min={60} max={300} value={targetBgl}
                  onChange={e => setTargetBgl(Number(e.target.value))}
                  style={settingInputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
          </div>

          {/* Calculator inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--green-800)', marginBottom: '1.25rem' }}>
                Current values
              </h2>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                  Current blood glucose (mg/dL) *
                </label>
                <input type="number" min={40} max={600} placeholder="e.g. 180"
                  value={currentBgl} onChange={e => setCurrentBgl(e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                  Total carbs in meal (g)
                </label>
                <input type="number" min={0} max={500} placeholder="e.g. 45"
                  value={totalCarbs} onChange={e => setTotalCarbs(e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>
                  Fiber in meal (g) <span style={{ fontWeight: 400 }}>(subtracted as net carbs)</span>
                </label>
                <input type="number" min={0} max={100} placeholder="e.g. 5"
                  value={fiberCarbs} onChange={e => setFiberCarbs(e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={calculate} disabled={!currentBgl}
                  style={{
                    flex: 1, padding: '13px', background: !currentBgl ? 'var(--border)' : 'var(--green-600)',
                    color: '#fff', border: 'none', borderRadius: 10,
                    fontSize: '1rem', fontWeight: 600, cursor: !currentBgl ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.15s',
                  }}>
                  <Calculator size={18} /> Calculate dose
                </button>
                {calculated && (
                  <button onClick={reset} style={{
                    padding: '13px 16px', background: 'var(--surface-2)', color: 'var(--ink-muted)',
                    border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}>
                    <RotateCcw size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="card animate-fade-up" style={{ background: 'var(--green-950)', border: 'none' }}>
                <p style={{ color: 'var(--green-400)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Recommended dose
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: '0.25rem' }}>
                  {result.totalDose}
                  <span style={{ fontSize: '1.5rem', color: 'var(--green-400)', marginLeft: 8 }}>units</span>
                </p>

                <div style={{ borderTop: '1px solid var(--green-800)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { label: 'Meal dose', val: `${result.mealDose}u`, sub: `${result.netCarbs}g net carbs ÷ ICR ${icr}` },
                    { label: 'Correction dose', val: `${result.correctionDose}u`, sub: `${result.bgAboveTarget} mg/dL above target ÷ CF ${cf}` },
                  ].map(({ label, val, sub }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ color: 'var(--green-200)', fontSize: '0.875rem', fontWeight: 500 }}>{label}</p>
                        <p style={{ color: 'var(--green-500)', fontSize: '0.75rem' }}>{sub}</p>
                      </div>
                      <p style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formula explainer */}
        <div style={{ marginTop: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--green-800)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={16} /> How the calculation works
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Meal dose</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: 'var(--surface-2)', padding: '6px 10px', borderRadius: 6 }}>
                Net carbs ÷ ICR
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Correction dose</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: 'var(--surface-2)', padding: '6px 10px', borderRadius: 6 }}>
                (BGL − Target) ÷ CF
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Total dose</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: 'var(--surface-2)', padding: '6px 10px', borderRadius: 6 }}>
                Meal dose + Correction
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: 10, alignItems: 'flex-start', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '1rem' }}>
          <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.6 }}>
            This calculator is a reference tool only. Always verify doses with your diabetes care team. Never make insulin decisions based solely on this calculator without consulting your endocrinologist.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .grid-cols-stack { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
