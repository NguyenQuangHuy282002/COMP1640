import { Button, Layout, message, Space, Switch, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Http } from 'next/api/http'
import RichTextEditor from 'next/components/text-editor'
import { useSubscription } from 'next/libs/global-state-hook'
import { useQuery } from 'next/utils/use-query'
import { userStore } from 'next/view/auth/user-store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useWindowSize from '../../../utils/useWindowSize'
import CommentsList from '../../../view/comments/comments-list'
import FileDisplay from './file-display'
import IdeaDetailInfo from './idea-detail-info'
import MenuBar from './menu-bar'

const { Text, Link } = Typography

function IdeaDetail() {
  const initialState = () => EditorState.createEmpty()
  const [data, setData] = useState([])
  const [editorState, setEditorState] = useState(initialState)
  const [showComment, setShowComment] = useState(false)
  const [updateIdea, setUpdateIdea] = useState(0)
  const [isAnonymousMode, setIsAnonymousMode] = useState(false)

  const query = useQuery()
  const id = query.get('id')
  const { name } = useSubscription(userStore).state
  const windowWidth = useWindowSize()
  const padding = windowWidth < 969 ? '10px 0' : '15px 60px 50px'

  const handleShowComment = () => {
    setShowComment(!showComment)
  }
  useEffect(() => {
    const getIdea = async () =>
      await Http.get(`/api/v1/idea/detail?id=${id}`)
        .then(res => setData([res.data.data]))
        .catch(error => message.error('Failed to fetch idea !'))
    getIdea()
  }, [updateIdea])

  const handleSubmitComment = async () => {
    const payload = {
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      ideaId: data[0]?._id,
      publisherEmail: data[0]?.publisherId.email,
      isAnonynous: isAnonymousMode,
    }
    await Http.post('/api/v1/comment/create', payload)
      .then(res => {
        setUpdateIdea(updateIdea + 1)
        setEditorState(initialState)
        return message.success('Your comment are hanlded')
      })
      .catch(error => message.error('error: ', error.message))
  }
  return (
    <>
      {data ? (
        <Layout className="layout" style={{ padding: padding }}>
          <StyledContent>
            <Space direction="horizontal" align="start">

              <Space style={{ padding: '16px 28px 0' }} direction="vertical">
                <IdeaDetailInfo item={data[0]}></IdeaDetailInfo>
                <ReadMore>{data[0]?.content}</ReadMore>
                <br></br>
              </Space>
            </Space>
            {data[0]?.files.length > 0 && <FileDisplay files={data[0]?.files}></FileDisplay>}
            <MenuBar commentCount={data[0]?.comments.length} ideaId={id} likes={data[0]?.likes} dislikes={data[0]?.dislikes} handleShowComment={handleShowComment} />
          </StyledContent>

          <StyledContent>
            <Space style={{ padding: '10px 24px', width: '100%' }} direction="vertical">
              <Text strong>
                Comment as <Text mark>{name}</Text>
              </Text>
              <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
            </Space>
            <Space style={{ justifyContent: 'end', display: 'flex', paddingRight: '44px' }} direction="horizontal">
              Anonymous Mode:{' '}
              <Switch
                onChange={() => setIsAnonymousMode(!isAnonymousMode)}
                checkedChildren="On"
                unCheckedChildren="Off"
              />
              <Button
                type="primary"
                shape="round"
                disabled={false}
                style={{ marginLeft: 20 }}
                onClick={() => {
                  handleSubmitComment()
                }}
              >
                Comment
              </Button>
            </Space>
          </StyledContent>
          <StyledContent>
            <div style={{ width: '100%' }}>
              {showComment ? <CommentsList id={id} updateIdea={updateIdea}></CommentsList> : <></>}
            </div>
          </StyledContent>
        </Layout>
      ) : (
        <></>
      )}
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

const StyledContent = styled(Content)`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 100%;
  padding-bottom: 16px;
  margin-bottom: 16px;
`
