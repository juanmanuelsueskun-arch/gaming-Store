import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import apiClient from '../api/apiClient'

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders/user')
        setOrders(response.data)
      } catch (err) {
        setError('No se pudieron cargar tus pedidos')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Estilos de estado adaptados para el fondo oscuro y estética gamer recta
  const getStatusClasses = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      case 'Rechazado':
        return 'border border-red-500/30 bg-red-500/10 text-red-400'
      case 'Enviado':
        return 'border border-blue-500/30 bg-blue-500/10 text-blue-400'
      case 'Entregado':
        return 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
      default:
        return 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
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

          {/* Ajuste de pt-28 para evitar que la Navbar fija tape el título */}
          <main className="mx-auto max-w-6xl px-4 pt-28 pb-8">

            {/* Cabecera de la Sección */}
            <section className="mb-6 border border-pink-500/20 bg-black/40 p-6 shadow-[0_0_30px_rgba(236,72,153,0.05)] backdrop-blur-md">
              <h1 className="text-2xl font-bold font-gamer uppercase tracking-wide text-white md:text-3xl drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                Mis pedidos
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Consulta el historial, estado de envío y el total de tus compras realizadas.
              </p>
            </section>

            {/* Estado de Carga */}
            {loading && (
              <div className="border border-white/5 bg-white/[0.02] p-6 text-slate-400 shadow-lg backdrop-blur-sm font-gamer uppercase tracking-widest text-center">
                Cargando pedidos...
              </div>
            )}

            {/* Mensaje de Error */}
            {error && (
              <div className="border border-red-500/30 bg-red-500/10 p-4 text-red-400 font-bold font-gamer uppercase tracking-wide">
                {error}
              </div>
            )}

            {/* Listado Vacío */}
            {!loading && !error && orders.length === 0 && (
              <div className="border border-white/5 bg-white/[0.02] p-6 text-slate-400 shadow-lg backdrop-blur-sm font-gamer uppercase tracking-wider text-center">
                Aún no tienes pedidos registrados en tu cuenta.
              </div>
            )}

            {/* Listado Dinámico de Pedidos */}
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  to={`/orders/${order.id}`}
                  key={order.id}
                  className="block border border-white/5 bg-white/[0.02] p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-bold font-gamer uppercase tracking-wide text-white">
                        Pedido #{order.id}
                      </h2>
                      <p className="mt-2 text-xs text-slate-400">
                        Fecha: {new Date(order.creado_en || order.fecha).toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm font-gamer tracking-wider text-cyan-400">
                        Total: ${Number(order.total).toLocaleString()}
                      </p>
                    </div>

                    {/* Insignia de Estado */}
                    <span
                      className={`inline-flex w-fit px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest ${getStatusClasses(order.estado)}`}
                    >
                      {order.estado}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default OrdersPage
