import { Info } from 'lucide-react'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata = {
  title: 'Freebie Foods — Zero-dose T1D snacks under 5g net carbs',
  description: 'A comprehensive list of freebie foods for Type 1 Diabetes — snacks under 5g net carbs per serving.',
}

const CATEGORIES = [
  {
    name: 'Vegetables', emoji: '🥦',
    items: [
      { name: 'Celery', carbs: 1.2, serving: '1 medium stalk', note: 'Great with peanut butter or cream cheese' },
      { name: 'Cucumber', carbs: 1.9, serving: '1/2 cup sliced', note: 'Hydrating and crunchy' },
      { name: 'Spinach (raw)', carbs: 0.4, serving: '1 cup', note: 'Packed with iron' },
      { name: 'Romaine lettuce', carbs: 0.7, serving: '1 cup shredded', note: 'Base for low-carb wraps' },
      { name: 'Broccoli', carbs: 3.6, serving: '1/2 cup', note: 'Under 5g — a common freebie' },
      { name: 'Cauliflower', carbs: 2.6, serving: '1/2 cup', note: 'Great rice substitute' },
      { name: 'Zucchini', carbs: 1.7, serving: '1/2 cup sliced', note: 'Versatile — raw or cooked' },
      { name: 'Bell pepper (green)', carbs: 2.3, serving: '1/2 medium', note: 'Green is lowest carb of the peppers' },
      { name: 'Mushrooms', carbs: 1.1, serving: '1/2 cup', note: 'Earthy and filling' },
      { name: 'Asparagus', carbs: 1.3, serving: '4 spears', note: 'High in folate' },
      { name: 'Radishes', carbs: 0.9, serving: '4 medium', note: 'Peppery crunch' },
      { name: 'Green beans', carbs: 3.6, serving: '1/2 cup', note: 'Borderline but widely considered freebie' },
      { name: 'Cabbage (raw)', carbs: 2.5, serving: '1/2 cup shredded', note: 'Great for slaws' },
      { name: 'Kale (raw)', carbs: 0.9, serving: '1 cup', note: 'Nutrient dense' },
      { name: 'Avocado', carbs: 1.8, serving: '1/4 medium', note: 'High fat, very filling' },
      { name: 'Cherry tomatoes', carbs: 3.5, serving: '5 tomatoes', note: 'Sweet and low carb' },
      { name: 'Snap peas', carbs: 3.4, serving: '1/2 cup', note: 'Satisfying crunch' },
      { name: 'Brussels sprouts', carbs: 4.0, serving: '3 sprouts', note: 'Roast with olive oil and salt' },
    ],
  },
  {
    name: 'Proteins & Dairy', emoji: '🥚',
    items: [
      { name: 'Hard boiled egg', carbs: 0.6, serving: '1 large', note: 'Perfect portable snack' },
      { name: 'String cheese', carbs: 0.7, serving: '1 stick (28g)', note: 'Convenient and kid-friendly' },
      { name: 'Babybel cheese', carbs: 0, serving: '1 wheel (21g)', note: 'Zero carbs, great for lunchboxes' },
      { name: 'Cheddar cheese', carbs: 0.4, serving: '1 oz', note: 'Slice or cube it' },
      { name: 'Cream cheese', carbs: 1.0, serving: '2 tbsp', note: 'On celery or cucumber' },
      { name: 'Pepperoni slices', carbs: 0.5, serving: '5 slices', note: 'Most brands near zero carbs' },
      { name: 'Salami', carbs: 0.6, serving: '3 slices', note: 'Pair with cheese' },
      { name: 'Beef jerky (no sugar)', carbs: 2.0, serving: '1 oz', note: 'Always check label for added sugar' },
      { name: 'Deli turkey (plain)', carbs: 0.3, serving: '2 slices', note: 'Roll up with cheese' },
      { name: 'Deli ham (plain)', carbs: 0.5, serving: '2 slices', note: 'Check for honey-glazed varieties' },
      { name: 'Tuna (canned, plain)', carbs: 0, serving: '2 oz', note: 'Zero carbs, high protein' },
      { name: 'Pork rinds (plain)', carbs: 0, serving: '1 oz', note: 'Zero carbs — great chip substitute' },
      { name: 'Cottage cheese', carbs: 3.5, serving: '1/4 cup', note: 'High protein, low carb' },
      { name: 'Deviled eggs', carbs: 0.3, serving: '2 halves', note: 'Skip the sweet relish' },
    ],
  },
  {
    name: 'Nuts & Seeds', emoji: '🥜',
    items: [
      { name: 'Macadamia nuts', carbs: 1.5, serving: '6 nuts (28g)', note: 'Highest fat, lowest carb nut' },
      { name: 'Pecans', carbs: 1.2, serving: '10 halves (28g)', note: 'Rich and buttery' },
      { name: 'Brazil nuts', carbs: 1.4, serving: '3 nuts (28g)', note: 'High in selenium' },
      { name: 'Walnuts', carbs: 2.0, serving: '7 halves (28g)', note: 'Great omega-3 source' },
      { name: 'Almonds', carbs: 2.7, serving: '10 almonds (14g)', note: 'Watch portion size' },
      { name: 'Sunflower seeds', carbs: 1.8, serving: '2 tbsp', note: 'Easy snack' },
      { name: 'Pumpkin seeds', carbs: 1.3, serving: '2 tbsp', note: 'High in magnesium' },
      { name: 'Almond butter', carbs: 1.5, serving: '1 tbsp', note: 'No sugar added variety only' },
      { name: 'Peanut butter (natural)', carbs: 2.0, serving: '1 tbsp', note: 'Ingredients: peanuts + salt only' },
    ],
  },
  {
    name: 'Packaged Snacks', emoji: '🧀',
    items: [
      { name: 'Cheese crisps (baked)', carbs: 0.5, serving: '10 crisps (28g)', note: 'Whisps, Cello — great chip alternative' },
      { name: 'Moon cheese snacks', carbs: 1.0, serving: '1 pouch', note: 'Crunchy dried cheese — kid approved' },
      { name: 'Chomps beef stick', carbs: 0, serving: '1 stick', note: 'No sugar added' },
      { name: 'Olives', carbs: 0.5, serving: '5 large', note: 'Any variety — great salty snack' },
      { name: 'Dill pickles', carbs: 0.8, serving: '1 spear', note: 'Check label for added sugar' },
      { name: 'Seaweed snacks', carbs: 1.0, serving: '1 package', note: 'Roasted nori — very low carb' },
      { name: 'Guacamole (plain)', carbs: 2.0, serving: '2 tbsp', note: 'Pair with veggie dippers' },
      { name: 'Pepperoncini peppers', carbs: 0.8, serving: '3 peppers', note: 'Great on salads or as-is' },
      { name: 'Epic meat bars', carbs: 2.0, serving: '1 bar', note: 'Varies by flavor — check label' },
    ],
  },
  {
    name: 'Drinks', emoji: '☕',
    items: [
      { name: 'Water', carbs: 0, serving: 'Any amount', note: 'Always the best choice' },
      { name: 'Sparkling water (plain)', carbs: 0, serving: '12 oz', note: 'LaCroix, Bubly — unflavored only' },
      { name: 'Black coffee', carbs: 0, serving: '8 oz', note: 'Zero carbs — add cream not sugar' },
      { name: 'Coffee with heavy cream', carbs: 0.8, serving: '8 oz + 2 tbsp cream', note: 'Skip the milk and syrups' },
      { name: 'Unsweetened tea', carbs: 0, serving: '8 oz', note: 'Green, black, herbal — all fine' },
      { name: 'Bone broth', carbs: 1.0, serving: '8 oz', note: 'Warming and filling' },
      { name: 'Diet soda', carbs: 0, serving: '12 oz', note: 'Zero carbs — individual BG response varies' },
    ],
  },
  {
    name: 'Condiments & Extras', emoji: '🫙',
    items: [
      { name: 'Mustard', carbs: 0.3, serving: '1 tsp', note: 'Yellow or Dijon — use freely' },
      { name: 'Hot sauce', carbs: 0.1, serving: '1 tsp', note: 'Tabasco, Frank\'s — check label' },
      { name: 'Mayo (plain)', carbs: 0, serving: '1 tbsp', note: 'Zero carbs' },
      { name: 'Sour cream', carbs: 0.5, serving: '2 tbsp', note: 'Full fat variety' },
      { name: 'Ranch dressing (full fat)', carbs: 1.0, serving: '2 tbsp', note: 'Hidden Valley original' },
      { name: 'Salsa (no sugar added)', carbs: 2.0, serving: '2 tbsp', note: 'Some brands add sugar — check label' },
      { name: 'Butter', carbs: 0, serving: '1 tbsp', note: 'Zero carbs' },
      { name: 'Olive oil', carbs: 0, serving: '1 tbsp', note: 'Zero carbs' },
    ],
  },
]

