import { Card, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

const SmallStatistic: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card bordered={false}>
      <Title level={4} style={{margin:'5px'}}>
        Total Account
        </Title>
        Total account goes here
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <Title level={4} style={{margin:'5px'}}>
        Total Post
        </Title>
        Total post goes here
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <Title level={4} style={{margin:'5px'}}>
        Some thing else
        </Title>
        Post rate goes here
      </Card>
    </Col>
  </Row>
);

export default SmallStatistic;