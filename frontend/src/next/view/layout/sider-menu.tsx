import { Layout, Menu } from 'antd'
import useRoleNavigate from 'next/libs/use-role-navigate'
import { useState } from 'react'

export default function SiderMenu({ menuItems }) {
  const navigate = useRoleNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [tabKey, setTabKey] = useState(['home'])

  const handleClickMenu = async (val: any) => {
    setTabKey([val.key])
    switch (val.key) {
      case 'home':
        navigate('/')
        break
      default:
        navigate(`/${val.key}`)
    }
  }
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} width={280}>
      <Menu onClick={handleClickMenu} defaultSelectedKeys={tabKey} mode="inline" theme="dark" items={menuItems} />
    </Layout.Sider>
  )
}
