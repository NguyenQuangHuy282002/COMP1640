import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import EventChart from './charts/eventChart'
import EventPieChart from './charts/eventPieChart'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ padding: 20 }}>
      <Col className="gutter-row" xs={24} sm={24} md={12} xxl={6}>
        <EventPieChart />
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={12} xxl={6}>
        <EventChart />
      </Col>
    </Row>
  )
}

export default Dashboard
