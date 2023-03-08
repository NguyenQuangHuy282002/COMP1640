import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  title: any;
  description: any;
  department: any;
  startDate: any;
  firstClosedDate: any;
  finalClosedDate: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title', 
    render: (text) => <a>{text}</a>,
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
];

const data: DataType[] = [
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',
  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',

  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',

  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',

  },
  {
    title: 'adshkjfgk asdgfhjgjhds',
    description: 'gdsahkgfkjhasgdf',
    department: 'Computing',
    startDate: '2/8/2002',
    firstClosedDate: '2/8/2002',
    finalClosedDate: '2/8/2002',

  },
];

const EventCardItem: React.FC = () => <Table columns={columns} dataSource={data} />;

export default EventCardItem;