import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../cartContext/index'
import './index.css'

const Header = props => {
  const {history} = props

  const logoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, basicDetails} = value

        return (
          <nav className="header">
            <Link to="/" className="link-header">
              <h1 className="main-heading">{basicDetails.restaurantName}</h1>
            </Link>
            <div className="cart-div">
              <p className="orders">My Orders</p>
              <Link to="/cart" className="link-cart">
                <button
                  type="button"
                  data-testid="cart"
                  className="cart-icon-btn"
                >
                  <AiOutlineShoppingCart className="cart-icon" />
                </button>
              </Link>
              <p className="cart-count">{cartList.length}</p>
            </div>
            <button type="button" className="logout-btn" onClick={logoutBtn}>
              Logout
            </button>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
