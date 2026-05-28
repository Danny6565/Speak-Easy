export function SentenceBar({ words, onSpeak, onBackspace, onClear, onSave }) {
  const isEmpty = words.length === 0

  return (
    <div className="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-1 flex flex-col gap-2">
        <div
          className="flex-1 min-h-[60px] flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600"
          aria-live="polite"
          aria-label="Current sentence"
        >
          {isEmpty ? (
            <span className="text-gray-400 dark:text-gray-500 text-base italic">
              Tap a word to begin...
            </span>
          ) : (
            words.map((word, i) => (
              <span
                key={`${word.id}-${i}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 rounded-full text-base font-semibold"
              >
                <span aria-hidden="true">{word.emoji}</span>
                {word.label}
              </span>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onBackspace}
            disabled={isEmpty}
            className="flex-1 py-2 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 dark:bg-amber-900/40 dark:hover:bg-amber-800 dark:text-amber-200 text-amber-900 font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Remove last word"
          >
            ⌫ Backspace
          </button>
          <button
            onClick={onSave}
            disabled={isEmpty}
            className="flex-1 py-2 px-4 bg-green-100 hover:bg-green-200 active:bg-green-300 dark:bg-green-900/40 dark:hover:bg-green-800 dark:text-green-200 text-green-800 font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            aria-label="Save sentence"
          >
            💾 Save
          </button>
          <button
            onClick={onClear}
            disabled={isEmpty}
            className="flex-1 py-2 px-4 bg-red-100 hover:bg-red-200 active:bg-red-300 dark:bg-red-900/40 dark:hover:bg-red-800 dark:text-red-200 text-red-800 font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Clear all words"
          >
            ✕ Clear
          </button>
        </div>
      </div>

      <button
        onClick={onSpeak}
        disabled={isEmpty}
        className="w-44 flex flex-col items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label="Speak sentence"
      >
        <span className="text-4xl" aria-hidden="true">🔊</span>
        <span className="text-base">Speak</span>
      </button>
    </div>
  )
}
