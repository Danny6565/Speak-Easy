# Speak Easy 🗣️

A free, accessible AAC (Augmentative & Alternative Communication) board that helps non-verbal people communicate using symbols and text-to-speech.

Built for people with autism, cerebral palsy, stroke, or any condition that affects verbal communication. No account required, no cost, works on any device with a browser.

**[Live Demo →](https://speak-easy.vercel.app)**

---

## Features

- **Word Board** — 84 words across 7 colour-coded categories: Social, People, Actions, Feelings, Objects, Places, and Food
- **Text-to-Speech** — tap any word to hear it spoken aloud instantly using the browser's built-in speech engine
- **Sentence Builder** — build up sentences word by word, then speak the whole thing at once
- **Word Prediction** — after each tap, suggests likely next words to speed up communication
- **Favourites** — star any word to pin it to a quick-access row at the top of the board
- **Custom Words** — add your own words with a custom emoji and category; saved across sessions
- **Saved Sentences** — save completed sentences to reuse, load, or speak again later
- **Voice Selector** — choose from all available voices on the device, with a preview button
- **Font Size Toggle** — small, medium, or large tile text for different visual needs
- **Brightness Slider** — dim the screen to suit different lighting conditions or sensitivities
- **Fully Accessible** — large tap targets, ARIA labels, keyboard navigation, works on tablet and mobile

---

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Web Speech API (browser built-in — no API key needed)
- `localStorage` for persistence across sessions

---

## Getting Started

```bash
git clone https://github.com/Danny6565/Speak-Easy.git
cd Speak-Easy
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
  components/
    Board.jsx              # Word tile grid with category sections
    WordButton.jsx         # Individual tappable tile
    CategoryTabs.jsx       # Category filter tabs
    SentenceBar.jsx        # Sentence builder + controls
    WordPrediction.jsx     # Next-word suggestion strip
    AddWordModal.jsx       # Custom word creation form
    VoiceModal.jsx         # Voice selection modal
    SavedSentencesModal.jsx# Saved sentences manager
  data/
    words.js               # All word data and tile colours
    predictions.js         # Word prediction rules
  hooks/
    useSpeech.js           # Web Speech API wrapper
    useCustomWords.js      # Custom word localStorage hook
    useFavourites.js       # Favourites localStorage hook
    useSavedSentences.js   # Saved sentences localStorage hook
    useBrightness.js       # Brightness preference hook
```

---

## Deploying to Vercel

This project is configured for zero-config deployment on Vercel.

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Click Deploy — Vercel detects Vite automatically

---

## Motivation

Commercial AAC apps can cost hundreds of dollars. This project is an attempt to build something genuinely useful, free, and open — something that works straight away in any browser on any device.

---

Built by [Danny O'Connor](https://github.com/Danny6565)
