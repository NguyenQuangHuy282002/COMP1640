import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd'
import type { SelectProps } from 'antd/es/select'
import useWindowSize from '../../utils/useWindowSize'

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

function AutoSearch({ suggest }) {
  const [options, setOptions] = useState<SelectProps<object>['options']>([])
  const windowWidth = useWindowSize()
  const search =
    windowWidth > 1000
      ? {
          width: 279,
          marginR: 369,
        }
      : {
          width: 169,
          marginR: 0,
        }

  const searchResult = (query: string) =>
    // [...suggest.users, ...suggest.categories, ...suggest.ideas]
    {

      const searchResults = suggest.filter(s => s['title'].match(`/^${query}$/i`) !== '')
      return searchResults.map((sug, idx) => {
        const data = `${sug['title']}`
        const check = data.indexOf(query)
        return {
          value: suggest['_id'],
          label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                key={suggest['_id']}
              >
                <span>
                  {' '}
                  <a href={`https://s.taobao.com/search?q=${query}`} target="_blank" rel="noopener noreferrer">
                    {data.slice(0, check + 10)}...
                  </a>
                </span>
                <span>{getRandomInt(5, 1)} results </span>
              </div>
            ),
        }
      })
    }

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : [])
  }

  const onSelect = (value: string) => {
    console.log('onSelect', value)
  }

  return (
    <AutoComplete
      dropdownMatchSelectWidth={278}
      style={{ width: search.width, height: 40, marginRight: search.marginR, marginTop: '10px' }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="middle" placeholder="Search here" allowClear />
    </AutoComplete>
  )
}

export default AutoSearch
