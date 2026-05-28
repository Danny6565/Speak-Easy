export function WordPrediction({ suggestions, onTap }) {
  if (suggestions.length === 0) return null

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900 overflow-x-auto"
      aria-label="Word suggestions"
    >
      <span className="text-xs font-semibold text-indigo-400 dark:text-indigo-500 shrink-0">
        Next:
      </span>
      {suggestions.map((word) => (
        <button
          key={word.id}
          onClick={() => onTap(word)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold whitespace-nowrap hover:bg-indigo-100 dark:hover:bg-indigo-900 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-sm"
          aria-label={`Suggest ${word.label}`}
        >
          <span aria-hidden="true">{word.emoji}</span>
          {word.label}
        </button>
      ))}
    </div>
  )
}
