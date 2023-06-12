import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
  'products/fetch',

  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        'https://ecommerce-e8b82-default-rtdb.europe-west1.firebasedatabase.app/-NWbgXbKkZDQgUOSO1bL.json'
      )

      const data = (await res.json()) as Product[]
      const products = [] as Product[]

      for (const prod in data) {
        let id = `${data[prod].id}`

        let sortedImgs = [...data[prod].images].sort()
        let el = {
          ...data[prod],
          quantity: 1,
          total: data[prod].price,
          size: 1,
          id: id,
          images: sortedImgs,
          // images,
        } as Product
        products.push(el)
      }

      localStorage.setItem('products', JSON.stringify(products))

      return products
    } catch (err) {
      return thunkAPI.rejectWithValue('Error getting data')
    }
  }
)

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
  reducers: {
    sort(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading'
      state.error = undefined
    })

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'idle'
      state.products = action.payload
      state.error = undefined
    })

    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'idle'
      console.log(action.error)
      console.log(action.payload)
      state.error = action.payload as string
    })
  },
})

export const productsActions = productSlice.actions
