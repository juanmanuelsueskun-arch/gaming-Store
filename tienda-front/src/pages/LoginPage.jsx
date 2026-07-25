import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../api/apiClient'
import { useAuth } from '../context/AuthContext'
import { showError, showSuccess } from '../utils/alerts'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) {
      return showError(
        'Campos incompletos',
        'Debes ingresar el correo y la contraseña.'
      )
    }

    setLoading(true)

    try {
      const response = await apiClient.post('/auth/login', formData)
      const data = response.data

      login(data)

      await showSuccess(
        'Inicio de sesión exitoso',
        `Bienvenido ${data.user?.nombre || ''}`
      )

      if (data.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/shop')
      }
    } catch (err) {
      showError(
        'Error al iniciar sesión',
        err.response?.data?.error || 'Credenciales inválidas'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Panel izquierdo: imagen hero ── */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-3/5">
        <img
          src="/src/assets/login-hero.webp"
          alt="Tienda hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-cyan-900/50 to-transparent" />

        {/* Texto de marca sobre la imagen */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <span className="mb-3 inline-block w-fit rounded-full bg-cyan-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300 ring-1 ring-cyan-500/30">
            Tu tienda en línea
          </span>
          <h2 className="text-5xl font-extrabold leading-tight text-white">
            Descubre lo<br />mejor de la tienda
          </h2>
          <p className="mt-4 max-w-sm text-base text-slate-300/80">
            Productos exclusivos, los mejores precios y una experiencia de compra sin igual.
          </p>
        </div>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2 xl:w-2/5">
        {/* Detalles decorativos de fondo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Icono + título */}
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Iniciar sesión
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Entra con tu cuenta de cliente o administrador
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-fuchsia-500 px-4 py-3 font-semibold text-white shadow-md shadow-fuchsia-500/20 transition hover:bg-fuchsia-600 hover:shadow-fuchsia-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="text-center text-sm text-slate-500">
              ¿No tienes cuenta?{' '}
              <Link
                to="/register"
                className="font-medium text-fuchsia-600 hover:text-fuchsia-700"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  )
}

export default LoginPage