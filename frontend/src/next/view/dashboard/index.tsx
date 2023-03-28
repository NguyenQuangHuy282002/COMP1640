import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
// import EventChart from './charts/eventChart'
import EventPieChart from './charts/eventPieChart'
import LarsestEventIdea from './charts/largest-event-chart'
import LatestIdeaList from './charts/latest-ideas'
// import LoadList from './charts/loadlist'
import SmallStatistic from './charts/smallstatistic'

function DashboardAdmin() {
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          margin: '10px',
        }}
      >
        {/* <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px', width:'33.3%',}} >
      <Typography.Title level={4}>
            Total User
          </Typography.Title>
      </Col>
      <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px',  width:'33.3%'}}>
      <Typography.Title level={4}>
            Total Post
          </Typography.Title>
      </Col>
      <Col span={8} style={{border: '1px solid #ccc',
            borderRadius: '5px', width:'33.3%'}}>
      <Typography.Title level={4}>
            Rate
          </Typography.Title>
      </Col> */}
        <Col span={24}>
          <SmallStatistic />
        </Col>
      </Row>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          margin: '10px',
        }}
      >
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={12}
          xxl={6}
          style={{
            borderRadius: '5px',
          }}
        >
          <EventPieChart />
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={12}
          xxl={6}
          style={{
            borderRadius: '5px',
          }}
        >
          <LarsestEventIdea />
        </Col>
      </Row>
      <Row
        style={{
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: 'auto',
          margin: '20px',
        }}
      >
        <Col span={24} style={{ display: 'flex', justifyContent: 'center', borderBottom: 'inset' }}>
          <Title level={3}>Lastest list ideas</Title>
        </Col>
        <Col span={24}>
          <LatestIdeaList />
        </Col>
      </Row>
    </>
  )
}

export default DashboardAdmin
