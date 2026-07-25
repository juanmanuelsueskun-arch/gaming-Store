import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { showConfirm, showError, showSuccess } from '../../utils/alerts'

function OrderList({ orders, loading, reloadOrders }) {
  const [updatingId, setUpdatingId] = useState(null)

  const updateStatus = async (id, estado) => {
    const result = await showConfirm(
      '¿Cambiar estado del pedido?',
      `El pedido #${id} se marcará como "${estado}".`
    )

    if (!result.isConfirmed) return

    try {
      setUpdatingId(id)

      await apiClient.put(`/orders/${id}/status`, { estado })

      await showSuccess(
        'Estado actualizado',
        `El pedido #${id} ahora está en estado "${estado}".`
      )

      reloadOrders()
    } catch (error) {
      showError(
        'No se pudo actualizar el pedido',
        error.response?.data?.error || 'Ocurrió un error inesperado'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusClasses = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      case 'Rechazado':
        return 'border border-rose-500/30 bg-rose-500/10 text-rose-400'
      case 'Enviado':
        return 'border border-blue-500/30 bg-blue-500/10 text-blue-400'
      case 'Entregado':
        return 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
      default:
        return 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md animate-pulse">
        Cargando pedidos...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md">
        No hay pedidos registrados.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-500/20"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold font-gamer tracking-wider text-white uppercase">
                  Pedido #{order.id}
                </h3>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold font-gamer uppercase tracking-wider ${getStatusClasses(order.estado)}`}
                >
                  {order.estado}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                Cliente: <span className="font-semibold text-white">{order.usuarios?.nombre || 'Sin nombre'}</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Email: {order.usuarios?.email || 'Sin email'}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Total: <span className="font-bold text-cyan-400 font-gamer text-base">${Number(order.total).toLocaleString()}</span>
              </p>

              <Link
                to={`/admin/orders/${order.id}`}
                className="mt-4 inline-flex rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-bold text-cyan-400 font-gamer uppercase tracking-widest transition hover:bg-cyan-500/20"
              >
                Ver detalle
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => updateStatus(order.id, 'Aprobado')}
                disabled={updatingId === order.id}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-emerald-400 transition hover:bg-emerald-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {updatingId === order.id ? '...' : 'Aprobar'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Rechazado')}
                disabled={updatingId === order.id}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-rose-400 transition hover:bg-rose-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {updatingId === order.id ? '...' : 'Rechazar'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Enviado')}
                disabled={updatingId === order.id}
                className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-blue-400 transition hover:bg-blue-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {updatingId === order.id ? '...' : 'Enviado'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Entregado')}
                disabled={updatingId === order.id}
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {updatingId === order.id ? '...' : 'Entregado'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default OrderList