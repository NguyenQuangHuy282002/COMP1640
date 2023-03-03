import { Form, Modal } from 'antd'

interface IEventModalProps {
  open: boolean
  onClose: Function
  onFinish: () => void
}

export default function CreateEventModal(props: IEventModalProps) {
  const { open, onClose, onFinish } = props

  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose()
      }}
      title={'Add new event'}
      onOk={onFinish}
      destroyOnClose
    >
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
        <Form.Item name="name" label="Title" labelAlign="left" required></Form.Item>
        <Form.Item name="name" label="Description" labelAlign="left" required></Form.Item>
        <Form.Item name="name" label="Start date" labelAlign="left" required></Form.Item>
        <Form.Item name="name" label="First closure date" labelAlign="left" required></Form.Item>
        <Form.Item name="name" label="Final closure date" labelAlign="left" required></Form.Item>
      </Form>
    </Modal>
  )
}
