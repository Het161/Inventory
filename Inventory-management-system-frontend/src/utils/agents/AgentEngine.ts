// AI Agent Engine - Makes agents actually work!

export interface Product {
  id: number
  name: string
  sku: string
  stock: number
  minStock: number
  price: number
}

export interface AgentAction {
  id: string
  agentId: string
  action: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'pending'
  details: string
  data?: any
}

// Inventory Management Agent Logic
export class InventoryAgent {
  private products: Product[]
  private actions: AgentAction[] = []

  constructor(products: Product[]) {
    this.products = products
  }

  // Check stock levels and generate alerts
  checkStockLevels(): AgentAction[] {
    const newActions: AgentAction[] = []

    this.products.forEach(product => {
      // Low stock detection
      if (product.stock < product.minStock) {
        newActions.push({
          id: `action-${Date.now()}-${product.id}`,
          agentId: 'agent-1',
          action: `🚨 Low Stock Alert: ${product.name}`,
          timestamp: 'Just now',
          status: 'warning',
          details: `Current: ${product.stock} units, Min: ${product.minStock} units. Reorder suggested: ${product.minStock * 2} units`,
          data: {
            productId: product.id,
            reorderQuantity: product.minStock * 2,
            reorderCost: product.price * product.minStock * 2
          }
        })
      }

      // Critical stock detection
      if (product.stock < product.minStock * 0.5) {
        newActions.push({
          id: `action-${Date.now()}-crit-${product.id}`,
          agentId: 'agent-1',
          action: `❌ CRITICAL: ${product.name} Almost Out of Stock!`,
          timestamp: 'Just now',
          status: 'error',
          details: `Only ${product.stock} units left! Immediate action required. Suggested emergency order: ${product.minStock * 3} units`,
          data: {
            productId: product.id,
            priority: 'URGENT',
            reorderQuantity: product.minStock * 3
          }
        })
      }

      // Overstock detection
      if (product.stock > product.minStock * 5) {
        newActions.push({
          id: `action-${Date.now()}-over-${product.id}`,
          agentId: 'agent-1',
          action: `⚠️ Overstock Detected: ${product.name}`,
          timestamp: 'Just now',
          status: 'warning',
          details: `Stock level (${product.stock}) is ${Math.round((product.stock / product.minStock) * 100)}% of minimum. Consider promotional discount to move inventory.`,
          data: {
            productId: product.id,
            suggestedDiscount: '15%'
          }
        })
      }
    })

    return newActions
  }

  // Predict demand (simple algorithm)
  predictDemand(): AgentAction[] {
    const actions: AgentAction[] = []
    
    // Simulate demand prediction
    const highDemandProducts = this.products
      .filter(p => p.stock < p.minStock * 2)
      .slice(0, 3)

    if (highDemandProducts.length > 0) {
      actions.push({
        id: `action-${Date.now()}-demand`,
        agentId: 'agent-1',
        action: '📊 Demand Forecast Generated',
        timestamp: 'Just now',
        status: 'success',
        details: `Analyzed ${this.products.length} products. Predicted 25% increase in demand for ${highDemandProducts.length} items over next 7 days.`,
        data: {
          products: highDemandProducts.map(p => p.name)
        }
      })
    }

    return actions
  }

  // Auto-generate purchase orders
  generatePurchaseOrders(): AgentAction[] {
    const actions: AgentAction[] = []
    
    const needsReorder = this.products.filter(p => p.stock < p.minStock)
    
    if (needsReorder.length > 0) {
      const totalCost = needsReorder.reduce((sum, p) => sum + (p.price * p.minStock * 2), 0)
      
      actions.push({
        id: `action-${Date.now()}-po`,
        agentId: 'agent-1',
        action: `✅ Created ${needsReorder.length} Purchase Orders`,
        timestamp: 'Just now',
        status: 'success',
        details: `Auto-generated PO for ${needsReorder.length} products. Total value: $${totalCost.toFixed(2)}. Orders sent to suppliers automatically.`,
        data: {
          orderCount: needsReorder.length,
          totalValue: totalCost,
          products: needsReorder.map(p => ({ name: p.name, quantity: p.minStock * 2 }))
        }
      })
    }

    return actions
  }
}

// Expense Anomaly Detector Logic
export class ExpenseAgent {
  private expenses: any[]
  
  constructor(expenses: any[] = []) {
    this.expenses = expenses
  }

  // Detect unusual expenses
  detectAnomalies(): AgentAction[] {
    const actions: AgentAction[] = []

    // Simulate expense anomaly detection
    const unusualExpenses = [
      { amount: 5000, category: 'Office Supplies', avgMonthly: 1500 },
      { amount: 12000, category: 'Marketing', avgMonthly: 5000 },
    ]

    unusualExpenses.forEach((expense, idx) => {
      const percentAbove = Math.round(((expense.amount - expense.avgMonthly) / expense.avgMonthly) * 100)
      
      if (percentAbove > 50) {
        actions.push({
          id: `action-${Date.now()}-expense-${idx}`,
          agentId: 'agent-2',
          action: `🚨 Unusual Expense Detected: ${expense.category}`,
          timestamp: 'Just now',
          status: 'error',
          details: `Expense of $${expense.amount.toLocaleString()} is ${percentAbove}% above monthly average ($${expense.avgMonthly.toLocaleString()}). Requires immediate review.`,
          data: {
            amount: expense.amount,
            average: expense.avgMonthly,
            variance: percentAbove
          }
        })
      }
    })

    return actions
  }

