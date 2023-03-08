import { Button, Divider, Space } from 'antd'
import { Http } from 'next/api/http'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import EventCardItem from './card-item'
import CreateEventModal from './new-event-modal'

function EventsPage() {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [allEventList, setAllEventList] = useState([])

  useEffect(() => {
    const getEventList = async () => {
      await Http.get('/api/v1/event')
        .then(res => {
          setAllEventList(res.data.data)
        })
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    }
    getEventList()
  }, [])

  return (
    <div style={{ padding: '10px', margin: 0 }}>
      <Button onClick={() => setOpenModal(true)}>Add new event</Button>
      <Divider />
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        {allEventList.map((event, index) => (
          <EventCardItem event={event} key={index} />
        ))}
      </Space>
      <CreateEventModal onClose={() => setOpenModal(false)} open={openModal} onFinish={() => setOpenModal(false)} />
    </div>
  )
}

export default EventsPage
