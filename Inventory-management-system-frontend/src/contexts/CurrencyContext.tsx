'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CurrencyContextType {
  currency: 'USD' | 'INR'
  setCurrency: (currency: 'USD' | 'INR') => void
  exchangeRate: number
  formatPrice: (price: number) => string
  convertPrice: (price: number) => number
  formatLargeNumber: (price: number, divisor?: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [exchangeRate, setExchangeRate] = useState(83.5) // 1 USD = 83.5 INR (approximate)

  useEffect(() => {
    // Fetch live exchange rate (optional)
    fetchExchangeRate()
    
    // Load saved preference from localStorage
    const savedCurrency = localStorage.getItem('currency') as 'USD' | 'INR'
    if (savedCurrency) {
      setCurrency(savedCurrency)
    }
  }, [])

  const fetchExchangeRate = async () => {
    try {
      // You can use a free API like exchangerate-api.com
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await response.json()
      if (data.rates && data.rates.INR) {
        setExchangeRate(data.rates.INR)
      }
    } catch (error) {
      console.log('Using default exchange rate')
    }
  }

  const convertPrice = (price: number): number => {
    if (currency === 'INR') {
      return price * exchangeRate
    }
    return price
  }

  const formatPrice = (price: number): string => {
    const converted = convertPrice(price)
    if (currency === 'INR') {
      // Indian numbering system with lakhs and crores
      return `₹${converted.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
    }
    return `$${converted.toFixed(2)}`
  }

  // Format large numbers - for INR show full number, for USD show with K/M suffix
  const formatLargeNumber = (price: number, divisor: number = 1): string => {
    const converted = convertPrice(price)
    
    if (currency === 'INR') {
      // For INR, show full number without K/M suffix
      return `₹${converted.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
    } else {
      // For USD, determine K/M suffix based on value
      const value = converted
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`
      } else {
        return `$${value.toFixed(2)}`
      }
    }
  }

  const handleSetCurrency = (newCurrency: 'USD' | 'INR') => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      exchangeRate,
      formatPrice,
      convertPrice,
      formatLargeNumber
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
