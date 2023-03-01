import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, message, Row, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { Http } from '../../api/http'
import SearchField from '../../components/search-field'
import AddCategoryModal from './add-new-category'

const { Text } = Typography

interface DataType {
  id: string
  name: string
}

const AddCategory = ({ openModal }) => (
  <Button type="primary" icon={<PlusCircleOutlined />} onClick={openModal}>
    Add new category
  </Button>
)

function CategoryManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [categoriesList, setCategoriesList] = useState([])
  const [currentCategory, setCurrentCategory] = useState({ name: '' })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const filteredCategories = useMemo(() => {
    return categoriesList.filter((cat: any) => cat.name.toLowerCase().includes(searchKey.toLowerCase().trim()))
  }, [categoriesList, searchKey])

  async function handleDeleteDepartment(name: string) {
    await Http.post('/api/v1/department/delete', { name })
      .then(res => {
        message.success(`Deleted ${name} successful!`)
        setCategoriesList(categoriesList.filter((deparment: DataType) => deparment.name !== name))
      })
      .catch(error => message.error(`Failed to delete ${name}!`))
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      sorter: (a: DataType, b: DataType) => a.name.length - b.name.length,
      width: '60%',
      key: 'name',
    },

    {
      title: 'Actions',
      render: (_, record: any) => (
        <Space wrap>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setOpenModal(true)
              setCurrentCategory({ name: record.name })
            }}
          />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteDepartment(record.name)} />
        </Space>
      ),
      width: '40%',
      key: 'Actions',
      align: 'center',
    },
  ]

  useEffect(() => {
    setLoading(true)
    const getAllUser = async () =>
      await Http.get('/api/v1/category')
        .then(res => setCategoriesList(res.data.data))
        .catch(error => enqueueSnackbar('Failed to get all categories !', { variant: 'error' }))
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
    <Row gutter={16} style={{ padding: '10px', margin: 0 }}>
      <Card
        title="All categories"
        extra={
          <AddCategory
            openModal={() => {
              setOpenModal(true)
              setCurrentCategory({ name: '' })
            }}
          />
        }
        bordered={false}
        style={{ width: '100%' }}
        bodyStyle={{ overflow: 'scroll', height: loading ? '500px' : 'auto', minHeight: '500px' }}
      >
        <Space align="center" wrap={true} style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <SearchField setSearchKey={setSearchKey} searchKey={searchKey} placeholder="Search categories by name" />
          <Text style={{ fontWeight: 600 }}>Number of categories: {filteredCategories?.length}</Text>
        </Space>
        <Table rowSelection={rowSelection} columns={columns} dataSource={filteredCategories} loading={loading} />
      </Card>
      <AddCategoryModal
        isOpen={openModal}
        onCloseModal={() => setOpenModal(false)}
        setCategoriesList={setCategoriesList}
        categoriesList={categoriesList}
        currentCategory={currentCategory}
      />
    </Row>
  )
}

export default CategoryManager
