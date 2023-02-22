import { Input, Space } from 'antd'
import React from 'react'

const { Search } = Input

function SearchField({ searchKey, setSearchKey }) {
  return (
    <Search
      placeholder="Seach accounts by name"
      allowClear
      onSearch={() => {}}
      style={{ width: '40%', marginBottom: 16 }}
      value={searchKey}
      onChange={e => setSearchKey(e.target.value)}
    />
  )
}

export default SearchField
