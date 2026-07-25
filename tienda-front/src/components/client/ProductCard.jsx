import { useCart } from '../../context/CartContext'
import { showAddedToCart } from '../../utils/alerts'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    addToCart(product)
    await showAddedToCart(product.nombre)
  }

  return (
    <article className="group overflow-hidden border border-pink-500/20 bg-black/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]">

      {/* Contenedor de Imagen con Overlay Neón */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/5">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />
        {/* Degradado oscuro para que resalten los textos superiores si los hubiera */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0d12]/80 via-transparent to-transparent opacity-90" />
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5">
        <h3 className="text-lg font-bold font-gamer uppercase tracking-wide text-white transition-colors group-hover:text-pink-400 line-clamp-1">
          {product.nombre}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-400 min-h-[40px]">
          {product.descripcion}
        </p>

        {/* Precio Estilo Cyberpunk */}
        <p className="mt-4 text-2xl font-bold font-gamer tracking-wider text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
          ${Number(product.precio).toLocaleString()}
        </p>

        {/* Botón de Acción con Degradado Rosa Mate */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full px-4 py-3 font-bold font-gamer uppercase tracking-widest text-black transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            boxShadow: '0 0 10px rgba(236,72,153,0.4)',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 18px rgba(236,72,153,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 10px rgba(236,72,153,0.4)')}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default ProductCard