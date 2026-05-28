import { TILE_COLORS } from '../data/words'

const FONT_SIZES = {
  sm: { emoji: 'text-2xl', label: 'text-xs', tile: 'min-h-[75px]' },
  md: { emoji: 'text-3xl', label: 'text-sm', tile: 'min-h-[90px]' },
  lg: { emoji: 'text-4xl', label: 'text-base', tile: 'min-h-[110px]' },
}

export function WordButton({ word, onClick, isFavourite, onToggleFavourite, fontSize = 'md' }) {
  const colors = TILE_COLORS[word.category]
  const size = FONT_SIZES[fontSize] || FONT_SIZES.md

  return (
    <div className="relative">
      <button
        onClick={() => onClick(word)}
        className={`
          flex flex-col items-center justify-center gap-1
          ${size.tile} w-full rounded-2xl border-2 p-2
          cursor-pointer select-none transition-transform duration-75
          active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2
          ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
        `}
        aria-label={word.label}
      >
        <span className={`${size.emoji} leading-none`} role="img" aria-hidden="true">
          {word.emoji}
        </span>
        <span className={`${size.label} font-bold leading-tight text-center`}>
          {word.label}
        </span>
      </button>

      {onToggleFavourite && (
        <button
          onClick={() => onToggleFavourite(word.id)}
          className={`absolute top-1 right-1 flex items-center justify-center text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
            isFavourite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
          }`}
          aria-label={isFavourite ? `Remove ${word.label} from favourites` : `Add ${word.label} to favourites`}
        >
          ★
        </button>
      )}
    </div>
  )
}
