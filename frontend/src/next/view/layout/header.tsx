import { LOCALSTORAGE } from '../../api/http'
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
import { Avatar, Button, Col, Dropdown, Layout, Menu, MenuProps, Row, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { imgDir } from '../../constants/img-dir'
import useWindowSize from '../../utils/useWindowSize'
import { useSnackbar } from 'notistack'
import { useSubscription } from '../../libs/global-state-hook'
import { userStore } from '../auth/user-store'
import AutoSearch from '../../components/search-field/autocomplete-search'

const { Text } = Typography

function AppHeader() {
  const navigate = useNavigate()
  const windowWidth = useWindowSize()
  const { enqueueSnackbar } = useSnackbar()
  const [tabKey, setTabKey] = useState(['home'])
  const { avatar } = useSubscription(userStore).state

  const menuItems: MenuProps['items'] = [
    // {
    //   key: 'home',
    //   label: <Text style={{ fontSize: 20, margin: 0 }}>Home</Text>,
    //   icon: windowWidth < 768 && <HomeOutlined style={{ fontSize: 20 }} />,
    // },
    {
      key: 'dashboard',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Dashboard</Text>,
      icon: windowWidth < 768 && <DashboardOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'event',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Events</Text>,
      icon: windowWidth < 768 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'departments',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Departments</Text>,
      icon: windowWidth < 768 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'categories',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Categories</Text>,
      icon: windowWidth < 768 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'accounts-manager',
      label: <Text style={{ fontSize: 20, margin: 0 }}>Accounts</Text>,
      icon: windowWidth < 768 && <TeamOutlined style={{ fontSize: 20 }} />,
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

  const handleLogout = () => {
    localStorage.setItem(LOCALSTORAGE.TOKEN, '')
    console.log(localStorage.getItem(LOCALSTORAGE.TOKEN))
    navigate('/login')
    enqueueSnackbar("You're fxking logout! man")
  }

  const handleClickMenu = async (val: any) => {
    if (tabKey === val.key || tabKey.includes('courses')) return
    switch (val.key) {
      case 'home':
        navigate('/')
        break
      case 'logout':
        handleLogout()
        break
      default:
        navigate(`/${val.key}`)
    }
  }

  return (
    <Layout.Header
      style={{
        background: 'white',
        display: 'flex',
        position: 'sticky',
        zIndex: 2,
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
        alignSelf: 'start',
        top: 0,
        width: '100%',
        height: '54px',
        lineHeight: 0,
      }}
    >
      <Row style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', height: '54px' }}>
        <>
          <a href={'/'} style={{ marginRight: 20, marginBottom: 5, display: 'contents' }}>
            <img src={imgDir + 'logo.png'} height="50" alt="Logo" />
          </a>
          <AutoSearch />
        </>
        {windowWidth < 1000 ? (
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
            <StyledMenu mode="horizontal" defaultSelectedKeys={tabKey} items={menuItems} onClick={handleClickMenu} />
            <Dropdown menu={{ items: userMenu }} trigger={['click']} arrow overlayStyle={{ width: 150 }}>
              <a>
                <Avatar
                  style={{
                    backgroundColor: 'rgb(246 247 248)',
                    verticalAlign: 'middle',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                  }}
                  size={40}
                  gap={0}
                  src={avatar}
                ></Avatar>
              </a>
            </Dropdown>
          </>
        )}
      </Row>
    </Layout.Header>
  )
}

const StyledMenu = styled(Menu)`
  padding: 10px;
  background: white;
  font-size: 20px;
  width: 420px;
`

export default AppHeader
