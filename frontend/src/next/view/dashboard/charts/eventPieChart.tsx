import { Card, Space, Tag, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (
       <>
      <ResponsiveContainer width="100%" height="100%">
        <Card bordered={false}>
          <Title level={3} style={{ margin: '5px' }}>
            Your pie chart
          </Title>
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <Space size={[0, 8]} style={{display:'flex',justifyContent:'space-around'}} wrap>
          <Space>
          <Tag color="#0088FE" style={{height:'20px',width:'20px'}}/>
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
       </ResponsiveContainer>
      </>
    );
  }
}
