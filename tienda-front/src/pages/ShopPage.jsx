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
            opacity: 0.55;
          }
          50% {
            opacity: 0.35;
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

      <div className="relative min-h-screen overflow-hidden bg-white text-slate-800">
        {/* Fondo suave */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
          <div className="absolute right-[-100px] top-1/4 h-96 w-96 rounded-full bg-sky-200/45 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        </div>

        {/* Figuras geométricas */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="shape left-[6%] h-16 w-16 rounded-2xl bg-cyan-300/50"
            style={{ animationDuration: '12s', animationDelay: '0s' }}
          />
          <span
            className="shape left-[16%] h-10 w-10 rotate-45 bg-emerald-300/55"
            style={{ animationDuration: '9s', animationDelay: '1.2s' }}
          />
          <span
            className="shape left-[28%] h-20 w-20 rounded-full border-2 border-sky-400/60"
            style={{ animationDuration: '14s', animationDelay: '2s' }}
          />
          <span
            className="shape left-[40%] h-12 w-12 rounded-md bg-teal-300/45"
            style={{ animationDuration: '10s', animationDelay: '3s' }}
          />
          <span
            className="shape left-[52%] h-16 w-16 rotate-12 rounded-[30%] border border-cyan-500/50 bg-cyan-200/35"
            style={{ animationDuration: '13s', animationDelay: '1s' }}
          />
          <span
            className="shape left-[63%] h-8 w-8 rotate-45 bg-lime-300/50"
            style={{ animationDuration: '8s', animationDelay: '4s' }}
          />
          <span
            className="shape left-[72%] h-24 w-24 rounded-3xl border border-blue-400/50 bg-blue-200/30"
            style={{ animationDuration: '15s', animationDelay: '2.5s' }}
          />
          <span
            className="shape left-[82%] h-14 w-14 rounded-full bg-cyan-200/45"
            style={{ animationDuration: '11s', animationDelay: '5s' }}
          />
          <span
            className="shape left-[90%] h-10 w-10 rotate-45 border-2 border-emerald-400/55"
            style={{ animationDuration: '9.5s', animationDelay: '3.5s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          <main className="mx-auto max-w-7xl px-4 py-8">
            <section className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-md md:p-8">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  Catálogo
                </span>

                <h1 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
                  Productos
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                  Explora el catálogo y agrega productos a tu carrito.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/10 p-4 shadow-xl backdrop-blur-md md:p-6">
              <ProductList />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default ShopPage