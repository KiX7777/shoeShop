import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../pages/Products'
import { getImages } from '../helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('products/fetch', async () => {
  const res = await fetch(
    'https://ecommerce-e8b82-default-rtdb.europe-west1.firebasedatabase.app/-NWbgXbKkZDQgUOSO1bL.json'
  )
  if (!res.ok) {
    throw new Error('Getting data failed!')
  }
  const data = (await res.json()) as Product[]
  const products = [] as Product[]

  for (const prod in data) {
    let id = `${data[prod].id}`
    // console.log(getImages(`${data[prod].url}`))
    // let images = await getImages(`${data[prod].url}`)
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
