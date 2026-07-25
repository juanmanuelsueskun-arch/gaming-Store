function ClientList({ clients, loading }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md">
        Cargando clientes...
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md">
        No hay clientes registrados.
      </div>
    )
  }

  const getRoleClasses = (rol) => {
    switch (rol?.toLowerCase()) {
      case 'admin':
        return 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
      case 'cliente':
        return 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      default:
        return 'border border-slate-800 bg-slate-900 text-slate-400'
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 shadow-2xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b border-slate-800 bg-slate-900/40">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 font-gamer uppercase tracking-widest">
                Nombre
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 font-gamer uppercase tracking-widest">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 font-gamer uppercase tracking-widest">
                Teléfono
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 font-gamer uppercase tracking-widest">
                Rol
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className={`transition hover:bg-cyan-500/5 ${
                  index !== clients.length - 1 ? 'border-b border-slate-800/60' : ''
                }`}
              >
                <td className="px-4 py-4 text-sm font-semibold text-white">
                  {client.nombre}
                </td>
                <td className="px-4 py-4 text-sm text-slate-300">
                  {client.email}
                </td>
                <td className="px-4 py-4 text-sm text-slate-400">
                  {client.telefono || 'Sin teléfono'}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold font-gamer uppercase tracking-wider ${getRoleClasses(client.rol)}`}
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