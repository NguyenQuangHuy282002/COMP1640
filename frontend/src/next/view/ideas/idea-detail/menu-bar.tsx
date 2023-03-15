import {
  CaretDownFilled,
  CaretUpFilled,
  CommentOutlined,
  DownloadOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { Button, message, Radio, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { useSubscription } from 'next/libs/global-state-hook'
import { userStore } from 'next/view/auth/user-store'
import { useEffect, useState } from 'react'
import useWindowSize from '../../../utils/useWindowSize'
import { disLikeHandler, likeHandler } from './idea-detail-service'

export default function MenuBar({ commentCount, handleShowComment, ideaId }) {
  const windowWidth = useWindowSize()
  const [likers, setLikers] = useState([])
  const [dislikers, setDisLikers] = useState([])
  const { state } = useSubscription(userStore)
  const [likesCount, setLikes] = useState(0)
  // let initIdeaLiked = false
  // let initIdeaDisLiked = false
  const [isLiked, setIsLiked] = useState(false)
  const [isDisLiked, setIsDisLiked] = useState(false)

  const fetchLikes = async (id: any) => {
    console.log('id', id)
    await Http.get(`/api/v1/idea/ideaLikes?ideaId=${id}`)
      .then(res => {
        console.log('ress', res)
        setIsLiked(res.data.likes.findIndex((like: any) => like._id === state._id) >= 0)
        setIsDisLiked(res.data.dislikes.findIndex((like: any) => like._id === state._id) >= 0)
        setLikes(res.data.likes.length-res.data.dislikes.length)
        setLikers(res.data.likes)
        setDisLikers(res.data.dislikes)
      })
      .catch(error => {
        return message.error(error.message)
      })
  }

  useEffect(() => {
    fetchLikes(ideaId)
  }, [ideaId])

  useEffect(() => {
    return () => {
      if (isLiked) {
        console.log('like')
        likeHandler(ideaId)
      } else if (isDisLiked) {
        console.log('dislike')
        disLikeHandler(ideaId)
      }
    }
  }, [isLiked, isDisLiked])

  const handleLikePost = async () => {
    if (isLiked) {
      setLikes(likesCount => likesCount - 1)
      setIsLiked(isLiked => !isLiked)
      return
    }
    setLikes(likesCount => likesCount + 1)
    if (isDisLiked) {
      setIsDisLiked(isDisLiked => !isDisLiked)
      setLikes(likesCount => likesCount + 1)
    }
    setIsLiked(isLiked => !isLiked)
    setLikers(likers => [...likers, { _id: state._id, name: state.name, avatar: state.avatar }])
    setDisLikers(dislikers => {
      dislikers = dislikers.filter(l => l._id !== state._id)
      return dislikers
    })
  }

  const handleDislikePost = async () => {
    if (isDisLiked) {
      setLikes(likesCount => likesCount + 1)
      setIsDisLiked(isDisLiked => !isDisLiked)
      return
    }
    setLikes(likesCount => likesCount - 1)
    if (isLiked) {
      setIsLiked(isLiked => !isLiked)
      setLikes(likesCount => likesCount - 1)
    }
    setIsDisLiked(isDisLiked => !isDisLiked)
    setLikers(likers => {
      likers = likers.filter(l => l._id !== state._id)
      return likers
    })
    setDisLikers(dislikers => [...dislikers, { _id: state._id, name: state.name, avatar: state.avatar }])
  }

  return (
    <>
      {windowWidth > 969 ? (
        <Space
          style={{ justifyContent: 'start', display: 'flex', padding: '20px', marginLeft: '4px', marginBottom: 0 }}
        >
          {isLiked ? (
            <Button icon={<CaretUpFilled />} onClick={() => handleLikePost()} type="primary">
              <a>{likesCount >= 0 ? <> +{likesCount}</> : <> {likesCount}</>}</a>
            </Button>
          ) : (
            <Button icon={<CaretUpFilled />} onClick={() => handleLikePost()}>
              <a>{likesCount >= 0 ? <> +{likesCount}</> : <> {likesCount}</>}</a>
            </Button>
          )}
          {isDisLiked ? (
            <Button icon={<CaretDownFilled />} onClick={() => handleDislikePost()} type="primary" danger></Button>
          ) : (
            <Button icon={<CaretDownFilled />} onClick={() => handleDislikePost()}></Button>
          )}
          <Button icon={<CommentOutlined />} onClick={() => handleShowComment()} style={{ cursor: 'pointer' }}>
            {commentCount} Comments
          </Button>
          <Button icon={<SaveOutlined />}>Save</Button>
          <Button icon={<DownloadOutlined />}>DownLoad</Button>
          <Button icon={<ShareAltOutlined />}>Share</Button>
        </Space>
      ) : (
        <MobileMenuBar vote={likesCount} commentCount={commentCount} handleShowComment={handleShowComment} />
      )}
    </>
  )
}

function MobileMenuBar({ vote, commentCount, handleShowComment }) {
  return (
    <Space style={{ justifyContent: 'space-evenly', display: 'flex' }}>
      <Radio.Group>
        <Radio.Button value="like">
          <CaretUpFilled />
          <Typography.Text strong style={{ marginLeft: '0', width: '100%', fontSize: '13.5px', color: '#948C75' }}>
            {vote >= 0 ? <>+{vote}</> : <>{vote}</>}
          </Typography.Text>
        </Radio.Button>
        <Radio.Button value="dislike">
          <CaretDownFilled />
        </Radio.Button>
      </Radio.Group>
      <Button icon={<CommentOutlined />} onTouchEnd={() => handleShowComment()} style={{ cursor: 'pointer' }}>
        {commentCount}
      </Button>
      <Button icon={<SaveOutlined />} />
      <Button icon={<DownloadOutlined />} />
      <Button icon={<ShareAltOutlined />} />
    </Space>
  )
}
