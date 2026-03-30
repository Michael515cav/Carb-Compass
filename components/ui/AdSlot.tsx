'use client'

interface AdSlotProps {
  slot: string
  style?: React.CSSProperties
  size?: 'banner' | 'rectangle' | 'leaderboard'
}

export function AdSlot({ slot, style, size = 'banner' }: AdSlotProps) {
  const sizes = {
    banner:      { width: '100%', height: 90 },
    rectangle:   { width: '100%', maxWidth: 336, height: 280 },
    leaderboard: { width: '100%', height: 90 },
  }

  const dim = sizes[size]

  // When AdSense is approved, replace this div with your <ins class="adsbygoogle"> tag
  // For now it renders an invisible placeholder so layout is already correct
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
    return (
      <div style={{ textAlign: 'center', ...style }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', ...dim }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Dev placeholder — invisible in production until AdSense is set up
  if (process.env.NODE_ENV === 'development') {
    return (
      <div style={{
        ...dim, ...style,
        background: 'repeating-linear-gradient(45deg, #f0faf4, #f0faf4 10px, #dcf5e7 10px, #dcf5e7 20px)',
        border: '1px dashed var(--green-300, #89d8b0)',
        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--green-600)', fontSize: '0.75rem', fontWeight: 500,
      }}>
        Ad slot: {slot}
      </div>
    )
  }

  return null
}
