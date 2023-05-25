import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'

interface CartProduct extends Product {
  quantity: number
  total: number
}

type State = {
  products: CartProduct[]
  isOpen: boolean
  total: number
}
const calcTotal = (products: CartProduct[]) => {
  const total = products.reduce((acc, curr) => acc + curr.total, 0)
  console.log(total)
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
      const prod = {
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      }
      const exists = state.products.find((product) => product.id === prod.id)
      if (exists) {
        exists.quantity++
        exists.total = exists.quantity * exists.price
      } else {
        state.products.push(prod)
      }
      calcTotal(state.products)
    },

    remove(state, action: PayloadAction<number>) {
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
    },

    delete(state, action: PayloadAction<number>) {
      const findEl = state.products.find(
        (product) => product.id === action.payload
      )
      const filtered = state.products.filter((prod) => prod !== findEl)
      state.products = filtered
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const cartActions = cartSlice.actions
