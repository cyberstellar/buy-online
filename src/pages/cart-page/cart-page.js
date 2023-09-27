import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../../services/dummy-api'
import ListItem from '../../components/list-item'
import './cart-page.scss'

const CartPage = () => {
  const order = useSelector(state => state.cart.products)
  const { data = [] } = useGetAllProductsQuery()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (data.length > 0) {
      setProducts(order.map(order => ({ ...order, ...data.find(x => x.id === order.id) })))
    }
  }, [data, order])

  return (
    <div>
      <h1>Корзина</h1>
      <div className="list-container">
        {!products.length && 'Ваша корзина пуста'}
        {products.map((product, idx) => {
          return <ListItem item={product} type="cart" key={idx} />
        })}
        {!!products.length &&
          <div className="checkout">
            <div className="total">
              <span>Итого: </span>
              <span>
              ${products.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)}
            </span>
            </div>
            <button style={{ cursor: 'not-allowed' }} disabled>Перейти к оформлению</button>
          </div>}
      </div>
    </div>
  )
}

export default CartPage
