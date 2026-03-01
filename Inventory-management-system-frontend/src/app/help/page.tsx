'use client'

import { useState, useRef, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Mail, Phone, X, Send, Book, Video, FileText, ExternalLink, Bot, Loader2 } from 'lucide-react'

// Smart support bot knowledge base
const getSmartResponse = (message: string): string => {
  const msg = message.toLowerCase().trim()

  // Greetings
  if (msg.match(/^(hi|hello|hey|good morning|good evening|good afternoon)/))
    return "Hello! 👋 Welcome to OM Marketing Solutions support. I'm here to help you with anything related to the inventory management system. What can I assist you with today?"

  // How to use the app
  if (msg.match(/how.*(use|work|start|begin|get started|navigate)/))
    return "Great question! Here's how to get started:\n\n📊 **Dashboard** — Your main overview with stats and charts\n📦 **Products** — Add and manage your product inventory\n🏭 **Warehouses** — Manage your warehouse locations\n🏪 **Outlets** — Track retail outlets\n📈 **Stock Management** — Track stock in/out movements\n📋 **Sales Memos** — Create and manage sales\n👥 **Customers** — Manage your customer base\n\nYou can access all these from the sidebar. Would you like help with any specific feature?"

  // Products
  if (msg.match(/product|add product|create product|item/))
    return "To manage products:\n\n1. Go to **Products** from the sidebar\n2. Click **'+ Add Product'** button (top right)\n3. Fill in: Name, SKU, Category, Price, Stock, Min Stock\n4. Click **Save**\n\nYou can also **edit** or **delete** products from the product list. Need help with anything else?"

  // Stock
  if (msg.match(/stock|inventory|movement|stock in|stock out/))
    return "For stock management:\n\n1. Go to **Stock Management** from the sidebar\n2. To add stock movement, select a product and choose 'Stock In' or 'Stock Out'\n3. Enter the quantity and click **Submit**\n4. The chart shows your movement trends over time\n\nProducts with stock below minimum will appear as **Low Stock Alerts** on the Dashboard."

  // Categories
  if (msg.match(/categor/))
    return "Categories are automatically derived from your products:\n\n1. Go to **Categories** from the sidebar\n2. You'll see all categories with their product count and total stock\n3. Categories are created when you assign a category to a product\n\nTo add a new category, simply use a new category name when adding a product!"

  // Sales
  if (msg.match(/sale|sales memo|order|invoice|bill/))
    return "To manage sales:\n\n1. Go to **Sales Memos** from the sidebar\n2. Click **'Create New'** to start a new sales memo\n3. Select the customer and add products\n4. Fill in quantities and the system calculates totals\n5. Click **Save** to create the memo\n\nAll sales appear on the Dashboard and Analytics pages."

  // Customers
  if (msg.match(/customer|client|buyer/))
    return "To manage customers:\n\n1. Go to **Customers** from the sidebar under the **People** section\n2. Click **'+ Add Customer'** to add a new customer\n3. Fill in: Name, Email, Phone, Address, Status\n4. Click **Save**\n\nYou can search customers and view their purchase history from the customer list."

  // Staff
  if (msg.match(/staff|employee|team|worker/))
    return "To manage staff:\n\n1. Go to **Staff Management** under the **People** section\n2. Click **'+ Add Staff'** to add a new employee\n3. Fill in: Name, Email, Phone, Role, Department, Salary\n4. Click **Save**\n\nYou can search, filter, and manage staff from the staff list."

  // Warehouse
  if (msg.match(/warehouse|storage|depot/))
    return "To manage warehouses:\n\n1. Go to **Warehouses** from the sidebar\n2. Click **'Add Warehouse'** to create a new one\n3. Fill in: Name, Location, Capacity, Manager\n4. Click **Save**\n\nEach warehouse can be assigned products and tracked separately."

  // Outlet
  if (msg.match(/outlet|store|shop|retail/))
    return "To manage outlets:\n\n1. Go to **Outlets** from the sidebar\n2. Click **'Add Outlet'** to create a new retail location\n3. Fill in the outlet details\n4. Click **Save**\n\nOutlets represent your retail points of sale."

  // Analytics / Reports
  if (msg.match(/analytics|report|chart|graph|insight|data/))
    return "For analytics and reports:\n\n1. Go to **Analytics** from the sidebar\n2. View: Sales revenue, inventory value, product distribution\n3. Charts show stock analysis by category and sales breakdown\n\nThe **Dashboard** also has quick stats and charts for an overview."

  // Settings
  if (msg.match(/setting|config|preference|account|profile/))
    return "To manage your settings:\n\n1. Go to **Settings** from the sidebar under **System**\n2. You can update: Profile, Notifications, Security, Preferences\n3. Use the tabs to navigate between settings sections\n\nYou can also access your **Profile** from the top-right dropdown menu."

  // Password / Security
  if (msg.match(/password|security|login|access/))
    return "To manage security:\n\n1. Go to **Settings** → **Security** tab\n2. You can change your password, enable 2FA, and manage access\n\nIf you're locked out, contact your system administrator."

  // Export
  if (msg.match(/export|download|csv|excel|pdf/))
    return "To export data:\n\n1. Navigate to the page you want to export (Products, Sales, etc.)\n2. Look for the **Export** button (usually top-right area)\n3. Choose your format (CSV or Excel)\n4. The file will download automatically"

  // Currency
  if (msg.match(/currency|usd|inr|dollar|rupee|₹|\$/))
    return "To switch currency:\n\n1. Look at the **top-right header** of the page\n2. You'll see **$ USD** and **₹ INR** toggle buttons\n3. Click the one you want to switch to\n4. All prices across the app will update automatically!"

  // Help
  if (msg.match(/help|support|assist|contact/))
    return "I'm here to help! You can:\n\n💬 **Live Chat** — That's me! Ask any question\n📧 **Email** — Send us an email at support@ommarketingsolutions.in\n📞 **Phone** — Call us at +91 98252 47312\n📖 **Documentation** — Full guides available in the Quick Resources section\n❓ **FAQs** — Common questions answered\n\nWhat specific help do you need?"

  // Dashboard
  if (msg.match(/dashboard/))
    return "The **Dashboard** is your main overview page:\n\n• **Total Products** — Number of products in your inventory\n• **Total Revenue** — Combined stock value\n• **Total Customers** — Registered customers\n• **Total Orders** — Sales memos created\n• **Charts** — Stock by category visualization\n\nAccess it from the sidebar or click the OM Marketing logo."

  // Thank you
  if (msg.match(/thank|thanks|thx|ty/))
    return "You're welcome! 😊 If you have any more questions, feel free to ask. I'm always here to help!"

  // Bye
  if (msg.match(/bye|goodbye|see you|later/))
    return "Goodbye! 👋 Have a great day! If you need help again, just open the Live Chat anytime."

  // Pricing
  if (msg.match(/price|pricing|cost|plan|subscription/))
    return "For pricing information, please contact our sales team:\n\n📧 Email: sales@webyourvyavsay.com\n📞 Phone: +91 98252 47312\n\nWe offer flexible plans for businesses of all sizes!"

  // Bug / Error / Issue
  if (msg.match(/bug|error|issue|problem|broken|not working|crash/))
    return "I'm sorry to hear you're experiencing an issue! Let me help:\n\n1. **Try refreshing** the page first\n2. **Clear your browser cache** if the issue persists\n3. **Check your internet connection**\n\nIf the problem continues, please describe the exact issue and I'll help troubleshoot, or you can email us at support@ommarketingsolutions.in with a screenshot."

  // Low stock
  if (msg.match(/low stock|out of stock|reorder|minimum/))
    return "Low stock alerts help you stay on top of inventory:\n\n• Products with stock below **min_stock** appear as **Low Stock** on the Dashboard\n• Products with **0 stock** show as **Critical**\n• Set appropriate **minimum stock levels** when adding products\n\nGo to **Dashboard** to see current low-stock alerts."

  // Default fallback - still helpful
  return "That's a great question! While I'm processing that, here are some common topics I can help with:\n\n📦 **Products** — Adding, editing, managing\n📈 **Stock** — Tracking movements\n💰 **Sales** — Creating memos\n👥 **Customers** — Managing contacts\n⚙️ **Settings** — Account preferences\n\nCould you tell me more about what you need? I'm here to help! 😊"
}

