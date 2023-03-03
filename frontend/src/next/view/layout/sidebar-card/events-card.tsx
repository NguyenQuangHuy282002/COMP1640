import React, { useState } from 'react'
import styled from 'styled-components'
import { Card as AntCard, Divider } from 'antd'

const Card = styled(AntCard)`
  margin: 10px 0;
  width: '100%';
`

const EventCard = () => {
  const [state, setState] = useState(false)

  return (
    <>
      <StyledCard
        title="Special events going on"
        extra={<a href="#">More</a>}
        style={{ width: '100%', backgroundColor: '#F6FFFD' }}
        // hoverable={true}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <Divider style={{ width: '100%' }}></Divider>
      </StyledCard>
    </>
  )
}

const StyledCard = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  padding: 0 !important;
`

export default EventCard
