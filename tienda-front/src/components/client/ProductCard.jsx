import { useCart } from '../../context/CartContext'
import { showAddedToCart } from '../../utils/alerts'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    addToCart(product)
    await showAddedToCart(product.nombre)
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/40 bg-white/35 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/10 opacity-80" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-800">
          {product.nombre}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {product.descripcion}
        </p>

        <p className="mt-4 text-2xl font-bold text-cyan-600">
          ${Number(product.precio).toLocaleString()}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default ProductCard