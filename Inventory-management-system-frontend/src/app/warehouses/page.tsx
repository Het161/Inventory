'use client'

import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Warehouse as WarehouseIcon, MapPin, Users, Package, Plus, X, Save } from 'lucide-react'
import WarehouseVisualization from '../../components/3d/WarehouseModel'
import { useState } from 'react'

interface WarehouseData {
  id: string
  name: string
  location: string
  capacity: number
  used: number
  products: number
  staff: number
  status: 'active' | 'inactive'
}

export default function WarehousesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([
    {
      id: 'WH001',
      name: 'Central Warehouse',
      location: 'Dhaka, Tejgaon Industrial Area',
      capacity: 50000,
      used: 42500,
      products: 1245,
      staff: 12,
      status: 'active'
    },
    {
      id: 'WH002',
      name: 'North Regional',
      location: 'Chittagong, Karnaphuli',
      capacity: 30000,
      used: 25800,
      products: 856,
      staff: 8,
      status: 'active'
    },
    {
      id: 'WH003',
      name: 'South Distribution',
      location: 'Sylhet, Zindabazar',
      capacity: 20000,
      used: 18200,
      products: 634,
      staff: 6,
      status: 'active'
    },
    {
      id: 'WH004',
      name: 'East Zone',
      location: 'Cumilla, Kandirpar',
      capacity: 25000,
      used: 15000,
      products: 456,
      staff: 7,
      status: 'active'
    },
    {
      id: 'WH005',
      name: 'West Logistics',
      location: 'Rajshahi, Shaheb Bazar',
      capacity: 15000,
      used: 12000,
      products: 389,
      staff: 5,
      status: 'active'
    },
  ])

  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    location: '',
    capacity: '',
    used: '',
    products: '',
    staff: '',
    city: '',
    address: '',
    manager: '',
    phone: '',
  })

  const handleAddWarehouse = (e: React.FormEvent) => {
    e.preventDefault()
    
    const warehouse: WarehouseData = {
      id: `WH${(warehouses.length + 1).toString().padStart(3, '0')}`,
      name: newWarehouse.name,
      location: `${newWarehouse.city}, ${newWarehouse.address}`,
      capacity: parseInt(newWarehouse.capacity),
      used: parseInt(newWarehouse.used),
      products: parseInt(newWarehouse.products),
      staff: parseInt(newWarehouse.staff),
      status: 'active'
    }

    setWarehouses([...warehouses, warehouse])
    setShowAddModal(false)
    setNewWarehouse({
      name: '',
      location: '',
      capacity: '',
      used: '',
      products: '',
      staff: '',
      city: '',
      address: '',
      manager: '',
      phone: '',
    })
    alert('✅ Warehouse added successfully!')
  }

  return (
    <MainLayout 
      title="Warehouse Management" 
      subtitle="3D visualization and warehouse operations"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Warehouses', value: warehouses.length.toString(), icon: WarehouseIcon, color: 'blue' },
          { label: 'Total Capacity', value: `${(warehouses.reduce((sum, w) => sum + w.capacity, 0) / 1000).toFixed(0)}K sq ft`, icon: Package, color: 'green' },
          { label: 'Total Products', value: warehouses.reduce((sum, w) => sum + w.products, 0).toString(), icon: Package, color: 'purple' },
          { label: 'Total Staff', value: warehouses.reduce((sum, w) => sum + w.staff, 0).toString(), icon: Users, color: 'orange' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <stat.icon className="w-10 h-10 text-indigo-600 mb-3" />
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Add Warehouse Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Warehouse
        </motion.button>
      </motion.div>

      {/* 3D Warehouse Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <WarehouseVisualization />
      </motion.div>

      {/* Warehouse List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">All Warehouses</h2>
          <p className="text-sm text-gray-500">Complete warehouse directory</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {warehouses.map((warehouse, idx) => (
                <tr key={warehouse.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{warehouse.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{warehouse.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {warehouse.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{warehouse.capacity.toLocaleString()} sq ft</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className={`h-2 rounded-full ${
                            (warehouse.used / warehouse.capacity) * 100 > 80 ? 'bg-red-500' :
                            (warehouse.used / warehouse.capacity) * 100 > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(warehouse.used / warehouse.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {((warehouse.used / warehouse.capacity) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{warehouse.products}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{warehouse.staff}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {warehouse.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Warehouse Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <WarehouseIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Add New Warehouse</h2>
                      <p className="text-sm text-gray-500">Fill in warehouse details</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleAddWarehouse} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Warehouse Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Warehouse Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Central Warehouse"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={newWarehouse.city}
                        onChange={(e) => setNewWarehouse({...newWarehouse, city: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Dhaka"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Area/Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={newWarehouse.address}
                        onChange={(e) => setNewWarehouse({...newWarehouse, address: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Tejgaon Industrial Area"
                      />
                    </div>

                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Capacity (sq ft) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newWarehouse.capacity}
                        onChange={(e) => setNewWarehouse({...newWarehouse, capacity: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="50000"
                      />
                    </div>

                    {/* Used Space */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Used Space (sq ft) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newWarehouse.used}
                        onChange={(e) => setNewWarehouse({...newWarehouse, used: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="25000"
                      />
                    </div>

                    {/* Products Count */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Products *
                      </label>
                      <input
                        type="number"
                        required
                        value={newWarehouse.products}
                        onChange={(e) => setNewWarehouse({...newWarehouse, products: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="500"
                      />
                    </div>

                    {/* Staff Count */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Staff *
                      </label>
                      <input
                        type="number"
                        required
                        value={newWarehouse.staff}
                        onChange={(e) => setNewWarehouse({...newWarehouse, staff: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="10"
                      />
                    </div>

                    {/* Manager Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Manager Name
                      </label>
                      <input
                        type="text"
                        value={newWarehouse.manager}
                        onChange={(e) => setNewWarehouse({...newWarehouse, manager: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., John Doe"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={newWarehouse.phone}
                        onChange={(e) => setNewWarehouse({...newWarehouse, phone: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+880 1234-567890"
                      />
                    </div>
                  </div>

                  {/* Preview Card */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Preview</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Utilization: </span>
                        <span className="font-semibold text-gray-900">
                          {newWarehouse.capacity && newWarehouse.used 
                            ? `${((parseInt(newWarehouse.used) / parseInt(newWarehouse.capacity)) * 100).toFixed(1)}%`
                            : '0%'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Available: </span>
                        <span className="font-semibold text-gray-900">
                          {newWarehouse.capacity && newWarehouse.used 
                            ? `${(parseInt(newWarehouse.capacity) - parseInt(newWarehouse.used)).toLocaleString()} sq ft`
                            : '0 sq ft'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
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
                      Add Warehouse
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
