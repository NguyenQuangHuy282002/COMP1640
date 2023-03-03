import { useEffect, useState } from 'react'
import { Form, Layout, Select, Input, Upload, Button, Switch, message } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import RichTextArea from './rich-text-area'
import { convertToRaw, EditorState } from 'draft-js'
import { Http } from '../../../api/http'
import axios from 'axios'
import styled from 'styled-components'
import useWindowSize from '../../../utils/useWindowSize'
import draftToHtml from 'draftjs-to-html'
// import Tags from '../../../components/tag'
import Tags from './tag'
import React from 'react'
import { useSnackbar } from 'notistack'

const fetchPresignedUrl = async (url: any, file: any) => {
  try {
    console.log(`Fetching presigned`, url)
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
    const type = file.type
    console.log('file: ', fileExtension + '/' + type)
    const requestUrl = url + `?ext=${fileExtension}&type=${type}`
    const uploadConfig = await Http.get(requestUrl)
    const uploadFileToS3 = await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': type,
      },
    })
    console.log(uploadFileToS3)
    return `https://yessir-bucket-tqt.s3.ap-northeast-1.amazonaws.com/${uploadConfig.data.key}`
  } catch (error) {
    console.error(error)
  }
}

const fetchAllToS3 = async (files: any) => {
  const url = '/api/v1/idea/preSignUrl'
  const requests = files.map(async (file: any) => {
    return await fetchPresignedUrl(url, file).then(result => result)
  })

  return Promise.all(requests)
}

export default function CreateIdea() {
  const [form] = Form.useForm()
  const initialState = () => EditorState.createEmpty()
  const { enqueueSnackbar } = useSnackbar()
  // const [loading, setLoading] = useState(false)
  const [editorState, setEditorState] = useState(initialState)
  const [files, setFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [isAnonymous, setAnonymous] = useState(false)
  const setFileState = async (value: never[]) => {
    setFiles(value)
  }

  const normFile = (e: any) => {
    // handle event file changes in upload and dragger components
    console.log('Upload event:', e)
    const fileList = e?.fileList
    console.log('File list:', files)
    if (Array.isArray(e)) {
      setFileState(
        fileList.map((file: any) => {
          return { ...(file.originFileObj + file.thumbUrl) }
        })
      )
      return e
    }
    setFileState(fileList.map((file: any) => file.originFileObj))
    return e?.fileList
  }

  const onSubmitPost = async () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const postForm = {
      title: form.getFieldValue('title'),
      content: `${content}`,
      categories: categories,
      isAnonymous: isAnonymous
    }
    if (files) {
      let fileNameList = await fetchAllToS3(files)
      console.log('fileNameList: ', fileNameList)
      postForm['files'] = fileNameList
    }

    console.log('postForm: ', postForm)
    // setLoading(true)
    await Http.post('/api/v1/idea/create', postForm)
      .then(res => {
        console.log('response', res)
        enqueueSnackbar('Upload Idea successfully!!')
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      // .finally(() => setLoading(false))
    console.log('idea info: ', postForm)
  }
  const windowWidth = useWindowSize()
  const paddingForm = windowWidth < 768 ? '10px 5px' : '5% 5%'

  return (
    <Form
      form={form}
      name="idea"
      style={{
        padding: paddingForm,
      }}
    >
      <Form.Item name="specialevent" style={{ marginBottom: '15px' }}>
        <Select
          style={{
            float: 'left',
            width: '40%',
          }}
          placeholder="Choose Special Event"
        >
          <Select.Option value="ok">Oke</Select.Option>
        </Select>
      </Form.Item>
      <div
        style={{
          border: '0.1px solid #f6f7f8',
          borderRadius: '5px',
          padding: '10px 15px',
          backgroundColor: 'white',
        }}
      >
        <StyledFormItem
          name="title"
          required
          style={{
            padding: '5px',
          }}
          label="Title"
        >
          <Input style={{ lineHeight: 2.15 }} placeholder="Title" maxLength={200} showCount autoComplete="off"></Input>
        </StyledFormItem>
        <StyledFormItem
          name="content"
          required
          style={{
            padding: '5px',
          }}
        >
          <RichTextArea editorState={editorState} setEditorState={setEditorState} />
        </StyledFormItem>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{
            marginBottom: '20px',
          }}
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
        <Form.Item label="Anonymous Mode">
          <Switch onChange={() => setAnonymous(!isAnonymous)} checkedChildren="On" unCheckedChildren="Off" />
        </Form.Item>
        <Form.Item label="Tags (max: 5)">
          <Tags setCategories={setCategories}/>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 15 }}>
          <Button type="primary" htmlType="submit" onClick={() => onSubmitPost()}>
            Post
          </Button>
          <Button type="ghost" htmlType="button">
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #f6f7f8;
`
