import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useEffect } from 'react'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import RightSideBar from './right-sidebar'
import AppSidebar from './sidebar'

const LayoutWrapper = ({ children }) => {
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
        }}
      >
        <AppSidebar />
        <Content style={contentStyle}>{children}</Content>
        <RightSideBar />
      </Layout>
      <AppFooter/>
    </>
  )
}

export default LayoutWrapper
