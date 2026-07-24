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
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Gestión de productos</h2>
        <p className="mt-1 text-slate-500">
          Crea, actualiza y elimina productos de la tienda.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl backdrop-blur-md">
        <h3 className="mb-4 text-xl font-semibold text-slate-800">
          {editingId ? 'Editar producto' : 'Crear producto'}
        </h3>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
            <input
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              type="number"
              placeholder="Precio"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100 md:col-span-2">
            <input
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              placeholder="URL de la imagen"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100 md:col-span-2">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              rows="4"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
              placeholder="Stock"
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
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
                className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-slate-500 shadow-sm backdrop-blur-md">
            No hay productos registrados.
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="h-24 w-24 rounded-2xl object-cover border border-slate-200"
                  />

                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">
                      {product.nombre}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {product.descripcion}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Precio: ${Number(product.precio).toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-700">
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
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