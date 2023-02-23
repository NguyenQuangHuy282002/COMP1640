import { useState } from 'react'
import { Form, Layout, Select, Input, Upload, Button } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import RichTextArea from './rich-text-area'
import { EditorState } from 'draft-js'
import { Http } from '../../../api/http'
import axios from 'axios'

const fetchPresignedUrl = async (url: any, file: any) => {
  try {
    console.log(`Fetching presigned`, url)
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
    const type = file.type
    console.log('file: ', fileExtension + type)
    // const requestURL = url+`?ext=${fileExtension}&type=${type}`;
    // const paramsOptions = {
    //   ext: fileExtension,
    //   type: type,
    // };
    const requestUrl = url+`?ext=${fileExtension}&type=${type}`;
    const uploadConfig = await Http.get(requestUrl);
    const uploadImage = await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': type,
      }
    })
    console.log(`Upload Result: ${uploadConfig}, ${uploadImage}`)
    return uploadConfig.data.key;
  } catch (error) {
    console.error(error)
  }
}

const fetchAll = async files => {
  const url = '/api/v1/idea/preSignUrl'
  const requests = files.map(file => {
    return fetchPresignedUrl(url, file).then(a => a)
  })

  return Promise.all(requests)
}

export default function CreateIdea() {
  const [form] = Form.useForm()
  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
  const [files, setFiles] = useState([])
  const setFileState = async (value: never[]) => {
    setFiles(value)
  }
  const normFile = (e: any) => {
    console.log('Upload event:', e)
    const fileList = e?.fileList
    console.log('File list:', files)
    if (Array.isArray(e)) {
      setFileState(
        fileList.map(file => {
          return { ...(file.originFileObj + file.thumbUrl) }
        })
      )
      return e
    }
    setFileState(fileList.map(file => file.originFileObj))
    return e?.fileList
  }
  const onSubmitPost = async () => {
    const postForm = {
      title: form.getFieldValue('title'),
      department: form.getFieldValue('department'),
      content: editorState,
    }

    console.log('files: ', files)
    console.log(postForm.content)

    fetchAll(files).then(a => console.log(JSON.stringify(a)))
  }

  return (
    <Form form={form} name="idea" style={{ padding: '10%' }}>
      <Form.Item name="department">
        <Select
          style={{
            float: 'left',
            width: '40%',
          }}
          placeholder="Choose department"
        >
          <Select.Option value="ok">Oke</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="title" required>
        <Input style={{ lineHeight: 2.15 }} placeholder="Title" maxLength={200} showCount></Input>
      </Form.Item>
      <Form.Item name="content" required>
        <RichTextArea editorState={editorState} setEditorState={setEditorState} />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        // extra="long"
      >
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 15 }}>
        <Button type="primary" htmlType="submit" onClick={() => onSubmitPost()}>
          Submit
        </Button>
        <Button type="ghost" htmlType="button">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}
