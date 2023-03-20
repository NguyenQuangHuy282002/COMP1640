import { Layout, message } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Http } from 'next/api/http'
import { createSubscription } from 'next/libs/global-state-hook'
import { useEffect, useState } from 'react'
import useWindowSize from '../../../utils/useWindowSize'
import AppFooter from '../footer'
import AppHeader from '../header'
import RightSideBar from './right-sidebar'
import AppSidebar from './sidebar'

export const ideaCount = createSubscription({ number: 0 })
const LayoutWrapper = ({ children }) => {
  const windowWidth = useWindowSize()
  const [suggest, setSuggest] = useState()
  const contentStyle =
    windowWidth > 1000
      ? {
          width: '100%',
          background: 'none',
        }
      : {
          maxWidth: 'none',
          width: '100%',
        }

  useEffect(() => {
    const getSuggestions = async () =>
      await Http.get('/api/v1/idea/suggest')
        .then(res => {
          setSuggest(res.data.data)
          ideaCount.updateState({ number: res.data.count })
        })
        .catch(error => message.error('Failed to get suggestions!'))
    getSuggestions()
  }, [])

  return (
    <>
      <AppHeader suggest={suggest} />

      <Layout
        style={{
          width: '100%',
          background: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <AppSidebar />
        <Content style={contentStyle}>{children}</Content>
        <RightSideBar />
      </Layout>
      <AppFooter />
    </>
  )
}

export default LayoutWrapper
