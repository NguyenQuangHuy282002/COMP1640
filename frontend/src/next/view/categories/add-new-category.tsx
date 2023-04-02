import { Form, Input, message, Modal } from 'antd'
import { useSnackbar } from 'notistack'
import { Http } from '../../api/http'

export default function AddCategoryModal({ isOpen, onCloseModal, setCategoriesList, categoriesList, currentCategory }) {
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const onFinish = async () => {
    if (form.getFieldValue('name') || currentCategory.name !== form.getFieldValue('name')) {
      const categoryForm = {
        _id: currentCategory._id,
        name: form.getFieldValue('name'),
      }
      await Http.post('/api/v1/category', categoryForm)
        .then(() => {
          setCategoriesList([categoryForm, ...categoriesList])
          onCloseModal()
        })
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    } else if (!form.getFieldValue('name')) {
      message.error('Name is empty!')
    } else {
      message.error('Please type a different name!')
    }
  }
  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onCloseModal()
        form.resetFields()
      }}
      title={currentCategory.name ? `Edit ${currentCategory.name}` : 'Add new category'}
      onOk={onFinish}
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
