import React from 'react'
import ProductCard from '../product-card'
import './product-list.scss'

const ProductList = ({ products = [], isLoading = false }) => {

  return (
    isLoading
      ?
      'Загрузка...'
      :
      <div className="product-list">
        {products.map(product => <ProductCard item={product} key={product.id} />)}
      </div>
  )
}

export default ProductList
