import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import SidebarManager from './sidebar-manager'

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
        <SidebarManager />
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <AppFooter />
    </>
  )
}

export default LayoutManager
