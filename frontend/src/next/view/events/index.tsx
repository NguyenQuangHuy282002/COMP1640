import { Button, Divider, Space } from 'antd'
import { Http } from 'next/api/http'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import EventCardItem from './card-item'
import CreateEventField from './event-form'

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
        <div style={{ padding: '10px 20px 10px 10px', margin: 0 }}>
          <Button
            onClick={() => {
              setOpenModal(true)
              setEditEvent(null)
            }}
          >
            Add new event
          </Button>
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
