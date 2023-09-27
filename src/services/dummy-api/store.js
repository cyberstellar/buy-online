import { configureStore } from '@reduxjs/toolkit'
import { dummyApi } from './dummy-api'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [dummyApi.reducerPath]: dummyApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dummyApi.middleware)
})
