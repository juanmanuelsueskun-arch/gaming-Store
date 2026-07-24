function ClientList({ clients, loading }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
        Cargando clientes...
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
        No hay clientes registrados.
      </div>
    )
  }

  const getRoleClasses = (rol) => {
    switch (rol?.toLowerCase()) {
      case 'admin':
        return 'border border-cyan-200 bg-cyan-50 text-cyan-700'
      case 'cliente':
        return 'border border-emerald-200 bg-emerald-50 text-emerald-700'
      default:
        return 'border border-slate-200 bg-slate-50 text-slate-600'
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/75 shadow-lg backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Nombre
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Teléfono
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Rol
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className={`transition hover:bg-cyan-50/50 ${
                  index !== clients.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <td className="px-4 py-4 text-sm font-medium text-slate-800">
                  {client.nombre}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {client.email}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {client.telefono || 'Sin teléfono'}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleClasses(client.rol)}`}
                  >
                    {client.rol}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientList