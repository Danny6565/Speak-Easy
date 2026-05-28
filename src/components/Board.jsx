import { WORDS, CATEGORIES } from '../data/words'
import { WordButton } from './WordButton'

export function Board({ activeCategory, onWordTap, customWords, onDeleteCustomWord, favourites, onToggleFavourite, fontSize }) {
  const allWords = [...WORDS, ...customWords]

  const favouriteWords = allWords.filter((w) => favourites.has(w.id))

  const categoriesToShow = activeCategory === 'all'
    ? CATEGORIES.filter((c) => c.id !== 'all')
    : CATEGORIES.filter((c) => c.id === activeCategory)

  function renderTile(word) {
    return (
      <div key={word.id} className="relative">
        <WordButton
          word={word}
          onClick={onWordTap}
          isFavourite={favourites.has(word.id)}
          onToggleFavourite={onToggleFavourite}
          fontSize={fontSize}
        />
        {word.custom && (
          <button
            onClick={() => onDeleteCustomWord(word.id)}
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 z-10"
            aria-label={`Delete ${word.label}`}
          >
            ×
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-white dark:bg-gray-900"
      role="region"
      aria-label="Word board"
    >
      {favouriteWords.length > 0 && (
        <section aria-label="Favourites">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 w-fit rounded-full px-3 py-1">
            ★ Favourites
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {favouriteWords.map(renderTile)}
          </div>
        </section>
      )}

      {categoriesToShow.map((cat) => {
        const words = allWords.filter((w) => w.category === cat.id)
        if (words.length === 0) return null
        return (
          <section key={cat.id} aria-label={cat.label}>
            <h2 className={`text-xs font-bold uppercase tracking-widest mb-3 w-fit rounded-full px-3 py-1 ${cat.color}`}>
              {cat.label}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {words.map(renderTile)}
            </div>
          </section>
        )
      })}
    </div>
  )
}
