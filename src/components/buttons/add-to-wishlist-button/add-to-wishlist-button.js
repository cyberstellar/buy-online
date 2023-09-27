import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites } from '../../../services/dummy-api/cartSlice'
import Button from '../button'
import './add-to-wishlist-button.scss'

const AddToWishlistButton = ({ id }) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.cart.favorites)

  return (
    <Button className="rounded square wishlist-button"
            onClick={() => dispatch(addToFavorites({ id }))}
            iconName="favorite"
            isActive={favorites.includes(id)}
    />
  )
}

export default AddToWishlistButton
