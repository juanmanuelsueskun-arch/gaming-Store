import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import apiClient from '../api/apiClient'
import { showError, showSuccess } from '../utils/alerts'

function CreateAdminPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
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
    setLoading(true)

    try {
      const response = await apiClient.post('/auth/register-admin', formData)

      setFormData({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
      })

      await showSuccess(
        'Administrador creado exitosamente',
        response.data.mensaje || 'El nuevo administrador fue registrado correctamente.'
      )

      navigate('/admin')
    } catch (err) {
      showError(
        'No se pudo crear el administrador',
        err.response?.data?.error || 'Ocurrió un error inesperado'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes floatShapeSoft {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.18;
          }
          50% {
            transform: translateY(-18px) rotate(16deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.18;
          }
        }

        .float-shape {
          position: absolute;
          animation: floatShapeSoft ease-in-out infinite;
          will-change: transform, opacity;
        }

        .shape-star {
          clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .shape-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-white text-slate-800">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-90px] top-[-80px] h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
          <div className="absolute right-[-90px] top-1/4 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
        </div>

        {/* Figuras flotantes */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[7%] top-[14%] h-10 w-10 rounded-full bg-cyan-300/40"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[18%] top-[28%] h-12 w-12 rounded-2xl bg-emerald-300/35"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[32%] top-[12%] h-12 w-12 bg-sky-300/35"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[46%] top-[22%] h-14 w-14 bg-cyan-300/30"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[60%] top-[12%] h-10 w-10 rounded-full border-2 border-emerald-300/50"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[73%] top-[20%] h-14 w-14 rotate-45 rounded-xl bg-lime-200/35"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[84%] top-[30%] h-10 w-10 bg-cyan-200/35"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[92%] top-[15%] h-12 w-12 bg-emerald-200/30"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[12%] top-[74%] h-16 w-16 rounded-3xl border border-cyan-300/35 bg-white/20"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[26%] top-[82%] h-14 w-14 bg-sky-200/30"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[42%] top-[76%] h-11 w-11 rounded-full bg-emerald-200/40"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[58%] top-[80%] h-16 w-16 bg-cyan-200/25"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[74%] top-[72%] h-12 w-12 rounded-2xl bg-teal-200/35"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[84%] h-10 w-10 rounded-full border-2 border-sky-300/45"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          <main className="mx-auto max-w-2xl px-4 py-8">
            <Link
              to="/admin"
              className="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
            >
              ← Volver al panel admin
            </Link>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <h1 className="mb-2 text-3xl font-bold text-slate-800">
                Crear administrador
              </h1>
              <p className="mb-6 text-slate-500">
                Registra un nuevo usuario con rol de administrador.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Contraseña"
                    className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                    className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Creando administrador...' : 'Crear administrador'}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default CreateAdminPage