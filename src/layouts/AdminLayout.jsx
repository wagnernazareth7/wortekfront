import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom'

import { navigationGroups } from '../config/navigation'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const {
    user,
    logout,
    hasPermission,
  } = useAuth()

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  const visibleGroups = navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        hasPermission(item.permission),
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div
      className={`admin-shell ${collapsed ? 'sidebar-collapsed' : ''
        }`}
    >
      <aside
        className={`sidebar ${mobileOpen ? 'sidebar-mobile-open' : ''
          }`}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">W</div>

          {!collapsed && (
            <div className="brand-text">
              <strong>WORTEK</strong>
              <span>STORE</span>
            </div>
          )}

          <button
            type="button"
            className="sidebar-close-mobile"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-navigation">
          {visibleGroups.map((group) => (
            <div
              className="navigation-group"
              key={group.label}
            >
              {!collapsed && (
                <p className="navigation-group-title">
                  {group.label}
                </p>
              )}

              {group.items.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `navigation-item ${isActive ? 'active' : ''
                      }`
                    }
                  >
                    <Icon size={19} />

                    {!collapsed && (
                      <span>{item.label}</span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="collapse-button"
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? (
              <ChevronRight size={19} />
            ) : (
              <>
                <ChevronLeft size={19} />
                <span>Recolher menu</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          <div className="header-spacer" />

          <div className="header-user">
            <div className="user-avatar">
              {user.nome
                .split(' ')
                .slice(0, 2)
                .map((name) => name[0])
                .join('')
                .toUpperCase()}
            </div>

            <div className="user-details">
              <strong>{user.nome}</strong>
              <span>{user.perfil.nome}</span>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
              title="Terminar sessão"
            >
              <LogOut size={19} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout