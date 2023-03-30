import { ClockCircleTwoTone, FireTwoTone, RocketTwoTone } from '@ant-design/icons'
import { Alert, Button, Card, Empty, List, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const { Title } = Typography

export default function DepartmentDetail() {
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [department, setDepartment] = useState(null)

    const getDepartmentDetail = async () => {
        await Http.get(`/api/v1/department?id=${id}`)
            .then(res => {
                setDepartment(res.data?.data[0] || null)
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    }

    useEffect(() => {
        getDepartmentDetail()
    }, [id])
    console.log(department)


    return (
        <Card
            title={<Title style={{ margin: 0, fontSize: 24, textOverflow: 'ellipsis' }}>{department?.name}</Title>}
            style={{ borderRadius: 0, height: '100%', marginRight: 16 }}
            headStyle={{ backgroundColor: '#1677ff6d', borderRadius: 0 }}
        >

            <Title style={{ margin: '20px 0px 16px', fontSize: 18, color: '#1677ff' }}>Ideas in this department:</Title>

            {department?.users?.length ? (
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page)
                        },
                        pageSize: 5,
                    }}
                    style={{
                        marginBottom: '50px',
                    }}
                    dataSource={department?.users}
                    renderItem={idea => <p key={`${idea}`}>{idea.toString()}</p>}
                />
            ) : (
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={<span>There is no any idea yet</span>}
                    style={{ width: '100%', padding: 20 }}
                >

                </Empty>
            )}
        </Card>
    )
}
