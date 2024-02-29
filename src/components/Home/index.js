import Loader from 'react-loader-spinner'
import CartContext from '../../cartContext/index'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

const RestaurantHome = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, displayList, defaultList, basicDetails} = value
      const {getItems, activeCategory} = props

      const sendChange = event => {
        getItems(event)
      }

      return (
        <div className="restaurant-main">
          {defaultList.length > 0 ? (
            <>
              <Header cartList={cartList} basicDetails={basicDetails} />
              <div className="scroll-categories">
                {defaultList.map(each => (
                  <button
                    type="button"
                    key={each.menuCategoryId}
                    id={each.menuCategoryId}
                    className={`category-item ${
                      each.menuCategoryId === activeCategory
                        ? 'active-tab'
                        : null
                    }`}
                    onClick={sendChange}
                  >
                    {each.menuCategory}
                  </button>
                ))}
              </div>
              <ul className="dishes">
                {displayList[0].categoryDishes.map(each => (
                  <li key={each.dishId} className="list-item">
                    <DishItem dishDetails={each} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="loader">
              <Loader type="ThreeDots" color="blue" height={45} width={45} />
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default RestaurantHome
