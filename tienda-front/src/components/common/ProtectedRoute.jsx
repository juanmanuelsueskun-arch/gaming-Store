import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, rol, loading } = useAuth()

  if (loading) {
    return <div className="p-10 text-center text-white">Cargando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute