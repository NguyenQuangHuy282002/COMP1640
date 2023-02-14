import {
  CarryOutOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styled from '@emotion/styled'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Row, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { imgDir } from '../../constants/img-dir'
import useWindowSize from '../../utils/useWindowSize'

const { Text } = Typography

function AppHeader() {
  const navigate = useNavigate()
  const windowWidth = useWindowSize()
  const [tabKey, setTabKey] = useState(['home'])

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Home</Text>,
      icon: windowWidth < 750 && <HomeOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'dashboard',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Dashboard</Text>,
      icon: windowWidth < 750 && <DashboardOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'event',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Events</Text>,
      icon: windowWidth < 750 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'accounts-manager',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Accounts</Text>,
      icon: windowWidth < 750 && <TeamOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'courses',
      label: <Text style={{ fontSize: 20, margin: 0 }}>My Course</Text>,
      icon: windowWidth < 750 && <ProfileOutlined style={{ fontSize: 20 }} />,

      children: [
        {
          label: <Text style={{ fontSize: 20, margin: 0 }}>Courses 1</Text>,
          key: 'setting:1',
        },
        {
          label: <Text style={{ fontSize: 20, margin: 0 }}>Courses 2</Text>,
          key: 'setting:2',
        },
      ],
    },
  ]

  const userMenu: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <Text style={{ fontSize: 20, margin: 0 }} onClick={() => handleClickMenu({ key: 'account' })}>
          Account
        </Text>
      ),
      icon: <UserOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'logout',
      label: (
        <Text style={{ fontSize: 20, margin: 0 }} onClick={() => handleClickMenu({ key: 'logout' })}>
          Logout
        </Text>
      ),
      icon: <LogoutOutlined style={{ fontSize: 20 }} />,
    },
  ]

  const handleClickMenu = async (val: any) => {
    if (tabKey === val.key || tabKey.includes('courses')) return
    switch (val.key) {
      case 'home':
        navigate('/')

        break
      default:
        navigate(`/${val.key}`)
    }
  }

  return (
    <Layout.Header style={{ background: '#888888', display: 'flex' }}>
      <Row style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href={'/'} style={{ marginRight: 20, display: 'contents' }}>
          <img src={imgDir + 'logo.png'} height="60" alt="Logo" />
        </a>
        {windowWidth < 750 ? (
          <Dropdown
            menu={{ items: [...menuItems, ...userMenu] }}
            trigger={['click']}
            overlayStyle={{ width: 200 }}
            placement="bottom"
          >
            <Button icon={<MenuOutlined style={{}} />} type="text" />
          </Dropdown>
        ) : (
          <>
            <StyledMenu
              mode="horizontal"
              defaultSelectedKeys={tabKey}
              defaultOpenKeys={['home']}
              items={menuItems}
              onClick={handleClickMenu}
            />

            <Dropdown menu={{ items: userMenu }} trigger={['click']} arrow overlayStyle={{ width: 150 }}>
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
          </>
        )}
      </Row>
    </Layout.Header>
  )
}

const StyledMenu = styled(Menu)`
  background: #888888;
  font-size: 20px;
  width: 500px;
`

export default AppHeader
