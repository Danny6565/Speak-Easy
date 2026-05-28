import { useState, useEffect } from 'react'

const STORAGE_KEY = 'aac-selected-voice'

export function useSpeech() {
  const [voices, setVoices] = useState([])
  const [selectedVoiceName, setSelectedVoiceName] = useState(
    () => localStorage.getItem(STORAGE_KEY) || ''
  )

  useEffect(() => {
    function loadVoices() {
      const all = window.speechSynthesis.getVoices()
      const english = all.filter((v) => v.lang.startsWith('en'))
      setVoices(english.length > 0 ? english : all)
    }
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  function selectVoice(name) {
    setSelectedVoiceName(name)
    localStorage.setItem(STORAGE_KEY, name)
  }

  function speak(text) {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    if (selectedVoiceName) {
      const match = window.speechSynthesis.getVoices().find((v) => v.name === selectedVoiceName)
      if (match) utterance.voice = match
    }
    window.speechSynthesis.speak(utterance)
  }

  function cancel() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
  }

  return { speak, cancel, voices, selectedVoiceName, selectVoice }
}
