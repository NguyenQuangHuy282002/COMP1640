import React, { useEffect, useState } from 'react'
import { message, Switch, Transfer, Typography } from 'antd'
import type { TransferDirection } from 'antd/es/transfer'
import { Http } from '../../../api/http'

interface RecordType {
  key: string
  title: string
  description: string
  chosen: boolean
}

function Tags({ setCategories }) {
  const [mockData, setMockData] = useState<RecordType[]>([])
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const [categoryList, setCategoryList] = useState([])
  const [onOpen, SetOnOpen] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const getMock = () => {
    const tempMockData = []
    categoryList.forEach(category => {
      const data = {
        key: category?._id.toString(),
        title: `${category?.name}`,
        description: `${category?.name}`,
      }
      tempMockData.push(data)
    })
    setMockData(tempMockData)
  }
  useEffect(() => {
    if (onOpen) {
      const getAllCate = async () => {
        await Http.get('/api/v1/category/')
          .then(res => {
            setCategoryList(res.data.data)
          })
          .catch(err => message.error(`Failed to get categories`))
      }
      getAllCate();
      console.log('cateList:', categoryList)
      getMock()
    }
  }, [!onOpen])

  const filterOption = (inputValue: string, option: RecordType) => option.description.indexOf(inputValue) > -1

  const handleChange = (selectedKeys: string[]) => {
    setTargetKeys(selectedKeys)
  }

  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('search:', dir, value)
  }

  const handleConfirm = (checked: boolean) => {
    setDisabled(checked);
    setCategories(targetKeys)
    // console.log(targetKeys)
  };

  return (
    <>
      <Transfer
        titles={['Avai', 'Yours']}
        locale={{
          itemUnit: 'Tags',
          itemsUnit: 'Tags',
          notFoundContent: 'The list is empty',
          searchPlaceholder: 'Search Tags here',
        }}
        dataSource={mockData}
        showSearch
        disabled={disabled}
        filterOption={filterOption}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSearch={handleSearch}
        render={item => item.title}
      />
      <br/>
      <Switch unCheckedChildren="Not Yet" checkedChildren="Confirm Tags" checked={disabled} onChange={handleConfirm} />
    </>
  )
}

export default Tags
