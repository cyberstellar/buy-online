import React from 'react'
import { useParams } from 'react-router-dom'
import SplitView from '../../components/split-view'
import CategoryList from '../../components/category-list'
import { useGetAllProductsQuery, useGetCategoriesQuery } from '../../services/dummy-api'
import ProductComponent from '../../components/product-component'
import { CATEGORIES } from '../../utils/constants'

const HomePage = () => {
  const { category } = useParams()

  return (
    // TODO: пересмотреть макет сетки. Попробовать сделать на Grid
    <SplitView
      left={<CategoryList getData={useGetCategoriesQuery} />}
      right={<ProductComponent title={CATEGORIES[category] || 'Все товары'} getData={useGetAllProductsQuery} />} />
  )
}

export default HomePage
