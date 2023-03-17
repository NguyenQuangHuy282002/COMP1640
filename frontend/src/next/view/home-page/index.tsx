
import { SmileFilled } from '@ant-design/icons'
import { Avatar, Badge, Col, Input, Layout, message, Row, Typography } from 'antd'
import { Http } from 'next/api/http'
import { handleFilter } from 'next/utils/handleFilter'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSubscription } from '../../libs/global-state-hook'
import useWindowSize from '../../utils/useWindowSize'
import { userStore } from '../auth/user-store'
import IdeasList from '../ideas/ideas-list'
import MenuFilter from './menu-filter'


const { Title } = Typography


function HomePage() {
  const navigate = useNavigate()
  const windowWidth = useWindowSize()
  const [ideas, setIdeas] = useState([])
  const [isEnd, setEnd] = useState(false)
  const [filter, setFilter] = useState('new')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const fitPadding = windowWidth < 1000 ? '10px 0' : '10px 100px'
  const { avatar } = useSubscription(userStore).state
  const handleClickTyping = async () => {
    navigate('/submit')
  }

  useEffect(() => {
    setEnd(false)
    const optionsQuery: any = handleFilter(filter)
    console.log(optionsQuery)
    loadMoreData(true, optionsQuery)
  }, [filter])

  const loadMoreData = (reset: boolean = false, filter) => {
    setLoading(true)
    const getAllIdeas = async () =>
      await Http.get(`/api/v1/idea?page=${currentPage}&${filter}`)
        .then(res => {
          console.log('res', res)
          if (res.data?.next?.page) {
            setCurrentPage(res.data.next.page)
          } else {
            setEnd(true)
            setCurrentPage(1)
          }
          if(reset === true) {
            return setIdeas([...res.data.data])
          }
          setIdeas([...ideas, ...res.data.data])
        })
        .catch(error => message.error('Failed to get all accounts !'))
        .finally(() => setLoading(false))
    getAllIdeas()
  }
  return (

    

    <Layout.Content
      style={{
        display: 'block',
        padding: fitPadding,
        height: 'auto',
      }}
    >
      <StyledRow style={{}}>
        <Col flex="60px">
          <Badge status="success" count={<SmileFilled style={{ color: '#52c41a' }} />}>
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
      <StyledRow style={{}}>
        <MenuFilter setFilter={setFilter} filter={filter} />

      </StyledRow>
      <IdeasList
        ideas={ideas} loading={loading} loadMoreData={loadMoreData} isEnd={isEnd}
      />
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
