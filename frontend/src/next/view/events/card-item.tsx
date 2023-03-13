import {
  ClockCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeTwoTone,
  FireTwoTone,
  RocketTwoTone,
} from '@ant-design/icons'
import { Button, Card, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import { useNavigate } from 'react-router-dom'

interface IEvent {
  _id: string
  title: string
  description: string
  startDate: string
  firstCloseDate: string
  finalCloseDate: string
}

const COLOR_LIST = ['#ff494924', '#dbfb3d28', '#49ffb639', '#993dfb46', '#49adff49']

function EventCardItem({
  event,
  index,
  handleDeleteEvent,
  setEditEvent,
}: {
  event: IEvent
  index: number
  handleDeleteEvent: any
  setEditEvent: (event: any) => void
}) {
  const navigate = useNavigate()

  const handleViewEventDetails = (id: string) => {
    navigate(`/event/${id}`)
  }

  return (
    <Card
      title={
        <Link
          style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}
          onClick={() => handleViewEventDetails(event._id)}
        >
          {event?.title}
        </Link>
      }
      bordered={false}
      style={{ width: '100%', display: 'block', backgroundColor: COLOR_LIST[index % 5] }}
      extra={
        <Space wrap>
          <Button type="text" icon={<EyeTwoTone />} onClick={() => handleViewEventDetails(event._id)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => setEditEvent(event)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteEvent(event._id)} />
        </Space>
      }
      headStyle={{ borderBottom: '2px solid #d7d7d7' }}
    >
      <div>
        <Space style={{ color: '#0055d5' }}>
          <ClockCircleTwoTone twoToneColor="#0055d5" />
          <p style={{ margin: 8 }}>Start date: {new Date(event.startDate).toLocaleString('en-US')}</p>
        </Space>
      </div>
      <div>
        <Space style={{ color: '#d59900' }}>
          <FireTwoTone twoToneColor="#d59900" />
          <p style={{ margin: 8 }}>First closure date: {new Date(event.firstCloseDate).toLocaleString('en-US')}</p>
        </Space>
      </div>

      <div>
        <Space style={{ color: '#d52e00' }}>
          <RocketTwoTone twoToneColor="#d52e00" />
          <p style={{ margin: 8 }}>Final closure date: {new Date(event.finalCloseDate).toLocaleString('en-US')}</p>
        </Space>
      </div>
    </Card>
  )
}

export default EventCardItem
