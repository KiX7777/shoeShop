import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const useFirebaseEmailPasswordAuth = () => {
  async function emailSignUp(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      const userData = res.user
      console.log(userData)
      return userData.accessToken
    } catch (error) {
      return error.message
    }
  }

  async function emailLogin(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const userData = res.user
    console.log(userData)
  }

  return [emailSignUp, emailLogin]
}

export default useFirebaseEmailPasswordAuth

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
  } else {
    console.log('there is no user')
  }
})
