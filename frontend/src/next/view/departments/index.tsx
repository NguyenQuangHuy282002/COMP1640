import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, message, Row, Space, Table, Typography, Divider } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { Http } from '../../api/http'
import SearchField from '../../components/search-field'
import AddDepartmentModal from './add-new-department'
import DepartmentCardItem from './card-department'

const { Text } = Typography

interface DataType {
  id: string
  name: string
}

const AddAccount = ({ openModal }) => (
  <Button type="primary" icon={<PlusCircleOutlined />} onClick={openModal}>
    Add new department
  </Button>
)

function DepartmentManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [deparments, setDeparments] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [currentDepartment, setCurrentDepartment] = useState({ name: '' })


  const [allDepartment, setAllDepartment] = useState([])
  const [editDepartment, setEditDepartment] = useState(null)


  const filteredDeparments = useMemo(() => {
    return deparments.filter((deparment: DataType) =>
      deparment.name.toLowerCase().includes(searchKey.toLowerCase().trim())
    )
  }, [deparments, searchKey])


  const getDepartmentList = async () => {
    await Http.get('/api/v1/department')
      .then(res => {
        setAllDepartment(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  useEffect(() => {
    getDepartmentList()
  }, [openModal])

  const handleDeleteDepartment = async (id: string) => {
    await Http.delete('/api/v1/department', id)
      .then(() => setAllDepartment(allDepartment.filter(deparment => deparment._id !== id)))
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }



  // async function handleDeleteDepartment(name: string) {
  //   await Http.post('/api/v1/department/delete', { name })
  //     .then(res => {
  //       message.success(`Deleted ${name} successful!`)
  //       setDeparments(deparments.filter((deparment: DataType) => deparment.name !== name))
  //     })
  //     .catch(error => message.error(`Failed to delete ${name}!`))
  // }

  // const columns: ColumnsType<DataType> = [
  //   {
  //     title: 'Department Name',
  //     dataIndex: 'name',
  //     sorter: (a: DataType, b: DataType) => a.name.length - b.name.length,
  //     width: '60%',
  //     key: 'name',
  //   },

  //   {
  //     title: 'Actions',
  //     render: (_, record: any) => (
  //       <Space wrap>
  //         <Button
  //           type="text"
  //           icon={<EditOutlined />}
  //           onClick={() => {
  //             setOpenModal(true)
  //             setCurrentDepartment({ name: record.name })
  //           }}
  //         />
  //         <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteDepartment(record.name)} />
  //       </Space>
  //     ),
  //     width: '40%',
  //     key: 'Actions',
  //     align: 'center',
  //   },
  // ]

  // useEffect(() => {
  //   setLoading(true)
  //   const getAllUser = async () =>
  //     await Http.get('/api/v1/department')
  //       .then(res => setDeparments(res.data.data))
  //       .catch(error => enqueueSnackbar('Failed to get all departments !', { variant: 'error' }))
  //       .finally(() => setLoading(false))
  //   getAllUser()
  // }, [])

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   setSelectedRowKeys(newSelectedRowKeys)
  // }
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  return (
    // <Row gutter={16} style={{ padding: '10px', margin: 0 }}>
    //   <Card
    //     title="All departments"
    //     extra={
    //       <AddAccount
    //         openModal={() => {
    //           setOpenModal(true)
    //           setCurrentDepartment({ name: '' })
    //         }}
    //       />
    //     }
    //     bordered={false}
    //     style={{ width: '100%' }}
    //     bodyStyle={{ overflow: 'scroll', height: loading ? '500px' : 'auto', minHeight: '500px' }}
    //   >
    //     <Space align="center" wrap={true} style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
    //       <SearchField setSearchKey={setSearchKey} searchKey={searchKey} placeholder="Search departments by name" />
    //       <Text style={{ fontWeight: 600 }}>Number of departments: {filteredDeparments?.length}</Text>
    //     </Space>

    //   </Card>
    <>
      {openModal ? (
        <AddDepartmentModal
          isOpen={openModal}
          onCloseModal={() => setOpenModal(false)}
          setDeparments={setDeparments}
          deparments={deparments}
          currentDepartment={currentDepartment}
        />

      ) : (
        <div style={{ padding: '10px 20px 10px 10px', margin: 0, marginTop: "20px" }}>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setOpenModal(true)
              setEditDepartment(null)
            }}
          >
            Add new Department
          </Button>
          <Divider />
          <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '20px' }}>
            {allDepartment.map((deparment, index) => (
              <DepartmentCardItem
                department={deparment}
                key={index}
                index={index}
                setEditDepartment={deparment => {
                  setEditDepartment(deparment)
                  setOpenModal(true)
                }}
                handleDeleteDepartment={handleDeleteDepartment}
              />
            ))}
          </Space>
        </div>
      )}
    </>














    // </Row>
  )
}

export default DepartmentManager
