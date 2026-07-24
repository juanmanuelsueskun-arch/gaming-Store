import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import apiClient from '../api/apiClient'

function AdminOrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get(`/orders/${id}`)
        setOrder(response.data)
      } catch (err) {
        setError('No se pudo cargar el detalle del pedido')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
          ← Volver al panel admin
        </Link>

        {loading && <p className="mt-6 text-slate-400">Cargando detalle...</p>}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-6 space-y-6">
            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h1 className="text-3xl font-bold">Pedido #{order.id}</h1>
              <p className="mt-2 text-slate-400">
                Cliente: {order.usuarios?.nombre}
              </p>
              <p className="mt-1 text-slate-400">
                Email: {order.usuarios?.email}
              </p>
              <p className="mt-1 text-slate-400">
                Estado: {order.estado}
              </p>
              <p className="mt-1 text-slate-400">
                Total: ${Number(order.total).toLocaleString()}
              </p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="mb-4 text-2xl font-bold">Productos del pedido</h2>

              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/60 p-4"
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {item.productos?.nombre}
                      </p>
                      <p className="text-sm text-slate-400">
                        Cantidad: {item.cantidad}
                      </p>
                    </div>

                    <p className="font-semibold text-cyan-400">
                      ${Number(item.precio_unitario).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminOrderDetailPage