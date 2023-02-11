import { Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import Topbar from '../topbar'

function Dashboard() {
  const navigate = useNavigate()
  return (
    <Layout>
      <Topbar />
      <Button onClick={() => navigate('/login')}>logout</Button>
    </Layout>
  )
}

export default Dashboard
