import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import useWindowSize from 'next/utils/useWindowSize'
import SiderMenu from './sider-menu'

function AppSidebar({ items }) {
  const windowWidth = useWindowSize()

  return (
    <>
      {windowWidth > 1000 ? (
        <SiderMenu menuItems={items} />
      ) : (
        <Dropdown menu={{ items: items }} trigger={['click']} overlayStyle={{ width: 200 }} placement="bottom">
          <Button
            icon={<MenuOutlined style={{}} />}
            type="primary"
            style={{
              position: 'sticky',
              zIndex: 3,
              alignSelf: 'start',
              top: '10px',
              border: '1px solid #ccc',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
              marginTop: '10px',
            }}
          />
        </Dropdown>
      )}
    </>
  )
}

export default AppSidebar
