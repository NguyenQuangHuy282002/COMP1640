import { Button, Card, Empty, List, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const { Title, Paragraph, Text, Link } = Typography

export default function EventDetails() {
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [event, setEvent] = useState(null)

  const getEventDetails = async () => {
    await Http.get(`/api/v1/event?id=${id}`)
      .then(res => {
        setEvent(res.data?.data[0] || null)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  useEffect(() => {
    getEventDetails()
  }, [id])
  console.log(event)

  return (
    <Card
      title={<Title style={{ margin: 0, fontSize: 24, textOverflow: 'ellipsis' }}>{event?.title}</Title>}
      style={{ borderRadius: 0 }}
      headStyle={{ backgroundColor: '#1677ff6d', borderRadius: 0 }}
    >
      <Title style={{ margin: 0, fontSize: 18, color: '#1677ff' }}>About this event:</Title>
      <div dangerouslySetInnerHTML={{ __html: event?.description }} />

      <Title style={{ margin: 0, fontSize: 18, color: '#1677ff' }}>Ideas in this event:</Title>
      {event?.ideas?.length ? (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 5,
          }}
          style={{
            marginBottom: '50px',
          }}
          dataSource={event?.ideas}
          renderItem={idea => <p key={`${idea}`}>{idea.toString()}</p>}
        />
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>There is no any event yet</span>}
          style={{ width: '100%', padding: 20 }}
        >
          <Button type="primary">Create Now</Button>
        </Empty>
      )}
    </Card>
  )
}
