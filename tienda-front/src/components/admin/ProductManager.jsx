import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { showConfirm, showError, showSuccess } from '../../utils/alerts'

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagen_url: '',
  stock: '',
}

function ProductManager() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/products')
      setProducts(response.data)
    } catch (err) {
      showError(
        'Error al cargar productos',
        err.response?.data?.error || 'No se pudieron cargar los productos'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.nombre.trim() ||
      !formData.descripcion.trim() ||
      !formData.precio ||
      !formData.imagen_url.trim() ||
      !formData.stock
    ) {
      return showError(
        'Campos incompletos',
        'Debes completar todos los campos del producto.'
      )
    }

    const result = await showConfirm(
      editingId ? '¿Actualizar producto?' : '¿Crear producto?',
      editingId
        ? 'Se guardarán los cambios realizados.'
        : 'Se registrará un nuevo producto en la tienda.'
    )

    if (!result.isConfirmed) return

    setSaving(true)

    try {
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        imagen_url: formData.imagen_url,
        stock: Number(formData.stock),
      }

      if (editingId) {
        await apiClient.put(`/products/${editingId}`, payload)
        await showSuccess(
          'Producto actualizado',
          'Los cambios se guardaron correctamente.'
        )
      } else {
        await apiClient.post('/products', payload)
        await showSuccess(
          'Producto creado',
          'El producto fue registrado correctamente.'
        )
      }

      resetForm()
      fetchProducts()
    } catch (err) {
      showError(
        'No se pudo guardar',
        err.response?.data?.error || 'Ocurrió un error inesperado'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (product) => {
    setFormData({
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio || '',
      imagen_url: product.imagen_url || '',
      stock: product.stock || '',
    })

    setEditingId(product.id)

    await showSuccess(
      'Modo edición activado',
      `Ahora estás editando el producto "${product.nombre}".`
    )
  }

  const handleDelete = async (id) => {
    const result = await showConfirm(
      '¿Eliminar producto?',
      'Esta acción no se puede deshacer.'
    )

    if (!result.isConfirmed) return

    try {
      await apiClient.delete(`/products/${id}`)
      await showSuccess(
        'Producto eliminado',
        'El producto fue eliminado correctamente.'
      )

      fetchProducts()

      if (editingId === id) {
        resetForm()
      }
    } catch (err) {
      showError(
        'No se pudo eliminar',
        err.response?.data?.error || 'Ocurrió un error inesperado'
      )
    }
  }

  const handleCancelEdit = async () => {
    const result = await showConfirm(
      '¿Cancelar edición?',
      'Se limpiará el formulario y perderás los cambios no guardados.'
    )

    if (!result.isConfirmed) return

    resetForm()
    await showSuccess('Edición cancelada', 'El formulario fue reiniciado.')
  }

  return (
    <section className="mt-10 space-y-6">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white font-gamer uppercase tracking-wider">Gestión de productos</h2>
        <p className="mt-1 text-slate-400 text-sm">
          Crea, actualiza y elimina productos de la tienda.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-md">
        <h3 className="mb-4 text-xl font-bold font-gamer uppercase tracking-wider text-white">
          {editingId ? 'Editar producto' : 'Crear producto'}
        </h3>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10">
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10">
            <input
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              type="number"
              placeholder="Precio"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10 md:col-span-2">
            <input
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              placeholder="URL de la imagen"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10 md:col-span-2">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              rows="4"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500 resize-none"
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10">
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
              placeholder="Stock"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-6 py-3 font-bold font-gamer uppercase tracking-widest transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer glow-cyan-hover"
            >
              {saving
                ? editingId
                  ? 'Actualizando...'
                  : 'Creando...'
                : editingId
                ? 'Actualizar producto'
                : 'Crear producto'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-bold font-gamer uppercase tracking-widest text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md animate-pulse">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400 font-gamer uppercase tracking-wider shadow-2xl backdrop-blur-md">
            No hay productos registrados.
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-500/20"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="h-24 w-24 rounded-2xl object-cover border border-slate-800 bg-slate-900"
                  />

                  <div>
                    <h4 className="text-lg font-bold text-white font-gamer uppercase tracking-wide">
                      {product.nombre}
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">
                      {product.descripcion}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Precio: <span className="font-bold text-cyan-400 font-gamer text-base">${Number(product.precio).toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-slate-300">
                      Stock: <span className="font-bold text-white font-gamer">{product.stock}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-emerald-400 transition hover:bg-emerald-50 hover:text-slate-950 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold font-gamer uppercase tracking-widest text-rose-400 transition hover:bg-rose-50 hover:text-slate-950 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ProductManager