import { CATEGORIES } from '../data/words'

export function CategoryTabs({ active, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      role="tablist"
      aria-label="Word categories"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold transition-all duration-100
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
            ${active === cat.id
              ? `${cat.color} shadow-sm scale-105`
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
