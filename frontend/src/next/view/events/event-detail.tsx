import { Col, Divider, Row, Space, Typography, Input, Layout, Avatar, Button, Badge, Card, Descriptions } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import IdeaCard from '../ideas/idea-card'
import { SmileFilled } from '@ant-design/icons'
import useWindowSize from '../../utils/useWindowSize'
import { Http } from '../../api/http'
import { useSnackbar } from 'notistack'
import { handleFilter } from '../../utils/handleFilter'
import { useSubscription } from '../../libs/global-state-hook'
import IdeasList from '../ideas/ideas-list'
import { userStore } from '../auth/user-store'

const { Title } = Typography


interface EventDetailProps {
  title: string;
  description: string;
  department: string;
  startDate: string;
  firstClosedDate: string;
  finalClosedDate: string;
}

function EventDetail() {
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
  const eventData: EventDetailProps = {
    title: 'Sample Event Title',
    description: 'Sample event description',
    department: 'Sample Department',
    startDate: '2022-01-01',
    firstClosedDate: '2022-01-20',
    finalClosedDate: '2022-02-01',
  };

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
        style={{ width:"100%", fontFamily:'' }}
      >
        {/* <MenuFilter setFilter={setFilter} filter={filter}/> */
        }
        {/* <Card  title={eventData.title}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Paragraph>{eventData.description}</Typography.Paragraph>
        <Typography.Text strong>Department:</Typography.Text>
        <Typography.Text>{eventData.department}</Typography.Text>
        <Typography.Text strong>Start Date:</Typography.Text>
        <Typography.Text>{eventData.startDate}</Typography.Text>
        <Typography.Text strong>First Closed Date:</Typography.Text>
        <Typography.Text>{eventData.firstClosedDate}</Typography.Text>
        <Typography.Text strong>Final Closed Date:</Typography.Text>
        <Typography.Text>{eventData.finalClosedDate}</Typography.Text>
      </Space> */}
    {/* </Card> */}
      <div style={{ width:'100%', backgroundColor:"rgb(234, 175, 237,0.5)" }}>
        <Typography style={{ fontSize: '30px', color: 'blue', textAlign: 'center' }}  >Event Detail</Typography>
    <Descriptions title="" bordered labelStyle={{ fontSize:"16px", fontFamily:"Arial, Helvetica, sans-serif", color:"red" ,fontWeight:"bold"}}
    column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
    <Descriptions.Item label="Event Title" span={3}>{eventData.title}</Descriptions.Item>
    <Descriptions.Item label="Event Description" span={3} >{eventData.description}</Descriptions.Item >
    
    <Descriptions.Item label="Start Date " span={3}>{eventData.startDate}</Descriptions.Item>
    <Descriptions.Item label="First Closed Date " span={1.5}>{eventData.firstClosedDate}</Descriptions.Item>
    <Descriptions.Item label="Final Closed Date " span={1.5}>{eventData.finalClosedDate}</Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Department">{eventData.department}</Descriptions.Item>

  </Descriptions>
);
    </div>
        
      </StyledRow>
      <IdeasList ideas={ideas} isLoading={loading}/>
    </Layout.Content>
  )
}

export default EventDetail

export const StyledRow = styled(Row)`
  padding: 10px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 15px;
`
            // src="https://joesch.moe/api/v1/random" />
