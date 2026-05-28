import { useState, useEffect, useRef } from 'react'
import { CATEGORIES } from '../data/words'

const SUGGESTED_EMOJI = ['😀','🐶','🐱','🍕','🎵','⚽','🚗','🌈','❤️','⭐','🎉','🏠','📚','🌸','🦋','🍦','🎨','🏖️','🌙','🔥']

const categoryOptions = CATEGORIES.filter((c) => c.id !== 'all')

export function AddWordModal({ onAdd, onClose }) {
  const [label, setLabel] = useState('')
  const [emoji, setEmoji] = useState('⭐')
  const [category, setCategory] = useState('social')
  const labelRef = useRef(null)

  useEffect(() => {
    labelRef.current?.focus()
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd({ label: trimmed, emoji, category })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Add a new word"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
          <h2 className="text-lg font-bold m-0">Add New Word</h2>
          <button onClick={onClose} className="text-indigo-200 hover:text-white text-2xl leading-none focus:outline-none rounded" aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center gap-1 w-24 h-24 rounded-2xl border-2 border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200">
              <span className="text-4xl leading-none">{emoji}</span>
              <span className="text-sm font-bold leading-tight text-center max-w-[80px] truncate">{label || 'Word'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="word-label">Word or phrase</label>
            <input
              id="word-label"
              ref={labelRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. thirsty"
              maxLength={30}
              className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="word-emoji">Emoji</label>
            <input
              id="word-emoji"
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="Paste an emoji"
              className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-2xl text-center bg-white dark:bg-gray-700 focus:border-indigo-400 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_EMOJI.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${emoji === e ? 'bg-indigo-200 dark:bg-indigo-700 ring-2 ring-indigo-400' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  aria-label={`Use emoji ${e}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="word-category">Category</label>
            <select
              id="word-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-indigo-400 focus:outline-none"
            >
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors focus:outline-none">Cancel</button>
            <button type="submit" disabled={!label.trim()} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none">Add Word</button>
          </div>
        </form>
      </div>
    </div>
  )
}
