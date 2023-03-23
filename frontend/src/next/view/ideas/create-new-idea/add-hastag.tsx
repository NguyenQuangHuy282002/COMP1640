// import { Form, Input, message, Modal } from 'antd'
// import { useSnackbar } from 'notistack'
// import { Http } from '../../../api/http'

// export default function AddHastag({ isOpen, onCloseModal, setHastags, hastags, currentHastag }) {
//     const { enqueueSnackbar } = useSnackbar()
//     const [form] = Form.useForm()

//     const onFinish = async () => {
//         if (form.getFieldValue('name') || currentHastag.name !== form.getFieldValue('name')) {
//             const accountForm = {
//                 name: form.getFieldValue('name'),
//                 oldName: currentHastag.name,
//             }

//             await Http.post('/api/v1/hastag', accountForm)
//                 .then(() => {
//                     setHastags([accountForm, ...hastags])
//                     onCloseModal()
//                 })
//                 .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
//         } else if (!form.getFieldValue('name')) {
//             message.error('Name is empty!')
//         } else {
//             message.error('Please type a different name!')
//         }
//     }

//     return (
//         <Modal
//             open={isOpen}
//             onCancel={() => {
//                 onCloseModal()
//                 form.resetFields()
//             }}
//             title={currentHastag.name ? `Edit ${currentHastag.name}` : 'Add new hastag'}
//             onOk={onFinish}
//             destroyOnClose
//         >
//             <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} form={form}>
//                 <Form.Item name="name" label="Hastag name" labelAlign="left" required>
//                     <Input allowClear defaultValue={currentHastag.name} />
//                 </Form.Item>
//             </Form>
//         </Modal>




//     )
// }
