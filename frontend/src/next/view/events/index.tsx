import { Button, Divider, Space } from 'antd'
import { useState } from 'react'
import EventCardItem from './card-item'
import CreateEventModal from './new-event-modal'

function EventsPage() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div style={{ padding: '10px', margin: 0 }}>
      <Button onClick={() => setOpenModal(true)}>Add new event</Button>
      <Divider />
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        {data.map((event, index) => (
          <EventCardItem event={event} key={index} />
        ))}
      </Space>
      <CreateEventModal onClose={() => setOpenModal(false)} open={openModal} onFinish={() => setOpenModal(false)} />
    </div>
  )
}

export default EventsPage

const data = [
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
]
