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

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
        Cargando pedidos...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
        No hay pedidos registrados.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-800">
                  Pedido #{order.id}
                </h3>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(order.estado)}`}
                >
                  {order.estado}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                Cliente: {order.usuarios?.nombre || 'Sin nombre'}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Email: {order.usuarios?.email || 'Sin email'}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Total: ${Number(order.total).toLocaleString()}
              </p>

              <Link
                to={`/admin/orders/${order.id}`}
                className="mt-3 inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100"
              >
                Ver detalle
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(order.id, 'Aprobado')}
                disabled={updatingId === order.id}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingId === order.id ? 'Procesando...' : 'Aprobar'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Rechazado')}
                disabled={updatingId === order.id}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingId === order.id ? 'Procesando...' : 'Rechazar'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Enviado')}
                disabled={updatingId === order.id}
                className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingId === order.id ? 'Procesando...' : 'Enviado'}
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Entregado')}
                disabled={updatingId === order.id}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingId === order.id ? 'Procesando...' : 'Entregado'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default OrderList