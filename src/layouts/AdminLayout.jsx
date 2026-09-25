import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <header>
        <strong>Wortek Store</strong>

        <div>
          <span>
            {user.nome} — {user.perfil.nome}
          </span>

          {' '}

          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout