import useWindowSize from '../../../utils/useWindowSize'
import { Card, Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import EventCard from '../sidebar-card/events-card'

const RightSideBar: React.FC = () => {
  const windowSize = useWindowSize()

  return (
    <>
      {windowSize < 1000 ? (
        <></>
      ) : (
        <Layout.Sider width={278} style={{ background: 'transparent', boxSizing: 'border-box', paddingRight: '16px' }}>
          <EventCard />
        </Layout.Sider>
      )}
    </>
  )
}

export default RightSideBar
