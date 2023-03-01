import React, { useEffect, useState } from 'react'
import {
  StarOutlined,
  ShareAltOutlined,
  CloudDownloadOutlined,
  TagsTwoTone,
  MessageTwoTone,
  FireTwoTone,
  EyeOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Skeleton, Switch, Typography, Col, Row, Space, Tag, Divider } from 'antd'
import { formatDayTime } from '../../utils/helperFuncs'
import useWindowSize from '../../utils/useWindowSize'
import styled from 'styled-components'

const { Meta } = Card
const { Text, Link } = Typography
// eslint-disable-next-line react-hooks/rules-of-hooks

const IdeaCard: React.FC = idea => {
  const windowWidth = useWindowSize()
  const orientation = windowWidth < 768 ? 'horizontal' : 'vertical'
  const [loading, setLoading] = useState(true)
  const onChange = (checked: boolean) => {
    setLoading(!checked)
  }
  useEffect(() => {
    setTimeout(() => {
      onChange(loading)
    }, 2000)
  }, [])

  const data = {
    id: 1,
    title: 'Rất Chi là ối á nhé',
    author: 'I a co khac',
    description: 'vai ca l',
    body: 'Giau nghe la viec cua thay`',
    tags: ['vai ca l', 'Sir huyp', 'giau nghe'],
    points: 69,
    views: 500,
    commentCount: 333,
    createdAt: Date.now(),
    departmentName: 'Drugging4life',
  }
  return (
    <>
      <StyledCard
        style={{
          width: '100%',
          marginTop: 16,
          padding: '0 10px',
        }}
        actions={[
          <CloudDownloadOutlined key="download" />,
          <StarOutlined key="favourite" />,
          <ShareAltOutlined key="share" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Row>
            <Col flex={0.5} style={{ borderRight: '1px solid #edeff1', marginRight: '5px' }}>
              <Space direction={orientation} style={{ textAlign: 'right', padding: '5px -5px' }}>
                <Text strong>
                  <FireTwoTone style={{ padding: '5px' }} />
                  {data.points} points
                </Text>
                <Text>
                  <Tag color="cyan">
                    <MessageTwoTone /> {data.commentCount} comments
                  </Tag>
                </Text>
                <Text type="secondary">
                  <EyeOutlined style={{ padding: '5px' }} />
                  {data.views} views
                </Text>
              </Space>
            </Col>
            <Col flex={4.5}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space wrap>
                  <Avatar src="https://joesch.moe/api/v1/random" style={{ background: '#f6f7f8' }} />
                  <Link href="#" style={{ marginRight: '10px', fontSize: '15px', fontWeight: '500' }}>
                    {data.author}
                  </Link>
                  <Text type="secondary" style={{ marginTop: '10px' }}>
                    . Posted {formatDayTime(data.createdAt)}
                  </Text>
                </Space>
                <Link href="#" style={{ fontSize: '25px', fontWeight: '600', marginBottom: 0 }}>
                  {data.title}
                </Link>
                <Space size={[0, 8]} wrap>
                  <TagsTwoTone style={{ padding: '5px' }} />
                  {data.tags.map(tag => (
                    <Tag key={tag} color="geekblue">
                      {tag}
                    </Tag>
                  ))}
                </Space>
                <Divider orientation="left" style={{ marginBottom: '0' }}>
                  <Text type="secondary">From</Text>
                </Divider>
                <Row>
                  <Col flex={4}>
                    <Tag>{data.departmentName}</Tag>
                  </Col>
                  {/* <Col flex={1}>
                    <Avatar src="https://joesch.moe/api/v1/random" />
                    <Link href="#" style={{ marginRight: '10px' }}>
                      {data.author}
                    </Link>
                    <Text style={{ marginTop: '10px' }}>{formatDayTime(data.createdAt)}</Text>
                  </Col> */}
                </Row>
              </Space>
            </Col>
          </Row>
        </Skeleton>
      </StyledCard>
    </>
  )
}

const StyledCard = styled(Card)`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export default IdeaCard
