import { Col, Row, Typography } from 'antd'
import { StyledRow } from '../home-page'
import IdeaCard from '../ideas/idea-card'

const { Title } = Typography

export default function ListIdeas({ ideas }) {
  return (
    <>
      {ideas.map((idea: any, idx: number) => (
            <IdeaCard key={`${idea}`} idea={idea} isLoading={false}></IdeaCard>
      ))}
    </>
  )
}
