import useWindowSize from "../../../utils/useWindowSize";
import { CommentOutlined, DownloadOutlined, SaveOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function MenuBar({commentCount, handleShowComment}) {
  const windowWidth = useWindowSize()

  return (
    <>
      {windowWidth > 969 ? <Space style={{ justifyContent: 'start', display: 'flex', padding: '20px', marginLeft: '24px' }}>
      <Button icon={<CommentOutlined />} onClick={()=>handleShowComment()} style={{cursor: 'pointer'}}>
        {commentCount} Comments
      </Button>
      <Button icon={<SaveOutlined />} >
        Save
      </Button>
      <Button icon={<DownloadOutlined />} >
        DownLoad
      </Button>
      <Button icon={<ShareAltOutlined />} >
        Share
      </Button>
    </Space> : <Space style={{ justifyContent: 'space-evenly', display: 'flex', marginLeft: '5px' }}>
      <Button icon={<CommentOutlined />} onTouchEnd={()=>handleShowComment()} style={{cursor: 'pointer'}}>
        {commentCount}k
      </Button>
      <Button icon={<SaveOutlined />} />
      <Button icon={<DownloadOutlined />} />
      <Button icon={<ShareAltOutlined />} />
    </Space>}
    </>
  )
}
