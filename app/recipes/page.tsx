import { Clock, Users, BookOpen, Bookmark } from 'lucide-react'

export const metadata = { title: 'High-Protein Low-Carb Recipes for T1D' }

const RECIPES = [
  {
    id: '1',
    title: 'Sheet pan lemon herb chicken thighs',
    description: 'Juicy bone-in thighs roasted with zucchini and cherry tomatoes. A complete meal with barely any carbs.',
    prepTime: 10, cookTime: 35, servings: 4,
    carbs: 6, protein: 38, fat: 22, calories: 380,
    tags: ['chicken', 'sheet pan', 'gluten-free'],
    ingredients: [
      '4 bone-in chicken thighs', '2 zucchini, sliced', '1 cup cherry tomatoes',
      '3 tbsp olive oil', '1 lemon, juiced + zested', '4 garlic cloves, minced',
      '1 tsp dried oregano', '1 tsp dried thyme', 'Salt and pepper',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large baking sheet with parchment.',
      'Whisk olive oil, lemon juice, zest, garlic, oregano, and thyme.',
      'Toss chicken thighs in marinade. Arrange on sheet. Season generously.',
      'Add zucchini and tomatoes around chicken. Drizzle with remaining marinade.',
      'Roast 32–38 min until chicken skin is golden and internal temp reaches 165°F.',
    ],
  },
  {
    id: '2',
    title: 'Egg and turkey lettuce wraps',
    description: 'Quick lunch that comes together in 10 minutes. Crunchy, satisfying, and under 8g carbs.',
    prepTime: 5, cookTime: 8, servings: 2,
    carbs: 5, protein: 32, fat: 14, calories: 280,
    tags: ['quick', 'lunch', 'egg', 'turkey'],
    ingredients: [
      '4 large eggs, scrambled', '6 oz ground turkey, cooked and seasoned',
      '6 romaine lettuce leaves', '1/4 cup shredded cheddar',
      '2 tbsp sour cream', 'Hot sauce to taste', 'Salt and pepper',
    ],
    instructions: [
      'Cook ground turkey in skillet over medium-high, breaking up, until browned. Season with salt, pepper, garlic powder.',
      'Scramble eggs in same pan, combine with turkey.',
      'Spoon into lettuce leaves. Top with cheese, sour cream, hot sauce.',
    ],
  },
  {
    id: '3',
    title: 'Creamy cauliflower and sausage soup',
    description: 'A hearty, warming soup that tastes like it\'s loaded with carbs — but isn\'t. Meal-prep friendly.',
    prepTime: 15, cookTime: 30, servings: 6,
    carbs: 9, protein: 24, fat: 28, calories: 390,
    tags: ['soup', 'meal prep', 'sausage', 'cauliflower'],
    ingredients: [
      '1 lb Italian sausage (no sugar added)', '1 head cauliflower, roughly chopped',
      '4 cups chicken broth', '1 cup heavy cream',
      '1 medium onion, diced', '4 garlic cloves', '1 cup shredded cheddar',
      '2 tbsp butter', '1 tsp smoked paprika', 'Salt and pepper',
    ],
    instructions: [
      'Brown sausage in large pot. Remove and set aside, leaving drippings.',
      'Sauté onion in same pot 5 min. Add garlic and paprika, cook 1 min.',
      'Add cauliflower and broth. Bring to boil, simmer 15 min until tender.',
      'Use immersion blender to partially blend — leave some chunks.',
      'Stir in cream, cheese, and sausage. Simmer 5 min. Adjust seasoning.',
    ],
  },
  {
    id: '4',
    title: 'Salmon with cucumber dill sauce',
    description: 'Omega-3 packed salmon with a cool, creamy sauce made from freebie-zone cucumbers.',
    prepTime: 10, cookTime: 12, servings: 2,
    carbs: 4, protein: 42, fat: 26, calories: 420,
    tags: ['salmon', 'seafood', 'gluten-free', 'quick'],
    ingredients: [
      '2 salmon fillets (6 oz each)', '1 tbsp olive oil', 'Salt, pepper, dill',
      '1/2 cucumber, grated and squeezed dry', '1/2 cup Greek yogurt (full fat)',
      '1 tbsp fresh dill (or 1 tsp dried)', '1 garlic clove, minced', 'Lemon juice',
    ],
    instructions: [
      'Mix cucumber, yogurt, dill, garlic, and lemon juice. Season and refrigerate.',
      'Pat salmon dry. Season with salt, pepper, and dill.',
      'Heat oil in skillet over medium-high. Cook salmon 4–5 min per side skin-down first.',
      'Serve immediately topped with cucumber dill sauce.',
    ],
  },
  {
    id: '5',
    title: 'Taco-stuffed bell peppers',
    description: 'All the flavors of a taco, without the tortilla. Each pepper is a self-contained meal under 12g carbs.',
    prepTime: 15, cookTime: 30, servings: 4,
    carbs: 11, protein: 34, fat: 18, calories: 350,
    tags: ['beef', 'peppers', 'gluten-free', 'family-friendly'],
    ingredients: [
      '4 large bell peppers, halved and seeded', '1 lb ground beef (80/20)',
      '1 cup shredded Mexican cheese', '1/2 cup salsa (no sugar added)',
      '1 tsp cumin', '1 tsp chili powder', '1/2 tsp garlic powder',
      'Salt and pepper', 'Sour cream and cilantro to serve',
    ],
    instructions: [
      'Preheat oven to 375°F. Place pepper halves cut-side up in a baking dish.',
      'Brown beef, drain fat. Season with cumin, chili powder, garlic powder, salt.',
      'Stir in salsa. Spoon filling into peppers.',
      'Top with cheese. Bake 25–28 min until peppers are tender and cheese is bubbly.',
      'Serve with sour cream and cilantro.',
    ],
  },
  {
    id: '6',
    title: 'Zucchini noodles with pesto and shrimp',
    description: 'Fresh, light, and packed with protein. Spiralized zucchini takes on pesto beautifully and cooks in minutes.',
    prepTime: 10, cookTime: 10, servings: 2,
    carbs: 7, protein: 28, fat: 24, calories: 360,
    tags: ['shrimp', 'seafood', 'zoodles', 'quick', 'gluten-free'],
    ingredients: [
      '12 oz large shrimp, peeled', '3 medium zucchini, spiralized',
      '3 tbsp basil pesto (store-bought or homemade)', '2 tbsp olive oil',
      '3 garlic cloves, sliced', 'Red pepper flakes', 'Salt and pepper',
      'Parmesan to serve',
    ],
    instructions: [
      'Sprinkle spiralized zucchini with salt. Rest 5 min, then squeeze dry in a towel.',
      'Heat oil in large skillet. Sauté garlic 1 min.',
      'Add shrimp, season, cook 2 min per side until pink.',
      'Add zucchini noodles, toss 1–2 min — don\'t overcook.',
      'Remove from heat. Toss with pesto. Serve with Parmesan.',
    ],
  },
]

