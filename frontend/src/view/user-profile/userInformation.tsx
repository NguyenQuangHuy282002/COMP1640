import { Divider, Row, Typography } from 'antd'

const { Title, Text } = Typography

export default function UserInfomation() {
  return (
    <>
      <Title level={3} style={{ margin: 0, marginBottom: 10 }}>
        Description
      </Title>
      <Text> User has not updated their description yet.</Text>

      <Divider />

      <Title level={3} style={{ margin: 0, marginBottom: 10 }}>
        Interests
      </Title>
      <Text> User has not updated their interests yet.</Text>
    </>
  )
}
