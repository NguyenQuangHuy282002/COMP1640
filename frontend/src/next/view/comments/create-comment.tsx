import { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'
import './style.css'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Divider, message, Space, Switch } from 'antd'
import { Http } from 'next/api/http'
interface Commentprops {
  user: any
  ideaId?: string
  setComments?: void
  setCount?: void
  email?: any
  setUpdateIdea?: any
}

export default function CreateComment(props: Commentprops) {
  const [picker, setPicker] = useState(false)
  const [isAnonymousMode, setIsAnonymousMode] = useState(false)
  const [text, setText] = useState('')
  const [cursorPosition, setCursorPosition] = useState()
  const textRef = useRef(null)

  const { user, ideaId, setComments, setCount, email, setUpdateIdea } = props

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition
  }, [cursorPosition])
  const handleEmoji = (e, { ...emoji }) => {
    const ref = textRef.current
    ref.focus()
    const start = text.substring(0, ref.selectionStart)
    const end = text.substring(ref.selectionStart)
    const newText = start + emoji + end
    setText(newText)
    setCursorPosition(start.length + emoji.length)
  }

  const handleSubmitComment = async () => {
    const payload = {
      content: text,
      ideaId: ideaId,
      publisherEmail: email,
      isAnonynous: isAnonymousMode,
    }
    console.log(payload)
    await Http.post('/api/v1/comment/create', payload)
      .then(res => {
        setUpdateIdea(prev => ++prev)
        setText('')
        return message.success('Your comment are hanlded')
      })
      .catch(error => message.error(`Something went wrong: ${error.response?.data?.message}`))
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmitComment()
    }
  }

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.avatar} alt={user?.name} />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={(event, emoji) => handleEmoji(event, emoji)} />
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={e => setText(e.target.value)}
            onKeyDown={(e) => _handleKeyDown(e)}
          />
          <div className="comment_circle" style={{ marginTop: '5px' }}>
            {/* <ClipLoader size={20} color="#1876f2" loading={loading} /> */}
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker(prev => !prev)
            }}
          >
            <i className="emoji_icon" style={{ color: '#9a9999', fontSize: '16px' }}>
              <SmileOutlined />
            </i>
          
          </div>
          <Divider type="vertical"></Divider>
          <Space style={{ justifyContent: 'end', display: 'flex', paddingLeft: '5px' }} direction="horizontal">
            Anonymous:
            <Switch
              onChange={() => setIsAnonymousMode(!isAnonymousMode)}
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </Space>
          {/* <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div> */}
        </div>
      </div>
    </div>
  )
}
