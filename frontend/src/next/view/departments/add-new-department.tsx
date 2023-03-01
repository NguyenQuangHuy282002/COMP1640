import { createSubscription, useSubscription } from '../../libs/global-state-hook'
import { Form, Input, message, Modal } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddDepartmentModal({ isOpen, onCloseModal, setDeparments, deparments, currentDepartment }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    if (form.getFieldValue('name')) {
      const accountForm = {
        name: form.getFieldValue('name'),
        oldName: currentDepartment.name,
      }
      await Http.post('/api/v1/department', accountForm)
        .then(() => {
          setDeparments([accountForm, ...deparments])
          onCloseModal()
        })
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    } else {
      message.error('Name is empty!')
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onCloseModal()
        form.resetFields()
      }}
      title={currentDepartment.name ? `Edit ${currentDepartment.name}` : 'Add new department'}
      onOk={onFinish}
      okButtonProps={{ disabled: !form.getFieldValue('name') || currentDepartment.name === form.getFieldValue('name') }}
      destroyOnClose
    >
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
        <Form.Item name="name" label="Department name" labelAlign="left" required>
          <Input placeholder="Business,..." allowClear defaultValue={currentDepartment.name} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
