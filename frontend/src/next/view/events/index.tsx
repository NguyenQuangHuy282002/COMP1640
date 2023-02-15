import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Divider, Row, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { BlueColorButton } from 'next/components/custom-style-elements/button'
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
//<<<<<<< yesvansirevent
//    <div style={{ padding: '10px', margin: 0 }}>
//      <Button onClick={() => setOpenModal(true)}>Add new event</Button>
//      <Divider />
//      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
//      <EventCardItem></EventCardItem>
//      </Space>
//      <CreateEventModal onClose={() => setOpenModal(false)} open={openModal} onFinish={() => setOpenModal(false)} />
//    </div>
//=======
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
            <BlueColorButton
              icon={<PlusCircleTwoTone twoToneColor={'#005ec2'} />}
              onClick={() => {
                setOpenModal(true)
                setEditEvent(null)
              }}
              size="large"
            >
              Add new event
            </BlueColorButton>
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
//>>>>>>> main
  )
}

export default EventsPage
//<<<<<<< yesvansirevent




// {data.map((event, index) => (
//   <EventCardItem event={event} key={index} />
// ))}
//=======
//>>>>>>> main
