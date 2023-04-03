import {Card} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {PureComponent} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <Card bordered={false}>
          <Title level={3}
            style={
              {margin: '5px'}
          }>
            Ideas trend in a week
          </Title>
          <LineChart width={500}
            height={300}
            data={data}
            margin={
              {
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }
          }>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8"
              activeDot={
                {r: 8}
              }/>
          </LineChart>
        </Card>
      </ResponsiveContainer>
    );
  }
}
