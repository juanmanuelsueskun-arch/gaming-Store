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
            opacity: 0.10;
          }
          50% {
            transform: translateY(-18px) rotate(16deg);
            opacity: 0.22;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.10;
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

      {/* Fondo Negro Mate Profundo */}
      <div className="relative min-h-screen overflow-hidden bg-[#0c0d12] text-slate-100">

        {/* Glow ambiental de neón de baja opacidad */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-90px] top-[-80px] h-72 w-72 bg-pink-500/10 blur-[120px]" />
          <div className="absolute right-[-90px] top-1/4 h-80 w-80 bg-cyan-500/10 blur-[140px]" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 bg-pink-600/5 blur-[100px]" />
        </div>

        {/* Figuras flotantes adaptadas (Esquinas totalmente rectas) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[7%] top-[14%] h-10 w-10 bg-cyan-500/15"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[18%] top-[28%] h-12 w-12 bg-pink-500/15"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[32%] top-[12%] h-12 w-12 bg-cyan-400/10"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[46%] top-[22%] h-14 w-14 bg-pink-400/10"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[60%] top-[12%] h-10 w-10 border-2 border-pink-500/20"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[73%] top-[20%] h-14 w-14 rotate-45 bg-cyan-500/15"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[84%] top-[30%] h-10 w-10 bg-pink-500/10"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[92%] top-[15%] h-12 w-12 bg-cyan-500/15"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[12%] top-[74%] h-16 w-16 border border-cyan-500/20 bg-white/[0.02]"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[26%] top-[82%] h-14 w-14 bg-pink-500/10"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[42%] top-[76%] h-11 w-11 bg-cyan-500/15"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[58%] top-[80%] h-16 w-16 bg-pink-500/10"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[74%] top-[72%] h-12 w-12 bg-cyan-400/10"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[84%] h-10 w-10 border-2 border-pink-500/20"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />
          <main className="mx-auto max-w-2xl px-4 pt-28 pb-8">
            <Link
              to="/admin"
              className="inline-flex border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm font-bold font-gamer uppercase tracking-wider text-pink-400 transition hover:bg-pink-500/20"
            >
              ← Volver al panel admin
            </Link>

            {/* Contenedor del Formulario Estilo Cristal Oscuro Mate */}
            <div className="mt-6 border border-pink-500/20 bg-black/40 p-6 shadow-[0_0_30px_rgba(236,72,153,0.05)] backdrop-blur-md">
              <h1 className="text-2xl font-bold font-gamer uppercase tracking-wide text-white md:text-3xl drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                Crear administrador
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                Registra un nuevo usuario con rol de administrador.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Nombre */}
                <div className="border border-white/10 bg-white/[0.02] transition duration-200 focus-within:border-cyan-500 focus-within:bg-black/50">
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Input Email */}
                <div className="border border-white/10 bg-white/[0.02] transition duration-200 focus-within:border-cyan-500 focus-within:bg-black/50">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Input Contraseña */}
                <div className="border border-white/10 bg-white/[0.02] transition duration-200 focus-within:border-cyan-500 focus-within:bg-black/50">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Contraseña"
                    className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Input Teléfono */}
                <div className="border border-white/10 bg-white/[0.02] transition duration-200 focus-within:border-cyan-500 focus-within:bg-black/50">
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Input Dirección */}
                <div className="border border-white/10 bg-white/[0.02] transition duration-200 focus-within:border-cyan-500 focus-within:bg-black/50">
                  <input
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                    className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Botón Guardar con Degradado Rosa Mate Unificado */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full px-4 py-3 font-bold font-gamer uppercase tracking-widest text-black transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899, #db2777)',
                    boxShadow: '0 0 10px rgba(236,72,153,0.4)',
                  }}
                  onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 0 18px rgba(236,72,153,0.7)')}
                  onMouseLeave={e => !loading && (e.currentTarget.style.boxShadow = '0 0 10px rgba(236,72,153,0.4)')}
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