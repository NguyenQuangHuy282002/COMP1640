import { PlusCircleTwoTone } from '@ant-design/icons'
import { Divider, Row, Skeleton, Space, Typography } from 'antd'
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
  const [loading, setLoading] = useState(false)

  const getEventList = async () => {
    setLoading(true)
    await Http.get('/api/v1/event')
      .then(res => {
        setAllEventList(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      .finally(() => setLoading(false))
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
          <Skeleton loading={loading} avatar active>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {allEventList.map((event, index) => (
                <EventCardItem
                  event={event}
                  key={index}
                  setEditEvent={event => {
                    setEditEvent(event)
                    setOpenModal(true)
                  }}
                  handleDeleteEvent={handleDeleteEvent}
                />
              ))}
            </Space>
          </Skeleton>
        </div>
      )}
    </>
    //>>>>>>> main
  )
}

export default EventsPage

// {data.map((event, index) => (
//   <EventCardItem event={event} key={index} />
// ))}
//=======
//>>>>>>> main
