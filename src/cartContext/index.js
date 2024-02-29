import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  displayList: [],
  basicDetails: {},
  defaultList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
