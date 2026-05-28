import { useState } from 'react'

const STORAGE_KEY = 'aac-brightness'

export function useBrightness() {
  const [brightness, setBrightness] = useState(
    () => Number(localStorage.getItem(STORAGE_KEY) ?? 100)
  )

  function updateBrightness(value) {
    setBrightness(value)
    localStorage.setItem(STORAGE_KEY, value)
  }

  return { brightness, updateBrightness }
}
