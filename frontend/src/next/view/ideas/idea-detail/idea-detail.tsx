import React, { useEffect, useState } from 'react'
import { TagsTwoTone, DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons'
import {
  Avatar,
  Typography,
  Space,
  Tag,
  Divider,
  Layout,
  Breadcrumb,
  Button,
} from 'antd'
import { formatDayTime } from '../../../utils/helperFuncs'
import useWindowSize from '../../../utils/useWindowSize'
import styled from 'styled-components'
import { Content } from 'antd/es/layout/layout'
import RichTextArea from '../create-new-idea/rich-text-area'
import MenuBar from './menu-bar'
import CommentsList from '../../../view/comments/comments-list'

const { Text, Link } = Typography

function IdeaDetail() {
  // { isOpen, onCloseModal, setAccounts, accounts }
  const windowWidth = useWindowSize()
  const [showComment, setShowComment] = useState(false)
  const padding = windowWidth < 969 ? '10px 0' : '15px 40px 50px 40px'
  const paddingSider = windowWidth < 969 ? '10px 0 0 2px' : '15px 0px 15px 15px'
  const [loading, setLoading] = useState(true)
  const onChange = (checked: boolean) => {
    setLoading(!checked)
  }
  const handleShowComment = () => {
    setShowComment(!showComment)
  }
  useEffect(() => {
    setTimeout(() => {
      onChange(loading)
    }, 2000)
  }, [])

  const data = {
    id: 1,
    title: 'Rất Chi là ối á nhé',
    author: 'I a co khac',
    description: 'vai ca l',
    body: 'Giau nghe la viec cua thay`',
    categories: [{ name: 'vai ca l' }, { name: 'Sir huyp' }, { name: 'giau nghe' }],
    points: 69,
    views: 86,
    commentCount: 333,
    createdAt: Date.now(),
    departmentName: 'Drugging4life',
    content:
      "<h3><span style='font-family: Arial;'><strong>The biggest problem with engineering hiring in Silicon Valley is that, contrary to what many of us like to believe, it's not a meritocracy.</strong></span></h3><p></p><p>I've been hiring people in some capacity or another for the past 3 years. First, I was doing it as an engineer, then as an in-house recruiter, and now as the owner of my own technical recruiting firm. Up until recently, I was quite sure that the startup world was as meritocratic as something could reasonably be.</p><p></p><p>I was wrong. Most hiring managers I speak to pay lip service to how they’re looking for strong CS fundamentals, passion, and great projects over pedigree, but in practice, the system breaks down.</p><p></p><ul><li><strong>Note</strong>: I'm going to shy away from discussing the state of programming interviews and their efficacy because that is a huge rant in and of itself. Instead, I'm going to focus on something that I think is even more of a problem: even getting your foot in the door.</li></ul><p></p><p><strong>HOW THE SYSTEM BREAKS DOWN</strong></p><p>Let's say you're the technical co-founder of a new startup that has had some traction, and there's a backlog of work piling up. Fortunately, you've raised enough money to hire a few engineers. Because you're probably the sole technical person, you are probably working on engineering recruiting full-time. This sucks a bit for you because it's probably not what you think you're best at, and it sucks a bit for the company because of opportunity cost. However, you're probably doing a pretty good job because 1) you're really good at selling the vision of the company because you're so vested in it and 2) you have the technical chops and intuition to evaluate people based on some set of internal heuristics you've acquired through experience. Because of these heuristics, you're probably going end up letting in people who seem smart even if they don't look great on paper.</p><p></p><p>Eventually, things are going well, your startup gets some more funding, and you decide you want to go back to doing what you think is real work. You hire an in-house recruiter to deal with your hiring pipeline full-time.</p><p>This is where things start going south. Because recruiters are, generally speaking, not technical, instead of relying on some internal barometer for competence, they have to rely on some set of quickly identifiable attributes that function as a proxy for aptitude. OK, you think, I'm going to give my recruiter(s) some guidelines about what good candidates look like. You might even create some kind of hiring spec to help them out.</p><p></p><p>These hiring specs, whether a formal document or just a series of criteria, tend to focus on candidate attributes that maximize on odds of the candidate being good while minimizing on the specialized knowledge it takes to draw these conclusions. Examples of these attributes include:</p><ul><li>CS degree from a top school</li><li>having worked at a top company</li><li>knowledge of specific languages/frameworks[1]</li><li>some number of years of experience</li></ul><p></p><p>This system works… kind of. If the company in question has a pretty strong brand, they can afford a decently high incidence of false negatives because there will always be a revolving door of candidates. And while these criteria aren't great, they don't necessarily perform badly and clearly work well enough to perpetuate their existence.</p><p></p><p>Here's the problem. If you don't look great on paper and you're applying to a startup that has a strong brand, unless you know someone in the company who can refer you internally, the odds of you even getting an interview are very slim.</p><p></p><p>In the grand scheme of things, there's a resulting massive long tail of great engineers out there who are getting overlooked even in the face of the perceived eng labor shortage.</p><p></p><p><strong>WHAT ABOUT SIDE PROJECTS?</strong></p><p>Folk wisdom dictates that having a great portfolio of side projects can help get you in the door if you don't look great on paper. I wish this were more true. However, unless your project is pretty high profile, easy for a layperson to understand, and/or is built with the API of the company you’re applying to, it will probably get overlooked.</p> <p></p><p>Part of the problem is that not all side projects are created equal. I can find some silly tutorial for some flashy UI thing, copy the code from it verbatim, swap in something that makes it a bit personal, and then call that a side project. Or I can create a new, actually useful JavaScript framework. Or I can spend a year bootstrapping a startup in my off hours and get it up to tens of thousands of users. Or I can arbitrarily call myself CTO of something I spaghetti-coded in a weekend with a friend.</p><p></p><p>Telling the difference between these kinds of projects is somewhat time-consuming for someone with a technical background and almost impossible for someone who’s never coded before. Therefore, while awesome side projects are a HUGE indicator of competence, if the people reading resumes can’t (either because of lack of domain-specific knowledge or because of time considerations) tell the difference between awesome and underwhelming, the signal gets lost in the noise.</p><p></p><p>To be clear, I am not discouraging building stuff. Building stuff on your own time is a great way to learn because you run into all sorts of non-deterministic challenges and gotchas that you wouldn't have otherwise. Few things will prepare you better for the portion of coding interviews that test if you know how the web works, have decent product sense, can design db schema, and so on. It's just that having built stuff may not get your foot in the door so you even have a chance to demonstrate these skills.</p><p></p><p><strong>WHAT CAN WE DO ABOUT THIS?</strong></p><p>Bemoaning that non-technical people are the first to filter candidates is silly because it’s not going to change. What can change, however, is how they do the filtering. There are a few things I can think of to fix this.</p><p>Figure out which attributes are predictors of success, going beyond low hanging fruit like pedigree. This is hard. I tried to do it, and Google's done it. I wish more companies did this kind of thing and published their results.</p><p>Find a cheap and fast way to evaluate people that doesn't take much more effort than reading a resume but tries to get at whether someone is actually good rather than relying on proxies.</p><p>Establish a low-friction, free/low-cost elite set of CS classes that anyone can get into but that loses most people through a combination of attrition because of the classes' difficulty and difficult evaluation at the end. Build a strong brand over time so companies ascribe significant respect to completing this track. This way merit can effectively be tied to pedigree. This is also really hard. I know a number of companies are attacking this space, though, and I am excited to see how hiring will change in the next few years as a result.</p> <p></p><p>#2 is the one I will talk about here because it's the least hard to implement and because pieces of it are in place already.</p><p>To effectively and quickly evaluate people without being tied to pedigree, applicants to a specific company could choose to either go the traditional route and submit a resume OR, if they don't think they look too good on paper, they could 1) complete a coding challenge and 2) submit a writing sample.</p><p></p><p>Ideally the coding challenge could be scored quickly and automatically (as the whole purpose of having recruiters in the first place is to keep from cutting in on eng time/resources), but at the same time it should probably be an interesting problem that would also give insight into the company's engineering culture and the kinds of problems they're solving, rather than some generic data structures problem pulled out of an interviewing handbook. If the coding challenge is too blah/textbook, I worry that a certain subset of smart people aren't going to want to waste their time. Tools to automate coding evaluation already exist (e.g. HackerRank, Codility, Hackermeter), but they're not currently baked into the application process the right way -- if I want to apply for a job somewhere, I'm going to go through their jobs page rather than search for their coding challenges. And even if I do well in these evaluations, in many places, there’s no guarantee that I’ll actually get an interview if I look bad on paper.</p><p></p><p>The idea for the writing sample came from the study I conducted. Of many attributes I tested, the three that achieved any kind of statistical significance were 1) grammatical errors/typos/syntactic inconsistencies, 2) whether the candidate worked at a top company and 3) whether you could tell from their resume what they did at each of their previous positions. Two out of the three attributes, in other words, had to do with a candidate's written communication skills.</p><p></p> <p>With the writing sample, I am imagining something that isn't a cover letter -- people tend to make those pretty formulaic and aren't too down to really talk about anything too personal or interesting. Rather, it should be a concise description of something you worked on recently that you are excited to talk about as explained to a non-technical audience. I think the non-technical audience aspect is critical because then 1) if you can break down complex concepts to a non-technical audience, you're probably a good communicator and actually understand what you worked on and 2) recruiters can read it and make valuable judgments about whether the writing is good and whether they understand what the person did. If recruiters can be empowered to make real judgments rather than acting as a human keyword matcher, they'd probably be a lot better at their jobs. In my experience, many recruiters are very smart, but their skills aren't being used to their full potential.</p><p></p><p>The combo of a successfully completed coding challenge and an excellent writing sample that is syntactically and semantically great should be powerful enough to get someone on the phone for a live coding round.</p><p></p><p>The problem of surfacing diamonds in the rough is hard, but I think these relatively small, realistic steps can go a long way toward helping find them and make eng hiring into the meritocracy that we all want it to be.</p><p></p>",
  }
  return (
    <>
      <Layout className="layout" style={{ padding: padding }}>
        <Content style={{ background: 'white', border: '1px solid #ccc', borderRadius: '5px', height: '100%', paddingBottom: '50px' }}>
          <Space direction="horizontal" align="start">
            <Space direction="vertical" style={{ padding: paddingSider, alignItems: 'flex-start' }}>
              <Button type="text" icon={<UpSquareOutlined style={{ fontSize: '22px', color: '#999999' }} />} href="#" />
              <Text strong style={{ marginLeft: '0', width: '100%', fontSize: '13.5px', color: '#948C75' }}>
                {data.views > 0 ? <>+{data.views}</> : <>-{data.views}</>}
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
                <Text strong>{data.author}</Text>
                <Text type="secondary">Posted {formatDayTime(data.createdAt)}</Text>
              </Space>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {data.title}
              </Typography.Title>
              <Space size={[0, 8]} wrap>
                <TagsTwoTone style={{ padding: '5px' }} />
                {data.categories.length !== 0 ? (
                  data.categories.map(tag => (
                    <Tag key={tag.name} color="geekblue">
                      {tag.name}
                    </Tag>
                  ))
                ) : (
                  <Tag>No Tag</Tag>
                )}
              </Space>
              <ReadMore>{data.content}</ReadMore>
            </Space>
          </Space>
          <Divider></Divider>
          <MenuBar commentCount={data.commentCount} handleShowComment={handleShowComment}/>
          <Space style={{ padding: '10px 44px' }} direction="vertical">
            <Text strong>Comment as <Text mark>{data.author}</Text></Text>
            <RichTextArea editorState={undefined} setEditorState={undefined}></RichTextArea>
          </Space>
          <Space style={{ justifyContent: 'end', display: 'flex', paddingRight: '44px' }}>
            <Button type="primary" shape="round" disabled={false} style={{marginRight: '10px'}} onClick={() => {}}>
              Comment
            </Button>
          </Space>
          <Divider style={{ marginBottom: 0}}/>
          <Space style={{ width: '100%'}}>
            {
              showComment ? <CommentsList></CommentsList> : <></> 
            }

          </Space>
        </Content>
      </Layout>
    </>
  )
}

export default IdeaDetail

function ReadMore({ children }) {
  const text: string = children
  const [isReadMore, setIsReadMore] = useState(true)
  const textDisplay: string = isReadMore ? text.slice(0, 1500) : text
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
