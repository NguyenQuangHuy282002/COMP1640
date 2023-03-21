import { Card, Col, message, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Http } from 'next/api/http'
import React, { useEffect, useState } from 'react'

const SmallStatistic: React.FC = () => {
  const [totalAccount, setTotalAccount] = useState(0)
  const [totalIdea, setTotalIdea] = useState(0)
  const [totalEvent, setTotalEvent] = useState(0)

  const getTotalAccount = async () => {
    await Http.get('/api/v1/users/totalAccount')
      .then(res => setTotalAccount(res.data?.total))
      .catch(err => message.error('Failed to get total accounts!'))
  }
  const getTotalIdea = async () => {
    await Http.get('/api/v1/idea/totalIdea')
      .then(res => setTotalIdea(res.data?.total))
      .catch(err => message.error('Failed to get total ideas!'))
  }

  const getEventList = async () => {
    await Http.get('/api/v1/event/available')
      .then(res => {
        setTotalEvent(res.data.data.length)
      })
      .catch(error => message.error('Failed to get total events!'))
  }
  getEventList()
  useEffect(() => {
    getTotalAccount()
    getTotalIdea()
  }, [])

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={3} style={{ margin: 0 }}>
            Total Accounts
          </Title>
          <Title level={4} type="success">
            {totalAccount?.toString()} accounts
          </Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={3} style={{ margin: 0 }}>
            Total Ideas
          </Title>
          <Title level={4} type="success">
            {totalIdea?.toString()} ideas
          </Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={3} style={{ margin: 0 }}>
            Total event incomming
          </Title>
          <Title level={4} type="success">
            {totalEvent?.toString()} events
          </Title>
        </Card>
      </Col>
    </Row>
  )
}

export default SmallStatistic
