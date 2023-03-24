import { DislikeOutlined, LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, List, message, Space, Tooltip } from 'antd'
import { Http } from 'next/api/http'
import { formatDayTime } from 'next/utils/helperFuncs'
import React, { useEffect, useState } from 'react'

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default function IdeaCard({ ideaId, index }) {
  const [ideaDetails, setIdeaDetails] = useState({
    publisherId: '',
    title: '',
    content: '',
    files: [],
    views: [],
    likes: [],
    dislikes: [],
    comments: [],
    createdAt: new Date(),
    isAnonymous: false,
  })

  useEffect(() => {
    const getIdeaDetailsById = async (id: string) => {
      await Http.get(`/api/v1/idea/detail?id=${id}`)
        .then(res => setIdeaDetails(res.data.data))
        .catch(error => message.error('Failed to fetch idea !'))
    }
    getIdeaDetailsById(ideaId)
  }, [])

  return (
    <List.Item
      key={ideaDetails.title}
      actions={[
        <IconText icon={LikeOutlined} text={ideaDetails.likes.length} key="list-vertical-like-o" />,
        <IconText icon={DislikeOutlined} text={ideaDetails.dislikes.length} key="list-vertical-dislike-o" />,
        <IconText icon={MessageOutlined} text={ideaDetails.comments.length} key="list-vertical-message" />,
      ]}
      extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
    >
      <List.Item.Meta
        avatar={
          ideaDetails.isAnonymous ? (
            <Tooltip title="Anonymous user" color="blue">
              <Avatar icon={<UserOutlined />} />
            </Tooltip>
          ) : (
            <Avatar style={{ backgroundColor: ColorList[index % 4], verticalAlign: 'middle' }} size="large" />
          )
        }
        title={ideaDetails.title}
        description={<>Updated at: {formatDayTime(ideaDetails.createdAt)}</>}
      />
    </List.Item>
  )
}
