import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, addToFavorites } from '../../services/dummy-api/cartSlice'
import AddToCartButton from '../buttons/add-to-cart-button'
import Button from '../buttons/button'
import './list-item.scss'

const ListItem = ({ item, type = 'wishlist' }) => {
  const dispatch = useDispatch()
  const { id, title, basePrice, price, thumbnail, quantity } = item
  const favs = useSelector(state => state.cart.favorites)

  return (
    <div className="list-item">
      <Link to={`/products/${id}`} className="list-item__image">
        <img src={thumbnail} alt="" />
      </Link>
      <div className="list-item__title">
        <Link to={`/products/${id}`}>{title}</Link>
      </div>
      <div className="list-item__price">
        <div className="price">
          <span className="price-label">${price}</span>
          <span className="base-price-label">{basePrice}</span>
        </div>
        {type === 'wishlist' && <>
          <AddToCartButton id={id} />
          <div className="buttons">
            <Button className="list-item__button"
                    onClick={() => dispatch(addToFavorites({ id }))}
                    text="Удалить"
            />
          </div>
        </>}
      </div>
      {type === 'cart' && <>
        <div className="list-item__quantity">
          <div>
            <Button className="rounded square"
                    iconName="add"
                    onClick={() => dispatch(addToCart({ id }))}
            />
            <span>{quantity}</span>
            <Button className="rounded square"
                    iconName="remove"
                    onClick={() => dispatch(addToCart({ id, quantity: -1 }))}
            />
          </div>
        </div>
        <div className="list-item__price">
          <div className="price">
            <span className="price-label">${price * quantity}</span>
          </div>
          {type === 'cart' &&
            <div className="buttons">
              <Button className="list-item__button"
                      onClick={() => dispatch(addToFavorites({ id }))}
                      text="В избранное"
                      isActive={favs.includes(id)}
              />
              <Button className="list-item__button"
                      onClick={() => dispatch(addToCart({ id, quantity: -quantity }))}
                      text="Удалить"
              />
            </div>}
        </div>
      </>}
    </div>
  )
}

export default ListItem
