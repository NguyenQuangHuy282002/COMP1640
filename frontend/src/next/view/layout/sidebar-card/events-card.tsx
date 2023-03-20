import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [

  getItem('Special Event', 'menu', <AppstoreOutlined />, [
    getItem('Event 1', '1'),
    getItem('Event 2', '2'),
    getItem('Event 3', '3'),
    getItem('More Event', 'sub-menu', null, [getItem('Event 4', '4'), getItem('Event 5', '5')]),
  ]),




];

const EventCard: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['']}
      defaultOpenKeys={['menu']}
      mode="inline"
      items={items}
    />
  );
};

export default EventCard;