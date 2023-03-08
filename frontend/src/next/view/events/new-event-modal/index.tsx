import { Form, Input, Modal } from 'antd'
import { EditorState } from 'draft-js'
import RichTextEditor from 'next/components/text-editor'
import { useState } from 'react'

interface IEventModalProps {
  open: boolean
  onClose: Function
  onFinish: () => void
}

export default function CreateEventModal(props: IEventModalProps) {
  const { open, onClose, onFinish } = props
  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
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
        <Form.Item name="title" label="Title" labelAlign="left" required>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" labelAlign="left" required>
          <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
        </Form.Item>
        <Form.Item name="startDate" label="Start date" labelAlign="left" required></Form.Item>
        <Form.Item name="firstCloseDate" label="First closure date" labelAlign="left" required></Form.Item>
        <Form.Item name="finalCloseDate" label="Final closure date" labelAlign="left" required></Form.Item>
      </Form>
    </Modal>
  )
}
