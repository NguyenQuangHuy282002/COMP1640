import { useSubscription } from 'next/libs/global-state-hook'
import { Navigate } from 'react-router-dom'
import { userStore } from './user-store'

const RoleAccess = ({ roles = [], children }) => {
  const {
    state: { role },
  } = useSubscription(userStore, ['role'])
  return !roles.length || roles.includes(role) ? <>{children}</> : <Navigate to="/login" replace />
}

export default RoleAccess
