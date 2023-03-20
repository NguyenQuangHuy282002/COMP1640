import { ClockCircleOutlined, DislikeOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, List, message, Skeleton, Space, Tooltip } from 'antd'
import { Http } from 'next/api/http'
import { formatDayTime } from 'next/utils/helperFuncs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default function IdeaCard({ ideaId, index }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ideaDetails, setIdeaDetails] = useState({
    publisherId: null,
    title: '',
    content: '',
    files: [],
    views: [],
    likes: [],
    dislikes: [],
    comments: [],
    createdAt: new Date(),
    isAnonymous: false,
    publisher: null,
    _id: '',
  })

  useEffect(() => {
    setLoading(true)
    const getIdeaDetailsById = async (id: string) => {
      await Http.get(`/api/v1/idea/detail?id=${id}`)
        .then(res => {
          setIdeaDetails(res.data.data)
        })
        .catch(error => message.error('Failed to fetch idea !'))
        .finally(() => setLoading(false))
    }
    getIdeaDetailsById(ideaId)
  }, [])

  return (
    <Skeleton loading={loading} avatar active>
      <List.Item
        key={ideaDetails.title}
        actions={[
          <IconText icon={LikeOutlined} text={ideaDetails.likes.length} key="list-vertical-like-o" />,
          <IconText icon={DislikeOutlined} text={ideaDetails.dislikes.length} key="list-vertical-dislike-o" />,
          <IconText icon={MessageOutlined} text={ideaDetails.comments.length} key="list-vertical-message" />,
        ]}
      >
        <List.Item.Meta
          avatar={
            ideaDetails.isAnonymous ? (
              <Tooltip title="Anonymous user" color="#2db7f5" mouseEnterDelay={1}>
                <Avatar icon={<UserOutlined />} />
              </Tooltip>
            ) : (
              <Tooltip title={ideaDetails?.publisherId?.name} color="#2db7f5" mouseEnterDelay={1}>
                <Avatar
                  style={{ backgroundColor: ColorList[index % 4], verticalAlign: 'middle' }}
                  size="large"
                  src={ideaDetails?.publisherId?.avatar}
                />
              </Tooltip>
            )
          }
          title={<a onClick={() => navigate(`/idea?id=${ideaDetails._id}`)}>{ideaDetails.title}</a>}
          description={
            <>
              <ClockCircleOutlined /> Posted at: {formatDayTime(ideaDetails.createdAt)}
            </>
          }
        />
      </List.Item>
    </Skeleton>
  )
}
