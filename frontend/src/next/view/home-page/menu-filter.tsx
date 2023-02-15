import React from 'react'
import { CrownFilled, DingtalkCircleFilled, FireFilled, RocketFilled, SlidersFilled } from '@ant-design/icons'
import { Col, MenuProps, Radio, Dropdown, Button, Space, Typography } from 'antd'
import styled from 'styled-components'
import useWindowSize from '../../utils/useWindowSize'

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

const { Text } = Typography

function MenuFilter({ setFilter, filter }) {
  const windowWidth = useWindowSize()
  const display = windowWidth < 1000 ? 'block' : 'flex'
  const onClickFilter = (val: any) => {
    console.log('click ', val)
    setFilter(val)
  }
  const topItems: MenuProps['items'] = [
    {
      key: 'week',
      label: (
        <Text style={{ fontSize: 15, margin: 0 }} onClick={() => onClickFilter('week')}>
          Week
        </Text>
      ),
    },
    {
      key: 'month',
      label: (
        <Text style={{ fontSize: 15, margin: 0 }} onClick={() => onClickFilter('month')}>
          Mongth
        </Text>
      ),
    },
  ]
  const moreItems: MenuProps['items'] = [
    {
      key: 'your-department',
      label: (
        <Text style={{ fontSize: 15, margin: 0 }} onClick={() => onClickFilter('your-department')}>
          Your Department
        </Text>
      ),
    },
    {
      key: 'your-ideas',
      label: (
        <Text style={{ fontSize: 15, margin: 0 }} onClick={() => onClickFilter('your-ideas')}>
          Your Ideas
        </Text>
      ),
    },
  ]
  return (
    <>
      <Col>
        <p style={{ fontSize: '19px', fontWeight: '400', marginBottom: '3px 0' }}>11,699,432 Ideas</p>
      </Col>
      <Col style={{ width: '100%', justifyContent: 'end', fontSize: '15px', display: display }}>
        <Radio.Group defaultValue={filter} buttonStyle="solid" style={{}} onChange={e => onClickFilter(e.target.value)}>
          <StyledRadioButton value="new">
            <DingtalkCircleFilled /> Newest
          </StyledRadioButton>
          <StyledRadioButton value="hot">
            <FireFilled /> Hot
          </StyledRadioButton>
          <StyledRadioButton value="best">
            <RocketFilled /> Best
          </StyledRadioButton>
        </Radio.Group>
        <Space wrap>
          <Dropdown menu={{ items: topItems }} placement="bottom" arrow trigger={['click']}>
            <Button>
              <CrownFilled /> Top
            </Button>
          </Dropdown>
          <Dropdown menu={{ items: moreItems }} placement="bottom" arrow trigger={['click']}>
            <Button>
              <SlidersFilled />
            </Button>
          </Dropdown>
        </Space>
      </Col>
    </>
  )
}

const StyledRadioButton = styled(Radio.Button)`
  :visited {
    background-color: #ccc;
  };
`

export default MenuFilter
