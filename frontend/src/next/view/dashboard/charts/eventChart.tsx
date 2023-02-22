import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

function EventChart() {
  const data = [
    { name: 'Event 1', blogPost: 400 },
    { name: 'Event 2', blogPost: 100 },
    { name: 'Event 3', blogPost: 200 },
    { name: 'Event 4', blogPost: 500 },
    { name: 'Event 5', blogPost: 300 },
    { name: 'Event 6', blogPost: 700 },
  ]
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
      <Legend
        width={100}
        wrapperStyle={{
          top: 40,
          right: 20,
          backgroundColor: '#f5f5f5',
          border: '1px solid #d5d5d5',
          borderRadius: 3,
          lineHeight: '40px',
        }}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="blogPost" fill="#8884d8" barSize={30} />
    </BarChart>
  )
}

export default EventChart
