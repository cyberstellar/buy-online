import { createSlice } from '@reduxjs/toolkit'

const getItems = key => JSON.parse(localStorage.getItem(key))
const setItems = (key, items) => {
  items.length === 0
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(items))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: getItems('order') || [],
    favorites: getItems('favorites') || []
  },
  reducers: {
    addToCart(state, { payload: { id, quantity = 1 } }) {
      const alreadyAdded = state.products.find(x => x.id === id)
      alreadyAdded
        ? alreadyAdded.quantity + quantity > 0
          ? alreadyAdded.quantity += quantity
          : state.products = state.products.filter(x => x !== alreadyAdded)
        : quantity > 0
        && state.products.push({ id, quantity })

      setItems('order', state.products)
    },
    addToFavorites(state, { payload }) {
      const tmp = new Set(state.favorites)
      tmp.has(payload.id)
        ? tmp.delete(payload.id)
        : tmp.add(payload.id)
      state.favorites = Array.from(tmp)

      setItems('favorites', state.favorites)
    }
  }
})

export const {
  addToCart,
  addToFavorites
} = cartSlice.actions

export default cartSlice.reducer
