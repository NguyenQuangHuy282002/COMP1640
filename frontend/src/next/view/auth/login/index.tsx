import { Button, Card, Form, Input, message, Row, Space, Typography } from 'antd'
import useRoleNavigate from 'next/libs/use-role-navigate'
import { useEffect } from 'react'
import { Http, LOCALSTORAGE } from '../../../api/http'
import { imgDir } from '../../../constants/img-dir'
import { userCredential, userStore } from '../user-store'
const { Title } = Typography

function Login() {
  const [form] = Form.useForm()
  const navigate = useRoleNavigate()
  useEffect(() => {
    const credential = JSON.parse(localStorage.getItem(LOCALSTORAGE.CREDENTIALS))
    if (credential && credential.tokenVerified) {
      message.info('You already logged in!')
    }
  }, [])

  const handleSubmit = async (val: any) => {
    await Http.post('/api/v1/auth/login', val)
      .then(async res => {
        if (res?.data?.success) {
          userStore.updateState(res.data.userMetaData)
          userCredential.state.login(res.data.userMetaData._id, res.data.accessToken, 30000, true)
          navigate('/')
          window.location.reload()
          message.success('Login successful')
        }
        return res.data.userMetaData.role
      })
      .then(enpoint => navigate(`/${enpoint}`))
      .catch(error => {
        if (error?.response?.data.message) {
          message.error(error.response.data.message)
        } else {
          message.error(`Login failed, ${error?.message}`)
        }
      })
  }

  return (
    <Row
      style={{
        width: '100%',
        height: '100vh',
        paddingTop: 70,
        paddingBottom: 50,
        justifyContent: 'center',
        background: '#2e4d68',
      }}
    >
      <Card>
        <Space align="center" direction="vertical">
          <img src={`${imgDir}logo.png`} height={300} alt="logo" />
          <Title>Login to use this application</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Row>
  )
}

export default Login
