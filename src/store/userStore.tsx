import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CartProduct, Order } from './cartStore'
import { setLocalStorage, updateImg } from '../helpers/helpers'
import {
  logOut,
  writed,
  GoogleSign,
  updateUsername,
  setPic,
  pushOrder,
  verifyMail,
  checkUsername,
  changePass,
} from '../helpers/FirebaseFunctions'
import useFirebaseEmailPasswordAuth from '../helpers/FirebaseFunctions'

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
  profilePic: string
  message: string
  loginMenu: boolean
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
    const usernameTaken = await checkUsername(credentials.username)

    try {
      if (usernameTaken) {
        throw new Error('Username taken!')
      }

      const emailSignUp = useFirebaseEmailPasswordAuth()[0]
      const data = await emailSignUp(credentials.email, credentials.password)

      if (typeof data === 'string') {
        throw new Error(data)
      }
      //setting the username
      await updateUsername(credentials.username)

      //sending the verification email
      await verifyMail()

      const userData = {
        token: data.accessToken,
        email: credentials.email,
        password: credentials.password,
        userName: credentials.username,
        id: data.uid,
        previousOrders: [],
        profilepic: '/avatar.webp',
        cart: '',
      }
      writed(userData)
      thunkAPI.dispatch(userActions.closeLoginMenu())

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

      //if we don't receive user data it means that there was an error
      //throw error so reducer can catch it
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

      console.log(user)
      thunkAPI.dispatch(userActions.closeLoginMenu())

      return user
    } catch (error: any) {
      console.log(error)
      const msg = error.message
      return thunkAPI.rejectWithValue(msg)
    }
  }
)

export const GoogleLogin = createAsyncThunk('gLog', async (_, thunkAPI) => {
  try {
    const data = await GoogleSign()

    // linkUsers()

    setPic(data?.user.uid, data?.user.photoURL)

    thunkAPI.dispatch(userActions.setLogin())

    return {
      token: data?.token,
      email: data?.user.email,
      profilepic: data?.user.photoURL,
      id: data?.user.uid,
      userName: data?.user.displayName,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('logOut', async (_, thunkAPI) => {
  try {
    await logOut()
    localStorage.removeItem('token')
  } catch (error) {
    return thunkAPI.rejectWithValue('Problem signing out!')
  }
})
export const updateProfilePicture = createAsyncThunk(
  'profilepic',
  async ([id, url]: string[], thunkAPI) => {
    try {
      await updateImg(id, url)
    } catch (error) {
      return thunkAPI.rejectWithValue('Problem uploading picture!')
    }
  }
)
export const updatePass = createAsyncThunk(
  'updatePass',
  async ([pass, id]: string[], thunkAPI) => {
    try {
      await changePass(pass, id)
      return pass
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState: State = {
  userName: '',
  password: '',
  token: initialToken,
  loggedIn: !!initialToken,
  previousOrders: [],
  isOrdering: false,
  email: '',
  loginMenu: false,
  error: '',
  loggingIn: false,
  message: '',
  id: '',
  profilePic: '/avatar.webp',
  cart: [],
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStore(state, action) {
      console.log('updating...')
      state.loggingIn = false
      state.token = action.payload.token
      state.id = action.payload.id
      state.password = action.payload.password
      state.userName = action.payload.userName
      state.email = action.payload.email
      state.error = ''
      state.message = ``
      state.loginMenu = false
      state.profilePic = action.payload.profilepic
      state.previousOrders = [action.payload.orders]
    },

    setLogin(state) {
      state.loggedIn = true
    },

    updateOrders(state, action) {
      state.previousOrders = action.payload
    },
    resetState(state) {
      state.loggingIn = false
      state.loggedIn = false
      state.token = ''
      state.password = ''
      state.userName = ''
      state.loginMenu = false
      state.id = ''
      state.email = ''
      state.profilePic = ''
      state.previousOrders = []
      state.message = ''
    },

    closeLoginMenu(state) {
      state.loginMenu = false
    },
    toggleLoginMenu(state) {
      state.loginMenu = !state.loginMenu
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
      state.token = action.payload!.token
      state.id = action.payload!.id
      state.password = action.payload!.password
      state.userName = action.payload!.userName
      state.email = action.payload!.email
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
    builder.addCase(GoogleLogin.pending, (state) => {
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
    builder.addCase(GoogleLogin.fulfilled, (state, action) => {
      state.loggingIn = false
      state.token = action.payload!.token as string
      state.userName = action.payload!.userName as string
      state.id = action.payload!.id as string
      state.email = action.payload!.email as string
      state.loggedIn = true
      state.error = ''
      state.message = ''

      state.profilePic = action.payload!.profilepic as string
    })
    builder.addCase(logIn.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })
    builder.addCase(GoogleLogin.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })
    builder.addCase(logout.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loggingIn = false
      state.loggedIn = false
      state.token = ''
      state.password = ''
      state.userName = ''
      state.id = ''
      state.email = ''
      state.message = ''
      state.previousOrders = []
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loggingIn = false
      state.loggedIn = true
      state.error = action.payload as string
    })
    builder.addCase(updateProfilePicture.pending, (state) => {
      state.loggingIn = false
      state.message = 'Uploading'
    })
    builder.addCase(updateProfilePicture.fulfilled, (state) => {
      state.loggingIn = false
      state.error = ''
      state.message = 'Profile picture changed!'
    })
    builder.addCase(updateProfilePicture.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })

    builder.addCase(updatePass.pending, (state) => {
      state.loggingIn = false
      state.message = 'Changing password'
    })
    builder.addCase(updatePass.fulfilled, (state, action) => {
      state.loggingIn = false
      state.error = ''
      state.message = 'Password changed'
      console.log(action.payload)
      state.password = action.payload
    })
    builder.addCase(updatePass.rejected, (state, action) => {
      state.loggingIn = false
      state.error = action.payload as string
    })
  },
})

export const userActions = userSlice.actions
