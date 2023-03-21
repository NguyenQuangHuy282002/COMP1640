import { Card, Col, message, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Http } from 'next/api/http'
import React, { useEffect, useState } from 'react'

const SmallStatistic: React.FC = () => {
  const [totalAccount, setTotalAccount] = useState(0)

  const getTotalAccount = async () => {
    await Http.get('/api/v1/users/totalAccount')
      .then(res => setTotalAccount(res.data?.total))
      .catch(err => message.error('Failed to get total accounts!'))
  }

  useEffect(() => {
    getTotalAccount()
  }, [])

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={4} style={{ margin: '5px' }}>
            Total Account
          </Title>
          <p>{totalAccount?.toString()} accounts</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={4} style={{ margin: '5px' }}>
            Total Post
          </Title>
          Total post goes here
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Title level={4} style={{ margin: '5px' }}>
            Some thing else
          </Title>
          Post rate goes here
        </Card>
      </Col>
    </Row>
  )
}

export default SmallStatistic
