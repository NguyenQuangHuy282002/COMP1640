import { formatDayTime } from '../../utils/helperFuncs'
import { DislikeOutlined, ExclamationCircleOutlined, LikeOutlined } from '@ant-design/icons'
import { Avatar, Card, List, Skeleton, Space, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import { imgDir } from 'next/constants/img-dir'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)
function Comment({ item, loading }) {
  // console.log('item', item)
  return (
    <>
      {item?.date && (
        <List.Item
          actions={[
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={DislikeOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={ExclamationCircleOutlined} text="2" key="list-vertical-message" />,
          ]}
          style={{ margin: 0}}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              style={{ margin: 0 }}
              avatar={<Avatar size={45} src={!item.isAnonymous ? item.userId?.avatar : imgDir + 'anonymous.jpg'} style={{ background: '#ccc' }} />}
              title={
                <>
                  <Typography.Link>{!item.isAnonymous ? item.userId?.name : 'Anonymous'}</Typography.Link>{' '}
                  <Typography.Paragraph
                    type="secondary"
                    style={{
                      fontSize: 13,
                      fontWeight: 0,
                      margin: 0,
                      fontFamily:
                        'Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
                    }}
                  >
                    {formatDayTime(item.date)}
                  </Typography.Paragraph>
                </>
              }
              // description={

              // }
            />
            <article
              style={{
                margin: 0,
                padding: 0,
                fontSize: '16px',
                fontWeight: '400',
                color: 'black',
                fontFamily:
                  'Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
              }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></article>
          </Skeleton>
        </List.Item>
      )}
    </>
  )
}

export default Comment
