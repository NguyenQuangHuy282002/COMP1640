import React, { useEffect, useState } from 'react'
import { Button, List } from 'antd'
import Comment from './comment'
import { Http } from 'next/api/http'
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
  const [initLoading, setInitLoading] = useState(true)
  const [isMore, setMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [list, setList] = useState<DataType[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    Http.get(`/api/v1/comment?ideaId=${id}`).then(res => {
      setInitLoading(false)
      console.log(res)
      setData(res.data.data)
      setList(res.data.data)
      if (!res.data?.next) {
        setMore(false)
      }
      else{
        setCurrentPage(res.data.next?.page)
      }
    })
  }, [updateIdea])

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
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      {isMore && !initLoading && !loading ? <Button onClick={onLoadMore}>More</Button> : null}
    </div>
  )

  return (
    <>
      <List
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={list}
        style={{ width: '100%' }}
        renderItem={item => (
          // <List.Item>
            <Comment item={item} loading={item.loading}/>
          // </List.Item>
        )}
      />
    </>
  )
}

export default CommentsList
