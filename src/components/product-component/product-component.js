import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useGetBrandsQuery } from '../../services/dummy-api'

import SectionTitle from '../section-title'
import BrandFilter from '../brand-filter'
import ProductList from '../product-list'
import SortButton from '../sort-button'

import './product-component.scss'

const ProductComponent = ({ title, getData }) => {
  const { category: selectedCategory } = useParams()
  const { data: brands = [] } = useGetBrandsQuery(selectedCategory)

  const [selectedBrands, setSelectedBrands] = useState([])
  const [searchParams] = useSearchParams()

  const { data: products = [], isLoading } = getData({
    selectedBrands,
    selectedCategory,
    isDesc: searchParams.get('isDesc'),
    sortField: searchParams.get('sortField')
  })

  useEffect(() => {
    if (searchParams) {
      const query = searchParams.get('selectedBrands')
      setSelectedBrands(query ? query.split(',') : [])
    }
  }, [searchParams])

  return (
    <div className="product-list-container">
      <SectionTitle title={title} subtitle={products.length > 0 ? products.length : null} />
      <BrandFilter brands={brands} />
      <SortButton />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default ProductComponent
