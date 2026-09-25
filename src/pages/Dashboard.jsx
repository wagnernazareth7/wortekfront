import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>

      <p>
        Bem-vindo, <strong>{user.nome}</strong>.
      </p>

      <p>
        Perfil: {user.perfil.nome}
      </p>

      <p>
        Permissões atribuídas: {user.permissoes.length}
      </p>
    </>
  )
}

export default Dashboard