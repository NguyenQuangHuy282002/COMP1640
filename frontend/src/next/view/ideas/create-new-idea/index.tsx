import { ArrowLeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Divider, Form, Input, message, Select, Space, Switch, Typography } from 'antd'
import axios from 'axios'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import RichTextEditor from 'next/components/text-editor'
import TermCondition from 'next/components/upload/term-conditions'
import { DefaultUpload, DraggerUpload } from 'next/components/upload/upload'
import useRoleNavigate from 'next/libs/use-role-navigate'
import { useQuery } from 'next/utils/use-query'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Http } from '../../../api/http'
import useWindowSize from '../../../utils/useWindowSize'
import Tags from './tag'
// import AddHastag from './add-hastag';
// import Hastags from './hastag';
import FormItem from 'antd/es/form/FormItem'
import HashtagInput from './HastagInput';

const { Title } = Typography

const fetchPresignedUrl = async (url: any, file: any) => {
  try {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
    const type = file.type
    const requestUrl = url + `?ext=${fileExtension}&type=${type}`
    const uploadConfig = await Http.get(requestUrl)
    const uploadFileToS3 = await axios.put(uploadConfig.data.url, file.originFileObj, {
      headers: {
        'Content-Type': type,
      },
    })

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
  const navigate = useRoleNavigate()
  const query = useQuery()
  const defaultEventId = query.get('event')

  const initialState = () => EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialState)
  const [openModal, setOpenModal] = useState(false)
  const [openModal1, setOpenModal1] = useState(false)
  const [files, setFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [isAnonymous, setAnonymous] = useState(false)
  const [specialEvent, setSpecialEvent] = useState([])
  const setFileState = async (value: never[]) => {
    setFiles(value)
  }


  const [hastags, setHastags] = useState([])
  const [currentHastag, setCurrentHastag] = useState({ name: '' })
  const [allHastag, setAllHastag] = useState([])

  const getHastagList = async () => {
    await Http.get('/api/v1/hastag')
      .then(res => {
        setAllHastag(res.data.data)
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  useEffect(() => {
    getHastagList()
  }, [openModal1])



  useEffect(() => {
    if (defaultEventId) {
      const getEventList = async () => {
        await Http.get(`/api/v1/event?id=${defaultEventId}`)
          .then(res => {
            setSpecialEvent(res.data.data)
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      }
      getEventList()
    } else {
      const getEventList = async () => {
        await Http.get('/api/v1/event/available')
          .then(res => {
            setSpecialEvent(res.data.data)
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      }
      getEventList()
    }
  }, [])
  const normFile = (e: any) => {
    // handle event file changes in upload and dragger components
    const fileList = e
    setFileState(fileList)
    return e
  }

  const onSubmitPost = async () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const postForm = {
      title: form.getFieldValue('title'),

      content: `${content}`,
      categories: categories,
      isAnonymous: isAnonymous,
      specialEvent: defaultEventId || form.getFieldValue('specialevent'),
    }
    if (form.getFieldValue('specialevent')) {
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

    await Http.post('/api/v1/idea/create', postForm)
      .then(res => {
        message.success('Upload Idea successfully!!')
        navigate('/')
      })
      .catch(error => message.error(error.message + '. Please try again'))
  }

  const windowWidth = useWindowSize()
  const paddingForm = windowWidth < 1000 ? '10px 5px' : '5% 5%'

  useEffect(() => { }, [])

  return (
    <Card
      title={
        <Space align="center" size="middle">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
          <Title style={{ fontSize: 18, margin: 0 }}> Create idea form</Title>
        </Space>
      }
      style={{ minWidth: windowWidth < 969 ? 'unset' : '80%', borderRadius: 0, marginRight: 10 }}
    >
      <Form
        form={form}
        name="idea"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        labelAlign="left"
      >
        {defaultEventId ? (
          <>
            <Title level={3} style={{ marginTop: 0 }}>
              Create idea for {specialEvent[0]?.title}
            </Title>
            <Divider />
          </>
        ) : (
          <Form.Item name="specialevent" label="Special event" style={{ marginBottom: '15px' }}>
            <Select
              style={{
                float: 'left',
                width: '40%',
              }}
              placeholder="Choose Special Event"
            >
              {specialEvent.map((event, index) => (
                <Select.Option value={event?._id} key={index}>
                  {event?.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item name="title" required label="Title">
          <Input
            style={{ lineHeight: 2.15 }}
            placeholder="Title (at least 50 characters to summary your idea)"
            maxLength={200}
            showCount
            autoComplete="off"
          ></Input>
        </Form.Item>

        <Form.Item name="content" required label="Description">
          <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
        </Form.Item>

        <DefaultUpload normFile={normFile} files={files}></DefaultUpload>
        <DraggerUpload normFile={normFile} files={files}></DraggerUpload>

        <Form.Item label="Anonymous Mode">
          <Switch onChange={() => setAnonymous(!isAnonymous)} checkedChildren="On" unCheckedChildren="Off" />
        </Form.Item>
        <Form.Item label="Tags (max: 5)">
          <Tags setCategories={setCategories} />

        </Form.Item>
        {/* <Form.Item label="Tags (max: 5)">
          <Hastags setCategories={setCategories} />

        </Form.Item> */}
        {/* <AddHastag
          isOpen={openModal}
          onCloseModal={() => setOpenModal(false)}
          setHastags={setHastags}
          hastags={hastags}
          currentHastag={currentHastag}
        /> */}
        {/* <Form.Item>
          {openModal1 ? (
            <AddHastag
              isOpen={openModal1}
              onCloseModal={() => setOpenModal1(false)}
              setHastags={setHastags}
              hastags={hastags}
              currentHastag={currentHastag}
            />
          ) : (
            <div style={{ padding: '10px 20px 10px 10px', margin: 0, marginTop: "20px" }}>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setOpenModal1(true)
                }}
              >
                Add hastag
              </Button>

            </div>
          )}

        </Form.Item> */}

        <FormItem label="HashTags (Optional)" style={{ width: '100%' }}>
          <HashtagInput />
        </FormItem>

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
          <Button type="primary" htmlType="submit" onClick={() => onSubmitPost()} style={{ marginTop: 10 }}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #f6f7f8;
`
