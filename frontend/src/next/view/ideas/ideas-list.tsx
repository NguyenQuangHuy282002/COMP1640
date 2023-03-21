import { Button, Divider, List, message } from 'antd'
import { Http } from 'next/api/http'
import { useSubscription } from 'next/libs/global-state-hook'
import { handleFilter } from 'next/utils/handleFilter'
import { useEffect, useState } from 'react'
import { ideaCount } from '../layout/staff'
import IdeaCard from './idea-card'

function IdeasList({ ideas, loading, isEnd, loadMoreData }) {
  const { number } = useSubscription(ideaCount).state
  const loadMore =
    !isEnd && !loading && ideas?.length <= number ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={loadMoreData}>loading more</Button>
      </div>
    ) : (
      <Divider plain>It is all, nothing more 🤐</Divider>
    )

  return (
    <List
      loadMore={loadMore}
      itemLayout="vertical"
      size="large"
      dataSource={ideas}
      style={{
        marginBottom: '50px',
      }}
      renderItem={idea => <IdeaCard key={`${idea}`} idea={idea} isLoading={loading}></IdeaCard>}
    />
  )
}

export default IdeasList
