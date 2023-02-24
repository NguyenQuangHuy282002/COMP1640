import { Input } from 'antd'

const { Search } = Input

function SearchField({ searchKey, setSearchKey, placeholder }) {
  return (
    <Search
      placeholder={placeholder}
      allowClear
      onSearch={() => {}}
      style={{ width: '40%', marginBottom: 16 }}
      value={searchKey}
      onChange={e => setSearchKey(e.target.value)}
    />
  )
}

export default SearchField
