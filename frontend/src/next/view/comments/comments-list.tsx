import { SlidersFilled } from '@ant-design/icons'
import { Button, Dropdown, List, MenuProps, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { useSocket } from 'next/socket.io'
import { useEffect, useState } from 'react'
import Comment from './comment'
interface DataType {
  gender?: string
  name: {
    title?: string
    first?: string
    last?: string
  }
  email?: string
  picture: {
    large?: string
    medium?: string
    thumbnail?: string
  }
  nat?: string
  loading: boolean
}

const count = 3
function CommentsList({ id, updateIdea }) {
  const { appSocket } = useSocket()
  const [initLoading, setInitLoading] = useState(true)
  const [isMore, setMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [list, setList] = useState<DataType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('new')

  useEffect(() => {
    Http.get(`/api/v1/comment?ideaId=${id}`).then(res => {
      setInitLoading(false)
      console.log(res)
      setData(res.data.data)
      setList(res.data.data)
      if (!res.data?.next) {
        setMore(false)
      } else {
        setCurrentPage(res.data.next?.page)
      }
    })
  }, [updateIdea, filter])

  const updateComments = info => {
    setList(data.concat([...new Array(1)].map(() => ({ loading: true, name: {}, picture: {} }))))
    setData([info.comment, ...data])
    setList([info.comment, ...list])
    return
  }

  useEffect(() => {
    appSocket.on('comments', data => {
      if (data.ideaId === id) {
        updateComments(data)
      }
    })

    return () => {
      appSocket.off('comments')
    }
  }, [updateComments])

  const onLoadMore = () => {
    setLoading(true)
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))))
    Http.get(`/api/v1/comment/?ideaId=${id}&page=${currentPage}`).then(res => {
      const newData = data.concat(res.data.data)
      setData(newData)
      setList(newData)
      setLoading(false)
      if (!res.data?.next) {
        setMore(false)
      } else {
        setCurrentPage(res.data.next.page)
      }
      window.dispatchEvent(new Event('resize'))
    })
  }

  const loadMore = (
    <>
      {isMore && !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>More</Button>
        </div>
      ) : (
        <></>
      )}
    </>
  )

  const moreItems: MenuProps['items'] = [
    {
      key: 'new',
      label: (
        <Typography.Text style={{ fontSize: 15, margin: 0 }} onClick={() => setFilter('your-department')}>
          Newest
        </Typography.Text>
      ),
    },
    {
      key: 'old',
      label: (
        <Typography.Text style={{ fontSize: 15, margin: 0 }} onClick={() => setFilter('your-ideas')}>
          Oldest
        </Typography.Text>
      ),
    },
  ]

  return (
    <>
      <Space
        style={{
          width: '100%',
          borderBottom: '0.5px #ccc solid',
          padding: '10px',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Dropdown menu={{ items: moreItems }} placement="bottom" arrow trigger={['click']}>
          <Button>
            <SlidersFilled />
          </Button>
        </Dropdown>
      </Space>
      <List
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={list}
        style={{ width: '100%' }}
        renderItem={item => (
          // <List.Item>
          <Comment item={item} loading={item.loading} />
          // </List.Item>
        )}
      />
    </>
  )
}

export default CommentsList
