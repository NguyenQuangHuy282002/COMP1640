import styled from '@emotion/styled'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, message, Row, Space } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Topbar() {
  const navigate = useNavigate()

  const [tabKey, setTabKey] = useState(['home'])
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'event', label: 'Events' },
    { key: 'courses', label: 'My Courses' },
  ]

  const userMenu: MenuProps['items'] = [
    { key: 'account', label: 'Account', icon: <UserOutlined /> },
    { key: 'logout', label: 'Logout' },
  ]

  const handleClick = async (val: any) => {
    if (val.key === 'logo') {
      navigate('/home')
    } else if (val.key === 'logout') {
      await navigate(`/${val.key}`)

      await navigate('/')
      return message.success('Đăng xuất thành công!')
    } else {
      navigate(`/${val.key}`)
    }
  }

  return (
    <Layout.Header style={{ background: '#888888', display: 'flex' }}>
      <Row style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href={'/'} style={{ marginRight: 20, display: 'contents' }}>
          <img src={window.location.origin + '/images/logo.png'} height="60" alt="Logo" />
        </a>
        <StyledMenu mode="horizontal" defaultSelectedKeys={tabKey} defaultOpenKeys={['home']} items={items} />

        <Dropdown menu={{ items: userMenu }} trigger={['click']} placement="bottom" arrow>
          <a>
            <Avatar
              style={{
                backgroundColor: '#f56a00',
                verticalAlign: 'middle',
              }}
              size="large"
              gap={1}
            >
              Huy
            </Avatar>
          </a>
        </Dropdown>
      </Row>
    </Layout.Header>
  )
}

const StyledMenu = styled(Menu)`
  background: #888888;
  font-size: 20px;
  width: 500px;
`

export default Topbar
