import SearchField from '../../components/search-field'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Row, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { Http } from '../../api/http'
import AddDepartmentModal from './add-new-department'

interface DataType {
  id: string
  username: string
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
    sorter: (a: DataType, b: DataType) => a.username.length - b.username.length,
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
        value: 'manager',
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

function DepartmentManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [accounts, setAccounts] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc: DataType) => acc.username.toLowerCase().includes(searchKey.toLowerCase().trim()))
  }, [accounts, searchKey])

  useEffect(() => {
    setLoading(true)
    const getAllUser = async () =>
      await Http.get('/api/v1/users')
        .then(res => setAccounts(res.data.data))
        .catch(error => enqueueSnackbar('Failed to get all departments !', { variant: 'error' }))
        .finally(() => setLoading(false))
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
        title="All departments"
        extra={<AddAccount openModal={() => setOpenModal(true)} />}
        bordered={false}
        style={{ width: '100%' }}
        bodyStyle={{ overflow: 'scroll', height: loading ? '500px' : 'auto', minHeight: '500px' }}
      >
        <SearchField setSearchKey={setSearchKey} searchKey={searchKey} placeholder="Search departments by name" />
        <Table rowSelection={rowSelection} columns={columns} dataSource={filteredAccounts} loading={loading} />
      </Card>
      <AddDepartmentModal
        isOpen={openModal}
        onCloseModal={() => setOpenModal(false)}
        setAccounts={setAccounts}
        accounts={accounts}
      />
    </Row>
  )
}

export default DepartmentManager
