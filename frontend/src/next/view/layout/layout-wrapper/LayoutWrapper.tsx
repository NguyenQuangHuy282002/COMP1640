import useWindowSize from '../../../utils/useWindowSize'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'

// import RightSideBar from './RightSideBar/RightSideBar.component';
import AppSidebar from './sidebar'
import RightSideBar from './right-sidebar'

const LayoutWrapper = ({ children }) => {
  const windowWidth = useWindowSize()
  const contentStyle =
    windowWidth > 768
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
          // paddingRight: '16px',
        }}
      >
        <AppSidebar />
        <Content style={contentStyle}>{children}</Content>
        <RightSideBar />
      </Layout>
    </>
  )
}

export default LayoutWrapper
