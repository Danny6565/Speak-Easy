import { useState } from 'react'

const STORAGE_KEY = 'aac-custom-words'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function useCustomWords() {
  const [customWords, setCustomWords] = useState(load)

  function addWord(word) {
    const next = [...customWords, { ...word, id: `custom-${Date.now()}`, custom: true }]
    setCustomWords(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function deleteWord(id) {
    const next = customWords.filter((w) => w.id !== id)
    setCustomWords(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return { customWords, addWord, deleteWord }
}
