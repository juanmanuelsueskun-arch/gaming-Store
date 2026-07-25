import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { useCart } from '../context/CartContext'
import apiClient from '../api/apiClient'
import { showConfirm, showError, showSuccess } from '../utils/alerts'

function CartPage() {
  const navigate = useNavigate()

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart()

  const [loading, setLoading] = useState(false)

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      return showError('Carrito vacío', 'Agrega productos antes de confirmar el pedido.')
    }

    const result = await showConfirm(
      '¿Confirmar pedido?',
      'Se registrará tu compra y se vaciará el carrito.'
    )

    if (!result.isConfirmed) return

    setLoading(true)

    try {
      const payload = {
        items: cartItems.map((item) => ({
          producto_id: item.id,
          cantidad: item.cantidad,
          precio_unitario: Number(item.precio),
        })),
      }

      await apiClient.post('/orders', payload)

      clearCart()

      await showSuccess(
        'Pedido realizado correctamente',
        'Tu pedido fue registrado con éxito.'
      )

      navigate('/orders')
    } catch (err) {
      showError(
        'No se pudo realizar el pedido',
        err.response?.data?.error || 'Ocurrió un error inesperado'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes floatShapeSoft {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.10;
          }
          50% {
            transform: translateY(-20px) rotate(18deg);
            opacity: 0.22;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.10;
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

      {/* Fondo Negro Mate Profundo */}
      <div className="relative min-h-screen overflow-hidden bg-[#0c0d12] text-slate-100">

        {/* Glow ambiental de neón de baja opacidad */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 bg-pink-500/10 blur-[120px]" />
          <div className="absolute right-[-80px] top-1/4 h-80 w-80 bg-cyan-500/10 blur-[140px]" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 bg-pink-600/5 blur-[100px]" />
        </div>

        {/* Figuras geométricas flotantes adaptadas (Sin bordes redondeados) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[6%] top-[14%] h-10 w-10 bg-cyan-500/15"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[18%] top-[28%] h-12 w-12 bg-pink-500/15"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[30%] top-[12%] h-12 w-12 bg-cyan-400/10"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[42%] top-[24%] h-14 w-14 bg-pink-400/10"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[56%] top-[10%] h-9 w-9 border-2 border-pink-500/20"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[68%] top-[18%] h-14 w-14 rotate-45 bg-cyan-500/15"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[80%] top-[30%] h-10 w-10 bg-pink-500/10"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[90%] top-[16%] h-12 w-12 bg-cyan-500/15"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[10%] top-[70%] h-16 w-16 border border-cyan-500/20 bg-white/[0.02]"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[24%] top-[78%] h-14 w-14 bg-pink-500/10"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[40%] top-[72%] h-11 w-11 bg-cyan-500/15"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[58%] top-[76%] h-16 w-16 bg-pink-500/10"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[74%] top-[68%] h-12 w-12 bg-cyan-400/10"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[82%] h-10 w-10 border-2 border-pink-500/20"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          {/* Ajuste de pt-28 para evitar que la Navbar fija tape el título */}
          <main className="mx-auto max-w-5xl px-4 pt-28 pb-8">

            {/* Cabecera del Carrito */}
            <section className="mb-6 border border-pink-500/20 bg-black/40 p-6 shadow-[0_0_30px_rgba(236,72,153,0.05)] backdrop-blur-md">
              <h1 className="text-2xl font-bold font-gamer uppercase tracking-wide text-white md:text-3xl drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                Carrito de compras
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Revisa tus productos seleccionados antes de confirmar tu orden de compra.
              </p>
            </section>

            {cartItems.length === 0 ? (
              /* Estado Vacío */
              <div className="border border-white/5 bg-white/[0.02] p-6 text-slate-400 shadow-xl backdrop-blur-sm font-gamer uppercase tracking-wider text-center">
                Tu carrito está vacío en este momento.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Listado de Productos Agregados */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 border border-white/5 bg-white/[0.02] p-4 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between transition-colors hover:border-pink-500/10"
                  >
                    <div className="flex items-center gap-4">
                      {/* Contenedor de Imagen Cuadrado */}
                      <div className="overflow-hidden border border-white/10 h-20 w-20 shrink-0">
                        <img
                          src={item.imagen_url}
                          alt={item.nombre}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-base font-bold font-gamer uppercase tracking-wide text-white">
                          {item.nombre}
                        </h2>
                        <p className="text-sm font-gamer text-cyan-400 mt-1">
                          ${Number(item.precio).toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Subtotal: ${(Number(item.precio) * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Controles de Cantidad y Acciones */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Botón Restar */}
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-pink-500/20 hover:text-pink-400 cursor-pointer"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center font-bold font-gamer text-white">
                        {item.cantidad}
                      </span>

                      {/* Botón Sumar */}
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-cyan-500/20 hover:text-cyan-400 cursor-pointer"
                      >
                        +
                      </button>

                      {/* Botón Eliminar Artículo */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-wider text-red-400 transition hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {/* Resumen Final de Compra */}
                <div className="mt-6 border border-pink-500/20 bg-black/40 p-6 shadow-xl backdrop-blur-md">
                  <p className="text-2xl font-bold font-gamer tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    Total: ${totalPrice.toLocaleString()}
                  </p>

                  {/* Botón Confirmar con el degradado mate unificado */}
                  <button
                    onClick={handleConfirmOrder}
                    disabled={loading}
                    className="mt-4 w-full px-4 py-3 font-bold font-gamer uppercase tracking-widest text-black transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899, #db2777)',
                      boxShadow: '0 0 10px rgba(236,72,153,0.4)',
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 0 18px rgba(236,72,153,0.7)')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.boxShadow = '0 0 10px rgba(236,72,153,0.4)')}
                  >
                    {loading ? 'Procesando pedido...' : 'Confirmar pedido'}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default CartPage
