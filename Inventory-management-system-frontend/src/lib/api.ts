const API_BASE_URL = 'http://127.0.0.1:8000'

// Products
export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/`)
  return response.json()
}

export const createProduct = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateProduct = async (id: number, data: any) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

// Categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/`)
  return response.json()
}

export const createCategory = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Warehouses
export const getWarehouses = async () => {
  const response = await fetch(`${API_BASE_URL}/warehouses/`)
  return response.json()
}

export const createWarehouse = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/warehouses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Outlets
export const getOutlets = async () => {
  const response = await fetch(`${API_BASE_URL}/outlets/`)
  return response.json()
}

export const createOutlet = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/outlets/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Customers
export const getCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers/`)
  return response.json()
}

export const createCustomer = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/customers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Stock Movements
export const getStockMovements = async () => {
  const response = await fetch(`${API_BASE_URL}/stock-movements/`)
  return response.json()
}

export const createStockMovement = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/stock-movements/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}
