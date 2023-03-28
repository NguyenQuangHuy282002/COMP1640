import { PlusCircleTwoTone } from '@ant-design/icons'
import { Divider, Row, Skeleton, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { BlueColorButton } from 'next/components/custom-style-elements/button'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CategoryCardItem from './card-item'

const { Title } = Typography

function CategoryManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [allCategoryList, setAllCategoryList] = useState([])
  const [editCategory, setEditCategory] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCategoryList = async () => {
    setLoading(true)
    await Http.get('/api/v1/category')
      .then(res => {
        setAllCategoryList(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getCategoryList()
  }, [openModal])

  const handleDeleteCategory = async (id: string) => {
    await Http.delete('/api/v1/category', id)
      .then(() => setAllCategoryList(allCategoryList.filter(category => category._id !== id)))
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <>
        <div style={{ padding: 20, margin: 0 }}>
          <Row justify="space-between">
            <Title level={3} style={{ margin: 0 }}>
              Categorys list
            </Title>
            <BlueColorButton
              icon={<PlusCircleTwoTone twoToneColor={'#005ec2'} />}
              onClick={() => {
                setOpenModal(true)
                setEditCategory(null)
              }}
              size="large"
            >
              Add new category
            </BlueColorButton>
          </Row>
          <Divider />
          <Skeleton loading={loading} avatar active>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {allCategoryList.map((category, index) => (
                <CategoryCardItem
                  category={category}
                  key={index}
                  setEditCategory={category => {
                    setEditCategory(category)
                    setOpenModal(true)
                  }}
                  handleDeleteCategory={handleDeleteCategory}
                />
              ))}
            </Space>
          </Skeleton>
        </div>

    </>
    //>>>>>>> main
  )
}

export default CategoryManager
//<<<<<<< yesvansirCategory

// {data.map((category, index) => (
//   <CategoryCardItem category={category} key={index} />
// ))}
//=======
//>>>>>>> main
