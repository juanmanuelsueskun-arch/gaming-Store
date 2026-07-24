import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../api/apiClient'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await apiClient.post('/auth/register', formData)
      setSuccess(response.data.mensaje || 'Usuario registrado correctamente')

      setFormData({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
      })

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario')
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

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-60px] top-[-60px] h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="absolute right-[-80px] top-1/4 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />
        </div>

        {/* Burbujas de colores */}
        <div className="pointer-events-none absolute inset-0">
          <span
            className="bubble left-[6%] h-16 w-16 bg-emerald-300/30"
            style={{ animationDuration: '6s', animationDelay: '0s' }}
          />
          <span
            className="bubble left-[14%] h-10 w-10 bg-cyan-300/30"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          />
          <span
            className="bubble left-[24%] h-24 w-24 bg-teal-200/25"
            style={{ animationDuration: '7s', animationDelay: '2s' }}
          />
          <span
            className="bubble left-[36%] h-14 w-14 bg-lime-200/25"
            style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}
          />
          <span
            className="bubble left-[48%] h-20 w-20 bg-sky-200/25"
            style={{ animationDuration: '6.5s', animationDelay: '3s' }}
          />
          <span
            className="bubble left-[58%] h-12 w-12 bg-green-200/25"
            style={{ animationDuration: '5s', animationDelay: '4s' }}
          />
          <span
            className="bubble left-[68%] h-28 w-28 bg-emerald-200/25"
            style={{ animationDuration: '8s', animationDelay: '2.5s' }}
          />
          <span
            className="bubble left-[78%] h-16 w-16 bg-blue-200/20"
            style={{ animationDuration: '6s', animationDelay: '5s' }}
          />
          <span
            className="bubble left-[88%] h-11 w-11 bg-yellow-200/25"
            style={{ animationDuration: '5.5s', animationDelay: '3.5s' }}
          />
        </div>

        {/* Card registro */}
        <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold text-slate-800">
            Crear cuenta
          </h1>

          <p className="mb-6 text-sm text-slate-500">
            Registra un nuevo cliente
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Nombre completo"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Correo electrónico"
            />

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Contraseña"
            />

            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Teléfono"
            />

            <input
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              placeholder="Dirección"
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Registrando...' : 'Registrarme'}
            </button>

            <p className="text-center text-sm text-slate-500">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage