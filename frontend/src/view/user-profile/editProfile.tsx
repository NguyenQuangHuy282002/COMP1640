import { PlusOutlined } from '@ant-design/icons'
import { Col, DatePicker, Form, Input, Row, Upload } from 'antd'

const { RangePicker } = DatePicker
const { TextArea } = Input

function EditProfileForm() {
  const [form] = Form.useForm()

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }}>
      <Row gutter={{ xs: 0, sm: 16, md: 16 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12} xxl={12}>
          <Form.Item label="Full name">
            <Input />
          </Form.Item>
          <Form.Item label="Username">
            <Input />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Date of birth" style={{ width: '100%' }}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Upload image" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default EditProfileForm
