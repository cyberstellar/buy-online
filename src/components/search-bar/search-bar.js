import React, { useEffect, useRef, useState } from 'react'
import './search-bar.scss'
import { Link } from 'react-router-dom'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const debouncedValue = useDebounce(searchTerm, 500)

  const searchBarRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!searchTerm) return

    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        const data = await response.json()
        console.log(data.products)
        setSearchResults(data.products)
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
      }
    }

    fetchData()
  }, [debouncedValue])

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false)
    return () => document.removeEventListener('mousedown', () => {
    }, false)
  }, [])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    if (!visible) {
      setVisible(true)
    }
  }

  const handleClick = (e) => {
    if (searchBarRef.current.contains(e.target)) {
      return
    }
    setVisible(false)
  }


  return (
    <div className={'search-bar'} ref={searchBarRef}>
      <div className={'search-bar__input'}>
        <input value={searchTerm} placeholder={'Поиск...'}
               onChange={handleInputChange}
               onFocus={() => setVisible(true)}
        />
        {searchTerm &&
          <span className="material-symbols-outlined"
                onClick={() => {
                  setSearchTerm('')
                  setVisible(false)
                }}
          >close</span>}
      </div>
      {visible && searchResults.length > 0 &&
        <div className="search-bar__results">
          {searchResults.map(({ id, title, price }) => (
            <Link to={`/products/${id}`}
                  key={id}
                  onClick={() => setVisible(false)}
            >
              <i>{title}</i><i>${price}</i>
            </Link>))}
        </div>}
    </div>
  )
}

export default SearchBar
