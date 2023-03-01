import {
  HomeFilled,
  WeiboOutlined,
  TagOutlined,
  TeamOutlined,
  UngroupOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, MenuProps, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useWindowSize from '../../../utils/useWindowSize'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Home', 'home', <HomeFilled />),
  { type: 'divider' },
  getItem(
    'PUBLIC',
    'grp',
    null,
    [
      getItem('Ideas', 'idea', <WeiboOutlined />),
      getItem('Tags', 'tag', <TagOutlined />),
      getItem('Users', 'user', <TeamOutlined />),
      getItem('Departments', 'department', <UngroupOutlined />),
    ],
    'group'
  ),
]
function AppSidebar() {
  const navigate = useNavigate()
  const windowWidth = useWindowSize()
  const [tabKey, setTabKey] = useState(['home'])
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleClickMenu = async (val: any) => {
    switch (val.key) {
      case 'idea':
        navigate('/idea')
        break
      case 'tag':
        navigate('/categories')
        break
      case 'user':
        navigate('/accounts-manager')
        break
      case 'department':
        navigate('/departments')
        break
      default:
        navigate(`/${val.key}`)
    }
  }

  return (
    <>
      {windowWidth > 768 ? (
        <Layout.Sider
          // collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          width={300}
          style={{
            backgroundColor: 'white',
            position: 'sticky',
            zIndex: 1,
            alignSelf: 'start',
            height: '100vh',
            top: 0,
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
          }}
        >
          <Menu onClick={handleClickMenu} defaultSelectedKeys={['home']} mode="inline" items={items} />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16, float: 'right', marginRight: '16px' }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Layout.Sider>
      ) : (
        <Dropdown menu={{ items: items }} trigger={['click']} overlayStyle={{ width: 200 }} placement="bottom">
          <Button
            icon={<MenuOutlined style={{}} />}
            type="primary"
            style={{
              position: 'sticky',
              zIndex: 1,
              alignSelf: 'start',
              top: 0,
              border: '1px solid #ccc',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
              marginTop: '10px',
            }}
          />
        </Dropdown>
      )}
    </>
  )
}

// const StyledMenu = styled(Menu)`
//   background: #888888;
//   font-size: 20px;
//   width: 500px;
// `

export default AppSidebar
