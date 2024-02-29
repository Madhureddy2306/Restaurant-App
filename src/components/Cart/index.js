import Header from '../Header'
import CartContext from '../../cartContext/index'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, basicDetails, removeAllCartItems} = value

      const sendClear = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-main">
          {cartList.length >= 1 ? (
            <>
              <Header cartList={cartList} basicDetails={basicDetails} />
              <button className="remove-btn" type="button" onClick={sendClear}>
                Remove All
              </button>
              <ul className="ul-list-cart">
                {cartList.map(each => (
                  <CartItem itemInfo={each} key={each.dishId} />
                ))}
              </ul>
            </>
          ) : (
            <div className="empty-cart-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-img"
                alt=""
              />
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
