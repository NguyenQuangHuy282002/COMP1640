import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'; // import Link component


const styles = {
  tableWrapper: {
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
  },
  tableHeaderCell: {
    color: '#1890ff',
    fontSize: '14px',
  },
  tableRowEven: {
    backgroundColor: '#f5f5f5',
  },
  tableRowOdd: {
    backgroundColor: '#fff',
  },
  tableCell: {
    fontFamily: 'Open Sans, sans-serif',
  },
};

const EventCardItem: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    style={styles.tableWrapper}
    bordered
  />
);


interface DataType {
  key : any;
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
    render: (text, record) => <Link to={`/eventdetail/${record.key}`}>{text}</Link>, // use Link to wrap title
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
];



export default EventCardItem;