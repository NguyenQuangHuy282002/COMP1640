import { EyeOutlined, TagsTwoTone } from '@ant-design/icons'
import { Avatar, Space, Tag, Typography } from 'antd'
import { imgDir } from 'next/constants/img-dir'
import { formatDayTime } from 'next/utils/helperFuncs'
const { Text, Link } = Typography

export default function IdeaDetailInfo({ item }) {
  return (
    <>
      <Space direction="horizontal">
        <Avatar
          style={{ background: '#ccc', margin: '0px' }}
          size={45}
          src={!item?.isAnonymous ? item?.publisherId.avatar : imgDir + 'anonymous.jpg'}
        ></Avatar>
        <Space direction="vertical" size={[0, 0]}>
          <span>
            <Text strong> {!item?.isAnonymous ? item?.publisherId.name ?? 'unknown' : 'Anonymous'}</Text>
            <Text type="secondary" style={{marginLeft: 10}}>Posted {formatDayTime(item?.createdAt ? item?.createdAt : Date.now())}</Text>
          </span>
          <Text type="secondary" keyboard style={{opacity: 0.7}}>
            <EyeOutlined /> {item?.views} views
          </Text>
        </Space>
      </Space>

      <Typography.Title level={3} style={{ margin: '5px 0' }}>
        {item?.title}
      </Typography.Title>

      <Space size={[0, 8]} wrap>
        <TagsTwoTone style={{ padding: '5px' }} />
        {item?.categories.length !== 0 ? (
          item?.categories.map(tag => (
            <Tag key={tag.name} color="geekblue">
              {tag.name}
            </Tag>
          ))
        ) : (
          <Tag>No Tag</Tag>
        )}
      </Space>
    </>
  )
}
