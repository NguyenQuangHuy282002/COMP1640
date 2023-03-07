import useWindowSize from "../../../utils/useWindowSize";
import { CommentOutlined, DownloadOutlined, SaveOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function MenuBar({commentCount}) {
  const windowWidth = useWindowSize()

  return (
    <>
      {windowWidth > 969 ? <Space style={{ justifyContent: 'start', display: 'flex', padding: '20px', marginLeft: '24px' }}>
      <Button icon={<CommentOutlined />} href="">
        {commentCount}k Comments
      </Button>
      <Button icon={<SaveOutlined />} href="">
        Save
      </Button>
      <Button icon={<DownloadOutlined />} href="">
        DownLoad
      </Button>
      <Button icon={<ShareAltOutlined />} href="">
        Share
      </Button>
    </Space> : <Space style={{ justifyContent: 'space-evenly', display: 'flex', marginLeft: '5px' }}>
      <Button icon={<CommentOutlined />} href="">
        {commentCount}k
      </Button>
      <Button icon={<SaveOutlined />} href=""/>
      <Button icon={<DownloadOutlined />} href=""/>
      <Button icon={<ShareAltOutlined />} href=""/>
    </Space>}
    </>
  )
}
