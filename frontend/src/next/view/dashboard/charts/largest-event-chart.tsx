import { Card, Skeleton, Space, Tag, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { Http } from 'next/api/http'
import { useSocket } from 'next/socket.io'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'

const colors = ['#69b1ff', '#00C49F', '#FFBB28', '#FF8042']

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`
}

export default function LarsestEventIdea() {
  const { appSocket } = useSocket()
  const { enqueueSnackbar } = useSnackbar()
  const [eventList, setEventList] = useState([])
  const [loading, setLoading] = useState(false)
  const getEventList = async () => {
    setLoading(true)
    await Http.get('/api/v1/event')
      .then(res => {
        setEventList(
          res.data.data
            .sort((a, b) => b.ideas.length - a.ideas.length)
            .slice(0, 10)
            .map(event => ({
              name: event.title,
              totalIdea: event.ideas.length,
            }))
        )
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      .finally(() => setLoading(false))
  }

  const updateEventRealTime = data => {
    console.log('=>>>>>>>>>>data', data)
    setEventList(
      data.event
        .sort((a, b) => b.ideas.length - a.ideas.length)
        .slice(0, 10)
        .map(event => ({
          name: event.title,
          totalIdea: event.ideas.length,
        }))
    )
  }

  useEffect(() => {
    getEventList()
  }, [])

  useEffect(() => {
    // App socket
    appSocket.on('all_events', updateEventRealTime)

    // The listeners must be removed in the cleanup step, in order to prevent multiple event registrations
    return () => {
      appSocket.off('all_events', updateEventRealTime)
    }
  }, [updateEventRealTime])

  return (
    <Skeleton avatar title={false} loading={loading} active>
      <Card bordered={false} style={{ height: '100%' }}>
        <Title level={3} style={{ margin: '5px' }}>
          Top 10 events with the most ideas
        </Title>
        <BarChart
          width={500}
          height={300}
          data={eventList}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" display={'none'} />
          <YAxis minTickGap={1} />
          <Bar dataKey="totalIdea" fill="#8884d8" label={{ position: 'top' }}>
            {eventList.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 5]} />
            ))}
          </Bar>
        </BarChart>
        <Space size={[0, 8]} style={{ display: 'block' }} wrap>
          {eventList.map((event, index) => (
            <Space key={index}>
              <Tag color={colors[index % 5]} style={{ height: '20px', width: '20px' }} />
              <Typography.Text>{event.name}</Typography.Text>
            </Space>
          ))}
        </Space>
      </Card>
    </Skeleton>
  )
}
