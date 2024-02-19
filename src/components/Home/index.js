import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import DishItem from '../DishItem'
import './index.css'

class RestaurantHome extends Component {
  state = {
    activeCategory: parseInt(11),
    basicDetails: {},
    defaultOriginalList: '',
    cartItemsCount: [],
    displayList: [],
  }

  componentDidMount() {
    this.getDishesList()
  }

  getDishesList = async () => {
    const {activeCategory} = this.state

    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(url)
    const data = await response.json()

    const basicInfo = {
      restaurantName: data[0].restaurant_name,
      restaurantImageUrl: data[0].restaurant_image,
      branchName: data[0].branch_name,
    }

    const arrayLength = array => {
      if (array.length >= 1) {
        return true
      }
      return false
    }

    const camelCasedData = data[0].table_menu_list.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: parseInt(eachMenu.menu_category_id),
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishName: eachDish.dish_name,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishImage: eachDish.dish_image,
        dishAvailability: eachDish.dish_Availability,
        dishId: eachDish.dish_id,
        dishPrice: eachDish.dish_price,
        addOnCat: arrayLength(eachDish.addonCat),
        nextUrl: eachDish.nexturl,
      })),
    }))

    const filteredItems = camelCasedData.filter(
      each => each.menuCategoryId === activeCategory,
    )

    if (response.ok) {
      this.setState({
        basicDetails: basicInfo,
        defaultOriginalList: camelCasedData,
        displayList: filteredItems,
      })
    }
  }

  getItems = event => {
    const {defaultOriginalList} = this.state

    const newList = defaultOriginalList.filter(
      each => each.menuCategoryId === parseInt(event.target.id),
    )

    this.setState({
      displayList: newList,
      activeCategory: parseInt(event.target.id),
    })
  }

  increaseCount = dishId => {
    const {cartItemsCount} = this.state
    if (cartItemsCount >= 0) {
      this.setState(preState => ({
        cartItemsCount: [...preState.cartItemsCount, dishId],
      }))
    }
  }

  decreaseCount = dishId => {
    const {cartItemsCount} = this.state
    if (cartItemsCount > 0) {
      const filtered = cartItemsCount.filter(
        each => parseInt(each) !== parseInt(dishId),
      )
      console.log(filtered)

      this.setState({
        cartItemsCount: filtered,
      })
    }
  }

  render() {
    const {
      cartItemsCount,
      basicDetails,
      activeCategory,
      defaultOriginalList,
      displayList,
    } = this.state

    return (
      <div className="restaurant-main">
        {defaultOriginalList !== '' ? (
          <>
            <div className="header">
              <h1 className="main-heading">{basicDetails.restaurantName}</h1>
              <div className="cart-div">
                <p className="orders">My Orders</p>
                <AiOutlineShoppingCart className="cart-icon" />
                <p className="cart-count">{cartItemsCount.length}</p>
              </div>
            </div>
            <div className="scroll-categories">
              {defaultOriginalList.map(each => (
                <button
                  type="button"
                  key={each.menuCategoryId}
                  id={each.menuCategoryId}
                  className={`category-item ${
                    each.menuCategoryId === activeCategory ? 'active-tab' : null
                  }`}
                  onClick={this.getItems}
                >
                  {each.menuCategory}
                </button>
              ))}
            </div>
            <ul className="dishes">
              {displayList[0].categoryDishes.map(each => (
                <li key={each.dishId} className="list-item">
                  <DishItem
                    dishDetails={each}
                    cartCount={cartItemsCount}
                    increaseCount={this.increaseCount}
                    decreaseCount={this.decreaseCount}
                  />
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
  }
}

export default RestaurantHome
