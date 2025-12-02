'use client'

import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Mail, Phone, X, Send, Book, Video, FileText, ExternalLink } from 'lucide-react'

export default function HelpPage() {
  const [showChatModal, setShowChatModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showDocsModal, setShowDocsModal] = useState(false)
  const [showVideosModal, setShowVideosModal] = useState(false)
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! How can I help you today?' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: ''
  })

  const handleStartChat = () => {
    setShowChatModal(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    setChatMessages([...chatMessages, { sender: 'user', text: newMessage }])
    setNewMessage('')
    
    // Simulate support response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'support', 
        text: 'Thanks for your message! Our team will assist you shortly.' 
      }])
    }, 1000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Email sent successfully! We will respond within 24 hours.')
    setShowEmailModal(false)
    setEmailForm({ subject: '', message: '' })
  }

  const handleCallNow = () => {
    if (confirm('Call +880 1234-567890?')) {
      window.location.href = 'tel:+8801234567890'
    }
  }

  // FAQ Data
  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to Settings > Security > Change Password to reset your password.' },
    { q: 'How to add new products?', a: 'Navigate to Products page and click the "Add Product" button in the top right.' },
    { q: 'How to manage warehouses?', a: 'Go to Warehouses section to add, edit, or delete warehouses.' },
    { q: 'How do I export data?', a: 'Most pages have an "Export" button that allows you to download data as CSV or Excel.' },
    { q: 'Can I customize the dashboard?', a: 'Yes, you can customize widgets and layout from the Dashboard settings.' },
  ]

  return (
    <MainLayout title="Help & Support" subtitle="Get assistance and find answers to your questions">
      
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-indigo-500/30 text-center hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 dark:border-2 dark:border-blue-400/60 rounded-full flex items-center justify-center mx-auto mb-4 dark:shadow-[0_0_30px_rgba(96,165,250,0.5)] transition-transform hover:scale-110">
            <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 dark:drop-shadow-[0_0_15px_rgba(96,165,250,0.9)]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-2">Live Chat</h3>
          <p className="text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_10px_rgba(209,213,219,0.5)] mb-6">Chat with our support team</p>
          <button
            onClick={handleStartChat}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all"
          >
            Start Chat
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-indigo-500/30 text-center hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 dark:border-2 dark:border-green-400/60 rounded-full flex items-center justify-center mx-auto mb-4 dark:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-transform hover:scale-110">
            <Mail className="w-8 h-8 text-green-600 dark:text-green-400 dark:drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-2">Email Support</h3>
          <p className="text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_10px_rgba(209,213,219,0.5)] mb-6">support@webyourvyavsay.com</p>
          <button
            onClick={() => setShowEmailModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all"
          >
            Send Email
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-indigo-500/30 text-center hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
        >
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 dark:border-2 dark:border-purple-400/60 rounded-full flex items-center justify-center mx-auto mb-4 dark:shadow-[0_0_30px_rgba(167,139,250,0.5)] transition-transform hover:scale-110">
            <Phone className="w-8 h-8 text-purple-600 dark:text-purple-400 dark:drop-shadow-[0_0_15px_rgba(167,139,250,0.9)]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-2">Phone Support</h3>
          <p className="text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_10px_rgba(209,213,219,0.5)] mb-6">+880 1234-567890</p>
          <button
            onClick={handleCallNow}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:shadow-[0_0_25px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all"
          >
            Call Now
          </button>
        </motion.div>
      </div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-indigo-500/30 dark:shadow-[0_0_25px_rgba(99,102,241,0.3)]"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-4">Quick Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Documentation Card - Clickable */}
          <button
            onClick={() => setShowDocsModal(true)}
            className="p-4 border border-gray-200 dark:border-indigo-500/30 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all bg-white dark:bg-slate-700 text-left group"
          >
            <Book className="w-6 h-6 text-indigo-600 dark:text-indigo-400 dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.8)] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-1 flex items-center justify-between">
              Documentation
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Complete guide to using the system</p>
          </button>

          {/* Video Tutorials Card - Clickable */}
          <button
            onClick={() => setShowVideosModal(true)}
            className="p-4 border border-gray-200 dark:border-indigo-500/30 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all bg-white dark:bg-slate-700 text-left group"
          >
            <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400 dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.8)] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-1 flex items-center justify-between">
              Video Tutorials
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Watch step-by-step tutorials</p>
          </button>

          {/* FAQs Card - Clickable */}
          <button
            onClick={() => setShowFaqModal(true)}
            className="p-4 border border-gray-200 dark:border-indigo-500/30 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all bg-white dark:bg-slate-700 text-left group"
          >
            <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400 dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.8)] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-1 flex items-center justify-between">
              FAQs
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Find answers to common questions</p>
          </button>
        </div>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 right-0 m-4 md:m-8 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.5)] w-96 h-[500px] flex flex-col dark:border-2 dark:border-indigo-500/40">
                <div className="bg-indigo-600 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between dark:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <h3 className="font-bold dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Live Chat Support</h3>
                  </div>
                  <button onClick={() => setShowChatModal(false)} className="p-1 hover:bg-indigo-700 dark:hover:bg-indigo-500 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-3 dark:bg-slate-900">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white dark:shadow-[0_0_15px_rgba(99,102,241,0.6)]' 
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white dark:border dark:border-indigo-500/30'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-indigo-500/30 dark:bg-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:shadow-[0_0_20px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmailModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowEmailModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.5)] max-w-2xl w-full dark:border-2 dark:border-indigo-500/40"
              >
                <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-emerald-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between dark:shadow-[0_0_25px_rgba(52,211,153,0.6)]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <h3 className="font-bold dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Send Email</h3>
                  </div>
                  <button onClick={() => setShowEmailModal(false)} className="p-1 hover:bg-green-700 dark:hover:bg-green-500 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                      placeholder="What is this about?"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2">Message</label>
                    <textarea
                      required
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                      placeholder="Describe your issue or question..."
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-indigo-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-200 dark:border-indigo-500/40 rounded-lg font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 dark:shadow-[0_0_25px_rgba(52,211,153,0.6)] dark:hover:shadow-[0_0_35px_rgba(52,211,153,0.8)] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Documentation Modal */}
      <AnimatePresence>
        {showDocsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDocsModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDocsModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.5)] max-w-4xl w-full dark:border-2 dark:border-indigo-500/40 max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between dark:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <h3 className="font-bold dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Documentation</h3>
                  </div>
                  <button onClick={() => setShowDocsModal(false)} className="p-1 hover:bg-indigo-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4">Getting Started</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">1. Dashboard Overview</h5>
                      <p className="text-gray-600 dark:text-gray-300">Learn how to navigate the main dashboard and view key metrics.</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">2. Managing Products</h5>
                      <p className="text-gray-600 dark:text-gray-300">Add, edit, and organize your product inventory efficiently.</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">3. Warehouse Management</h5>
                      <p className="text-gray-600 dark:text-gray-300">Set up and manage multiple warehouse locations.</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">4. Sales & Analytics</h5>
                      <p className="text-gray-600 dark:text-gray-300">Track sales performance and generate detailed reports.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Video Tutorials Modal */}
      <AnimatePresence>
        {showVideosModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideosModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideosModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.5)] max-w-4xl w-full dark:border-2 dark:border-indigo-500/40 max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between dark:shadow-[0_0_25px_rgba(167,139,250,0.6)]">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <h3 className="font-bold dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Video Tutorials</h3>
                  </div>
                  <button onClick={() => setShowVideosModal(false)} className="p-1 hover:bg-purple-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4">Tutorial Videos</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Getting Started Guide',
                      'Product Management',
                      'Warehouse Setup',
                      'Sales Reports',
                      'User Permissions',
                      'Advanced Features'
                    ].map((title, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30 hover:dark:border-purple-500/60 cursor-pointer transition-all group">
                        <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Video className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">5 min video</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FAQs Modal */}
      <AnimatePresence>
        {showFaqModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFaqModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowFaqModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.5)] max-w-4xl w-full dark:border-2 dark:border-indigo-500/40 max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between dark:shadow-[0_0_25px_rgba(20,184,166,0.6)]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <h3 className="font-bold dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Frequently Asked Questions</h3>
                  </div>
                  <button onClick={() => setShowFaqModal(false)} className="p-1 hover:bg-teal-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg dark:border dark:border-indigo-500/30 hover:dark:border-teal-500/60 transition-all group"
                      >
                        <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                          <span>{faq.q}</span>
                          <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 pl-4 border-l-2 border-teal-500">
                          {faq.a}
                        </p>
                      </details>
                    ))}
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
