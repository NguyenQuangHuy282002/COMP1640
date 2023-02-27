import { Col, Form, Input, Modal, Select } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddDepartmentModal({ isOpen, onCloseModal, setDeparments, deparments }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    const accountForm = {
      name: form.getFieldValue('name'),
    }
    await Http.post('/api/v1/department', accountForm)
      .then(() => {
        setDeparments([accountForm, ...deparments])
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
      title="Add new department"
      onOk={onFinish}
    >
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
        <Form.Item name="name" label="Department name" labelAlign="left" required>
          <Input placeholder="Business,..." allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}
