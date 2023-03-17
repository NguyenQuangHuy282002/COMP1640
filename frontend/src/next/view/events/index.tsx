import { PlusCircleFilled, PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Divider, Row, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import EventCardItem from './card-item'
import CreateEventField from './event-form'

const { Title } = Typography

function EventsPage() {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [allEventList, setAllEventList] = useState([])
  const [editEvent, setEditEvent] = useState(null)

  const getEventList = async () => {
    await Http.get('/api/v1/event')
      .then(res => {
        setAllEventList(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  useEffect(() => {
    getEventList()
  }, [openModal])

  const handleDeleteEvent = async (id: string) => {
    await Http.delete('/api/v1/event', id)
      .then(() => setAllEventList(allEventList.filter(event => event._id !== id)))
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <>
      {openModal ? (
        <CreateEventField
          event={editEvent}
          onClose={() => setOpenModal(false)}
          onFinish={eventForm => {
            setAllEventList([eventForm, ...allEventList])
            setOpenModal(false)
          }}
        />
      ) : (
        <div style={{ padding: 20, margin: 0 }}>
          <Row justify="space-between">
            <Title level={3} style={{ margin: 0 }}>
              Events list
            </Title>
            <Button
              style={{
                color: '#FFFFFF',
                textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
                backgroundImage: 'linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)',
              }}
              icon={<PlusCircleTwoTone twoToneColor={'#005ec2'} />}
              onClick={() => {
                setOpenModal(true)
                setEditEvent(null)
              }}
              size="large"
            >
              Add new event
            </Button>
          </Row>
          <Divider />
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {allEventList.map((event, index) => (
              <EventCardItem
                event={event}
                key={index}
                index={index}
                setEditEvent={event => {
                  setEditEvent(event)
                  setOpenModal(true)
                }}
                handleDeleteEvent={handleDeleteEvent}
              />
            ))}
          </Space>
        </div>
      )}
    </>
  )
}

export default EventsPage
