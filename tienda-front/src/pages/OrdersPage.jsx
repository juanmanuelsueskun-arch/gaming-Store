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

  const getStatusClasses = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
      case 'Rechazado':
        return 'border border-red-200 bg-red-50 text-red-600'
      case 'Enviado':
        return 'border border-blue-200 bg-blue-50 text-blue-700'
      case 'Entregado':
        return 'border border-cyan-200 bg-cyan-50 text-cyan-700'
      default:
        return 'border border-amber-200 bg-amber-50 text-amber-700'
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

          <main className="mx-auto max-w-6xl px-4 py-8">
            <section className="mb-6 rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <h1 className="text-3xl font-bold text-slate-800">Mis pedidos</h1>
              <p className="mt-2 text-slate-500">
                Consulta el estado y el total de cada pedido realizado.
              </p>
            </section>

            {loading && (
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-slate-500 shadow-lg backdrop-blur-md">
                Cargando pedidos...
              </div>
            )}

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50/90 p-4 text-red-600 shadow-sm">
                {error}
              </div>
            )}

            {!loading && !error && orders.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-slate-500 shadow-lg backdrop-blur-md">
                Aún no tienes pedidos registrados.
              </div>
            )}

            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  to={`/orders/${order.id}`}
                  key={order.id}
                  className="block rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Pedido #{order.id}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Fecha: {new Date(order.creado_en || order.fecha).toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Total: ${Number(order.total).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(order.estado)}`}
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