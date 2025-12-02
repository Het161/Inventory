'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

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

// 3D Warehouse Building Component
function WarehouseBuilding({ 
  position, 
  color, 
  utilization,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = isHovered 
        ? Math.sin(state.clock.elapsedTime * 2) * 0.1
        : 0
    }
  })

  return (
    <group position={position}>
      {/* Main Building */}
      <Box
        ref={meshRef}
        args={[2, 1.5, 3]}
        position={[0, 0.75, 0]}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <meshStandardMaterial 
          color={isHovered ? '#818cf8' : color}
          metalness={0.3}
          roughness={0.4}
        />
      </Box>

      {/* Roof */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.5, 0.6, 4]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Door */}
      <Box args={[0.5, 0.8, 0.1]} position={[0, 0.4, 1.51]}>
        <meshStandardMaterial color="#374151" />
      </Box>

      {/* Windows */}
      {[-0.6, 0.6].map((x, i) => (
        <Box key={i} args={[0.3, 0.3, 0.1]} position={[x, 1, 1.51]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </Box>
      ))}

      {/* Utilization Bar */}
      <Box args={[2.2, 0.1, 0.1]} position={[0, -0.1, 1.6]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>
      <Box 
        args={[2.2 * (utilization / 100), 0.12, 0.12]} 
        position={[-2.2 / 2 + (2.2 * utilization / 100) / 2, -0.1, 1.61]}
      >
        <meshStandardMaterial 
          color={utilization > 80 ? '#ef4444' : utilization > 50 ? '#f59e0b' : '#10b981'}
        />
      </Box>

      {/* Ground */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.4, 1.6]}
        fontSize={0.15}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        {`${utilization}% Full`}
      </Text>
    </group>
  )
}

// Products/Boxes Stack inside Warehouse
function ProductStacks({ count, position }: any) {
  const stacks = []
  const rows = Math.ceil(Math.sqrt(count / 10))
  const cols = Math.ceil(count / (rows * 10))
  
  for (let i = 0; i < Math.min(count / 10, 20); i++) {
    const x = (i % cols) * 0.3 - (cols * 0.15)
    const z = Math.floor(i / cols) * 0.3 - (rows * 0.15)
    const height = Math.random() * 0.5 + 0.3
    
    stacks.push(
      <Box
        key={i}
        args={[0.25, height, 0.25]}
        position={[position[0] + x, height / 2, position[2] + z]}
      >
        <meshStandardMaterial 
          color={['#f59e0b', '#10b981', '#6366f1', '#ec4899'][Math.floor(Math.random() * 4)]}
          metalness={0.2}
          roughness={0.8}
        />
      </Box>
    )
  }
  
  return <>{stacks}</>
}

// Main 3D Scene Component
function Scene({ warehouses, onWarehouseClick }: { 
  warehouses: WarehouseData[], 
  onWarehouseClick: (warehouse: WarehouseData) => void 
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  const positions = [
    [-4, 0, 0],
    [0, 0, 0],
    [4, 0, 0],
    [-2, 0, -4],
    [2, 0, -4],
  ]

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 8, 12]} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={8}
        maxDistance={20}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <hemisphereLight color="#ffffff" groundColor="#444444" intensity={0.4} />
      
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Grid */}
      <gridHelper args={[50, 50, '#d1d5db', '#e5e7eb']} position={[0, 0, 0]} />
      
      {/* Warehouses */}
      {warehouses.slice(0, 5).map((warehouse, index) => (
        <group key={warehouse.id}>
          <WarehouseBuilding
            position={positions[index]}
            color={warehouse.status === 'active' ? '#6366f1' : '#9ca3af'}
            utilization={(warehouse.used / warehouse.capacity) * 100}
            isHovered={hoveredId === warehouse.id}
            onPointerOver={() => setHoveredId(warehouse.id)}
            onPointerOut={() => setHoveredId(null)}
            onClick={() => onWarehouseClick(warehouse)}
          />
          
          {/* Product Stacks */}
          <ProductStacks 
            count={warehouse.products} 
            position={[positions[index][0], 0.1, positions[index][2]]} 
          />
          
          {/* Warehouse Label */}
          <Text
            position={[positions[index][0], 2.5, positions[index][2]]}
            fontSize={0.2}
            color="#111827"
            anchorX="center"
            anchorY="middle"
            fontWeight={600}
          >
            {warehouse.name}
          </Text>
        </group>
      ))}
    </>
  )
}

// Main Warehouse Visualization Component
export default function WarehouseVisualization() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null)
  
  // Sample data - replace with your API data
  const warehouses: WarehouseData[] = [
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
  ]

  const handleWarehouseClick = (warehouse: WarehouseData) => {
    setSelectedWarehouse(warehouse)
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200">
      {/* 3D Canvas */}
      <Canvas shadows>
        <Scene warehouses={warehouses} onWarehouseClick={handleWarehouseClick} />
      </Canvas>

      {/* Controls Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Controls</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>🖱️ Left Click + Drag: Rotate</li>
          <li>🖱️ Right Click + Drag: Pan</li>
          <li>⚙️ Scroll: Zoom</li>
          <li>👆 Click Building: Details</li>
        </ul>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Warehouse Network</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Total Warehouses</p>
            <p className="text-lg font-bold text-gray-900">{warehouses.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Products</p>
            <p className="text-lg font-bold text-gray-900">
              {warehouses.reduce((sum, w) => sum + w.products, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Capacity Used</p>
            <p className="text-lg font-bold text-indigo-600">
              {((warehouses.reduce((sum, w) => sum + w.used, 0) / 
                 warehouses.reduce((sum, w) => sum + w.capacity, 0)) * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Staff</p>
            <p className="text-lg font-bold text-gray-900">
              {warehouses.reduce((sum, w) => sum + w.staff, 0)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Selected Warehouse Details Modal */}
      {selectedWarehouse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setSelectedWarehouse(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedWarehouse.name}</h2>
                <p className="text-sm text-gray-500">{selectedWarehouse.id}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                {selectedWarehouse.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">📍 Location</p>
                <p className="text-sm font-medium text-gray-900">{selectedWarehouse.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Capacity</p>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedWarehouse.capacity.toLocaleString()} sq ft
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Used</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {selectedWarehouse.used.toLocaleString()} sq ft
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-500">Utilization</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {((selectedWarehouse.used / selectedWarehouse.capacity) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedWarehouse.used / selectedWarehouse.capacity) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Products Stored</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedWarehouse.products}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Staff Members</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedWarehouse.staff}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedWarehouse(null)}
              className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold
                       hover:bg-indigo-700 transition-colors"
            >
              Close Details
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
