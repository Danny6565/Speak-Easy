import { useState } from 'react'

const STORAGE_KEY = 'aac-saved-sentences'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

export function useSavedSentences() {
  const [savedSentences, setSavedSentences] = useState(load)

  function saveSentence(words) {
    const entry = { id: Date.now(), words, savedAt: new Date().toISOString() }
    const next = [entry, ...savedSentences]
    setSavedSentences(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function deleteSentence(id) {
    const next = savedSentences.filter((s) => s.id !== id)
    setSavedSentences(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return { savedSentences, saveSentence, deleteSentence }
}
