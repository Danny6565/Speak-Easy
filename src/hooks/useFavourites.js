import { useState } from 'react'

const STORAGE_KEY = 'aac-favourites'

export function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) }
    catch { return new Set() }
  })

  function toggleFavourite(id) {
    setFavourites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

  return { favourites, toggleFavourite }
}
