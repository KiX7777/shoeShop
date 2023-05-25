import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Getting data failed!')
  }
  const data = (await res.json()) as Product[]
  console.log(data)
  // setTimeout()

  return data
})

// export const getData = () => {
//   return async (dispatch: Dispatch) => {
//     async function getProducts() {
//       const res = await fetch('https://fakestoreapi.com/products')
//       if (!res.ok) {
//         throw new Error('Getting data failed!')
//       }
//       const data = (await res.json()) as Product[]
//       return data
//     }
//     try {
//       const data = await getProducts()
//       dispatch(productSlice.actions.get(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

interface State {
  products: Product[]
  status: 'loading' | 'idle'
  error?: string
}

const initialState: State = {
  products: [],
  status: 'idle',
}

export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'idle'
      state.products = action.payload
    })

    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'idle'
      state.error = 'Greška'
    })
  },
})

export const productsActions = productSlice.actions
