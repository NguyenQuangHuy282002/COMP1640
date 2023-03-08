import React, { useEffect, useState } from 'react'
import {
  StarOutlined,
  ShareAltOutlined,
  CloudDownloadOutlined,
  TagsTwoTone,
  MessageTwoTone,
  FireTwoTone,
  EyeOutlined,
  ClockCircleFilled,
  LinkedinOutlined,
  CompassOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Skeleton, Switch, Typography, Col, Row, Space, Tag, Divider, List, Button } from 'antd'
import { formatDayTime } from '../../utils/helperFuncs'
import useWindowSize from '../../utils/useWindowSize'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Text, Link } = Typography
// eslint-disable-next-line react-hooks/rules-of-hooks

function IdeaCard({ idea, isLoading }) {
  const windowWidth = useWindowSize()
  const navigate = useNavigate()
  const orientation = windowWidth < 1000 ? 'horizontal' : 'vertical'
  const [loading, setLoading] = useState(true)
  const onChange = (checked: boolean) => {
    setLoading(isLoading)
  }
  useEffect(() => {
    setTimeout(() => {
      onChange(loading)
    }, 1000)
  }, [])
  const description = idea.content?.replace(/(<([^>]+)>)/gi, '').slice(0, 70) + '...'

  const handleViewDetail = id => {
    navigate(`/idea?id=${id}`)
  }
  return (
    <>
      <StyledCard
        style={{
          width: '100%',
          marginTop: 16,
        }}
        bodyStyle={{ padding: '2px' }}
        actions={[
          <CloudDownloadOutlined key="download" />,
          <StarOutlined key="favourite" />,
          <ShareAltOutlined key="share" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <List.Item
            actions={
              windowWidth > 900
                ? [
                    <Text strong key="list-vertical-star-o">
                      <FireTwoTone style={{ padding: '5px' }} />
                      {idea.like - idea.dislike} points
                    </Text>,
                    <Text key="list-vertical-like-o">
                      <Tag color="cyan" style={{ margin: 0 }}>
                        <MessageTwoTone /> {idea.comment ? idea.comment.length : 0} comments
                      </Tag>
                    </Text>,
                    <Text type="secondary" key="list-vertical-message">
                      <EyeOutlined style={{ padding: '5px' }} />
                      {idea.views} views
                    </Text>,
                  ]
                : [
                    <Text strong key="list-vertical-star-o">
                      <FireTwoTone style={{ paddingRight: '2px' }} />
                      {idea.like - idea.dislike}
                    </Text>,
                    <Text key="list-vertical-like-o">
                      <Tag color="cyan">
                        <MessageTwoTone /> {idea.comment ? idea.comment.length : 0}
                      </Tag>
                    </Text>,
                    <Text type="secondary" key="list-vertical-message">
                      <EyeOutlined style={{ paddingRight: '2px' }} />
                      {idea.views}
                    </Text>,
                  ]
            }
          >
            <List.Item.Meta
              key="00"
              avatar={
                <>
                  <Avatar
                    src={
                      !idea.isAnonymous
                        ? idea.publisherId?.avatar ?? 'Unknown'
                        : 'https://www.pngarea.com/pngm/10/5215656_crying-emoji-png-transparent-background-smirk-emoji-transparent.png'
                    }
                    style={{ background: '#f6f7f8' }}
                  />
                </>
              }
              title={
                <>
                  <Link href="#" style={{ fontSize: '15px', fontWeight: '500', marginRight: '10px' }}>
                    {!idea.isAnonymous ? idea.publisherId?.name ?? 'Unknown' : 'Anonymous'}
                  </Link>
                  <Typography.Text type="secondary">
                    <Tag icon={<LinkedinOutlined />} color="#007E80">
                      {/* 373B44 004853 */}
                      <strong>{idea.departmentName ? idea.departmentName : 'No department'}</strong>
                    </Tag>
                    <Tag icon={<CompassOutlined />} color="#FA6900">
                      <strong>{idea.specialEvent ? idea.specialEvent : 'No Event'}</strong>
                    </Tag>
                    <ClockCircleFilled /> Posted {formatDayTime(idea.createdAt)}
                  </Typography.Text>
                </>
              }
              style={{ margin: '0' }}
            />

            <List.Item.Meta
              style={{ margin: '0' }}
              key="01"
              title={
                <Button type="link" onClick={() => handleViewDetail(idea._id)}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {idea.title}
                  </Typography.Title>
                </Button>
              }
              description={
                <>
                  <Typography.Text type="secondary">{description}</Typography.Text>
                  <Space size={[0, 8]} wrap>
                    <TagsTwoTone style={{ padding: '5px' }} />
                    {idea.categories.length !== 0 ? (
                      idea.categories.map(tag => (
                        <Tag key={tag.name} color="geekblue">
                          {tag.name}
                        </Tag>
                      ))
                    ) : (
                      <Tag>No Tag</Tag>
                    )}
                  </Space>
                </>
              }
            ></List.Item.Meta>
          </List.Item>
        </Skeleton>
      </StyledCard>
    </>
  )
}

const StyledCard = styled(Card)`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export default IdeaCard
