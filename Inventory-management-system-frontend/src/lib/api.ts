const API_BASE_URL = 'http://127.0.0.1:8000'

const getAuthHeaders = (): HeadersInit => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = { ...options.headers, ...getAuthHeaders() } as HeadersInit;
  return fetch(url, { ...options, headers });
};


// Auth
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || 'Registration failed')
  }
  return response.json()
}

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || 'Login failed')
  }
  return response.json()
}

export const googleLoginUser = async (data: { token: string; name?: string; email?: string; avatar?: string }) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || 'Google login failed')
  }
  return response.json()
}

// Products
export const getProducts = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/products/`)
  return response.json()
}

export const createProduct = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateProduct = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteProduct = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Categories
export const getCategories = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/categories/`)
  return response.json()
}

export const getCategoriesSummary = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/categories/summary`)
  return response.json()
}

export const createCategory = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Warehouses
export const getWarehouses = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/warehouses/`)
  return response.json()
}

export const createWarehouse = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/warehouses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateWarehouse = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/warehouses/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteWarehouse = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/warehouses/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Outlets
export const getOutlets = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/outlets/`)
  return response.json()
}

export const createOutlet = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/outlets/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateOutlet = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/outlets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteOutlet = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/outlets/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Customers
export const getCustomers = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/customers/`)
  return response.json()
}

export const createCustomer = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/customers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateCustomer = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteCustomer = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Sales Memos
export const getSales = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/sales/`)
  return response.json()
}

export const createSale = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/sales/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateSale = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/sales/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteSale = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/sales/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Stock Movements
export const getStockMovements = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/stock-movements/`)
  return response.json()
}

export const createStockMovement = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/stock-movements/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteStockMovement = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/stock-movements/${id}`, {
    method: 'DELETE'
  })
  return response
}

// Staff
export const getStaff = async () => {
  const response = await fetchWithAuth(`${API_BASE_URL}/staff/`)
  return response.json()
}

export const createStaff = async (data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/staff/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const updateStaff = async (id: number, data: any) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/staff/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteStaff = async (id: number) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/staff/${id}`, {
    method: 'DELETE'
  })
  return response
}
