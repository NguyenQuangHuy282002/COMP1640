import { InfoCircleOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Modal, Tooltip } from 'antd'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Http } from 'next/api/http'
import RichTextEditor from 'next/components/text-editor'
import useWindowSize from 'next/utils/useWindowSize'
import { uuid } from 'next/utils/uuid'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import styled from 'styled-components'

interface IEventModalProps {
  open: boolean
  onClose: Function
  onFinish: () => void
}

export default function CreateEventModal(props: IEventModalProps) {
  const { open, onClose, onFinish } = props
  const { enqueueSnackbar } = useSnackbar()
  const windowWidth = useWindowSize()
  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
  const [form] = Form.useForm()

  const handleOnFinish = async () => {
    const eventForm = {
      title: form.getFieldValue('title'),
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      startDate: form.getFieldValue('startDate').$d,
      firstCloseDate: form.getFieldValue('firstCloseDate').$d,
      finalCloseDate: form.getFieldValue('finalCloseDate').$d,
    }
    console.log(eventForm)
    await Http.post('/api/v1/event', eventForm)
      .then(() => {
        onFinish()
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }
  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose()
      }}
      title={'Add new event'}
      onOk={handleOnFinish}
      destroyOnClose
      style={{ minWidth: windowWidth < 969 ? 'unset' : '80%' }}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        style={{ width: '100%', padding: 16 }}
        form={form}
      >
        <Form.Item name="title" label="Title" labelAlign="left" required>
          <Input placeholder="Enter event title" />
        </Form.Item>
        <StyledFormItem name="description" label="Description" labelAlign="left"></StyledFormItem>

        <RichTextEditor editorState={editorState} setEditorState={setEditorState} style={{ marginBottom: 20 }} />

        <Form.Item name="startDate" label="Start date" labelAlign="left" required>
          <DatePicker />
        </Form.Item>
        <Form.Item name="firstCloseDate" label="First closure date" labelAlign="left" required>
          <DatePicker />
        </Form.Item>

        <Form.Item name="finalCloseDate" label="Final closure date" labelAlign="left">
          <DatePicker />
        </Form.Item>
        <Tooltip title="Final closure date will be set 7 days after first closure date by default!" color="#52c41a">
          <InfoCircleOutlined style={{ color: '#1a83c4' }} />
        </Tooltip>
      </Form>
    </Modal>
  )
}

const StyledFormItem = styled(Form.Item)``
