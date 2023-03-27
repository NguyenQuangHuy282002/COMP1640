import { AutoComplete, Input, message } from 'antd'
import type { SelectProps } from 'antd/es/select'
import { Http } from 'next/api/http'
import { ideaCount } from 'next/view/layout/header'
import { useEffect, useState } from 'react'

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

function AutoSearch() {
  const [suggest, setSuggest] = useState([])
  const [options, setOptions] = useState<SelectProps<object>['options']>([])

  useEffect(() => {
    const getSuggestions = async () =>
      await Http.get('/api/v1/idea/suggest')
        .then(res => {
          setSuggest(res.data.data)
          ideaCount.updateState({ number: res.data.count })
        })
        .catch(error => message.error('Failed to get suggestions!'))
    getSuggestions()
  }, [])

  const searchResult = (query: string) => {
    const searchResults = suggest.filter(
      s => s?.title?.replaceAll(' ', '').toLowerCase().includes(query.replaceAll(' ', '').toLowerCase()) !== -1
    )

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
      style={{ width: '60%', height: 40, marginTop: '10px' }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="middle" placeholder="Search here" allowClear />
    </AutoComplete>
  )
}

export default AutoSearch
