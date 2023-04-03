import {
    ClockCircleTwoTone,
    DeleteOutlined,
    EditOutlined,
    EyeTwoTone,
} from '@ant-design/icons'
import { Badge, Button, Card, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import useRoleNavigate from 'next/libs/use-role-navigate'


interface InterfaceDepartment {
    _id: string
    name: string
    users: any
}




const COLOR_LIST = ['#f5252522', '#99b41128', '#49ffb639', '#6f30b346', '#49adff49']

function DepartmentCardItem({
    department,
    index,
    handleDeleteDepartment,
    setEditDepartment,
}: {
    department: InterfaceDepartment
    index: number
    handleDeleteDepartment: any
    setEditDepartment: (department: any) => void
}) {
    const navigate = useRoleNavigate()

    const handleViewDepartmentDetails = (id: string) => {
        console.log(id);
        navigate(`/department/${id}`)
    }

    return (
        <>
            <Badge.Ribbon color='cyan'>
                <Card
                    title={
                        <Link
                            style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}
                            onClick={() => handleViewDepartmentDetails(department._id)}
                        >
                            Department: {department?.name}
                        </Link>
                    }
                    bordered={false}
                    style={{ width: '100%', display: 'block', backgroundColor: COLOR_LIST[index % 5] }}
                    extra={
                        <Space wrap>
                            <Button type="text" icon={<EyeTwoTone />} onClick={() => handleViewDepartmentDetails(department._id)} />
                            <Button type="text" icon={<EditOutlined />} onClick={() => setEditDepartment(department)} />
                            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteDepartment(department._id)} />
                        </Space>
                    }
                    headStyle={{ borderBottom: '2px solid #d7d7d7' }}
                >
                    <div>
                        <Space style={{ color: '#0055d5' }}>
                            <ClockCircleTwoTone twoToneColor="#d81414" />
                            <p style={{ margin: 8 }}>ID for this department: {department._id}</p>
                        </Space>
                    </div>
                </Card>
            </Badge.Ribbon>
        </>
    )
}




export default DepartmentCardItem;