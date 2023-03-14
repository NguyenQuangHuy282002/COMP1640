import { Card, Col, Row } from 'antd';
import React from 'react';

const SmallStatistic: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Total Account" bordered={false}>
        Total account goes here
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total post" bordered={false}>
        Total post goes here
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Post rate" bordered={false}>
        Post rate goes here
      </Card>
    </Col>
  </Row>
);

export default SmallStatistic;