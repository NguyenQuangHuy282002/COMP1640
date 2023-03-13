import {
  FileExcelOutlined,
  FileFilled,
  FileImageFilled,
  FileImageOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Card, Carousel, List } from 'antd'

const handleFile = file => {
  console.log('file', file)
  const ext = file.toString().substring(file.toString().lastIndexOf('.') + 1)
  switch (ext) {
    case 'pdf':
      return <FileCard title="PDF file" item={file} chilren={<FilePdfOutlined />}></FileCard>
    case 'jpeg':
    case 'png':
    case 'jpg':
    case 'tiff':
    case 'gif':
    case 'svg':
    case 'webp':
    case 'webg':
      return <FileCard title="Image file" item={file} chilren={<FileImageFilled />}></FileCard>
    case 'doc':
    case 'docx':
    case 'txt':
      return <FileCard title="Text/word file" item={file} chilren={<FileWordOutlined />}></FileCard>
    case 'zip':
    case 'rar':
      return <FileCard title="Zip file" item={file} chilren={<FileZipOutlined />}></FileCard>
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FileCard title="Excel file" item={file} chilren={<FileExcelOutlined />}></FileCard>
    case 'ppt':
    case 'pptx':
      return <FileCard title="Powerpoint file" item={file} chilren={<FilePptOutlined />}></FileCard>
    default:
      return <FileCard title="Other file" item={file} chilren={<FileFilled />}></FileCard>
  }
}

const FileCard = ({ title, item, chilren }) => (
  <Card
    title={title}
    style={{
      border: '1px solid #ccc',
      textAlign: 'center',
      // justifyContent: 'center',
      // display: 'flex',
      // alignItems: 'center',
      // flexDirection: 'column',
      marginTop: '10px',
    }}
    
    bodyStyle={{
      padding: '8px'
    }}
    headStyle={{
      padding: 0,
      margin: 0
    }}
  >
    <a style={{ fontSize: '48px', margin: 0 }} href={item}>
      {chilren}
    </a>
  </Card>
)

export default function FileDisplay(files: any) {
  console.log(files)
  return (
    <List
      bordered
      header={
        <>
          <PaperClipOutlined /> Attachment
        </>
      }
      style={{
        borderRadius: '5px',
        margin: '10px 20px',
      }}
      grid={{
        gutter: 16, column: 4,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={files.files}
      renderItem={(item: any) => <List.Item>{handleFile(item)}</List.Item>}
    />
  )
}
