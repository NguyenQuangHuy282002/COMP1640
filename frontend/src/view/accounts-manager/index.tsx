import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Row, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { SetStateAction, useEffect, useState } from 'react'
import { Http } from '../../api/http'
import AddAccountModal from './add-new-account'

interface DataType {
  id: string
  name: string
  email: string
  role: string
  active: boolean
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: '_id',
    width: '10%',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'username',
    sorter: (a: DataType, b: DataType) => a.name.length - b.name.length,
    width: '30%',
    key: 'username',
  },

  {
    title: 'Role',
    dataIndex: 'role',
    width: '15%',
    filters: [
      {
        text: 'Admin',
        value: 'admin',
      },
      {
        text: 'Staff',
        value: 'staff',
      },
      {
        text: 'QA Manager',
        value: 'QAmanager',
      },
      {
        text: 'Coordinator',
        value: 'coordinator',
      },
    ],
    onFilter: (value: any, record: DataType) => record.role.indexOf(value) === 0,
    key: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'isBanned',
    render: (_, record: any) => <Tag color="blue">{record.isBanned ? 'Active' : 'Inactive'}</Tag>,
    width: '15%',
    key: 'Status',
  },
]

const AddAccount = ({ openModal }) => (
  <Button type="primary" icon={<PlusCircleOutlined />} onClick={openModal}>
    Add new account
  </Button>
)

function AccountManager() {
  const [accounts, setAccounts] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getAllUser = async () =>
      await Http.get('/api/v1/users')
        .then(res => setAccounts(res.data))
        .then(() => setLoading(false))
        .catch(error => console.log(error))
    getAllUser()
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  return (
    <Row gutter={16} style={{ padding: '20px', margin: 0 }}>
      <Card
        title="All accounts"
        extra={<AddAccount openModal={() => setOpenModal(true)} />}
        bordered={false}
        style={{ width: '100%' }}
        bodyStyle={{ overflow: 'scroll', height: loading ? '500px' : 'auto', minHeight: '500px' }}
      >
        <Table rowSelection={rowSelection} columns={columns} dataSource={accounts} loading={loading} />
      </Card>
      <AddAccountModal isOpen={openModal} onCloseModal={() => setOpenModal(false)}></AddAccountModal>
    </Row>
  )
}

export default AccountManager

const accountc = [
  {
    key: '1',
    id: '238456776345',
    name: 'huy',
    email: 'huy1234@gmail.com',
    role: 'admin',
    active: true,
  },
]
