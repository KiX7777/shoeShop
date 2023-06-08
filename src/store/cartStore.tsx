import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'
import { OrderProduct } from '../Components/CheckoutForm'

export interface CartProduct extends Product {
  cartID: string
  quantity: number
  total: number
  thumb: string
}

export interface Order {
  firstName: string
  lastName: string
  phone: string
  address: string
  email: string
  products: OrderProduct[]
  total: number
  date: string
}

type State = {
  products: CartProduct[]
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
    add(state, action: PayloadAction<CartProduct>) {
      const exists = state.products.find(
        (product) => product.cartID === action.payload.cartID
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
        (product) => product.cartID === action.payload
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
        (product) => product.cartID === action.payload
      )
      const filtered = state.products.filter((prod) => prod !== findEl)
      state.products = filtered

      state.total = calcTotal(state.products)
    },

    reset(state) {
      state.products = []
      state.total = 0
      state.isOpen = false
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    closeCart(state) {
      state.isOpen = false
    },

    updateLocal(state, action) {
      state.products = action.payload
    },
  },
})

export const cartActions = cartSlice.actions
