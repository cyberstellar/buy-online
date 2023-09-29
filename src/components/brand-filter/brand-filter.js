import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../buttons/button'
import './brand-filter.scss'

const BrandFilter = ({ brands = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const filterRef = useRef(null)

  const [selectedBrands, setSelectedBrands] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get('selectedBrands')
      setSelectedBrands(param ? param.split(',') : [])
    }
  }, [searchParams])

  useEffect(() => {
    if (brands.length > 0) {
      setMaxHeight(filterRef.current.scrollHeight)
    }
  }, [brands, selectedBrands])

  const handleBrandClick = item => {
    const tmp = new Set([...selectedBrands])
    tmp.has(item) ? tmp.delete(item) : tmp.add(item)

    tmp.size > 0
      ? searchParams.set('selectedBrands', Array.from(tmp).join(','))
      : searchParams.delete('selectedBrands')
    setSearchParams(searchParams)
  }

  const handleClearClick = () => {
    searchParams.delete('selectedBrands')
    setSearchParams(searchParams)
  }

  return (
    <div className={`brand-filter${isExpanded ? ' active' : ''}`} ref={filterRef}>
      {brands.length > 0 && <>
        {brands.map((brand, idx) => (
          <Button className="rounded"
                  isActive={selectedBrands.includes(brand)}
                  onClick={() => handleBrandClick(brand)}
                  text={brand}
                  key={idx}
          />
        ))}
        {selectedBrands.length > 0 &&
          <Button className="rounded"
                  isActive={true}
                  onClick={handleClearClick}
                  text="Очистить"
          />}
        {maxHeight > 75 &&
          <Button className="link show-more"
                  isActive={isExpanded}
                  onClick={() => setIsExpanded(!isExpanded)}
                  text={isExpanded ? 'Скрыть' : 'Ещё'}
          />}
      </>}
    </div>
  )
}

export default BrandFilter
