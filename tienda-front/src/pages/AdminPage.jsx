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
            {/* Contenedor Gamer Principal con Neón Cian */}
            <div className="overflow-hidden border border-cyan-500/30 bg-[#0d1222]/90 p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-cyan-400">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 font-mono animate-pulse">
                    [ DASHBOARD_CORE ]
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-wider text-slate-100 font-mono">
                    Panel de administración
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-slate-400 font-mono">
                    Supervisa clientes, pedidos y productos desde un panel central con acceso a las funciones principales de la tienda.
                  </p>
                </div>

                {/* Grid de Contadores Estilo HUD de Videojuego */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 font-mono">
                  <div className="border border-purple-500/40 bg-slate-900/90 p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] text-purple-400">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Clientes</p>
                    <p className="mt-2 text-3xl font-black tracking-tighter">
                      {clients.length}
                    </p>
                  </div>

                  <div className="border border-pink-500/40 bg-slate-900/90 p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] text-pink-400">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Pedidos</p>
                    <p className="mt-2 text-3xl font-black tracking-tighter">
                      {orders.length}
                    </p>
                  </div>

                  <div className="border border-cyan-500/40 bg-slate-900/90 p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] text-cyan-400">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Productos</p>
                    <p className="mt-2 text-3xl font-black tracking-tighter">
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

            {/* Resumen General Estilo Telemetría Neón */}
            <div className="border border-purple-500/30 bg-[#0d1222]/90 p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)] relative before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-purple-500">
              <div className="flex items-center justify-between font-mono">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
                    // RESUMEN GENERAL
                  </p>
                  <h2 className="mt-2 text-xl font-black uppercase tracking-wide text-slate-100">
                    Estado actual del sistema
                  </h2>
                </div>
              </div>

              {/* Grid de Submódulos con Barras Decorativas */}
              <div className="mt-6 grid gap-4 md:grid-cols-3 font-mono">
                <div className="border border-slate-800 bg-slate-900/50 p-5 relative group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 left-0 h-[2px] w-12 bg-purple-500"></div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Usuarios registrados</p>
                  <p className="mt-3 text-3xl font-black text-slate-100">
                    {clients.length}
                  </p>
                  <div className="mt-3 h-1 w-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-purple-500 w-3/4 animate-pulse"></div>
                  </div>
                </div>

                <div className="border border-slate-800 bg-slate-900/50 p-5 relative group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 left-0 h-[2px] w-12 bg-pink-500"></div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pedidos totales</p>
                  <p className="mt-3 text-3xl font-black text-slate-100">
                    {orders.length}
                  </p>
                  <div className="mt-3 h-1 w-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-pink-500 w-2/4 animate-pulse"></div>
                  </div>
                </div>

                <div className="border border-slate-800 bg-slate-900/50 p-5 relative group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 left-0 h-[2px] w-12 bg-cyan-500"></div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Productos activos</p>
                  <p className="mt-3 text-3xl font-black text-slate-100">
                    {products.length}
                  </p>
                  <div className="mt-3 h-1 w-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-500 w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'clients':
        return (
          <div className="border border-purple-500/30 bg-[#0d1222]/90 p-6 shadow-[0_0_25px_rgba(168,85,247,0.15)] relative before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-purple-500">
            <div className="mb-6 font-mono">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
                // REGISTROS_RED
              </p>
              <h1 className="mt-2 text-2xl font-black text-slate-100 uppercase tracking-wider">
                Lista de clientes
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Consulta todos los clientes registrados en la plataforma.
              </p>
            </div>

            <ClientList clients={clients} loading={loadingClients} />
          </div>
        )

      case 'orders':
        return (
          <div className="border border-pink-500/30 bg-[#0d1222]/90 p-6 shadow-[0_0_25px_rgba(236,72,153,0.15)] relative before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-pink-500">
            <div className="mb-6 font-mono">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
                // LOG_TRANSACCIONES
              </p>
              <h1 className="mt-2 text-2xl font-black text-slate-100 uppercase tracking-wider">
                Lista de pedidos
              </h1>
              <p className="mt-2 text-sm text-slate-400">
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
          <div className="border border-cyan-500/30 bg-[#0d1222]/90 p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:bg-cyan-400">
            <div className="mb-6 font-mono">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                // ARSENAL_INVENTARIO
              </p>
              <h1 className="mt-2 text-2xl font-black text-slate-100 uppercase tracking-wider">
                Gestión de productos
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Crea, edita y elimina productos disponibles en la tienda.
              </p>
            </div>

            <ProductManager onProductChanged={loadDashboardData} />

            {loadingProducts && (
              <p className="mt-4 font-mono text-xs font-bold text-cyan-400 animate-pulse">[ CARGANDO_PRODUCTOS... ]</p>
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
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(18deg);
            opacity: 0.25;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
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

      {/* Contenedor Principal Gamer Oscuro */}
      <div className="relative min-h-screen overflow-hidden bg-[#070a13] text-slate-300 selection:bg-cyan-500 selection:text-black flex flex-col">
        {/* Línea superior estilo neón decorativa */}
        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(6,182,212,1)] z-50"></div>

        {/* Fondo con Brillos de Neón */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-100px] top-[-90px] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-[-100px] top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-100px] left-1/3 h-80 w-80 rounded-full bg-pink-500/5 blur-3xl" />
        </div>

        {/* Figuras flotantes adaptadas al entorno oscuro */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[5%] top-[12%] h-10 w-10 rounded-full bg-cyan-500/20"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[14%] top-[26%] h-12 w-12 rounded-2xl bg-purple-500/20"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[28%] top-[10%] h-12 w-12 bg-pink-500/20"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[42%] top-[20%] h-14 w-14 bg-cyan-500/15"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[58%] top-[12%] h-10 w-10 rounded-full border border-purple-500/30"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[72%] top-[18%] h-14 w-14 rotate-45 rounded-xl bg-pink-500/20"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[84%] top-[28%] h-10 w-10 bg-cyan-500/20"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[92%] top-[14%] h-12 w-12 bg-purple-500/15"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[8%] top-[72%] h-16 w-16 rounded-3xl border border-cyan-500/20 bg-slate-900/10"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[24%] top-[82%] h-14 w-14 bg-pink-500/15"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[40%] top-[76%] h-11 w-11 rounded-full bg-purple-500/20"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[56%] top-[80%] h-16 w-16 bg-cyan-500/10"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[72%] top-[72%] h-12 w-12 rounded-2xl bg-slate-900/20"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[84%] h-10 w-10 rounded-full border border-pink-500/30"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20 flex flex-col flex-1">
          <Navbar />

          {/* Layout Principal: Ocupa todo el alto restante y la Sidebar se ancla a la izquierda */}
          <div className="flex flex-1 w-full overflow-hidden">

            {/* SIDEBAR COMPLETAMENTE RECTA A LA IZQUIERDA (TODO EL ALTO) */}
            <aside className="w-72 bg-[#0b0f19] border-r border-slate-800/80 flex flex-col justify-between shrink-0 relative z-30">
              <div>
                {/* Cabecera Interna de la Sidebar */}
                <div className="p-6 border-b border-slate-900 bg-slate-950/60 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                      Admin panel
                    </p>
                  </div>
                  <h2 className="mt-2 text-xl font-black text-slate-100 uppercase tracking-wider">
                    Dashboard
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Panel principal de gestión de la tienda.
                  </p>
                </div>

                {/* Navegación Recta con Efecto Neón Activo */}
                <nav className="p-4 space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveSection(item.key)}
                      className={`w-full text-left text-xs font-mono font-bold tracking-wider uppercase px-4 py-3.5 transition-all duration-150 border-l-4 relative group
                        ${activeSection === item.key
                          ? 'bg-gradient-to-r from-cyan-950/40 to-slate-900 border-cyan-400 text-cyan-400 shadow-[inset_4px_0_12px_rgba(6,182,212,0.15)]'
                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
                        }`}
                    >
                      {item.label}
                      {activeSection === item.key && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rotate-45 shadow-[0_0_5px_rgba(6,182,212,1)]"></span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Pie de la Sidebar */}
              <div className="p-4 border-t border-slate-900 bg-slate-950/40 text-center font-mono text-[10px] text-slate-500">
                <span>SECURE_CONNECTION // TERMINAL_OK</span>
              </div>
            </aside>

            {/* CONTENIDO PRINCIPAL DE LA PÁGINA */}
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/30 via-[#070a13] to-[#070a13]">
              <div className="max-w-7xl mx-auto">

                {/* Header de la Vista Actual */}
                <header className="mb-6 flex flex-col gap-4 border border-slate-800/80 bg-slate-950/50 p-5 shadow-xl backdrop-blur-md md:flex-row md:items-center md:justify-between relative before:absolute before:bottom-0 before:right-0 before:w-2 before:h-2 before:bg-purple-500">
                  <div className="font-mono">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Vista actual</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-100 uppercase tracking-wider">
                      {menuItems.find((item) => item.key === activeSection)?.label}
                    </h2>
                  </div>

                  <Link
                    to="/admin/create-admin"
                    className="rounded-none border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] text-center"
                  >
                    Crear administrador
                  </Link>
                </header>

                {/* Zona de Renderizado / Loader */}
                {loading ? (
                  <div className="border border-slate-800 bg-[#0d1222]/90 p-8 shadow-xl backdrop-blur-md font-mono text-center">
                    <p className="text-slate-400 text-sm animate-pulse">
                      [ CARGANDO PANEL DE ADMINISTRACIÓN... ]
                    </p>
                  </div>
                ) : (
                  renderContent()
                )}

              </div>
            </main>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage