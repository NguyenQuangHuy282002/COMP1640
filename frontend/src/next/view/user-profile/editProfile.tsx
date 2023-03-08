import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row, Space, Typography, Upload } from 'antd'
import TextEditor from '../../components/text-editor'
import { IUserInfo } from '../../../types/user'
import RichTextEditor from '../../components/text-editor'
import { useState } from 'react'

const { Title } = Typography

interface IEditProfileForm {
  userInfo: IUserInfo
}

function EditProfileForm(props: IEditProfileForm) {
  const { userInfo } = props
  const [description, setDescription] = useState(userInfo.description)

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }
  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      style={{ width: '100%' }}
      form={form}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Title level={3} style={{ margin: '0px 10px 16px' }}>
          General
        </Title>
      </Row>

      <Form.Item name="name" label="Full name" labelAlign="left" required>
        <Input defaultValue={userInfo.name} />
      </Form.Item>
      <Form.Item name="username" label="Username" labelAlign="left" required>
        <Input defaultValue={userInfo.username} />
      </Form.Item>
      <Form.Item name="phone" label="Phone number" labelAlign="left" required>
        <Input defaultValue={userInfo.phone} />
      </Form.Item>
      <Form.Item name="email" label="Email" labelAlign="left" required>
        <Input defaultValue={userInfo.email} />
      </Form.Item>
      <Form.Item name="birthday" label="Date of birth" labelAlign="left" required>
        <DatePicker />
      </Form.Item>

      <Form.Item name="image" label="Upload image" valuePropName="fileList" labelAlign="left">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Title level={3} style={{ margin: '0px 10px 16px' }}>
          Additional
        </Title>
      </Row>

      <Form.Item name="description" label="Description" labelAlign="left">
        <RichTextEditor setEditorState={setDescription} editorState={description} />
      </Form.Item>
      <Form.Item name="interests" label="Interests" labelAlign="left">
        <Input />
      </Form.Item>

      <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ padding: '0px 16px' }}>
        <Form.Item>
          <Space direction="horizontal" align="end">
            <Button type="primary" htmlType="submit" disabled>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset} danger>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default EditProfileForm
