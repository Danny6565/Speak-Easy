// Maps a word label to likely next words
export const PREDICTION_RULES = {
  // People
  'I':       ['want', 'need', 'like', 'go'],
  'you':     ['want', 'need', 'like', 'go'],
  'Mum':     ['help', 'please', 'I', 'want'],
  'Dad':     ['help', 'please', 'I', 'want'],

  // Actions
  'want':    ['water', 'food', 'help', 'more'],
  'need':    ['water', 'medicine', 'help', 'doctor'],
  'like':    ['food', 'play', 'school', 'home'],
  'go':      ['home', 'school', 'park', 'hospital'],
  'eat':     ['food', 'pizza', 'apple', 'bread'],
  'drink':   ['water', 'milk', 'juice', 'cup'],
  'play':    ['outside', 'home', 'school', 'more'],
  'sleep':   ['bed', 'blanket', 'home', 'bedroom'],
  'read':    ['book', 'please', 'more', 'home'],
  'sit':     ['chair', 'please', 'here', 'down'],

  // Feelings
  'happy':   ['thank you', 'more', 'play', 'good'],
  'sad':     ['help', 'Mum', 'Dad', 'sorry'],
  'tired':   ['sleep', 'bed', 'home', 'bedroom'],
  'hungry':  ['eat', 'food', 'please', 'more'],
  'thirsty': ['drink', 'water', 'juice', 'please'],
  'scared':  ['help', 'Mum', 'Dad', 'stop'],
  'pain':    ['help', 'medicine', 'doctor', 'stop'],
  'angry':   ['stop', 'help', 'sorry', 'no'],
  'bored':   ['play', 'book', 'outside', 'toy'],
  'cold':    ['blanket', 'home', 'bed', 'help'],
  'excited': ['play', 'more', 'go', 'good'],
  'OK':      ['thank you', 'good', 'more', 'please'],

  // Social
  'yes':      ['please', 'more', 'thank you', 'good'],
  'no':       ['stop', 'please', 'sorry', 'help'],
  'hello':    ['I', 'you', 'Mum', 'Dad'],
  'goodbye':  ['thank you', 'Mum', 'Dad', 'friend'],
  'please':   ['thank you', 'more', 'help', 'water'],
  'thank you':['more', 'please', 'good', 'yes'],
  'more':     ['please', 'food', 'water', 'play'],
  'stop':     ['please', 'no', 'help', 'sorry'],
  'help':     ['please', 'Mum', 'Dad', 'doctor'],
  'sorry':    ['please', 'more', 'help', 'yes'],
  'good':     ['more', 'please', 'thank you', 'yes'],

  // Objects
  'water':    ['please', 'more', 'drink', 'thank you'],
  'food':     ['please', 'more', 'eat', 'thank you'],
  'medicine': ['please', 'need', 'doctor', 'help'],

  // Places
  'home':     ['please', 'go', 'want', 'I'],
  'school':   ['please', 'go', 'want', 'I'],
  'hospital': ['please', 'go', 'help', 'doctor'],
  'park':     ['please', 'go', 'play', 'outside'],
  'outside':  ['please', 'go', 'play', 'more'],

  // Food
  'pizza':    ['please', 'more', 'eat', 'thank you'],
  'apple':    ['please', 'more', 'eat', 'thank you'],
  'banana':   ['please', 'more', 'eat', 'thank you'],
  'bread':    ['please', 'more', 'eat', 'thank you'],
  'milk':     ['please', 'more', 'drink', 'thank you'],
  'juice':    ['please', 'more', 'drink', 'thank you'],
  'cake':     ['please', 'more', 'eat', 'thank you'],
}

// Shown when no specific rule matches
export const DEFAULT_PREDICTIONS = ['please', 'more', 'help', 'thank you']
