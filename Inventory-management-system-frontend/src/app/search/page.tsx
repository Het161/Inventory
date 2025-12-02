'use client'

import MainLayout from '../../components/layout/MainLayout'
import { motion } from 'framer-motion'
import { Search, Package, Users, FileText, Warehouse, TrendingUp, Filter } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Category = 'All' | 'Products' | 'Customers' | 'Memos' | 'Chalans'

interface SearchResult {
  id: string
  type: Category
  name: string
  category: string
  details: string
  icon: any
  link: string
}

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // Sample search data
  const allResults: SearchResult[] = [
    // Products
    { id: 'P1', type: 'Products', name: 'Laptop Pro', category: 'Electronics', details: '₹79,999 • In Stock: 150', icon: Package, link: '/products' },
    { id: 'P2', type: 'Products', name: 'Wireless Mouse', category: 'Electronics', details: '₹1,299 • In Stock: 75', icon: Package, link: '/products' },
    { id: 'P3', type: 'Products', name: 'USB Cable', category: 'Electronics', details: '₹299 • In Stock: 200', icon: Package, link: '/products' },
    { id: 'P4', type: 'Products', name: 'Monitor 24"', category: 'Electronics', details: '₹12,999 • In Stock: 45', icon: Package, link: '/products' },
    
    // Customers
    { id: 'C1', type: 'Customers', name: 'John Doe', category: 'Premium Customer', details: '12 orders • ₹56,000 total', icon: Users, link: '/customers' },
    { id: 'C2', type: 'Customers', name: 'Jane Smith', category: 'Regular Customer', details: '8 orders • ₹32,000 total', icon: Users, link: '/customers' },
    { id: 'C3', type: 'Customers', name: 'Bob Johnson', category: 'VIP Customer', details: '25 orders • ₹125,000 total', icon: Users, link: '/customers' },
    
    // Memos
    { id: 'M1', type: 'Memos', name: 'Sales Memo #M01234', category: 'Paid', details: '₹26,000 • Nov 26, 2025 • John Doe', icon: FileText, link: '/sales' },
    { id: 'M2', type: 'Memos', name: 'Sales Memo #M01233', category: 'Pending', details: '₹15,000 • Nov 25, 2025 • Jane Smith', icon: FileText, link: '/sales' },
    { id: 'M3', type: 'Memos', name: 'Sales Memo #M01232', category: 'Paid', details: '₹32,000 • Nov 24, 2025 • Bob Johnson', icon: FileText, link: '/sales' },
    
    // Chalans
    { id: 'CH1', type: 'Chalans', name: 'Delivery Chalan #D001542', category: 'Delivered', details: '50 items • Central Warehouse', icon: TrendingUp, link: '/stock' },
    { id: 'CH2', type: 'Chalans', name: 'Delivery Chalan #D001541', category: 'In Transit', details: '30 items • North Regional', icon: TrendingUp, link: '/stock' },
    { id: 'CH3', type: 'Chalans', name: 'Delivery Chalan #D001540', category: 'Delivered', details: '75 items • South Distribution', icon: TrendingUp, link: '/stock' },
  ]

  // Filter results based on category and search query
  const filteredResults = allResults.filter(result => {
    const matchesCategory = activeCategory === 'All' || result.type === activeCategory
    const matchesSearch = searchQuery === '' || 
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.details.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories: { name: Category; count: number }[] = [
    { name: 'Products', count: allResults.filter(r => r.type === 'Products').length },
    { name: 'Customers', count: allResults.filter(r => r.type === 'Customers').length },
    { name: 'Memos', count: allResults.filter(r => r.type === 'Memos').length },
    { name: 'Chalans', count: allResults.filter(r => r.type === 'Chalans').length },
  ]

  const handleResultClick = (result: SearchResult) => {
    router.push(result.link)
  }

  return (
    <MainLayout title="Global Search" subtitle="Search across all modules - customers, products, memos, chalans, and more">
      <div className="max-w-5xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 border border-gray-200 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for customers, products, memos, chalans, staff, warehouses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {/* Search Stats */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-2 text-sm text-gray-600"
            >
              <Filter className="w-4 h-4" />
              <span>Found {filteredResults.length} results for "{searchQuery}"</span>
            </motion.div>
          )}
        </motion.div>

        {/* Category Filter Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat.name)}
              className={`p-4 rounded-xl border-2 transition-all ${
                activeCategory === cat.name
                  ? 'bg-indigo-50 border-indigo-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className={`font-semibold ${
                  activeCategory === cat.name ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {cat.name}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  activeCategory === cat.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {cat.count}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* "All" Filter Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveCategory('All')}
          className={`mb-6 px-6 py-2 rounded-lg font-semibold transition-all ${
            activeCategory === 'All'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Show All ({allResults.length})
        </motion.button>

        {/* Search Results */}
        <div className="space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01, x: 5 }}
                onClick={() => handleResultClick(result)}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  result.type === 'Products' ? 'bg-blue-50' :
                  result.type === 'Customers' ? 'bg-green-50' :
                  result.type === 'Memos' ? 'bg-purple-50' : 'bg-orange-50'
                }`}>
                  <result.icon className={`w-6 h-6 ${
                    result.type === 'Products' ? 'text-blue-600' :
                    result.type === 'Customers' ? 'text-green-600' :
                    result.type === 'Memos' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{result.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      result.category.includes('Paid') || result.category.includes('Delivered') || result.category.includes('Premium') || result.category.includes('VIP')
                        ? 'bg-green-100 text-green-700'
                        : result.category.includes('Pending') || result.category.includes('Transit')
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{result.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{result.type}</p>
                </div>
                <div className="text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No results found</p>
              <p className="text-gray-400 text-sm mt-2">Try searching with different keywords or filters</p>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        {filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            Showing {filteredResults.length} of {allResults.length} results
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
