import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function Login() {
  const { authenticated, login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setErro('')
    setSubmitting(true)

    try {
      await login(email, senha)

      const destino =
        location.state?.from?.pathname || '/dashboard'

      navigate(destino, { replace: true })
    } catch (error) {
      setErro(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <h1>Wortek Store</h1>
      <h2>Entrar no sistema</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {erro && (
          <p role="alert">
            {erro}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'A entrar...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}

export default Login