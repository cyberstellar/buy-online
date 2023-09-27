import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from '../buttons/add-to-cart-button'
import AddToWishlistButton from '../buttons/add-to-wishlist-button'
import './product-card.scss'

const ProductCard = ({ item }) => {
  const { id, title, basePrice, price, rating, images, discountPercentage } = item
  const [currentImage, setCurrentImage] = useState(0)
  const imageRef = useRef(null)

  const handleMouseEnter = event => {
    const rect = imageRef.current.getBoundingClientRect()
    const regions = []

    images.forEach((_, idx) => {
      regions.push({
        min: idx * rect.width / images.length - 1,
        max: (idx + 1) * rect.width / images.length
      })
    })

    imageRef.current.onmousemove = e => {
      const relativeCursorPositionX = e.clientX - rect.left

      regions.forEach((region, idx) => {
        if (relativeCursorPositionX > region.min && relativeCursorPositionX < region.max) {
          setCurrentImage(idx)
        }
      })
    }

    imageRef.current.onmouseleave = _ => {
      imageRef.current.onmousemove = null
      setCurrentImage(0)
    }
  }

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-card__thumbnail">
        <div className="slides"
             onMouseEnter={handleMouseEnter}
             ref={imageRef}
        >
          <img src={images[currentImage]} alt="" draggable="false" />
        </div>
        <span className="dots" style={images.length < 2 ? { visibility: 'hidden' } : {}}>
          {images.map((_, idx) => <span className={idx === currentImage ? 'active' : ''} key={idx}>●</span>)}
        </span>
      </Link>
      <div className="product-card__info">
        <div className="rating">★ ︎{rating}</div>
        <Link to={`/products/${id}`} className="title" href="#">{title}</Link>
        <div className="price">
          <span className="price-label">${price}</span>
          {discountPercentage > 0 && <>
            <span className="base-price-label">{basePrice}</span>
            <span className="discount-label">-{Math.round(discountPercentage)}%</span>
          </>}
        </div>
      </div>
      <div className="product-card__buttons">
        <AddToCartButton id={id} />
        <AddToWishlistButton id={id} />
      </div>
    </div>
  )
}

export default ProductCard
