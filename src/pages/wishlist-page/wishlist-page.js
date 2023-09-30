import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../../services/dummy-api'
import ListItem from '../../components/list-item'
import './wishlist-page.scss'

const WishlistPage = () => {
  const favs = useSelector(state => state.cart.favorites)
  const { data = [] } = useGetAllProductsQuery()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (data.length > 0) {
      setFavorites(data.filter(product => favs.includes(product.id)))
    }
  }, [data, favs])

  return (
    <div>
      <h1>Избранное</h1>
      <div className="list-container">
        {!favs.length && 'Ваш список избранного пуст'}
        {favorites.map(product => <ListItem item={product} key={product.id} />)}
      </div>
    </div>
  )
}

export default WishlistPage
