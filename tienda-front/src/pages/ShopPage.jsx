import Navbar from '../components/common/Navbar'
import ProductList from '../components/client/ProductList'

function ShopPage() {
  return (
    <>
      <style>{`
        @keyframes floatShape {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.20;
          }
          100% {
            transform: translateY(-120vh) rotate(240deg);
            opacity: 0;
          }
        }

        .shape {
          position: absolute;
          bottom: -140px;
          animation-name: floatShape;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Fondo Negro Mate Profundo */}
      <div className="relative min-h-screen overflow-hidden bg-[#0c0d12] text-slate-100">

        {/* Luces de fondo de neón difuminadas (Glow ambiental) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 bg-pink-500/10 blur-[120px]" />
          <div className="absolute right-[-100px] top-1/4 h-96 w-96 bg-cyan-500/10 blur-[150px]" />
          <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 bg-pink-600/5 blur-[100px]" />
        </div>

        {/* Figuras geométricas flotantes con bordes rectos */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="shape left-[6%] h-16 w-16 bg-pink-500/15"
            style={{ animationDuration: '12s', animationDelay: '0s' }}
          />
          <span
            className="shape left-[16%] h-10 w-10 rotate-45 bg-cyan-500/15"
            style={{ animationDuration: '9s', animationDelay: '1.2s' }}
          />
          <span
            className="shape left-[28%] h-20 w-20 border-2 border-pink-500/20"
            style={{ animationDuration: '14s', animationDelay: '2s' }}
          />
          <span
            className="shape left-[40%] h-12 w-12 bg-cyan-400/10"
            style={{ animationDuration: '10s', animationDelay: '3s' }}
          />
          <span
            className="shape left-[52%] h-16 w-16 rotate-12 border border-pink-500/20 bg-pink-500/10"
            style={{ animationDuration: '13s', animationDelay: '1s' }}
          />
          <span
            className="shape left-[63%] h-8 w-8 rotate-45 bg-cyan-500/20"
            style={{ animationDuration: '8s', animationDelay: '4s' }}
          />
          <span
            className="shape left-[72%] h-24 w-24 border border-pink-500/20 bg-pink-500/5"
            style={{ animationDuration: '15s', animationDelay: '2.5s' }}
          />
          <span
            className="shape left-[82%] h-14 w-14 bg-cyan-500/15"
            style={{ animationDuration: '11s', animationDelay: '5s' }}
          />
          <span
            className="shape left-[90%] h-10 w-10 rotate-45 border-2 border-pink-500/20"
            style={{ animationDuration: '9.5s', animationDelay: '3.5s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          {/* Grid Layout: Mensaje a la izquierda, productos a la derecha */}
          <main className="mx-auto max-w-7xl px-4 pt-28 pb-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">

              {/* Columna Izquierda: Encabezado del catálogo (Fijo en pantallas grandes) */}
              <section className="lg:col-span-1 lg:sticky lg:top-28 border border-pink-500/20 bg-black/40 p-6 shadow-[0_0_30px_rgba(236,72,153,0.05)] backdrop-blur-md">
                <div>
                  <span className="inline-flex border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-400">
                    Catálogo
                  </span>

                  <h1 className="mt-4 text-2xl font-bold font-gamer uppercase tracking-wide text-white md:text-3xl drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    Productos disponibles
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Explora el catálogo oficial de componentes, periféricos y equipamiento para tu setup gaming.
                  </p>
                </div>
              </section>

              {/* Columna Derecha: Listado de productos */}
              <section className="lg:col-span-3 border border-white/5 bg-white/[0.02] p-4 shadow-2xl backdrop-blur-sm md:p-6">
                <ProductList />
              </section>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default ShopPage