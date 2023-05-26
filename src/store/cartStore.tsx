import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'
import { act } from 'react-dom/test-utils'

interface CartProduct extends Product {
  quantity: number
  total: number
}

type State = {
  products: Product[]
  isOpen: boolean
  total: number
}
const calcTotal = (products: CartProduct[]) => {
  const total = products.reduce((acc, curr) => acc + curr.total, 0)
  return total
}

const initialState: State = {
  products: [],
  isOpen: false,
  total: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Product>) {
      const exists = state.products.find(
        (product) => product.id === action.payload.id
      )
      if (exists) {
        exists.quantity = exists.quantity + action.payload.quantity
        exists.total = exists.quantity * exists.price
      } else {
        state.products.push({
          ...action.payload,
          total: action.payload.quantity * action.payload.price,
        })
      }
      // if (exists && exists.size !== action.payload.size) {
      //   state.products.push({
      //     ...action.payload,
      //     id: action.payload.id + action.payload.size,
      //   })
      // } else

      state.total = calcTotal(state.products)
    },

    remove(state, action: PayloadAction<string>) {
      const findEl = state.products.find(
        (product) => product.id === action.payload
      )
      if (findEl?.quantity === 1) {
        const filtered = state.products.filter((prod) => prod !== findEl)
        state.products = filtered
      } else if (findEl && findEl.quantity > 1) {
        findEl!.quantity--
        findEl!.total = findEl!.quantity * findEl!.price
      }
      state.total = calcTotal(state.products)
    },

    delete(state, action: PayloadAction<string>) {
      const findEl = state.products.find(
        (product) => product.id === action.payload
      )
      const filtered = state.products.filter((prod) => prod !== findEl)
      state.products = filtered

      state.total = calcTotal(state.products)
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const cartActions = cartSlice.actions
