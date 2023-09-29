import React, { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SORT_NAMES } from '../../utils/constants'
import './sort-button.scss'

const SortButton = ({ isLoading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const detailsRef = useRef(null)

  const getParam = q => searchParams.get(q)

  const handleSortTypeClick = e => {
    searchParams.set('sortField', e.target.dataset.value)
    setSearchParams(searchParams)
    detailsRef.current.removeAttribute('open')
  }

  const handleSortOrderClick = () => {
    getParam('isDesc') === 'true'
      ? searchParams.delete('isDesc')
      : searchParams.set('isDesc', 'true')
    setSearchParams(searchParams)
  }

  // window.onload = () => {
  //   window.onclick = e => {
  //     detailsRef.current.removeAttribute('open')
  //   }
  // }

  return (
    !isLoading &&
    <div className="sort-button">
      <details ref={detailsRef}>
        <summary className="btn rounded dropdown">
          {SORT_NAMES[getParam('sortField')] || 'Сортировать'}
          <span className="material-symbols-outlined">unfold_more</span>
        </summary>
        <div className="options">
          {['rating', 'price', 'discountPercentage'].map((type, idx) => (
            <div className={getParam('sortField') === type ? 'active' : ''}
                 onClick={handleSortTypeClick}
                 data-value={type}
                 key={idx}
            >
              {SORT_NAMES[type]}
            </div>
          ))}
        </div>
      </details>
      <button className={`rounded${getParam('isDesc') === 'true' ? ' active' : ''}`}
              onClick={handleSortOrderClick}
      >
        <span className="material-symbols-outlined">north</span>
      </button>
    </div>
  )
}

export default SortButton
