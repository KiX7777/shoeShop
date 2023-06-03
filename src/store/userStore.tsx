import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { CartProduct } from './cartStore'
import { Order } from './cartStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { setLocalStorage } from '../helpers'
import { firebaseConfig } from '../firebase'
import { useEffect } from 'react'
import {
  verifyMail,
  logOut,
  updateToken,
  pushOrder,
} from '../hooks/useFirebaseEmailPasswordAuth'
import useFirebaseEmailPasswordAuth from '../hooks/useFirebaseEmailPasswordAuth'
import { User } from '../Components/Login'
import { writed } from '../hooks/useFirebaseEmailPasswordAuth'
import { useAppSelector } from './Store'
import { updateUsername } from '../hooks/useFirebaseEmailPasswordAuth'

let initialToken: string = ''

const storageToken = localStorage.getItem('token')
if (storageToken) {
  initialToken = storageToken
}

interface State {
  userName: string
  password: string
  token: string
  email: string
  id: string
  loggedIn: boolean
  previousOrders: Order[]
  cart: CartProduct[]
  isOrdering: boolean
  error: string
  loggingIn: boolean
}

export const sendOrder = createAsyncThunk(
  'order/send',
  async (
    podaci: {
      id: string
      order: Order
    },
    thunkAPI
  ) => {
    try {
      await pushOrder(podaci.id, podaci.order)

      return podaci.order
    } catch (error) {
      return thunkAPI.rejectWithValue('Order was not submitted')
    }
  }
)

//creating user
export const signUp = createAsyncThunk(
  'signUp',
  async (
    credentials: {
      username: string
      password: string
      email: string
      cart: CartProduct[]
    },
    thunkAPI
  ) => {
    try {
      const emailSignUp = useFirebaseEmailPasswordAuth()[0]
      const data = await emailSignUp(credentials.email, credentials.password)
      console.log(data)

      if (typeof data === 'string') {
        throw new Error(data)
      }
      //setting the username
      await updateUsername(credentials.username)
      //sending the verification email
      // await verifyMail()

      const userData = {
        token: data.accessToken,
        email: credentials.email,
        password: credentials.password,
        userName: credentials.username,
        id: data.uid,
        previousOrders: [],
      }
      writed(userData)
      setLocalStorage(data.accessToken)
      return userData
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logIn = createAsyncThunk(
  'logIn',
  async (credentials: string[], thunkAPI) => {
    try {
      const emailLogIn = useFirebaseEmailPasswordAuth()[1]
      const userData = await emailLogIn(credentials[0], credentials[1])

      if (typeof userData === 'string') {
        throw new Error(userData)
      }
      const user = {
        token: userData.accessToken,
        email: credentials[0],
        password: credentials[1],
        userName: userData.displayName,
        id: userData.uid,
      }

      //if we don't receive user data it means that there was an error
      //throw error so reducer can catch it
      // setLocalStorage(userData.accessToken)
      // updateToken(userData.displayName, userData.accessToken)

      return user
    } catch (error: any) {
      const msg = error.message
      return thunkAPI.rejectWithValue(msg)
    }
  }
)

export const logout = createAsyncThunk('logOut', async (_, thunkAPI) => {
  try {
    await logOut()
    localStorage.removeItem('token')
  } catch (error) {
    return thunkAPI.rejectWithValue('Problem signing out!')
  }
})

const initialState: State = {
  userName: '',
  password: '',
  token: initialToken,
  loggedIn: !!initialToken,
  previousOrders: [],
  isOrdering: false,
  email: '',
  error: '',
  loggingIn: false,
  id: '',
  cart: [],
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStore(state, action) {
      state.loggingIn = false
      state.token = action.payload.token
      state.id = action.payload.id
      state.password = action.payload.password
      state.userName = action.payload.userName
      state.email = action.payload.email
      state.error = ''
      state.previousOrders = [action.payload.orders]
    },

    updateOrders(state, action) {
      state.previousOrders = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(sendOrder.pending, (state) => {
      state.isOrdering = true
    })
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.isOrdering = false
      // state.previousOrders.push(action.payload)
    })
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.isOrdering = false
      state.error = action.payload as string
    })
    builder.addCase(signUp.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loggingIn = false
      state.token = action.payload.token
      state.id = action.payload.id
      state.password = action.payload.password
      state.userName = action.payload.userName
      state.email = action.payload.email
      state.loggedIn = true
      state.error = ''
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })
    builder.addCase(logIn.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loggingIn = false
      state.token = action.payload.token
      state.password = action.payload.password
      state.userName = action.payload.userName
      state.id = action.payload.id
      state.email = action.payload.email
      state.loggedIn = true
      state.error = ''
    })
    builder.addCase(logIn.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })
    builder.addCase(logout.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loggingIn = false
      state.loggedIn = false
      state.token = ''
      state.password = ''
      state.userName = ''
      state.id = ''
      state.email = ''
      state.previousOrders = []
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loggingIn = false
      state.loggedIn = true
      state.error = action.payload as string
    })
  },
})

export const userActions = userSlice.actions
