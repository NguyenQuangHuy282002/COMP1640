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

interface ICategory {
  _id: string
  name: string
  ideas: any
  
}

function CategoryCardItem({
  category,
  handleDeleteCategory,
  setEditCategory,
}: {
  category: ICategory
  handleDeleteCategory: any
  setEditCategory: (category: any) => void
}) {
  const navigate = useRoleNavigate()

  const handleViewCategoryDetails = (id: string) => {
    navigate(`/category/${id}`)
  }

  return (
    <Badge.Ribbon
      text={category?.ideas?.length}
      color={category?.ideas?.length > 5 ? 'green' : category?.ideas?.length === 0 ? 'red' : 'volcano'}
    >
      <Card
        title=""
        bordered={false}   
        extra=""
      >
        <Link
          style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}
          onClick={() => handleViewCategoryDetails(category._id)}
        >
          {category?.name}
        </Link>
        <Space wrap style={{ float: 'right' }}>
          <Button type="text" icon={<EyeTwoTone />} onClick={() => handleViewCategoryDetails(category._id)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => setEditCategory(category)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(category._id)} />
        </Space>
      </Card>
    </Badge.Ribbon>
  )
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text, record) => (
      <Link>
        {text}
      </Link>
    ), 
  },
]

export default CategoryCardItem
