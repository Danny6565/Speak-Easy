import { useState } from 'react'
import { SentenceBar } from './components/SentenceBar'
import { CategoryTabs } from './components/CategoryTabs'
import { Board } from './components/Board'
import { AddWordModal } from './components/AddWordModal'
import { VoiceModal } from './components/VoiceModal'
import { useSpeech } from './hooks/useSpeech'
import { useCustomWords } from './hooks/useCustomWords'
import { useFavourites } from './hooks/useFavourites'
import { useBrightness } from './hooks/useBrightness'
import { useSavedSentences } from './hooks/useSavedSentences'
import { SavedSentencesModal } from './components/SavedSentencesModal'
import { WordPrediction } from './components/WordPrediction'
import { PREDICTION_RULES, DEFAULT_PREDICTIONS } from './data/predictions'
import { WORDS } from './data/words'

const FONT_SIZES = ['sm', 'md', 'lg']
const FONT_SIZE_STYLES = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }
const FONT_STORAGE_KEY = 'aac-font-size'

export default function App() {
  const [sentence, setSentence] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem(FONT_STORAGE_KEY) || 'md'
  )
  const { speak, voices, selectedVoiceName, selectVoice } = useSpeech()
  const { customWords, addWord, deleteWord } = useCustomWords()
  const { favourites, toggleFavourite } = useFavourites()
  const { brightness, updateBrightness } = useBrightness()
  const { savedSentences, saveSentence, deleteSentence } = useSavedSentences()

  function handleFontSize(size) {
    setFontSize(size)
    localStorage.setItem(FONT_STORAGE_KEY, size)
  }

  function handleWordTap(word) {
    setSentence((prev) => [...prev, word])
    speak(word.label)
  }

  function handleSpeak() {
    if (sentence.length === 0) return
    speak(sentence.map((w) => w.label).join(' '))
  }

  function handleBackspace() {
    setSentence((prev) => prev.slice(0, -1))
  }

  function handleClear() {
    setSentence([])
  }

  // Compute suggestions from the last word in the sentence
  const lastWord = sentence[sentence.length - 1]
  const suggestedLabels = lastWord
    ? (PREDICTION_RULES[lastWord.label] ?? DEFAULT_PREDICTIONS)
    : []
  const allWords = [...WORDS, ...customWords]
  const suggestions = suggestedLabels
    .map((label) => allWords.find((w) => w.label === label))
    .filter(Boolean)
    .slice(0, 4)

  function handleSave() {
    if (sentence.length === 0) return
    saveSentence(sentence)
  }

  return (
    <div className="flex flex-col h-dvh">
      {/* Header stays full brightness so controls remain usable */}
      <header className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🗣️</span>
          <div>
            <h1 className="text-lg font-bold leading-tight m-0">Speak Easy</h1>
            <p className="text-indigo-200 text-xs m-0">Tap words to speak</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Brightness slider */}
          <div className="flex items-center gap-1.5" aria-label="Screen brightness">
            <span className="text-sm" aria-hidden="true">☀️</span>
            <input
              type="range"
              min={20}
              max={100}
              value={brightness}
              onChange={(e) => updateBrightness(Number(e.target.value))}
              className="w-20 accent-white cursor-pointer"
              aria-label="Adjust brightness"
            />
            <span className="text-sm" aria-hidden="true">🌙</span>
          </div>

          {/* Font size toggle */}
          <div className="flex items-center bg-white/10 rounded-xl overflow-hidden" role="group" aria-label="Font size">
            {FONT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => handleFontSize(size)}
                className={`px-2.5 py-1.5 font-bold transition-colors focus:outline-none ${FONT_SIZE_STYLES[size]} ${
                  fontSize === size ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/20'
                }`}
                aria-label={`${size} text`}
                aria-pressed={fontSize === size}
              >
                A
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSavedModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-semibold rounded-xl transition-colors focus:outline-none"
            aria-label="View saved sentences"
          >
            <span aria-hidden="true">💾</span>
            Saved Sentences
          </button>

          <button
            onClick={() => setShowVoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-semibold rounded-xl transition-colors focus:outline-none"
            aria-label="Select voice"
          >
            <span aria-hidden="true">🎙️</span>
            Change Voice
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-semibold rounded-xl transition-colors focus:outline-none"
            aria-label="Add a new word"
          >
            <span className="text-lg leading-none">＋</span>
            Add Word
          </button>
        </div>
      </header>

      {/* Main content — brightness filter applied here */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ filter: `brightness(${brightness / 100})` }}
      >
        <SentenceBar
          words={sentence}
          onSpeak={handleSpeak}
          onBackspace={handleBackspace}
          onClear={handleClear}
          onSave={handleSave}
        />

        <WordPrediction suggestions={suggestions} onTap={handleWordTap} />

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <Board
          activeCategory={activeCategory}
          onWordTap={handleWordTap}
          customWords={customWords}
          onDeleteCustomWord={deleteWord}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
          fontSize={fontSize}
        />
      </div>

      {showAddModal && (
        <AddWordModal
          onAdd={addWord}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showSavedModal && (
        <SavedSentencesModal
          savedSentences={savedSentences}
          onSpeak={(words) => speak(words.map((w) => w.label).join(' '))}
          onLoad={(words) => setSentence(words)}
          onDelete={deleteSentence}
          onClose={() => setShowSavedModal(false)}
        />
      )}

      {showVoiceModal && (
        <VoiceModal
          voices={voices}
          selectedVoiceName={selectedVoiceName}
          onSelect={selectVoice}
          onClose={() => setShowVoiceModal(false)}
        />
      )}
    </div>
  )
}