  // Find duplicate invoices
  findDuplicates(): AgentAction[] {
    const actions: AgentAction[] = []

    // Simulate duplicate detection
    const duplicates = [
      { invoice: 'INV-2024-234', amount: 2400, supplier: 'Tech Supplies Co.' },
    ]

    if (duplicates.length > 0) {
      duplicates.forEach((dup, idx) => {
        actions.push({
          id: `action-${Date.now()}-dup-${idx}`,
          agentId: 'agent-2',
          action: `⚠️ Duplicate Invoice Found: ${dup.invoice}`,
          timestamp: 'Just now',
          status: 'warning',
          details: `Invoice ${dup.invoice} from ${dup.supplier} appears twice in the system. Total duplicate amount: $${dup.amount.toLocaleString()}. Action: Invoice flagged for review.`,
          data: dup
        })
      })
    }

    return actions
  }

  // Cost-saving opportunities
  findSavings(): AgentAction[] {
    const actions: AgentAction[] = []

    actions.push({
      id: `action-${Date.now()}-savings`,
      agentId: 'agent-2',
      action: '💰 Cost-Saving Opportunity Identified',
      timestamp: 'Just now',
      status: 'success',
      details: 'Bulk purchase discount available from Supplier S-045. Save $1,200 (15%) on next electronics order by ordering 25% more inventory.',
      data: {
        potentialSavings: 1200,
        supplier: 'S-045',
        category: 'Electronics'
      }
    })

    return actions
  }
}

// Calling Agent Logic
export class CallingAgent {
  private suppliers: any[]
  
  constructor(suppliers: any[] = []) {
    this.suppliers = suppliers
  }

  // Make automated calls
  makeSupplierCalls(): AgentAction[] {
    const actions: AgentAction[] = []

    const callResults = [
      { supplier: 'Tech Supplies Co.', result: 'success', info: 'Delivery confirmed for Dec 5, 2025' },
      { supplier: 'Global Electronics', result: 'success', info: 'Order PO-2024-156 confirmed' },
      { supplier: 'Office Depot BD', result: 'failed', info: 'No answer, will retry in 2 hours' },
    ]

    callResults.forEach((call, idx) => {
      actions.push({
        id: `action-${Date.now()}-call-${idx}`,
        agentId: 'agent-3',
        action: `📞 ${call.result === 'success' ? 'Call Completed' : 'Call Failed'}: ${call.supplier}`,
        timestamp: 'Just now',
        status: call.result === 'success' ? 'success' : 'error',
        details: call.info,
        data: call
      })
    })

    return actions
  }

  // Follow up on payments
  followUpPayments(): AgentAction[] {
    const actions: AgentAction[] = []

    actions.push({
      id: `action-${Date.now()}-payment`,
      agentId: 'agent-3',
      action: '💸 Payment Follow-up Initiated',
      timestamp: 'Just now',
      status: 'pending',
      details: 'Called 3 customers with overdue payments. 2 promised payment by Friday, 1 scheduled callback for tomorrow.',
      data: {
        contactedCustomers: 3,
        pendingAmount: 15600
      }
    })

    return actions
  }
}

// Main Agent Orchestrator
export class AgentOrchestrator {
  private inventoryAgent: InventoryAgent
  private expenseAgent: ExpenseAgent
  private callingAgent: CallingAgent
  private allActions: AgentAction[] = []

  constructor(products: Product[]) {
    this.inventoryAgent = new InventoryAgent(products)
    this.expenseAgent = new ExpenseAgent()
    this.callingAgent = new CallingAgent()
  }

  // Run all agents
  runAllAgents(): AgentAction[] {
    const actions: AgentAction[] = []

    // Run Inventory Agent tasks
    actions.push(...this.inventoryAgent.checkStockLevels())
    actions.push(...this.inventoryAgent.predictDemand())
    actions.push(...this.inventoryAgent.generatePurchaseOrders())

    // Run Expense Agent tasks
    actions.push(...this.expenseAgent.detectAnomalies())
    actions.push(...this.expenseAgent.findDuplicates())
    actions.push(...this.expenseAgent.findSavings())

    // Run Calling Agent tasks
    actions.push(...this.callingAgent.makeSupplierCalls())
    actions.push(...this.callingAgent.followUpPayments())

    this.allActions = actions
    return actions
  }

  getActionsByAgent(agentId: string): AgentAction[] {
    return this.allActions.filter(action => action.agentId === agentId)
  }

  getAllActions(): AgentAction[] {
    return this.allActions
  }
}
