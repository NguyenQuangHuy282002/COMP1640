import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import Topbar from '../topbar'

function Dashboard() {
  const navigate = useNavigate()
  return (
    <Layout>
      <Topbar />
    </Layout>
  )
}

export default Dashboard