function MacroBadge({ label, val, unit, color }: { label: string; val: number; unit: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '1rem', fontWeight: 700, color, lineHeight: 1 }}>{val}{unit}</p>
      <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: 2 }}>{label}</p>
    </div>
  )
}

export default function RecipesPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--green-900)', marginBottom: '0.5rem' }}>
          High-protein, low-carb recipes
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: 640 }}>
          Meals designed to keep blood glucose stable — rich in protein, low in fast-acting carbs, and actually delicious. Full macros on every recipe.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {RECIPES.map(recipe => (
            <div key={recipe.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              {/* Color header */}
              <div style={{ background: 'linear-gradient(135deg, var(--green-800), var(--green-950))', padding: '1.5rem', position: 'relative' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {recipe.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.12)', color: 'var(--green-200)', padding: '2px 8px', borderRadius: 999 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff', lineHeight: 1.3 }}>
                  {recipe.title}
                </h2>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {recipe.description}
                </p>

                {/* Time + servings */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--ink-muted)', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={13} /> {recipe.prepTime + recipe.cookTime} min
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Users size={13} /> Serves {recipe.servings}
                  </span>
                </div>

                {/* Macros */}
                <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <MacroBadge label="Net carbs" val={recipe.carbs} unit="g" color="var(--green-700)" />
                  <MacroBadge label="Protein" val={recipe.protein} unit="g" color="#3b82f6" />
                  <MacroBadge label="Fat" val={recipe.fat} unit="g" color="#ef4444" />
                  <MacroBadge label="Calories" val={recipe.calories} unit="" color="var(--ink-muted)" />
                </div>

                {/* Ingredients */}
                <details style={{ marginBottom: '0.75rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--green-800)', fontSize: '0.9rem', marginBottom: '0.5rem', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BookOpen size={15} /> Ingredients ({recipe.ingredients.length})
                  </summary>
                  <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 4 }}>{ing}</li>
                    ))}
                  </ul>
                </details>

                <details style={{ marginBottom: '1rem' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--green-800)', fontSize: '0.9rem', marginBottom: '0.5rem', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={15} /> Instructions ({recipe.instructions.length} steps)
                  </summary>
                  <ol style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                    {recipe.instructions.map((step, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 6, lineHeight: 1.6 }}>{step}</li>
                    ))}
                  </ol>
                </details>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', background: 'var(--green-50)',
                    border: '1px solid var(--green-200)', borderRadius: 8,
                    color: 'var(--green-700)', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                  }}>
                    <Bookmark size={14} /> Save recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
