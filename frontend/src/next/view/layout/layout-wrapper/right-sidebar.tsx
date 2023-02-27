import useWindowSize from '../../../utils/useWindowSize'
import { Card, Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import EventCard from '../sidebar-card/events-card'

const RightSideBar: React.FC = () => {
  const windowSize = useWindowSize()

  return (
    <>
      {windowSize < 750 ? (
        <></>
      ) : (
        <Layout.Sider width={278} style={{ background: 'transparent', boxSizing: 'border-box' }}>
          <EventCard/ >
        </Layout.Sider>
      )}
    </>
  )
}

const StyledCard = styled(Card)`
  margin-top: 10px;
  box-shadow: 5px 5px 5px 5px #888888;
`

export default RightSideBar
