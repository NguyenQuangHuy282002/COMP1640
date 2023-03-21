// <<<<<<< yesvansirevent
// import React from 'react';
// import { Space, Table, Tag } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { Link } from 'react-router-dom'; // import Link component

// const styles = {
//   tableWrapper: {
//     border: '1px solid #d9d9d9',
//     borderRadius: '5px',
//   },
//   tableHeaderCell: {
//     color: '#1890ff',
//     fontSize: '14px',
//   },
//   tableRowEven: {
//     backgroundColor: '#f5f5f5',
//   },
//   tableRowOdd: {
//     backgroundColor: '#fff',
//   },
//   tableCell: {
//     fontFamily: 'Open Sans, sans-serif',
//   },
// };

// const EventCardItem: React.FC = () => (
//   <Table
//     columns={columns}
//     dataSource={data}
//     style={styles.tableWrapper}
//     bordered
//   />
// );

// interface DataType {
//   key : any;
//   title: any;
//   description: any;
//   department: any;
//   startDate: any;
//   firstClosedDate: any;
//   finalClosedDate: any;
// =======

import {
  ClockCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeTwoTone,
  FireTwoTone,
  RocketTwoTone,
} from '@ant-design/icons'
import { Badge, Button, Card, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import useRoleNavigate from 'next/libs/use-role-navigate'

interface IEvent {
  _id: string
  title: string
  description: string
  startDate: string
  firstCloseDate: string
  finalCloseDate: string
  ideas: any
}

const COLOR_LIST = ['#ff494924', '#dbfb3d28', '#49ffb639', '#993dfb46', '#49adff49']

function EventCardItem({
  event,
  index,
  handleDeleteEvent,
  setEditEvent,
}: {
  event: IEvent
  index: number
  handleDeleteEvent: any
  setEditEvent: (event: any) => void
}) {
  const navigate = useRoleNavigate()

  const handleViewEventDetails = (id: string) => {
    navigate(`/event/${id}`)
  }

  return (
    <Badge.Ribbon
      text={event?.ideas?.length}
      color={event?.ideas?.length > 5 ? 'green' : event?.ideas?.length === 0 ? 'red' : 'volcano'}
    >
      <Card
        title={
          <Link
            style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}
            onClick={() => handleViewEventDetails(event._id)}
          >
            {event?.title}
          </Link>
        }
        bordered={false}
        style={{ width: '100%', display: 'block', backgroundColor: COLOR_LIST[index % 5] }}
        extra={
          <Space wrap>
            <Button type="text" icon={<EyeTwoTone />} onClick={() => handleViewEventDetails(event._id)} />
            <Button type="text" icon={<EditOutlined />} onClick={() => setEditEvent(event)} />
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteEvent(event._id)} />
          </Space>
        }
        headStyle={{ borderBottom: '2px solid #d7d7d7' }}
      >
        <div>
          <Space style={{ color: '#0055d5' }}>
            <ClockCircleTwoTone twoToneColor="#0055d5" />
            <p style={{ margin: 8 }}>Start date: {new Date(event.startDate).toLocaleString('en-US')}</p>
          </Space>
        </div>
        <div>
          <Space style={{ color: '#d59900' }}>
            <FireTwoTone twoToneColor="#d59900" />
            <p style={{ margin: 8 }}>First closure date: {new Date(event.firstCloseDate).toLocaleString('en-US')}</p>
          </Space>
        </div>

        <div>
          <Space style={{ color: '#d52e00' }}>
            <RocketTwoTone twoToneColor="#d52e00" />
            <p style={{ margin: 8 }}>Final closure date: {new Date(event.finalCloseDate).toLocaleString('en-US')}</p>
          </Space>
        </div>
      </Card>
    </Badge.Ribbon>
  )
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text, record) => (
      <Link
      // to={`/eventdetail/${record.key}`}
      >
        {text}
      </Link>
    ), // use Link to wrap title
  },
  {
    title: 'Description',
    dataIndex: 'description',
    // key: 'description',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'StartDate',
    dataIndex: 'startDate',
  },
  {
    title: 'FirstClosedDate',
    dataIndex: 'firstClosedDate',
  },
  {
    title: 'FinalClosedDate',
    dataIndex: 'finalClosedDate',
  },
]

const data = [
  {
    key: '1',
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    key: '2',
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    key: '3',
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    key: '4',
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    key: '5',
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
]

export default EventCardItem
