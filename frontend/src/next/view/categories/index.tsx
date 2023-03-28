import { PlusCircleTwoTone,PlusCircleOutlined } from '@ant-design/icons'
import { Divider, Row, Skeleton, Space, Typography, Button, Card } from 'antd'
import { Http } from 'next/api/http'
import { BlueColorButton } from 'next/components/custom-style-elements/button'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CategoryCardItem from './card-item'
import AddCategoryModal from './add-new-category'

const { Title } = Typography

const AddCategory = ({ openModal }) => (
  <Button type="primary" icon={<PlusCircleOutlined />} onClick={openModal}>
    Add new category
  </Button>
)

function CategoryManager() {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [allCategoryList, setAllCategoryList] = useState([])
  const [currentCategory, setCurrentCategory] = useState({ name: '' })
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
      </Card>
      <AddCategoryModal
        isOpen={openModal}
        onCloseModal={() => setOpenModal(false)}
        setCategoriesList={setAllCategoryList}
        categoriesList={allCategoryList}
        currentCategory={currentCategory}
      />
    </Row>
    </>
  )
}

export default CategoryManager

