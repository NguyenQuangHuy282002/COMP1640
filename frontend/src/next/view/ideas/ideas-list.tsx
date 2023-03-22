import { Button, Divider, List } from 'antd'
import { useSubscription } from 'next/libs/global-state-hook'
import { ideaCount } from '../layout/header'

import IdeaCard from './idea-card'

function IdeasList({ ideas, loading, isEnd, loadMoreData }) {
  const {
    state: { number },
  } = useSubscription(ideaCount)
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
