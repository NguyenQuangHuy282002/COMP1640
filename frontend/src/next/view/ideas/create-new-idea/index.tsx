import { useState } from "react";
import { Form, Layout, Select, Input, Upload, Button } from "antd";
import { SolutionOutlined, PictureOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import RichTextArea from "./rich-text-area";

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function CreateIdea() {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const onSubmitPost = async () => {
    const postForm = {
      title: form.getFieldValue('title'),
      department: form.getFieldValue('department'),
      content: content,
      
    }
  }
  return (
    <Form form={form} name="idea" style={{ padding: '5%'}} >
      <Form.Item name="department">
        <Select
          style={{
            float: "left",
            width: "40%"
          }}
          placeholder="Choose department"
        >
          <Select.Option value="ok">Oke</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="title" required>
        <Input
          style={{ lineHeight: 2.15 }}
          placeholder="Title"
          maxLength={200}
          showCount
          
        ></Input>
      </Form.Item>
      <Form.Item name="content" required>
        <RichTextArea setContent={setContent}/>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="long"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 15 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="ghost" htmlType="button">
          Cancel
        </Button>
      </Form.Item>

    </Form>
  );
}
