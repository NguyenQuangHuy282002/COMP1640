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
          title={
            <Link
              style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}
              onClick={() => handleViewCategoryDetails(category._id)}
            >
              {category?.name}
            </Link>
          }
          bordered={false}
          style={{ width: '100%', display: 'block' }}
          extra={
            <Space wrap>
              <Button type="text" icon={<EyeTwoTone />} onClick={() => handleViewCategoryDetails(category._id)} />
              <Button type="text" icon={<EditOutlined />} onClick={() => setEditCategory(category)} />
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(category._id)} />
            </Space>
          }
          headStyle={{ borderBottom: '2px solid #d7d7d7' }}
        >
        </Card>
      </Badge.Ribbon>
    )
  }
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => (
        <Link
        // to={`/Categorydetail/${record.key}`}
        >
          {text}
        </Link>
      ), // use Link to wrap title
    }
  ]
  
  
  export default CategoryCardItem
  