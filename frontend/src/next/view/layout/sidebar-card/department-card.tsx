import React, { useEffect, useState } from 'react'
import { UsergroupAddOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Department', 'menu', <UsergroupAddOutlined />, [
    getItem('Department 1', '1'),
    getItem('Department 2', '2'),
    getItem('Department 3', '3'),
  ]),
]

const DepartmentCard: React.FC = () => {
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, marginTop: '10px', color: 'blue' }}
      defaultSelectedKeys={['']}
      defaultOpenKeys={['']}
      mode="inline"
      items={items}
    >
      {/* {windowWidth < 1000 ? <AppstoreOutlined /> : null} */}
    </Menu>
  )
}

export default DepartmentCard
