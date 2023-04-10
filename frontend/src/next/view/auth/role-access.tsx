import { useSubscription } from 'next/libs/global-state-hook'
import { Navigate } from 'react-router-dom'
import { userStore } from './user-store'
import { Spin } from 'antd'

const RoleAccess = ({ roles = [], children }) => {
  const {
    state: { role, loading },
  } = useSubscription(userStore, ['role'])
  if (loading) {
    return <Spin size="large" />
  }
  return !roles.length || roles.includes(role) ? <>{children}</> : <Navigate to="/unauthorize" replace />
}

export default RoleAccess