export default function FreebieFoodsPage() {
  const totalItems = CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="animate-fade-up" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', color: 'var(--green-900)', marginBottom: '0.5rem' }}>
          Freebie foods
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', marginBottom: '1rem', maxWidth: 640 }}>
          {totalItems} foods under 5g net carbs per serving. Snack without dosing — always confirm with your care team.
        </p>
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 12, padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Info size={18} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: 'var(--green-800)' }}>Net carbs = Total carbs minus fiber.</strong> Foods under 5g net carbs per serving are generally considered freebies, but individual responses vary.
          </p>
        </div>
      </div>

      <AdSlot slot="freebie-top" style={{ marginBottom: '2rem' }} />

      {CATEGORIES.map((category, catIndex) => (
        <div key={category.name}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--green-800)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--green-100)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{category.emoji}</span> {category.name}
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>({category.items.length})</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '0.6rem' }}>
              {category.items.map(food => (
                <div key={food.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--green-900)', marginBottom: 2 }}>{food.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: food.note ? 2 : 0 }}>{food.serving}</p>
                    {food.note && <p style={{ fontSize: '0.72rem', color: 'var(--green-600)', fontStyle: 'italic' }}>{food.note}</p>}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: food.carbs <= 1 ? 'var(--green-700)' : food.carbs <= 3 ? '#0284c7' : '#d97706', background: food.carbs <= 1 ? 'var(--green-50)' : food.carbs <= 3 ? '#e0f2fe' : '#fef3c7', padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {food.carbs}g
                  </span>
                </div>
              ))}
            </div>
          </div>
          {catIndex === 1 && <AdSlot slot="freebie-mid" style={{ marginBottom: '2rem' }} />}
        </div>
      ))}

      <AdSlot slot="freebie-bottom" style={{ marginBottom: '2rem' }} />

      <div style={{ background: 'var(--green-900)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Not seeing a food?</p>
        <p style={{ color: 'var(--green-300, #89d8b0)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>Search over 1 million foods in the USDA database.</p>
        <a href="/nutrition" style={{ display: 'inline-block', background: 'var(--green-400)', color: 'var(--green-950)', padding: '11px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
          Search nutrition data →
        </a>
      </div>
    </div>
  )
}
