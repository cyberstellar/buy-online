import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../buttons/button'
import './header.scss'
import SearchBar from '../search-bar'

const Header = () => {
  const favorites = useSelector(state => state.cart.favorites)
  const orders = useSelector(state => state.cart.products)
  const navigate = useNavigate()

  return (
    <>
      <header className="header">
        <div className="container">

          <div>
            <NavLink to="/" className="header__logo">
              buy<b>Online</b>
            </NavLink>

            {window.location.pathname !== '/' &&
              <Button className="link" iconName="arrow_back" text="Назад" onClick={() => navigate(-1)} />
            }
          </div>

          <SearchBar />

          <div className="header__buttons">
            <NavLink to="/favorites" className="btn vertical-icon">
              <span className="material-symbols-outlined">
                favorite
                {favorites.length > 0 && <span className="bubble-amount">{favorites.length}</span>}
              </span>
              Избранное
            </NavLink>
            <NavLink to="/cart" className="btn vertical-icon">
              <span className="material-symbols-outlined">
                shopping_cart
                {orders.length > 0 && <span className="bubble-amount">{orders.length}</span>}
              </span>
              Корзина
            </NavLink>
          </div>
        </div>
      </header>

      <div />
    </>
  )
}

export default Header
