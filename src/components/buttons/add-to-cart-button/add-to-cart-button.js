import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../services/dummy-api/cartSlice'
import Button from '../button'
import './add-to-cart-button.scss'

const AddToCartButton = ({ id, quantity = 1 }) => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.cart.products)
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    order.find(x => x.id === id)
      ? setIsActive(true)
      : setIsActive(false)
  }, [id, order])

  return (
    <Button className="cart-button"
            onClick={() => isActive ? navigate('/cart') : dispatch(addToCart({ id }))}
            iconName="shopping_cart"
            text={isActive ? 'В корзине' : 'В корзину'}
            isActive={isActive}
    />
  )
}

export default AddToCartButton
