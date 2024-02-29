import CartContext from '../../cartContext/index'
import './index.css'

const CartItem = props => {
  const {itemInfo} = props
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishImage,
    quantity,
    dishId,
  } = itemInfo

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const sendPlus = () => {
          incrementCartItemQuantity(dishId)
        }

        const sendMinus = () => {
          decrementCartItemQuantity(itemInfo)
        }

        const removeItem = () => {
          removeCartItem(dishId)
        }

        return (
          <li className="list-item">
            <h1 className="h1">{dishName}</h1>
            <img src={dishImage} alt="dishImage" className="dish-img-cart" />
            <p className="p">
              {dishCurrency}
              {dishPrice}
            </p>
            <p className="p">{quantity}</p>
            <button type="button" className="q-btn" onClick={sendPlus}>
              +
            </button>
            <button type="button" className="q-btn" onClick={sendMinus}>
              -
            </button>
            <button type="button" className="remove" onClick={removeItem}>
              X
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
