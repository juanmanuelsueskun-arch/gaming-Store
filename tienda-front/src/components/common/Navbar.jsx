import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, rol, logout, isAuthenticated } = useAuth()
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          to={rol === 'admin' ? '/admin' : '/shop'}
          className="text-xl font-bold text-slate-800 transition hover:text-cyan-600"
          onClick={closeMenu}
        >
          Tienda Online
        </Link>

        {isAuthenticated && (
          <>
            {/* Desktop: desde 600px en adelante */}
            <nav className="hidden min-[600px]:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-2 py-2 shadow-sm backdrop-blur-md">
              {rol === 'cliente' && (
                <>
                  <Link
                    to="/shop"
                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                  >
                    Productos
                  </Link>

                  <Link
                    to="/cart"
                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                  >
                    Carrito ({totalItems})
                  </Link>

                  <Link
                    to="/orders"
                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                  >
                    Mis pedidos
                  </Link>
                </>
              )}

              {rol === 'admin' && (
                <Link
                  to="/admin"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                >
                  Dashboard
                </Link>
              )}

              <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                {user?.nombre}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                Salir
              </button>
            </nav>

            {/* Botón hamburguesa: menos de 600px */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 min-[600px]:hidden"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Menú móvil: menos de 600px */}
      {isAuthenticated && menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-4 pt-3 shadow-sm backdrop-blur-md min-[600px]:hidden">
          <nav className="flex flex-col gap-2">
            <div className="mb-2 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
              {user?.nombre}
            </div>

            {rol === 'cliente' && (
              <>
                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                >
                  Productos
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                >
                  Carrito ({totalItems})
                </Link>

                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
                >
                  Mis pedidos
                </Link>
              </>
            )}

            {rol === 'admin' && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-600"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="mt-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              Salir
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar