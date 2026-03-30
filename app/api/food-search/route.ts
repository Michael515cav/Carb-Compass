import { NextRequest, NextResponse } from 'next/server'

const USDA_BASE = 'https://api.nal.usda.gov/fdc/v1'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const fdcId = searchParams.get('fdcId')

  if (!process.env.USDA_API_KEY) {
    return NextResponse.json({ error: 'USDA API key not configured' }, { status: 500 })
  }

  try {
    // Single food detail lookup
    if (fdcId) {
      const res = await fetch(
        `${USDA_BASE}/food/${fdcId}?api_key=${process.env.USDA_API_KEY}`
      )
      const data = await res.json()
      return NextResponse.json(formatFood(data))
    }

    // Search
    if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 })

    const res = await fetch(
      `${USDA_BASE}/foods/search?api_key=${process.env.USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=20&dataType=SR%20Legacy,Survey%20(FNDDS),Foundation`
    )
    const data = await res.json()

    const foods = (data.foods || []).map((f: USDAFood) => ({
      fdcId: String(f.fdcId),
      name: f.description,
      brandOwner: f.brandOwner || null,
      dataType: f.dataType,
      carbs:    getNutrient(f.foodNutrients, [205, 1005]),
      protein:  getNutrient(f.foodNutrients, [203, 1003]),
      fat:      getNutrient(f.foodNutrients, [204, 1004]),
      fiber:    getNutrient(f.foodNutrients, [291, 1079]),
      calories: getNutrient(f.foodNutrients, [208, 1008]),
      sugar:    getNutrient(f.foodNutrients, [269, 1063]),
    }))

    return NextResponse.json({ foods, total: data.totalHits })
  } catch (err) {
    console.error('USDA API error:', err)
    return NextResponse.json({ error: 'Failed to fetch nutrition data' }, { status: 500 })
  }
}

interface USDANutrient { nutrientId: number; nutrientNumber?: string; value: number }
interface USDAFood {
  fdcId: number; description: string; brandOwner?: string; dataType: string
  foodNutrients: USDANutrient[]
}

function getNutrient(nutrients: USDANutrient[], ids: number[]): number | null {
  const n = nutrients?.find(n => ids.includes(n.nutrientId) || ids.includes(Number(n.nutrientNumber)))
  return n ? Math.round(n.value * 10) / 10 : null
}

function formatFood(f: USDAFood & { foodNutrients: USDANutrient[] }) {
  return {
    fdcId: String(f.fdcId),
    name: f.description,
    carbs:    getNutrient(f.foodNutrients, [205, 1005]),
    protein:  getNutrient(f.foodNutrients, [203, 1003]),
    fat:      getNutrient(f.foodNutrients, [204, 1004]),
    fiber:    getNutrient(f.foodNutrients, [291, 1079]),
    calories: getNutrient(f.foodNutrients, [208, 1008]),
    sugar:    getNutrient(f.foodNutrients, [269, 1063]),
  }
}
