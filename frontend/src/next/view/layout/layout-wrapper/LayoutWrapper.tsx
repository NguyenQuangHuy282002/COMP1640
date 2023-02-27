import useWindowSize from '../../../utils/useWindowSize';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

// import RightSideBar from './RightSideBar/RightSideBar.component';
import AppSidebar from './sidebar';
import RightSideBar from './right-sidebar';

const LayoutWrapper = ({ children }) => {
  const windowWidth = useWindowSize()
  const contentStyle = windowWidth > 768 ? {
    width: '100%',
    background: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  } : {
    maxWdth: 'none',
    width: '100%',
  }

  return (
    <>
      <Layout style={{
        width: '100%',
        background: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        padding: windowWidth < 768 ? '0 5px' : '0 8%'
        // margin: '0 auto 0 auto',
      }}>
        <AppSidebar />
        <Content style={contentStyle}>
          {children}
          <RightSideBar />
        </Content>
      </Layout>
    </>
  );
};

export default LayoutWrapper;
