import {
  CalendarOutlined,
  HomeFilled,
  TagOutlined,
  TeamOutlined,
  UngroupOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import { Layout, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { createSubscription } from 'next/libs/global-state-hook'
import React from 'react'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import AppHeader from '../header'
import AppSidebar from '../sidebar'
import RightSideBar from './right-sidebar'

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
      getItem('Ideas', 'ideas', <WeiboOutlined />),
      getItem('Tags', 'categories', <TagOutlined />),
      getItem('Users', 'accounts-manager', <TeamOutlined />),
      getItem('Departments', 'departments', <UngroupOutlined />),
      getItem('Events', 'event', <CalendarOutlined />),
    ],
    'group'
  ),
]

export const ideaCount = createSubscription({ number: 0 })
const LayoutCoordinator = ({ children }) => {
  const windowWidth = useWindowSize()
  const contentStyle =
    windowWidth > 1000
      ? {
          width: '100%',
          background: 'none',
        }
      : {
          maxWidth: 'none',
          width: '100%',
        }

  return (
    <>
      <AppHeader />

      <Layout
        style={{
          width: '100%',
          background: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <AppSidebar items={items} />
        <Content style={contentStyle}>
          {
            <>
              {children}
              <RightSideBar />
              <AppFooter />
            </>
          }
        </Content>
      </Layout>
    </>
  )
}

export default LayoutCoordinator