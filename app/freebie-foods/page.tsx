import { createClient } from '@/lib/supabase/server'
import { Apple, Info } from 'lucide-react'

export const metadata = { title: 'Freebie Foods — Zero-dose snacks for T1D' }

export default async function FreebieFoodsPage() {
  const supabase = await createClient()
  const { data: foods } = await supabase
    .from('freebie_foods')
    .select('*')
    .eq('is_global', true)
    .order('carbs_per_serving', { ascending: true })

  const categories = {
    'Vegetables': foods?.filter(f => ['Celery','Cucumber','Spinach (raw)','Lettuce (romaine)','Broccoli','Cauliflower','Zucchini','Bell pepper (green)','Mushrooms','Asparagus','Radishes','Green beans','Cabbage (raw)'].includes(f.name)) || [],
    'Condiments & Pickles': foods?.filter(f => ['Dill pickles'].includes(f.name)) || [],
    'Drinks': foods?.filter(f => ['Black coffee','Sparkling water'].includes(f.name)) || [],
    'Proteins & Dairy': foods?.filter(f => ['Hard boiled egg','String cheese (mozzarella)'].includes(f.name)) || [],
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--green-900)', marginBottom: '0.5rem' }}>
          Freebie foods
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '1.05rem', marginBottom: '1.5rem', maxWidth: 640 }}>
          Foods under 5g net carbs per serving that most T1D management plans consider "freebies" — meaning you can eat them without dosing insulin. Always confirm with your care team.
        </p>

        {/* What makes a freebie? */}
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 12, padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Info size={20} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontWeight: 600, color: 'var(--green-800)', marginBottom: '0.35rem' }}>What counts as a freebie?</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              The T1D community generally considers foods under 5g of <strong>net carbs</strong> (total carbs minus fiber) per serving to be freebies. These foods have minimal impact on blood glucose for most people, though individual responses vary. Net carbs = Total carbs − Fiber.
            </p>
          </div>
        </div>

        {/* Food categories */}
        {Object.entries(categories).map(([category, items]) => (
          items.length > 0 && (
            <div key={category} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--green-800)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                {category}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                {items.map(food => (
                  <div key={food.id} className="card" style={{ padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Apple size={18} color="var(--green-600)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--green-900)' }}>{food.name}</p>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-700)', background: 'var(--green-100)', padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', marginLeft: 8 }}>
                          {food.carbs_per_serving}g net carbs
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                        {food.serving_size}
                      </p>
                      {food.notes && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--green-600)', marginTop: 4, fontStyle: 'italic' }}>
                          {food.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* CTA to look up more */}
        <div className="card" style={{ background: 'var(--green-900)', border: 'none', textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
            Not seeing a food?
          </p>
          <p style={{ color: 'var(--green-300, #89d8b0)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Use our nutrition lookup to check the carb count of any food in the USDA database.
          </p>
          <a href="/nutrition" style={{ display: 'inline-block', background: 'var(--green-400)', color: 'var(--green-950)', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>
            Search nutrition data →
          </a>
        </div>
      </div>
    </div>
  )
}
