import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import ProductCard from './ProductCard'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products')
        setProducts(response.data)
      } catch (err) {
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p className="text-slate-400">Cargando productos...</p>
  }

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  if (products.length === 0) {
    return <p className="text-slate-400">No hay productos disponibles.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList