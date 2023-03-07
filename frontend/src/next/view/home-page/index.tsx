import { Col, Divider, Row, Space, Typography, Input, Layout, Avatar, Button, Badge } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import IdeaCard from '../ideas/idea-card'
import { SmileFilled } from '@ant-design/icons'
import MenuFilter from './menu-filter'
import useWindowSize from '../../utils/useWindowSize'
import { Http } from '../../api/http'
import { useSnackbar } from 'notistack'
import { handleFilter } from '../../utils/handleFilter'
import { useSubscription } from '../../libs/global-state-hook'
import IdeasList from '../ideas/ideas-list'
import { userStore } from '../auth/user-store'

const { Title } = Typography


function HomePage() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const windowWidth = useWindowSize()
  const [filter, setFilter] = useState('new')
  const fitPadding = windowWidth < 1000 ? '10px 0' : '10px 100px'
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const { avatar } = useSubscription(userStore).state
  const handleClickTyping = async () => {
    navigate('/submit')
  }
  useEffect(() => {
      setLoading(true)
      const optionsQuery = handleFilter(filter)
      const getAllIdeas = async () =>
        await Http.get(`/api/v1/idea?${optionsQuery}`)
          .then(res => setIdeas(res.data.data))
          .catch(error => enqueueSnackbar('Failed to get all accounts !', { variant: 'error' }))
          .finally(() => setLoading(false))
        getAllIdeas()
  }, [filter])

  return (
    <Layout.Content
      style={{
        display: 'block',
        padding: fitPadding,
        height: '200vh'
      }}
    >
      <StyledRow
        style={{}}
      >
        <Col flex="60px" >
          <Badge status="success" count={<SmileFilled  style={{color: '#52c41a'}}/>}>
            <Avatar shape="square" size={40} style={{ background: '#f6f7f8' }} src={avatar} />
          </Badge>
        </Col>
        <Col flex="auto">
          <Input
            style={{ lineHeight: 2.15, background: '#f6f7f8' }}
            placeholder="Create Your Idea"
            onClick={() => {
              handleClickTyping()
            }}
          ></Input>
        </Col>
      </StyledRow>
      <StyledRow
        style={{}}
      >
        <MenuFilter setFilter={setFilter} filter={filter}/>
      </StyledRow>
      <IdeasList ideas={ideas} isLoading={loading}/>
    </Layout.Content>
  )
}

export default HomePage

export const StyledRow = styled(Row)`
  padding: 10px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 15px;
`
            // src="https://joesch.moe/api/v1/random" />
