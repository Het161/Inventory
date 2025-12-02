'use client'

import { useCurrency } from '../contexts/CurrencyContext'
import { DollarSign, IndianRupee } from 'lucide-react'

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => setCurrency('USD')}
        className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
          currency === 'USD'
            ? 'bg-white text-indigo-600 shadow-sm font-semibold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <DollarSign className="w-4 h-4" />
        USD
      </button>
      <button
        onClick={() => setCurrency('INR')}
        className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
          currency === 'INR'
            ? 'bg-white text-indigo-600 shadow-sm font-semibold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <IndianRupee className="w-4 h-4" />
        INR
      </button>
    </div>
  )
}
