import { useEffect } from 'react'

export function VoiceModal({ voices, selectedVoiceName, onSelect, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handlePreview(voice) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance('Hello, this is how I sound.')
    utterance.voice = voice
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Select a voice"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
          <h2 className="text-lg font-bold m-0">Choose a Voice</h2>
          <button onClick={onClose} className="text-indigo-200 hover:text-white text-2xl leading-none focus:outline-none rounded" aria-label="Close">×</button>
        </div>

        <ul className="overflow-y-auto max-h-96 divide-y divide-gray-100 dark:divide-gray-700" role="listbox" aria-label="Available voices">
          {voices.length === 0 && (
            <li className="p-4 text-gray-400 text-sm text-center">No voices available</li>
          )}
          {voices.map((voice) => {
            const isSelected = voice.name === selectedVoiceName
            return (
              <li
                key={voice.name}
                role="option"
                aria-selected={isSelected}
                className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-indigo-50 dark:bg-indigo-900/40' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => { onSelect(voice.name); onClose() }}
              >
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-semibold truncate ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>
                    {voice.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{voice.lang}{voice.localService ? '' : ' · online'}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isSelected && <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePreview(voice) }}
                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm focus:outline-none"
                    aria-label={`Preview ${voice.name}`}
                  >
                    🔊
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button onClick={onClose} className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors">Done</button>
        </div>
      </div>
    </div>
  )
}
