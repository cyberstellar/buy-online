import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../services/dummy-api/cartSlice'
import { store } from '../../../services/dummy-api'
import Button from '../button'
import './add-to-cart-button.scss'

const AddToCartButton = ({ id }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    store.getState().cart.products.find(x => x.id === id)
    && setIsActive(true)
  }, [])

  const handleClick = () => {
    if (isActive) {
      navigate('/cart')
    } else {
      dispatch(addToCart({ id }))
      setIsActive(true)
    }
  }

  return (
    <Button className="cart-button"
            onClick={handleClick}
            iconName="shopping_cart"
            text={isActive ? 'В корзине' : 'В корзину'}
            isActive={isActive}
    />
  )
}

export default AddToCartButton
