import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './cartStore'
import { userSlice } from './userStore'
import { productSlice } from './productsStore'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    user: userSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
