import { Card } from 'antd'
import React from 'react'

function EventCardItem({ event }) {
  return (
    <Card title={event.title} bordered={false} style={{ width: '100%' }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )
}

export default EventCardItem
