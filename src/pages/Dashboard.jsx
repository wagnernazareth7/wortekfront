import {
  Package,
  ShoppingCart,
  Truck,
  WalletCards,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'

const indicators = [
  {
    label: 'Pedidos',
    icon: ShoppingCart,
  },
  {
    label: 'Produtos',
    icon: Package,
  },
  {
    label: 'Entregas',
    icon: Truck,
  },
  {
    label: 'Pagamentos',
    icon: WalletCards,
  },
]

function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-description">
            Bem-vindo, {user.nome}. Acompanhe as operações
            da Wortek Store a partir deste painel.
          </p>
        </div>
      </div>

      <section className="dashboard-grid">
        {indicators.map((indicator) => {
          const Icon = indicator.icon

          return (
            <article
              className="dashboard-card"
              key={indicator.label}
            >
              <Icon size={21} />

              <p className="dashboard-card-label">
                {indicator.label}
              </p>

              <p className="dashboard-card-value">
                —
              </p>
            </article>
          )
        })}
      </section>

      <section className="content-card">
        <h2>Actividade operacional</h2>

        <p>
          Os indicadores e actividades aparecerão aqui à
          medida que os módulos operacionais forem ligados
          ao backend.
        </p>
      </section>
    </>
  )
}

export default Dashboard