export default function HelpPage() {
  const [showChatModal, setShowChatModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showDocsModal, setShowDocsModal] = useState(false)
  const [showVideosModal, setShowVideosModal] = useState(false)
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: "Hello! 👋 I'm your OM Marketing Solutions assistant. I can help you with products, sales, stock management, customers, settings, and more. How can I help you today?" }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: ''
  })

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  const handleStartChat = () => {
    setShowChatModal(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isTyping) return
    
    const userMsg = newMessage
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setNewMessage('')
    setIsTyping(true)
    
    // Simulate typing delay for natural feel
    const response = getSmartResponse(userMsg)
    const delay = Math.min(800 + response.length * 5, 2000)
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'support', text: response }])
      setIsTyping(false)
    }, delay)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Email sent successfully! We will respond within 24 hours.')
    setShowEmailModal(false)
    setEmailForm({ subject: '', message: '' })
  }

  const handleCallNow = () => {
    if (confirm('Call +91 98252 47312?')) {
      window.location.href = 'tel:+91 98252 47312'
    }
  }

  // FAQ Data
  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to Settings > Security > Change Password to reset your password.' },
    { q: 'How to add new products?', a: 'Navigate to Products page and click the "Add Product" button in the top right.' },
    { q: 'How to manage warehouses?', a: 'Go to Warehouses section to add, edit, or delete warehouses.' },
    { q: 'How do I switch currency?', a: 'Click the USD/INR toggle buttons in the header (top-right) to switch between currencies.' },
    { q: 'How do I add customers?', a: 'Go to Customers page under People section, click "+ Add Customer" and fill in the details.' },
    { q: 'How to manage staff?', a: 'Go to Staff Management under People section to add, view, and manage employees.' },
    { q: 'Where are the analytics?', a: 'Click Analytics under the Sales section in the sidebar for charts and business insights.' },
    { q: 'Can I customize the dashboard?', a: 'The dashboard shows real-time data from your inventory — add products and sales to see live stats.' },
  ]

  // Quick suggestions for chat
  const quickSuggestions = [
    'How to use this app?',
    'How to add products?',
    'How to manage stock?',
    'How to add customers?',
  ]

  return (
    <MainLayout title="Help & Support" subtitle="Get assistance and find answers to your questions">
      
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-xl transition-all"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-6">Chat with our AI assistant</p>
          <button
            onClick={handleStartChat}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Start Chat
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-xl transition-all"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-6">support@ommarketingsolutions.in</p>
          <button
            onClick={() => setShowEmailModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Send Email
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-xl transition-all"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-6">+91 98252 47312</p>
          <button
            onClick={handleCallNow}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
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
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowDocsModal(true)}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 cursor-pointer transition-all bg-white text-left group"
          >
            <Book className="w-6 h-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
              Documentation
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600">Complete guide to using the system</p>
          </button>

          <button
            onClick={() => setShowVideosModal(true)}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 cursor-pointer transition-all bg-white text-left group"
          >
            <Video className="w-6 h-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
              Video Tutorials
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600">Watch step-by-step tutorials</p>
          </button>

          <button
            onClick={() => setShowFaqModal(true)}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 cursor-pointer transition-all bg-white text-left group"
          >
            <FileText className="w-6 h-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
              FAQs
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-sm text-gray-600">Find answers to common questions</p>
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
              <div className="bg-white rounded-2xl shadow-2xl w-[420px] h-[550px] flex flex-col border border-gray-200">
                {/* Header */}
                <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Bot className="w-6 h-6" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-indigo-600"></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">OM Support Assistant</h3>
                      <p className="text-xs text-indigo-200">Online • Typically replies instantly</p>
                    </div>
                  </div>
                  <button onClick={() => setShowChatModal(false)} className="p-1 hover:bg-indigo-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'support' && (
                        <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                          <Bot className="w-4 h-4 text-indigo-600" />
                        </div>
                      )}
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-md' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                      }`} style={{ whiteSpace: 'pre-line' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                        <Bot className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="bg-white text-gray-500 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Suggestions */}
                {chatMessages.length <= 2 && (
                  <div className="px-4 py-2 border-t border-gray-100 bg-white flex gap-2 overflow-x-auto">
                    {quickSuggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setNewMessage(s)
                          // Auto-send the suggestion
                          setChatMessages(prev => [...prev, { sender: 'user', text: s }])
                          setIsTyping(true)
                          const response = getSmartResponse(s)
                          const delay = Math.min(800 + response.length * 5, 2000)
                          setTimeout(() => {
                            setChatMessages(prev => [...prev, { sender: 'support', text: response }])
                            setIsTyping(false)
                          }, delay)
                          setNewMessage('')
                        }}
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-100 transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isTyping}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-sm bg-white disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !newMessage.trim()}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
              >
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <h3 className="font-bold">Send Email</h3>
                  </div>
                  <button onClick={() => setShowEmailModal(false)} className="p-1 hover:bg-green-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                      placeholder="What is this about?"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      required
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                      placeholder="Describe your issue or question..."
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 bg-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
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
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5" />
                    <h3 className="font-bold">Documentation</h3>
                  </div>
                  <button onClick={() => setShowDocsModal(false)} className="p-1 hover:bg-indigo-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">1. Dashboard Overview</h5>
                      <p className="text-gray-600">Learn how to navigate the main dashboard and view key metrics.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">2. Managing Products</h5>
                      <p className="text-gray-600">Add, edit, and organize your product inventory efficiently.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">3. Warehouse Management</h5>
                      <p className="text-gray-600">Set up and manage multiple warehouse locations.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">4. Sales & Analytics</h5>
                      <p className="text-gray-600">Track sales performance and generate detailed reports.</p>
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
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5" />
                    <h3 className="font-bold">Video Tutorials</h3>
                  </div>
                  <button onClick={() => setShowVideosModal(false)} className="p-1 hover:bg-purple-700 rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Tutorial Videos</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Getting Started Guide',
                      'Product Management',
                      'Warehouse Setup',
                      'Sales Reports',
                      'User Permissions',
                      'Advanced Features'
                    ].map((title, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg cursor-pointer transition-all group hover:shadow-md">
                        <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Video className="w-12 h-12 text-purple-600" />
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-1">{title}</h5>
                        <p className="text-sm text-gray-600">5 min video</p>
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
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <h3 className="font-bold">Frequently Asked Questions</h3>
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
                        className="bg-gray-50 p-4 rounded-lg transition-all group"
                      >
                        <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                          <span>{faq.q}</span>
                          <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-600 pl-4 border-l-2 border-teal-500">
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
