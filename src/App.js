import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import CartContext from './cartContext/index'
import RestaurantHome from './components/Home'
import LoginPage from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute/index'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    displayList: [],
    basicDetails: {},
    defaultOriginalList: [],
    activeCategory: parseInt(11),
  }

  componentDidMount() {
    this.getDishesList()
  }

  getDishesList = async () => {
    const {activeCategory} = this.state

    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)

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
        quantity: parseInt(0),
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

  addCartItem = product => {
    const {cartList} = this.state

    const filtered = cartList.filter(each => each.dishId === product.dishId)

    if (filtered.length >= 1) {
      const mapList = cartList.map(eachItem => {
        if (eachItem.dishId === product.dishId) {
          return {...eachItem, quantity: eachItem.quantity + product.quantity}
        }
        return eachItem
      })
      console.log(mapList)

      this.setState({cartList: mapList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state

    const filteredList = cartList.filter(each => each.id !== productId)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productId => {
    const {displayList} = this.state

    const newList = displayList[0].categoryDishes.map(each => {
      if (each.dishId === productId) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    displayList[0].categoryDishes = newList

    this.setState({displayList})
  }

  decrementCartItemQuantity = product => {
    const {displayList} = this.state

    const newList = displayList[0].categoryDishes.map(each => {
      if (each.dishId === product.dishId && each.quantity >= 1) {
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    displayList[0].categoryDishes = newList

    this.setState({displayList})
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

  render() {
    const {
      cartList,
      displayList,
      activeCategory,
      basicDetails,
      defaultOriginalList,
    } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          displayList,
          basicDetails,
          defaultList: defaultOriginalList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/">
            <RestaurantHome
              getItems={this.getItems}
              activeCategory={activeCategory}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
