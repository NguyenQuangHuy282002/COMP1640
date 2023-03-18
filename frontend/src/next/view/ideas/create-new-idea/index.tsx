import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input, message, Select, Switch, Typography } from 'antd'
import axios from 'axios'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import RichTextEditor from 'next/components/text-editor'
import TermCondition from 'next/components/upload/term-conditions'
import { DefaultUpload, DraggerUpload } from 'next/components/upload/upload'
import { useQuery } from 'next/utils/use-query'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Http } from '../../../api/http'
import useWindowSize from '../../../utils/useWindowSize'
import Tags from './tag'

const { Title } = Typography

const fetchPresignedUrl = async (url: any, file: any) => {
  try {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
    const type = file.type
    console.log('file: ', fileExtension + '/' + type)
    const requestUrl = url + `?ext=${fileExtension}&type=${type}`
    const uploadConfig = await Http.get(requestUrl)
    const uploadFileToS3 = await axios.put(uploadConfig.data.url, file.originFileObj, {
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
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const query = useQuery()
  const defaultEventId = query.get('event')

  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
  const [openModal, setOpenModal] = useState(false)
  const [files, setFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [isAnonymous, setAnonymous] = useState(false)
  const [specialEvent, setSpecialEvent] = useState([])
  const setFileState = async (value: never[]) => {
    setFiles(value)
  }

  useEffect(() => {
    if (defaultEventId) {
      const getEventList = async () => {
        await Http.get(`/api/v1/event?id=${defaultEventId}`)
          .then(res => {
            console.log(res.data.data)
            setSpecialEvent(res.data.data)
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      }
      getEventList()
    } else {
      const getEventList = async () => {
        await Http.get('/api/v1/event/available')
          .then(res => {
            console.log(res.data.data)
            setSpecialEvent(res.data.data)
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      }
      getEventList()
    }
  }, [])
  const normFile = (e: any) => {
    // handle event file changes in upload and dragger components
    console.log('Upload event:', e)
    const fileList = e
    console.log(Array.isArray(e))
    setFileState(fileList)
    console.log('File list:', files)

    return e
  }

  const onSubmitPost = async () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const postForm = {
      title: form.getFieldValue('title'),
      
      content: `${content}`,
      categories: categories,
      isAnonymous: isAnonymous,
    }
    if(form.getFieldValue('specialevent')) {
      postForm['specialevent'] = form.getFieldValue('specialevent')
    }
    if (!postForm.title || !postForm.content) {
      return message.error('Please fill the required fields')
    }
    if (postForm.title.length < 30) {
      return message.error('Your title is too sparsing')
    }
    if (!form.getFieldValue('agreement')) {
      return message.error('You must agree to the terms and conditions')
    }
    if (files) {
      let fileNameList = await fetchAllToS3(files)
      postForm['files'] = fileNameList
    }

    console.log('postForm: ', postForm)
    await Http.post('/api/v1/idea/create', postForm)
      .then(res => {
        console.log('response', res)
        message.success('Upload Idea successfully!!')
        navigate('/')
      })
      .catch(error => message.error(error.message + '. Please try again'))
  }

  const windowWidth = useWindowSize()
  const paddingForm = windowWidth < 1000 ? '10px 5px' : '5% 5%'

  return (
    <Form
      form={form}
      name="idea"
      style={{
        padding: paddingForm,
      }}
    >
      {defaultEventId ? (
        <>
          <Title level={3} style={{ marginTop: 0 }}>
            Create idea for {specialEvent[0].title}
          </Title>
          <Divider />
        </>
      ) : (
        <Form.Item name="specialevent" style={{ marginBottom: '15px' }}>
          <Select
            style={{
              float: 'left',
              width: '40%',
            }}
            placeholder="Choose Special Event"
          >
            {specialEvent.map((event, index) => (
              <Select.Option value={event._id} key={index}>
                {event.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
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
          <Input
            style={{ lineHeight: 2.15 }}
            placeholder="Title (at least 50 characters to summary your idea)"
            maxLength={200}
            showCount
            autoComplete="off"
          ></Input>
        </StyledFormItem>
        <StyledFormItem
          name="content"
          required
          style={{
            padding: '5px',
          }}
        >
          <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
        </StyledFormItem>
        <DefaultUpload normFile={normFile} files={files}></DefaultUpload>
        <DraggerUpload normFile={normFile} files={files}></DraggerUpload>

        <Form.Item label="Anonymous Mode">
          <Switch onChange={() => setAnonymous(!isAnonymous)} checkedChildren="On" unCheckedChildren="Off" />
        </Form.Item>
        <Form.Item label="Tags (max: 5)">
          <Tags setCategories={setCategories} />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          required
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Must accept terms and conditions')),
            },
          ]}
        >
          <Checkbox>
            I have read and agreed to{' '}
            <Button
              type="link"
              style={{ padding: 0, margin: 0 }}
              icon={<QuestionCircleOutlined style={{ margin: 0, padding: 0 }} />}
              onClick={() => setOpenModal(true)}
            >
              Terms and Conditions{' '}
            </Button>
          </Checkbox>
        </Form.Item>
        <TermCondition isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
        <Form.Item wrapperCol={{ span: 15 }}>
          <Button type="primary" htmlType="submit" onClick={() => onSubmitPost()} style={{ marginTop: 20 }}>
            Post
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
