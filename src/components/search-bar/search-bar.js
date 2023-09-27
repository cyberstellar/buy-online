import React, { useState } from 'react'
import './search-bar.scss'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={'search-bar'}>
      <div className={'search-bar__input'}>
        <input value={searchValue} placeholder={'Поиск...'} onChange={e => setSearchValue(e.target.value)} />
        <span className="material-symbols-outlined">search</span>
      </div>
      {searchValue &&
        <div className="search-bar__results">
          Результаты
        </div>}
    </div>
  )
}

export default SearchBar
