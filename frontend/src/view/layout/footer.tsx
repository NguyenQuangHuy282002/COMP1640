import { Layout, Space, Typography } from 'antd'
import { imgDir } from '../../constants/img-dir'

const { Title, Paragraph, Link } = Typography

function AppFooter() {
  return (
    <Layout.Footer style={{ background: '#888888' }}>
      <Space align="start" style={{ width: ' 100%' }} size={80}>
        <a href={'/'} style={{ marginRight: 20, display: 'contents' }}>
          <img src={imgDir + 'logo.png'} height="60" alt="Logo" />
        </a>
        <Space direction="vertical">
          <Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            Created By Team Member:
          </Title>
          <Paragraph>
            <ul>
              <li>Nguyen Quang Huy</li>
              <li>Nguyen Huy Hoang</li>
              <li>Tran Quang Khai</li>
              <li>Tran Doan Dung</li>
              <li>Hoang Dinh Hien</li>
              <li>Pham Quang Huy</li>
            </ul>
          </Paragraph>
        </Space>
        <Space direction="vertical">
          <Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            Github resource
          </Title>
          <Paragraph>
            <Link href="https://github.com/NguyenQuangHuy282002/COMP1640">Open in Github</Link>
          </Paragraph>
        </Space>
      </Space>
    </Layout.Footer>
  )
}

export default AppFooter
