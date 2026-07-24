function AdminStats({ clientsCount, ordersCount, productsCount }) {
  const stats = [
    { label: 'Clientes', value: clientsCount, color: 'text-cyan-400' },
    { label: 'Pedidos', value: ordersCount, color: 'text-emerald-400' },
    { label: 'Productos', value: productsCount, color: 'text-violet-400' },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl"
        >
          <p className="text-sm text-slate-400">{stat.label}</p>
          <h2 className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</h2>
        </article>
      ))}
    </section>
  )
}

export default AdminStats