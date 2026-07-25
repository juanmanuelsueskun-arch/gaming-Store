import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
// IMPORTACIÓN DEL LOGO USANDO RUTA RELATIVA DE PROYECTO
import logoGamer from '../../assets/logo agmer.png'

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
    <header
      className="sticky top-0 z-50 bg-black shadow-[0_0_30px_rgba(236,72,153,0.25)] border-b border-pink-500/30"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Línea de acento neón superior */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-80" />

      <div className="flex items-center justify-between pl-1 pr-4 py-3">

        {/* CONTENEDOR DEL LOGO REEMPLAZADO */}
        <Link
          to={rol === 'admin' ? '/admin' : '/shop'}
          className="flex items-center justify-center transition-all hover:scale-105"
          onClick={closeMenu}
        >
          <img
            src={logoGamer}
            alt="Zona Gamer Logo"
            className="h-16 w-auto object-contain md:h-24 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]"
          />
        </Link>

        {isAuthenticated && (
          <>
            {/* Desktop: desde 600px */}
            <nav className="hidden min-[600px]:flex items-center gap-1 rounded-2xl border border-pink-500/20 bg-white/5 px-2 py-2 shadow-[0_0_20px_rgba(236,72,153,0.1)] backdrop-blur-md">

              {rol === 'cliente' && (
                <>
                  <Link
                    to="/shop"
                    className="rounded-xl px-4 py-2 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                    style={{ '--tw-ring-color': 'rgba(236,72,153,0.2)' }}
                  >
                    Productos
                  </Link>

                  <Link
                    to="/cart"
                    className="rounded-xl px-4 py-2 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                  >
                    Carrito ({totalItems})
                  </Link>

                  <Link
                    to="/orders"
                    className="rounded-xl px-4 py-2 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                  >
                    Mis pedidos
                  </Link>
                </>
              )}

              {rol === 'admin' && (
                <Link
                  to="/admin"
                  className="rounded-xl px-4 py-2 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Dashboard
                </Link>
              )}

              {/* Nombre de usuario */}
              <span
                className="rounded-xl border border-pink-500/20 bg-pink-500/5 px-3 py-2 text-sm font-gamer uppercase tracking-wider text-pink-300"
              >
                {user?.nombre}
              </span>

              {/* Botón Salir */}
              <button
                onClick={handleLogout}
                className="rounded-xl px-4 py-2 text-sm font-bold font-gamer uppercase tracking-widest text-black transition cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  boxShadow: '0 0 14px rgba(236,72,153,0.6)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(236,72,153,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 14px rgba(236,72,153,0.6)')}
              >
                Salir
              </button>
            </nav>

            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-500/30 bg-black text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)] transition hover:border-pink-500/60 hover:text-pink-300 min-[600px]:hidden cursor-pointer"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      {/* Menú móvil */}
      {isAuthenticated && menuOpen && (
        <div className="border-t border-pink-500/20 bg-black/95 px-4 pb-4 pt-3 shadow-[0_8px_30px_rgba(236,72,153,0.15)] backdrop-blur-md min-[600px]:hidden">
          <nav className="flex flex-col gap-2">
            <div className="mb-2 rounded-xl border border-pink-500/20 bg-pink-500/5 px-4 py-3 text-sm font-gamer uppercase tracking-wider text-pink-300">
              {user?.nombre}
            </div>

            {rol === 'cliente' && (
              <>
                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Productos
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Carrito ({totalItems})
                </Link>

                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
                >
                  Mis pedidos
                </Link>
              </>
            )}

            {rol === 'admin' && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-bold font-gamer uppercase tracking-wide text-slate-300 transition hover:bg-pink-500/10 hover:text-pink-400"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="mt-2 rounded-xl px-4 py-3 text-sm font-bold font-gamer uppercase tracking-widest text-black transition cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                boxShadow: '0 0 14px rgba(236,72,153,0.5)',
              }}
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