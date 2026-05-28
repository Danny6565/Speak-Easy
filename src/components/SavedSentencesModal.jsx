import { useEffect } from 'react'

export function SavedSentencesModal({ savedSentences, onSpeak, onLoad, onDelete, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Saved sentences"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
          <h2 className="text-lg font-bold m-0">Saved Sentences</h2>
          <button onClick={onClose} className="text-indigo-200 hover:text-white text-2xl leading-none focus:outline-none rounded" aria-label="Close">×</button>
        </div>

        <ul className="overflow-y-auto max-h-[60vh] divide-y divide-gray-100 dark:divide-gray-700">
          {savedSentences.length === 0 && (
            <li className="p-6 text-gray-400 text-sm text-center">No saved sentences yet</li>
          )}
          {savedSentences.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap gap-1.5">
                {entry.words.map((word, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold">
                    <span aria-hidden="true">{word.emoji}</span>
                    {word.label}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onSpeak(entry.words)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-200 font-semibold rounded-lg text-sm transition-colors"
                >
                  🔊 Speak
                </button>
                <button
                  onClick={() => { onLoad(entry.words); onClose() }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 font-semibold rounded-lg text-sm transition-colors"
                >
                  📥 Load
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="py-1.5 px-3 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 font-semibold rounded-lg text-sm transition-colors"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button onClick={onClose} className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors">Done</button>
        </div>
      </div>
    </div>
  )
}
