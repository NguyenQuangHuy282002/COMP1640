import {
  CarryOutOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, message, Row, Typography } from 'antd'
import { Http } from 'next/api/http'
import useRoleNavigate from 'next/libs/use-role-navigate'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AutoSearch from '../../components/search-field/autocomplete-search'
import { imgDir } from '../../constants/img-dir'
import { useSubscription } from '../../libs/global-state-hook'
import useWindowSize from '../../utils/useWindowSize'
import { userCredential, userStore } from '../auth/user-store'
import { ideaCount } from './layout-wrapper'

const { Text } = Typography

function AppHeader() {
  const navigate = useRoleNavigate()
  const windowWidth = useWindowSize()
  const { enqueueSnackbar } = useSnackbar()
  const [tabKey, setTabKey] = useState(['home'])
  const {
    state: { avatar },
  } = useSubscription(userStore)
  const [suggest, setSuggest] = useState()

  useEffect(() => {
    const getSuggestions = async () =>
      await Http.get('/api/v1/idea/suggest')
        .then(res => {
          setSuggest(res.data.data)
          ideaCount.updateState({ number: res.data.count })
        })
        .catch(error => message.error('Failed to get suggestions!'))
    getSuggestions()
  }, [])

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: <Text style={{ fontSize: 18, margin: 0 }}>Dashboard</Text>,
      icon: windowWidth < 1000 && <DashboardOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'event',
      label: <Text style={{ fontSize: 18, margin: 0 }}>Events</Text>,
      icon: windowWidth < 1000 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'departments',
      label: <Text style={{ fontSize: 18, margin: 0 }}>Departments</Text>,
      icon: windowWidth < 1000 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'categories',
      label: <Text style={{ fontSize: 18, margin: 0 }}>Tags</Text>,
      icon: windowWidth < 1000 && <CarryOutOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'accounts-manager',
      label: <Text style={{ fontSize: 18, margin: 0 }}>Accounts</Text>,
      icon: windowWidth < 1000 && <TeamOutlined style={{ fontSize: 20 }} />,
    },
  ]

  const userMenu: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <Text style={{ fontSize: 20, margin: 0 }} onClick={() => handleClickMenu({ key: 'account' })}>
          Profile
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
    userCredential.state.logout()
    navigate('/login')
    enqueueSnackbar("You're fxking logout! man")
    return window.location.reload()
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
          <AutoSearch suggest={suggest} />
        </>
        {windowWidth < 1300 ? (
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
  width: 510px;
`

export default AppHeader
