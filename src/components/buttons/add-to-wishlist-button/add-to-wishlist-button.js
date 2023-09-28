import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToFavorites } from '../../../services/dummy-api/cartSlice'
import { store } from '../../../services/dummy-api'
import Button from '../button'
import './add-to-wishlist-button.scss'

const AddToWishlistButton = ({ id }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    store.getState().cart.favorites.includes(id)
    && setIsActive(true)
  }, [])

  const handleClick = () => {
    dispatch(addToFavorites({ id }))
    setIsActive(!isActive)
  }

  return (
    <Button className="rounded square wishlist-button"
            onClick={handleClick}
            iconName="favorite"
            isActive={isActive}
    />
  )
}

export default AddToWishlistButton
