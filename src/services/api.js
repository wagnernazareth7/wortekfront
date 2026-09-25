const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  let data

  try {
    data = await response.json()
  } catch {
    data = {
      success: false,
      message: 'Resposta inválida recebida do servidor.',
    }
  }

  if (!response.ok) {
    const error = new Error(
      data.message || 'Ocorreu um erro ao comunicar com o servidor.',
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

export const api = {
  health() {
    return request('/health')
  },

  login(email, senha) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })
  },

  me() {
    return request('/me')
  },

  logout() {
    return request('/logout', {
      method: 'POST',
    })
  },

  getClientes(search = '') {
    const query = search.trim()
      ? `?search=${encodeURIComponent(search.trim())}`
      : ''

    return request(`/clientes${query}`)
  },

  getCliente(id) {
    return request(`/clientes/${id}`)
  },

  createCliente(data) {
    return request('/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  updateCliente(id, data) {
    return request(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
}

export default api