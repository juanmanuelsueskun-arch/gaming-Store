function AdminStats({ clientsCount, ordersCount, productsCount }) {
  const stats = [
    { label: 'Clientes Registrados', value: clientsCount, color: 'text-cyan-400 text-glow-cyan', borderColor: 'hover:border-cyan-500/30' },
    { label: 'Pedidos Realizados', value: ordersCount, color: 'text-fuchsia-400', borderColor: 'hover:border-fuchsia-500/30' },
    { label: 'Productos en Catálogo', value: productsCount, color: 'text-emerald-400', borderColor: 'hover:border-emerald-500/30' },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className={`rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${stat.borderColor}`}
        >
          <p className="text-xs font-bold text-slate-400 font-gamer uppercase tracking-widest">{stat.label}</p>
          <h2 className={`mt-3 text-4xl font-extrabold font-gamer tracking-wider ${stat.color}`}>{stat.value}</h2>
        </article>
      ))}
    </section>
  )
}

export default AdminStats