'use client'

import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Zap, Activity, TrendingUp, AlertCircle, CheckCircle, Clock, X, Settings, Play, Pause, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AgentOrchestrator, AgentAction } from '../../utils/agents/AgentEngine'

// Sample product data (in real app, this comes from your state/API)
const sampleProducts = [
  { id: 1, name: 'Laptop Pro', sku: 'WBH-001', stock: 150, minStock: 50, price: 79.99 },
  { id: 2, name: 'Wireless Mouse', sku: 'RS-NIKE-001', stock: 25, minStock: 30, price: 12.99 }, // LOW STOCK
  { id: 3, name: 'USB Cable', sku: 'CM-DLX-001', stock: 200, minStock: 100, price: 8.99 },
  { id: 4, name: 'Monitor 24"', sku: 'LC-UNI-001', stock: 45, minStock: 20, price: 199.99 },
  { id: 5, name: 'Keyboard', sku: 'P005', stock: 120, minStock: 40, price: 45.99 },
  { id: 6, name: 'Webcam', sku: 'P006', stock: 8, minStock: 25, price: 89.99 }, // CRITICAL
  { id: 7, name: 'Headphones', sku: 'P007', stock: 90, minStock: 35, price: 129.99 },
  { id: 8, name: 'Tablet', sku: 'P008', stock: 5, minStock: 15, price: 299.99 }, // CRITICAL
]

interface Agent {
  id: string
  name: string
  description: string
  icon: string
  color: string
  status: 'Active' | 'Idle'
}

export default function AIAgentsPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [allActions, setAllActions] = useState<AgentAction[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [lastRun, setLastRun] = useState<Date | null>(null)
  const [orchestrator] = useState(() => new AgentOrchestrator(sampleProducts))

  const agents: Agent[] = [
    {
      id: 'agent-1',
      name: 'Inventory Management Agent',
      description: 'Monitors stock levels, predicts demand, and automates reordering',
      icon: '🤖',
      color: 'from-blue-500 to-indigo-500',
      status: 'Active',
    },
    {
      id: 'agent-2',
      name: 'Expense Anomaly Detector',
      description: 'Identifies unusual spending patterns and potential fraud',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      status: 'Active',
    },
    {
      id: 'agent-3',
      name: 'Calling Agent',
      description: 'Automated calls to suppliers and customers',
      icon: '📞',
      color: 'from-purple-500 to-pink-500',
      status: 'Active',
    },
  ]

  // Run agents automatically on mount and every 30 seconds
  useEffect(() => {
    runAgents()
    const interval = setInterval(runAgents, 30000)
    return () => clearInterval(interval)
  }, [])

  const runAgents = () => {
    setIsRunning(true)
    setTimeout(() => {
      const actions = orchestrator.runAllAgents()
      setAllActions(actions)
      setLastRun(new Date())
      setIsRunning(false)
    }, 1000)
  }

  const getAgentActions = (agentId: string) => {
    return allActions.filter(action => action.agentId === agentId)
  }

  const getAgentTaskCount = (agentId: string) => {
    return getAgentActions(agentId).length
  }

  const selectedAgent = agents.find(a => a.id === selectedAgentId)
  const selectedAgentActions = selectedAgentId ? getAgentActions(selectedAgentId) : []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'error': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertCircle className="w-4 h-4" />
      case 'error': return <AlertCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const totalTasks = allActions.length
  const activeAgents = agents.filter(a => a.status === 'Active').length
  const errors = allActions.filter(a => a.status === 'error').length
  const warnings = allActions.filter(a => a.status === 'warning').length

  return (
    <MainLayout title="AI Agents" subtitle="Intelligent automation and AI-powered assistants">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Active Agents', value: activeAgents.toString(), icon: Bot, color: 'blue' },
          { label: 'Total Actions', value: totalTasks.toString(), icon: Zap, color: 'green' },
          { label: 'Errors', value: errors.toString(), icon: AlertCircle, color: 'red' },
          { label: 'Warnings', value: warnings.toString(), icon: AlertCircle, color: 'yellow' },
          { label: 'Last Run', value: lastRun ? `${Math.floor((Date.now() - lastRun.getTime()) / 1000)}s ago` : 'Never', icon: Clock, color: 'purple' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <stat.icon className="w-8 h-8 text-indigo-600 mb-2" />
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Run Agents Button */}
      <div className="mb-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runAgents}
          disabled={isRunning}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
          {isRunning ? 'Running Agents...' : 'Run All Agents Now'}
        </motion.button>
      </div>

      {/* AI Agents List */}
      <div className="grid gap-6">
        {agents.map((agent, idx) => {
          const taskCount = getAgentTaskCount(agent.id)
          const agentActions = getAgentActions(agent.id)
          const agentErrors = agentActions.filter(a => a.status === 'error').length
          const agentWarnings = agentActions.filter(a => a.status === 'warning').length

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedAgentId(agent.id)}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-600 font-medium">{taskCount} actions detected</span>
                      {agentErrors > 0 && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                          {agentErrors} errors
                        </span>
                      )}
                      {agentWarnings > 0 && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                          {agentWarnings} warnings
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {agent.status}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgentId(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAgentId(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${selectedAgent.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {selectedAgent.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedAgent.name}</h2>
                      <p className="text-sm text-gray-500">{selectedAgent.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAgentId(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Agent Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Actions Detected</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedAgentActions.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Errors</p>
                      <p className="text-2xl font-bold text-red-600">
                        {selectedAgentActions.filter(a => a.status === 'error').length}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="text-2xl font-bold text-green-600">{selectedAgent.status}</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                    {selectedAgentActions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No actions detected yet. Click "Run All Agents Now" to analyze your inventory.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedAgentActions.map((activity, idx) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(activity.status)}`}>
                                  {getStatusIcon(activity.status)}
                                  {activity.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-400">{activity.timestamp}</span>
                              </div>
                            </div>
                            <p className="font-medium text-gray-900 mb-1">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
