import { Card } from 'antd'

interface IEvent {
  _id: string
  title: string
  description: string
  startDate: string
  firstCloseDate: string
  finalCloseDate: string
}

function EventCardItem({ event }: { event: IEvent }) {
  return (
    <Card title={event.title} bordered={false} style={{ width: '100%' }}>
      <p>Start date: {event.startDate}</p>
      <p>First closure date: {event.firstCloseDate}</p>
      <p>Final closure date: {event.finalCloseDate}</p>
    </Card>
  )
}

export default EventCardItem
