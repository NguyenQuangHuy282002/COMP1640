import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { createSubscription } from 'next/libs/global-state-hook'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import AppHeader from '../header'
import RightSideBar from './right-sidebar'
import AppSidebar from './sidebar'

export const ideaCount = createSubscription({ number: 0 })
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
        <AppSidebar />
        <Content style={contentStyle}>{children}</Content>
        <RightSideBar />
      </Layout>
      <AppFooter />
    </>
  )
}

export default LayoutWrapper
