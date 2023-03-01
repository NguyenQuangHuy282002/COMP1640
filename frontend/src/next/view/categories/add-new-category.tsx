import { Col, Form, Input, message, Modal, Select } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddCategoryModal({ isOpen, onCloseModal, setCategoriesList, categoriesList, currentCategory }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    if (form.getFieldValue('name')) {
      const categoryForm = {
        name: form.getFieldValue('name'),
        oldName: currentCategory.name,
      }
      await Http.post('/api/v1/category', categoryForm)
        .then(() => {
          setCategoriesList([categoryForm, ...categoriesList])
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
      title="Create new category"
      onOk={onFinish}
      okButtonProps={{ disabled: !form.getFieldValue('name') || currentCategory.name === form.getFieldValue('name') }}
      destroyOnClose
    >
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
        <Form.Item name="name" label="Category name" labelAlign="left" required>
          <Input placeholder="IT, Design, ..." allowClear defaultValue={currentCategory.name} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
