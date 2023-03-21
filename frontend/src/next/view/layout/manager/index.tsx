import {
  CalendarOutlined,
  DashboardFilled,
  HomeFilled,
  TagOutlined,
  UngroupOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import { Layout, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import useWindowSize from '../../../utils/useWindowSize'
import { getItem } from '../admin'
import AppFooter from '../footer'
import AppHeader from '../header'
import AppSidebar from '../sidebar'

const items: MenuProps['items'] = [
  getItem('Home', 'home', <HomeFilled />),
  getItem('Dashboard', 'dashboard', <DashboardFilled />),
  { type: 'divider' },
  getItem(
    'PUBLIC',
    'grp',
    null,
    [
      getItem('Your Profile', 'ideas', <WeiboOutlined />),
      getItem('Tags', 'categories', <TagOutlined />),
      getItem('Departments', 'departments', <UngroupOutlined />),
      getItem('Events', 'event', <CalendarOutlined />),
    ],
    'group'
  ),
]

const LayoutManager = ({ children }) => {
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
      <Layout>
        <AppSidebar items={items} />
        <Content style={contentStyle}>
          {
            <>
              {children}
              <AppFooter />
            </>
          }
        </Content>
      </Layout>
    </>
  )
}

export default LayoutManager