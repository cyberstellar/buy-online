import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useGetAllProductsQuery, useGetProductQuery } from '../../services/dummy-api'
import Slider from '../../components/slider'
import { CATEGORIES } from '../../utils/constants'
import AddToCartButton from '../../components/buttons/add-to-cart-button'
import AddToWishlistButton from '../../components/buttons/add-to-wishlist-button'
import './product-page.scss'
import ProductList from '../../components/product-list'

const ProductPage = () => {
  const { id } = useParams()
  const {
    data: { title, description, price, rating, basePrice, brand, category, images } = {},
    isError
  } = useGetProductQuery(id)

  const { data = [], isLoading } = useGetAllProductsQuery({ selectedCategory: category, limit: 5 }, { skip: !category })
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (data.length) {
      setProducts(data.filter(x => x.id !== +id))
    }
  }, [data, id])

  if (isError)
    return <Navigate to="404" />

  return (
    !isLoading &&
    <div className="product">

      <div className="breadcrumbs">
        <Link to={`/`}>Главная</Link> —
        <Link to={`/category/${category}`}>{CATEGORIES[category]}</Link> —
        <Link to={`/category/${category}?selectedBrands=${brand}`}>{brand}</Link>
      </div>

      <div className="product__inner">
        <Slider images={images} />

        <div className="product__info">
          <h1>{title}</h1>
          <div>★ {rating}</div>
          <div>{description}</div>
        </div>

        <div className="product__buttons">
          <div className="price">
            <span className="price-label">${price}</span>
            <span className="base-price-label">{basePrice}</span>
          </div>
          <AddToCartButton id={+id} />
          <AddToWishlistButton id={+id} />
        </div>
      </div>

      <h2>Похожие товары</h2>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default ProductPage
