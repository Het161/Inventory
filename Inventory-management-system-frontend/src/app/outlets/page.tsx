'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, MapPin, Users, Package, Plus, X, Save, Edit2, Trash2 } from 'lucide-react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { getOutlets, createOutlet, updateOutlet, deleteOutlet } from '../../lib/api'

interface Outlet {
  id: number
  name: string
  location: string
  manager: string
  staff_count: number
  status: string
}

export default function OutletsPage() {
  const { formatPrice, formatLargeNumber } = useCurrency()
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null)
  const [formData, setFormData] = useState({
    name: '', location: '', manager: '', staff_count: 0, status: 'Active'
  })

  useEffect(() => {
    fetchOutlets()
  }, [])

  const fetchOutlets = async () => {
    try {
      const data = await getOutlets()
      setOutlets(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching outlets:', error)
      setOutlets([])
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createOutlet(formData)
      setShowAddModal(false)
      setFormData({ name: '', location: '', manager: '', staff_count: 0, status: 'Active' })
      fetchOutlets()
    } catch (error) {
      console.error('Error creating outlet:', error)
    }
  }

  const handleEdit = (outlet: Outlet) => {
    setEditingOutlet(outlet)
    setFormData({
      name: outlet.name,
      location: outlet.location,
      manager: outlet.manager,
      staff_count: outlet.staff_count,
      status: outlet.status
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingOutlet) return
    try {
      await updateOutlet(editingOutlet.id, formData)
      setEditingOutlet(null)
      setFormData({ name: '', location: '', manager: '', staff_count: 0, status: 'Active' })
      fetchOutlets()
    } catch (error) {
      console.error('Error updating outlet:', error)
    }
  }

  const handleDelete = async (outlet: Outlet) => {
    if (!confirm(`Delete outlet "${outlet.name}"?`)) return
    try {
      await deleteOutlet(outlet.id)
      fetchOutlets()
    } catch (error) {
      console.error('Error deleting outlet:', error)
    }
  }

  const totalStaff = outlets.reduce((sum, o) => sum + o.staff_count, 0)

  if (loading) {
    return (
      <MainLayout title="Outlet Management" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading outlets...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Outlet Management" subtitle="Manage retail outlets, staff, and product distribution">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Store className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-sm text-gray-500">Total Outlets</p>
          <p className="text-3xl font-bold text-gray-900">{outlets.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Users className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-sm text-gray-500">Total Staff</p>
          <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-600">Add New Outlet</p>
              <p className="text-xs text-gray-500">Create a new retail location</p>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Outlets List */}
      <div className="space-y-4">
        {outlets.length > 0 ? outlets.map((outlet, idx) => (
          <motion.div
            key={outlet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{outlet.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{outlet.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  outlet.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {outlet.status}
                </span>
                <button
                  onClick={() => handleEdit(outlet)}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(outlet)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Manager</p>
                <p className="text-lg font-semibold text-gray-900">{outlet.manager || 'Not Assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff</p>
                <p className="text-lg font-semibold text-gray-900">{outlet.staff_count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-lg font-semibold text-gray-900">{outlet.status}</p>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No outlets found</p>
            <p className="text-gray-400 text-sm mt-2">Click "Add New Outlet" to create one</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingOutlet) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingOutlet ? 'Edit Outlet' : 'Add New Outlet'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingOutlet(null)
                    setFormData({ name: '', location: '', manager: '', staff_count: 0, status: 'Active' })
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={editingOutlet ? handleUpdate : handleAdd}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. Downtown Branch"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. 123 Main Street, City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="e.g. John Smith"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.staff_count}
                      onChange={(e) => setFormData({ ...formData, staff_count: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingOutlet(null)
                      setFormData({ name: '', location: '', manager: '', staff_count: 0, status: 'Active' })
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingOutlet ? 'Update Outlet' : 'Add Outlet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
