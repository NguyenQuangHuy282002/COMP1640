import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Space, Typography, Divider } from 'antd'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { Http } from '../../api/http'
import AddDepartmentModal from './add-new-department'
import DepartmentCardItem from './card-department'



const { Text } = Typography


const AddAccount = ({ openModal }) => (
  <Button type="primary" icon={<PlusCircleOutlined />} onClick={openModal}>
    Add new department
  </Button>
)

function DepartmentManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState({})
  const [allDepartment, setAllDepartment] = useState([])
  const [editDepartment, setEditDepartment] = useState()




  const getAllDepartment = async () => {
    setLoading(true)
    await Http.get('/api/v1/department')
      .then(res => {
        setAllDepartment(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllDepartment()
  }, [openModal])

  const handleDeleteDepartment = async (id: string) => {
    await Http.delete('/api/v1/department', id)
      .then(() => setAllDepartment(allDepartment.filter(deparment => deparment._id !== id)))
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }



  return (


    <>
      {openModal ? (
        <AddDepartmentModal
          isOpen={openModal}
          onCloseModal={() => setOpenModal(false)}
          setDeparments={setAllDepartment}
          deparments={allDepartment}
          currentDepartment={currentDepartment}
        />

      ) : (
        <div style={{ padding: '10px 20px 10px 10px', margin: 0, marginTop: "20px" }}>
          <Button
            type="primary"
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
                  setCurrentDepartment({ _id: deparment._id, name: deparment.name })
                  setOpenModal(true)
                }}
                handleDeleteDepartment={handleDeleteDepartment}
              />
            ))}
          </Space>
        </div>
      )}
    </>

  )
}

export default DepartmentManager
