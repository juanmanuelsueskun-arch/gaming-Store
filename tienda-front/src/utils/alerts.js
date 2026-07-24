import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const baseOptions = {
  background: '#ffffff',
  color: '#334155',
  confirmButtonColor: '#06b6d4',
  cancelButtonColor: '#94a3b8',
  reverseButtons: true,
  buttonsStyling: true,
}

export const showSuccess = (title, text = '') => {
  return Swal.fire({
    ...baseOptions,
    icon: 'success',
    title,
    text,
  })
}

export const showError = (title, text = '') => {
  return Swal.fire({
    ...baseOptions,
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#ef4444',
  })
}

export const showConfirm = (title, text = '') => {
  return Swal.fire({
    ...baseOptions,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
  })
}

export const showAddedToCart = (productName = 'Producto') => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `${productName} agregado exitosamente`,
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#334155',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
}