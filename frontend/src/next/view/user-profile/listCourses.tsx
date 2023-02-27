import { Col, Row, Typography } from 'antd'
import { imgDir } from '../../constants/img-dir'
import { ideas, StyledRow } from '../home-page'

const { Title } = Typography

export default function ListCourses() {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ padding: 20 }}>
      {ideas.map((course: any, idx: number) => (
        <Col className="gutter-row" xs={24} sm={12} md={6} xxl={3} key={idx}>
          <StyledRow>
            <img src={course?.img || `${imgDir}course-placeholder.png`} width="100%" alt="course" />
            <Title level={4} ellipsis style={{ margin: 0 }}>
              {course.name}
            </Title>
          </StyledRow>
        </Col>
      ))}
    </Row>
  )
}
