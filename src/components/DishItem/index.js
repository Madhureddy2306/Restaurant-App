import './index.css'

const DishItem = props => {
  const {dishDetails, cartCount, increaseCount, decreaseCount} = props
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
  } = dishDetails

  const plusCount = () => {
    increaseCount(dishId)
  }

  const minusCount = () => {
    decreaseCount(dishId)
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
                <button type="button" className="btn" onClick={minusCount}>
                  -
                </button>
                <button type="button" className="btn">
                  {cartCount.includes(dishId) ? cartCount.length : 0}
                </button>
                <button type="button" className="btn" onClick={plusCount}>
                  +
                </button>
              </div>
              {addOnCat ? (
                <p className="link">Customizations available</p>
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
}

export default DishItem
