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
    <>
      <style>{`
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.22;
          }
          100% {
            transform: translateY(-110vh) scale(1.18);
            opacity: 0;
          }
        }

        .bubble {
          position: absolute;
          bottom: -120px;
          border-radius: 9999px;
          animation-name: bubbleFloat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: blur(1px);
        }
      `}</style>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-60px] top-[-60px] h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="absolute right-[-80px] top-1/4 h-80 w-80 rounded-full bg-fuchsia-200/30 blur-3xl" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        {/* Burbujas de colores */}
        <div className="pointer-events-none absolute inset-0">
          <span
            className="bubble left-[6%] h-16 w-16 bg-cyan-300/30"
            style={{ animationDuration: '8s', animationDelay: '0s' }}
          />
          <span
            className="bubble left-[14%] h-10 w-10 bg-sky-300/30"
            style={{ animationDuration: '6s', animationDelay: '1.5s' }}
          />
          <span
            className="bubble left-[24%] h-24 w-24 bg-blue-200/30"
            style={{ animationDuration: '9s', animationDelay: '2s' }}
          />
          <span
            className="bubble left-[36%] h-14 w-14 bg-violet-200/25"
            style={{ animationDuration: '7s', animationDelay: '3.5s' }}
          />
          <span
            className="bubble left-[48%] h-20 w-20 bg-fuchsia-200/25"
            style={{ animationDuration: '10s', animationDelay: '1s' }}
          />
          <span
            className="bubble left-[58%] h-12 w-12 bg-rose-200/25"
            style={{ animationDuration: '6s', animationDelay: '4.5s' }}
          />
          <span
            className="bubble left-[68%] h-28 w-28 bg-emerald-200/25"
            style={{ animationDuration: '11s', animationDelay: '2.5s' }}
          />
          <span
            className="bubble left-[78%] h-16 w-16 bg-teal-300/25"
            style={{ animationDuration: '8s', animationDelay: '5s' }}
          />
          <span
            className="bubble left-[88%] h-11 w-11 bg-amber-200/25"
            style={{ animationDuration: '7s', animationDelay: '6s' }}
          />
        </div>

        {/* Tarjeta login */}
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold text-slate-800">
            Iniciar sesión
          </h1>

          <p className="mb-6 text-sm text-slate-500">
            Entra con tu cuenta de cliente o administrador
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-600">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="text-center text-sm text-slate-500">
              ¿No tienes cuenta?{' '}
              <Link
                to="/register"
                className="font-medium text-cyan-600 hover:text-cyan-700"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage