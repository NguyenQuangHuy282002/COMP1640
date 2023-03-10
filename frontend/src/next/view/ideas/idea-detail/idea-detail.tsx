import { DownSquareOutlined, TagsTwoTone, UpSquareOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Layout, Space, Tag, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { EditorState } from 'draft-js'
import { Http } from 'next/api/http'
import RichTextEditor from 'next/components/text-editor'
import { useSubscription } from 'next/libs/global-state-hook'
import { useQuery } from 'next/utils/use-query'
import { userStore } from 'next/view/auth/user-store'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { formatDayTime } from '../../../utils/helperFuncs'
import useWindowSize from '../../../utils/useWindowSize'
import CommentsList from '../../../view/comments/comments-list'
import MenuBar from './menu-bar'

const { Text, Link } = Typography

function IdeaDetail() {
  const query = useQuery()
  const id = query.get('id')
  // { isOpen, onCloseModal, setAccounts, accounts }
  const { name } = useSubscription(userStore).state
  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
  const windowWidth = useWindowSize()
  const { enqueueSnackbar } = useSnackbar()
  const [showComment, setShowComment] = useState(false)
  const padding = windowWidth < 969 ? '10px 0' : '15px 40px 50px 40px'
  const paddingSider = windowWidth < 969 ? '10px 0 0 2px' : '15px 0px 15px 15px'
  const [data, setData] = useState([])
  const handleShowComment = () => {
    setShowComment(!showComment)
  }
  useEffect(() => {
    const getIdea = async () =>
      await Http.get(`/api/v1/idea/detail?id=${id}`)
        .then(res => console.log('res', setData([res.data.data])))
        .catch(error => enqueueSnackbar('Failed to fetch idea !', { variant: 'error' }))
    getIdea()
  }, [])

  return (
    <>
      {data ? <Layout className="layout" style={{ padding: padding }}>
        <Content
          style={{
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            height: '100%',
            paddingBottom: '50px',
          }}
        >
          <Space direction="horizontal" align="start">
            <Space direction="vertical" style={{ padding: paddingSider, alignItems: 'flex-start' }}>
              <Button type="text" icon={<UpSquareOutlined style={{ fontSize: '22px', color: '#999999' }} />} href="#" />
              <Text strong style={{ marginLeft: '0', width: '100%', fontSize: '13.5px', color: '#948C75' }}>
                {data[0]?.views > 0 ? <>+{data[0]?.views}</> : <>-{data[0]?.views}</>}
              </Text>
              <Button
                type="text"
                icon={<DownSquareOutlined style={{ fontSize: '22px', color: '#999999' }} />}
                href="#"
              />
            </Space>
            <Space style={{ padding: '10px 15px 10px 5px' }} direction="vertical">
              <Space direction="horizontal">
                <Avatar style={{ background: 'red', margin: '0px' }}>cc</Avatar>
                <Text strong> {!data[0]?.isAnonymous ? data[0]?.publisherId.name ?? 'unknown' : 'Anonymous'}</Text>
                <Text type="secondary">Posted {formatDayTime(data[0]?.createdAt ? data[0]?.createdAt : Date.now())}</Text>
              </Space>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {data[0]?.title}
              </Typography.Title>
              <Space size={[0, 8]} wrap>
                <TagsTwoTone style={{ padding: '5px' }} />
                {data[0]?.categories.length !== 0 ? (
                  data[0]?.categories.map(tag => (
                    <Tag key={tag.name} color="geekblue">
                      {tag.name}
                    </Tag>
                  ))
                ) : (
                  <Tag>No Tag</Tag>
                )}
              </Space>
              <ReadMore>{data[0]?.content}</ReadMore>
            </Space>
          </Space>
          <Divider></Divider>
          <MenuBar commentCount={data[0]?.comments.length} handleShowComment={handleShowComment} />
          <Space style={{ padding: '10px 44px' }} direction="vertical">
            <Text strong>
              Comment as <Text mark>{name}</Text>
            </Text>
            <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
          </Space>
          <Space style={{ justifyContent: 'end', display: 'flex', paddingRight: '44px' }}>
            <Button type="primary" shape="round" disabled={false} style={{ marginRight: '10px' }} onClick={() => {}}>
              Comment
            </Button>
          </Space>
          <Divider style={{ marginBottom: 0 }} />
          <Space style={{ width: '100%' }}>{showComment ? <CommentsList></CommentsList> : <></>}</Space>
        </Content>
      </Layout> : <></>}
    </>
  )
}

export default IdeaDetail

function ReadMore({ children }) {
  const text: string = children
  const [isReadMore, setIsReadMore] = useState(true)
  const textDisplay: string = isReadMore ? text?.slice(0, 1500) : text
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <>
      <RenderHtml text={textDisplay}></RenderHtml>
      <Link onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </Link>
    </>
  )
}

export function RenderHtml(prop: any) {
  const { text } = prop
  return <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }}></div>
}
