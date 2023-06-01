import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Order } from './cartStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { firebaseConfig } from '../firebase'
import useFirebaseEmailPasswordAuth from '../hooks/useFirebaseEmailPasswordAuth'
import { User } from '../Components/Login'
interface State {
  userName: string
  password: string
  token: string
  loggedIn: boolean
  previousOrders: Order[]
  isOrdering: boolean
  error: string
}

export const sendOrder = createAsyncThunk(
  'order/send',
  async (order: Order, thunkAPI) => {
    try {
      const res = await fetch(
        'https://ecommerce-e8b82-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await res.json()
      console.log(data)
      return order
    } catch (error) {
      return thunkAPI.rejectWithValue('Order was not submitted')
    }
  }
)
export const signUp = createAsyncThunk(
  'signUp',
  async (credentials: User, thunkAPI) => {
    const [emailSignUp, emailLogin] = useFirebaseEmailPasswordAuth()
    emailSignUp(credentials.email, credentials.password)
  }
)

const initialState: State = {
  userName: '',
  password: '',
  token: '',
  loggedIn: false,
  previousOrders: [],
  isOrdering: false,
  error: '',
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendOrder.pending, (state) => {
      state.isOrdering = true
    })
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.isOrdering = false
      state.previousOrders.push(action.payload)
    })
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.isOrdering = false
      state.error = action.payload as string
    })
  },
})

export const userActions = userSlice.actions
