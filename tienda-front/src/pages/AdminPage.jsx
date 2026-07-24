import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import apiClient from '../api/apiClient'
import AdminStats from '../components/admin/AdminStats'
import ClientList from '../components/admin/ClientList'
import OrderList from '../components/admin/OrderList'
import ProductManager from '../components/admin/ProductManager'
import { showError } from '../utils/alerts'

function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [clients, setClients] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [loadingClients, setLoadingClients] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)

  const loadDashboardData = async (showAlert = false) => {
    try {
      setLoading(true)

      const [clientsRes, ordersRes, productsRes] = await Promise.all([
        apiClient.get('/users'),
        apiClient.get('/orders'),
        apiClient.get('/products'),
      ])

      setClients(clientsRes.data)
      setOrders(ordersRes.data)
      setProducts(productsRes.data)
    } catch (error) {
      console.error('Error al cargar datos del panel', error)

      if (showAlert) {
        showError(
          'Error al cargar el panel',
          error.response?.data?.error || 'No se pudieron obtener los datos del administrador'
        )
      }
    } finally {
      setLoading(false)
      setLoadingClients(false)
      setLoadingOrders(false)
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    loadDashboardData(true)
  }, [])

  const menuItems = [
    { key: 'dashboard', label: 'Panel de administración' },
    { key: 'clients', label: 'Lista de clientes' },
    { key: 'orders', label: 'Lista de pedidos' },
    { key: 'products', label: 'Gestión de productos' },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-600">
                    Dashboard
                  </p>
                  <h1 className="mt-3 text-3xl font-bold text-slate-800">
                    Panel de administración
                  </h1>
                  <p className="mt-2 max-w-2xl text-slate-500">
                    Supervisa clientes, pedidos y productos desde un panel central con acceso a las funciones principales de la tienda.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Clientes</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {clients.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Pedidos</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {orders.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Productos</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {products.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <AdminStats
              clientsCount={clients.length}
              ordersCount={orders.length}
              productsCount={products.length}
            />

            <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-600">
                    Resumen general
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    Estado actual del sistema
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Usuarios registrados</p>
                  <p className="mt-3 text-3xl font-bold text-slate-800">
                    {clients.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Pedidos totales</p>
                  <p className="mt-3 text-3xl font-bold text-slate-800">
                    {orders.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Productos activos</p>
                  <p className="mt-3 text-3xl font-bold text-slate-800">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'clients':
        return (
          <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-600">
                Clientes
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800">
                Lista de clientes
              </h1>
              <p className="mt-2 text-slate-500">
                Consulta todos los clientes registrados en la plataforma.
              </p>
            </div>

            <ClientList clients={clients} loading={loadingClients} />
          </div>
        )

      case 'orders':
        return (
          <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-600">
                Pedidos
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800">
                Lista de pedidos
              </h1>
              <p className="mt-2 text-slate-500">
                Revisa y actualiza el estado de los pedidos realizados por los clientes.
              </p>
            </div>

            <OrderList
              orders={orders}
              loading={loadingOrders}
              reloadOrders={loadDashboardData}
            />
          </div>
        )

      case 'products':
        return (
          <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-600">
                Productos
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-800">
                Gestión de productos
              </h1>
              <p className="mt-2 text-slate-500">
                Crea, edita y elimina productos disponibles en la tienda.
              </p>
            </div>

            <ProductManager onProductChanged={loadDashboardData} />

            {loadingProducts && (
              <p className="mt-4 text-slate-500">Cargando productos...</p>
            )}
          </div>
        )

      default:
        return null
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
            transform: translateY(-20px) rotate(18deg);
            opacity: 0.32;
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
        {/* Fondo suave */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-100px] top-[-90px] h-80 w-80 rounded-full bg-cyan-200/45 blur-3xl" />
          <div className="absolute right-[-100px] top-1/4 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="absolute bottom-[-100px] left-1/3 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />
        </div>

        {/* Figuras flotantes */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[5%] top-[12%] h-10 w-10 rounded-full bg-cyan-300/40"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[14%] top-[26%] h-12 w-12 rounded-2xl bg-emerald-300/35"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[28%] top-[10%] h-12 w-12 bg-sky-300/35"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[42%] top-[20%] h-14 w-14 bg-cyan-300/30"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[58%] top-[12%] h-10 w-10 rounded-full border-2 border-emerald-300/50"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[72%] top-[18%] h-14 w-14 rotate-45 rounded-xl bg-lime-200/35"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[84%] top-[28%] h-10 w-10 bg-cyan-200/35"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[92%] top-[14%] h-12 w-12 bg-emerald-200/30"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[8%] top-[72%] h-16 w-16 rounded-3xl border border-cyan-300/35 bg-white/20"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[24%] top-[82%] h-14 w-14 bg-sky-200/30"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[40%] top-[76%] h-11 w-11 rounded-full bg-emerald-200/40"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[56%] top-[80%] h-16 w-16 bg-cyan-200/25"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[72%] top-[72%] h-12 w-12 rounded-2xl bg-teal-200/35"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[84%] h-10 w-10 rounded-full border-2 border-sky-300/45"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
            <div className="grid min-h-[calc(100vh-120px)] gap-6 lg:grid-cols-[290px_1fr]">
              <aside className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-2xl backdrop-blur-md lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
                    Admin panel
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-800">
                    Dashboard
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Panel principal de gestión de la tienda.
                  </p>
                </div>

                <nav className="mt-6 space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveSection(item.key)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        activeSection === item.key
                          ? 'bg-cyan-500 text-white shadow-lg'
                          : 'bg-transparent text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </aside>

              <section className="min-w-0">
                <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl backdrop-blur-md md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Vista actual</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-800">
                      {menuItems.find((item) => item.key === activeSection)?.label}
                    </h2>
                  </div>

                  <Link
                    to="/admin/create-admin"
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Crear administrador
                  </Link>
                </header>

                {loading ? (
                  <div className="rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-xl backdrop-blur-md">
                    <p className="text-slate-500">
                      Cargando panel de administración...
                    </p>
                  </div>
                ) : (
                  renderContent()
                )}
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminPage