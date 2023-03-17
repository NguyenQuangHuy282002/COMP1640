import { Card, Space, Tag, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#69b1ff', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function App() {
  return (
    <Card bordered={false} style={{height:'100%'}}>
      <Title level={3} style={{margin:'5px'}}>
        Your event chart
        </Title>
 <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    <Space size={[0, 8]} style={{display:'flex',justifyContent:'space-around'}} wrap>
          <Space>
          <Tag color="#69b1ff" style={{height:'20px',width:'20px'}}/>
          <Typography.Text>Lol 1</Typography.Text>
          </Space>
          <Space>
          <Tag color="#00C49F" style={{height:'20px',width:'20px'}}/>
          <Typography.Text>Lol2</Typography.Text>
          </Space>
          <Space>
          <Tag color="#FFBB28" style={{height:'20px',width:'20px'}}/>
          <Typography.Text>Lol3</Typography.Text>
          </Space>
          <Space>
          <Tag color="#FF8042" style={{height:'20px',width:'20px'}}/>
          <Typography.Text>Lol4</Typography.Text>
          </Space> 
          </Space>
    </Card>
   );
}

App.demoUrl = 'https://codesandbox.io/s/bar-chart-with-customized-shape-dusth';
