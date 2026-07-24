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
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
          <div className="absolute right-[-80px] top-1/4 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span
            className="float-shape left-[6%] top-[14%] h-10 w-10 rounded-full bg-cyan-300/45"
            style={{ animationDuration: '6s' }}
          />
          <span
            className="float-shape left-[18%] top-[28%] h-12 w-12 rounded-2xl bg-emerald-300/35"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-triangle float-shape left-[30%] top-[12%] h-12 w-12 bg-sky-300/40"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="shape-star float-shape left-[42%] top-[24%] h-14 w-14 bg-cyan-300/35"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[56%] top-[10%] h-9 w-9 rounded-full border-2 border-emerald-300/55"
            style={{ animationDuration: '6.5s' }}
          />
          <span
            className="float-shape left-[68%] top-[18%] h-14 w-14 rotate-45 rounded-xl bg-lime-200/35"
            style={{ animationDuration: '8.5s' }}
          />
          <span
            className="shape-triangle float-shape left-[80%] top-[30%] h-10 w-10 bg-cyan-200/40"
            style={{ animationDuration: '7.5s' }}
          />
          <span
            className="shape-star float-shape left-[90%] top-[16%] h-12 w-12 bg-emerald-200/35"
            style={{ animationDuration: '10s' }}
          />

          <span
            className="float-shape left-[10%] top-[70%] h-16 w-16 rounded-3xl border border-cyan-300/40 bg-white/20"
            style={{ animationDuration: '11s' }}
          />
          <span
            className="shape-triangle float-shape left-[24%] top-[78%] h-14 w-14 bg-sky-200/35"
            style={{ animationDuration: '9s' }}
          />
          <span
            className="float-shape left-[40%] top-[72%] h-11 w-11 rounded-full bg-emerald-200/45"
            style={{ animationDuration: '7s' }}
          />
          <span
            className="shape-star float-shape left-[58%] top-[76%] h-16 w-16 bg-cyan-200/30"
            style={{ animationDuration: '10s' }}
          />
          <span
            className="float-shape left-[74%] top-[68%] h-12 w-12 rounded-2xl bg-teal-200/35"
            style={{ animationDuration: '8s' }}
          />
          <span
            className="float-shape left-[88%] top-[82%] h-10 w-10 rounded-full border-2 border-sky-300/50"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="relative z-20">
          <Navbar />

          <main className="mx-auto max-w-5xl px-4 py-8">
            <section className="mb-6 rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
              <h1 className="text-3xl font-bold text-slate-800">
                Carrito de compras
              </h1>
              <p className="mt-2 text-slate-500">
                Revisa tus productos antes de confirmar el pedido.
              </p>
            </section>

            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-slate-500 shadow-xl backdrop-blur-md">
                Tu carrito está vacío.
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-lg backdrop-blur-md md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="overflow-hidden rounded-2xl">
                        <img
                          src={item.imagen_url}
                          alt={item.nombre}
                          className="h-20 w-20 object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                          {item.nombre}
                        </h2>
                        <p className="text-slate-500">
                          ${Number(item.precio).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-400">
                          Subtotal: ${(Number(item.precio) * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center font-medium text-slate-700">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
                  <p className="text-2xl font-bold text-cyan-600">
                    Total: ${totalPrice.toLocaleString()}
                  </p>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={loading}
                    className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
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