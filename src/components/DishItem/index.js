import CartContext from '../../cartContext/index'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props
  const {
    dishName,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishAvailability,
    dishPrice,
    addOnCat,
    nextUrl,
    dishId,
    quantity,
  } = dishDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const plusCount = () => {
          incrementCartItemQuantity(dishId)
        }

        const minusCount = () => {
          decrementCartItemQuantity(dishDetails)
        }

        const sendToCart = () => {
          addCartItem(dishDetails)
        }

        return (
          <>
            <div className="dish-vegan">
              <img src={nextUrl} alt="veganOrNot" className="vegan-icon" />
            </div>
            <div className="remaining-div">
              <div className="first-div">
                <h1 className="dish-heading">{dishName}</h1>
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-price">{dishDescription}</p>
                {dishAvailability ? (
                  <>
                    <div className="buttons-div">
                      <button
                        type="button"
                        className="btn"
                        onClick={minusCount}
                      >
                        -
                      </button>
                      <button type="button" className="btn">
                        {quantity}
                      </button>
                      <button type="button" className="btn" onClick={plusCount}>
                        +
                      </button>
                    </div>
                    {addOnCat ? (
                      <p className="link">Customizations available</p>
                    ) : null}
                    {quantity > 0 ? (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={sendToCart}
                      >
                        ADD TO CART
                      </button>
                    ) : null}
                  </>
                ) : (
                  <p className="not-available">Not available</p>
                )}
              </div>
              <div className="second-div">
                <p className="calories">{dishCalories} calories</p>
              </div>
              <div className="third-div">
                <img alt="dishImage" src={dishImage} className="dish-img" />
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
