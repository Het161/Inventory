'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Plus, X, Save, Trash2 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getProducts } from '../../lib/api'

interface Transaction {
  id: number
  date: string
  product: string
  type: 'Stock In' | 'Stock Out'
  quantity: number
  reference: string
  user: string
}

interface Product {
  id: number
  name: string
  stock: number
}

export default function StockManagementPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2024-10-01', product: 'Laptop Pro', type: 'Stock In', quantity: 50, reference: 'PO-2024-001', user: 'John Doe' },
    { id: 2, date: '2024-10-02', product: 'Wireless Mouse', type: 'Stock Out', quantity: 5, reference: 'SO-2024-015', user: 'Jane Smith' },
    { id: 3, date: '2024-10-03', product: 'USB Cable', type: 'Stock In', quantity: 20, reference: 'PO-2024-002', user: 'John Doe' },
    { id: 4, date: '2024-10-04', product: 'Monitor 24"', type: 'Stock Out', quantity: 2, reference: 'ADJ-2024-001', user: 'Admin' },
  ])

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    product: '',
    type: 'Stock In' as 'Stock In' | 'Stock Out',
    quantity: 0,
    reference: '',
    user: 'Admin',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      setProducts(response?.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    
    const transaction: Transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      product: newTransaction.product,
      type: newTransaction.type,
      quantity: newTransaction.quantity,
      reference: newTransaction.reference,
      user: newTransaction.user,
    }

    setTransactions([transaction, ...transactions])
    setShowAddModal(false)
    setNewTransaction({
      product: '',
      type: 'Stock In',
      quantity: 0,
      reference: '',
      user: 'Admin',
    })
    alert('✅ Transaction added successfully!')
  }

  const handleDeleteTransaction = (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return
    setTransactions(transactions.filter(t => t.id !== id))
    alert('✅ Transaction deleted successfully!')
  }

  // Chart data - Stock Movement Over Time
  const chartData = [
    { name: 'Week 1', stockIn: 65, stockOut: 28 },
    { name: 'Week 2', stockIn: 59, stockOut: 48 },
    { name: 'Week 3', stockIn: 80, stockOut: 40 },
    { name: 'Week 4', stockIn: 81, stockOut: 42 },
    { name: 'Week 5', stockIn: 56, stockOut: 35 },
    { name: 'Week 6', stockIn: 75, stockOut: 50 },
  ]

  // Product Stock Levels - FIXED with null check
  const stockLevels = (products && Array.isArray(products)) 
    ? products.slice(0, 6).map(p => ({
        name: p.name.substring(0, 15),
        stock: p.stock,
      }))
    : []

  if (loading) {
    return (
      <MainLayout title="Stock Management" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading stock data...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Stock Management" subtitle="Track stock movements and manage inventory levels">
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Movement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Movement Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stockIn" stroke="#10b981" strokeWidth={2} name="Stock In" />
              <Line type="monotone" dataKey="stockOut" stroke="#ef4444" strokeWidth={2} name="Stock Out" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product Stock Levels Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Stock Levels</h3>
          {stockLevels.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stockLevels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No product data available
            </div>
          )}
        </motion.div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-sm text-gray-500 mt-1">Showing {transactions.length} transactions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction, idx) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.product}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'Stock In' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'Stock In' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {transaction.type === 'Stock In' ? '+' : '-'}{transaction.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.reference}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.user}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-900 font-medium inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Add Stock Transaction</h2>
                    <p className="text-sm text-gray-500">Record a stock movement</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleAddTransaction} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product *</label>
                      <select
                        required
                        value={newTransaction.product}
                        onChange={(e) => setNewTransaction({...newTransaction, product: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select a product</option>
                        {products && products.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type *</label>
                      <select
                        required
                        value={newTransaction.type}
                        onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'Stock In' | 'Stock Out'})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Stock In">Stock In</option>
                        <option value="Stock Out">Stock Out</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                      <input
                        type="number"
                        required
                        value={newTransaction.quantity}
                        onChange={(e) => setNewTransaction({...newTransaction, quantity: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Number *</label>
                      <input
                        type="text"
                        required
                        value={newTransaction.reference}
                        onChange={(e) => setNewTransaction({...newTransaction, reference: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., PO-2024-001"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Add Transaction
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
