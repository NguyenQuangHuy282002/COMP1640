import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import SidebarAdmin from './sidebar-admin'
const LayoutAdmin = ({ children }) => {
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
      <Layout
        style={{
          width: '100%',
          background: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          height: '100%',
        }}
      >
        <SidebarAdmin />
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <AppFooter />
    </>
  )
}

export default LayoutAdmin
