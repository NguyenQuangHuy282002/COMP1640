import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Layout, MenuProps } from 'antd'
import React from 'react'
import styled from 'styled-components'
import useWindowSize from '../../../utils/useWindowSize'
import DepartmentCard from '../sidebar-card/department-card'
import EventCard from '../sidebar-card/events-card'

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
  getItem('Department', 'department', <AppstoreOutlined />, [
    getItem('Department 1', '1'),
    getItem('Department 2', '2'),
    getItem('Department 3', '3'),
  ]),
  getItem('Special Event', 'event', <AppstoreOutlined />, [
    getItem('Event 1', '1'),
    getItem('Event 2', '2'),
    getItem('Event 3', '3'),
    getItem('More Event', 'sub-menu', null, [getItem('Event 4', '4'), getItem('Event 5', '5')]),
  ]),
]

const RightSideBar: React.FC = () => {
  const windowSize = useWindowSize()

  return (
    <>
      {windowSize < 1000 ? (
        <Dropdown menu={{ items: items }} trigger={['click']} overlayStyle={{ width: 150 }} placement="bottomRight">
          <Button
            icon={<MenuOutlined style={{}} />}
            type="primary"
            style={{
              position: 'sticky',
              zIndex: 3,
              alignSelf: 'end',
              top: '10px',
              border: '1px solid #ccc',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
              marginTop: '-33px',
            }}
          />
        </Dropdown>
      ) : (
        <Layout.Sider
          width={278}
          style={{ background: 'transparent', boxSizing: 'border-box', paddingRight: '16px', marginTop: 15 }}
        >
          <EventCard />
          <DepartmentCard />
        </Layout.Sider>
      )}
    </>
  )
}

const StyledCard = styled(Card)`
  margin-top: 10px;
  box-shadow: 5px 5px 5px 5px #888888;
`

export default RightSideBar
