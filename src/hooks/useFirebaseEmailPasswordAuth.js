import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  getReference,
  onValue,
  push,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
} from 'firebase/database'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { userActions } from '../store/userStore'

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

export const db = getDatabase(firebaseApp)
export const user = auth.currentUser

const dbRef = ref(getDatabase())
const usersRef = ref(db, 'users')

// export async function getData() {
//   // const userRef = ref(db, 'users')
//   let userRef = ref(db, `users/${auth.currentUser.uid}`)
//   onValue(userRef, (snapshot) => {
//     let user = snapshot.val()
//     console.log(user)
//     dispatch(user)
//   })

// console.log(token)
// let users = []
// onValue(userRef, (snapshot) => {
//   const data = snapshot.val()
//   for (const user in data) {
//     users.push(data[user])
//   }
//   console.log(users)
//   const user = users.find((user) => user.id === auth.currentUser.uid)
//   console.log(user)
// })
// }

export const updateToken = async (id, token) => {
  let userRef = ref(db, `users/${id}`)
  const nodeRef = child(userRef, 'token')
  await set(nodeRef, token)
}

export const writed = async (userData) => {
  const nodeRef = child(usersRef, `${userData.id}`)
  await set(nodeRef, userData)
}
console.log(new Date().toLocaleString())

export const pushOrder = async (id, order) => {
  console.log(id)
  let userRef = ref(db, `users/${id}`)
  const date = new Date()
  const nodeRef = child(userRef, `orders/${date}`)
  await set(nodeRef, order)
}

// writed()

const useFirebaseEmailPasswordAuth = () => {
  async function emailSignUp(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      const userData = res.user
      console.log(userData)

      return userData
    } catch (error) {
      return error.message
    }
  }

  async function emailLogin(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const userData = res.user
      console.log(userData)
      return userData
    } catch (error) {
      return error.message
    }
  }

  return [emailSignUp, emailLogin]
}

export default useFirebaseEmailPasswordAuth

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log(user)
//   } else {
//     console.log('there is no user')
//   }
// })

export async function getUserData() {
  const currentUser = auth.currentUser
  console.log(currentUser)
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      alert('Signed out.')
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export async function updateUsername(username) {
  updateProfile(auth.currentUser, {
    displayName: username,
  })
    .then(() => {
      alert('Username updated!')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export async function verifyMail() {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email sent!')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export async function updateCart() {
  const currentUser = auth.currentUser
}

//TODO
// UPDATE PREV ORDERS STATE ON ORDER

export function listenchanges(id) {
  let orderRef = ref(db, `users/${id}/orders`)

  onValue(orderRef, (snapshot) => {
    console.log(snapshot.val())
  })
}
