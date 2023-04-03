import { Form, Input, message, Modal } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddDepartmentModal({ isOpen, onCloseModal, setDeparments, deparments, currentDepartment }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    if (form.getFieldValue('name') || currentDepartment.name !== form.getFieldValue('name')) {
      const departmentForm = {
        _id: currentDepartment._id,
        name: form.getFieldValue('name'),
      }
      await Http.post('/api/v1/department', departmentForm)
        .then(() => {
          setDeparments([departmentForm, ...deparments])
          onCloseModal()
        })
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    } else if (!form.getFieldValue('name')) {
      message.error('Name is empty!')
    } else {
      message.error('Please type a   name!')
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
