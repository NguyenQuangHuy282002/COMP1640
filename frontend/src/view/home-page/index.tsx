import styled from '@emotion/styled'
import { Col, Divider, Row, Space, Typography } from 'antd'
import { imgDir } from '../../constants/img-dir'

const { Title } = Typography

export const courses = [
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
  {
    id: '1',
    name: 'Computing',
    staff: 'Huy',
  },
]

function HomePage() {
  return (
    <>
      <Row gutter={16} style={{ padding: '20px 20px 0px', margin: 0 }}>
        <Title level={4} ellipsis style={{ margin: 0 }}>
          Course categories
        </Title>
        <Divider style={{ margin: '10px 0px' }} />
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ padding: 20 }}>
        {courses.map((course: any, idx: number) => (
          <Col className="gutter-row" xs={24} sm={12} md={6} xxl={3} key={idx}>
            <ItemWrapper direction="vertical" align="center">
              <img src={course?.img || `${imgDir}course-placeholder.png`} width="100%" alt="course" />
              <Title level={4} ellipsis style={{ margin: 0 }}>
                {course.name}
              </Title>
            </ItemWrapper>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomePage

const ItemWrapper = styled(Space)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #5597e7;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
  }
`
