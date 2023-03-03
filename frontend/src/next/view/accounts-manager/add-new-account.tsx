import { Col, Form, Input, Modal, Select } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddAccountModal({ isOpen, onCloseModal, setAccounts, accounts }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    const accountForm = {
      name: form.getFieldValue('name'),
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
      email: form.getFieldValue('email'),
      role: form.getFieldValue('role'),
    }
    await Http.post('/api/v1/auth/create', accountForm)
      .then(() => {
        setAccounts([accountForm, ...accounts])
        onCloseModal()
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onCloseModal()
        form.resetFields()
      }}
      title="Register new account"
      onOk={onFinish}
    >
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
        <Col span={24} style={{ padding: '16px 16px 0px 16px' }}>
          <Form.Item name="name" label="Full name" labelAlign="left" required>
            <Input placeholder="Nguyen Van A" allowClear />
          </Form.Item>
          <Form.Item name="email" label="Email" labelAlign="left" required>
            <Input placeholder="user@gmail.com" allowClear />
          </Form.Item>
          <Form.Item name="role" label="Role" labelAlign="left" required>
            <Select
              style={{ width: 120 }}
              options={[
                { value: 'staff', label: 'Staff' },
                { value: 'manager', label: 'QA Manager' },
                { value: 'coordinator', label: 'QA Coordinator' },
              ]}
            />
          </Form.Item>
          <Form.Item name="username" label="Username" labelAlign="left" required>
            <Input placeholder="user" autoComplete="off" allowClear />
          </Form.Item>
          <Form.Item name="password" label="Password" labelAlign="left" required>
            <Input.Password autoComplete="off" allowClear />
          </Form.Item>
          <Form.Item name="re-password" label="Re-write password" labelAlign="left" required>
            <Input.Password autoComplete="off" allowClear />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  )
}
