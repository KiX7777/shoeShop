import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';

import {
  getDatabase,
  ref,
  child,
  set,
  onValue,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  signOut,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  signInWithRedirect,
  GoogleAuthProvider,
  updatePassword,
  linkWithPopup,
} from 'firebase/auth';

let isMobile = window.matchMedia('(max-width: 500px)');

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const db = getDatabase(firebaseApp);
export const user = auth.currentUser;

const dbRef = ref(getDatabase());
const usersRef = ref(db, 'users');

export const updateToken = async (id, token) => {
  let userRef = ref(db, `users/${id}`);
  const nodeRef = child(userRef, 'token');
  await set(nodeRef, token);
};

export const writed = async (userData) => {
  const nodeRef = child(usersRef, `${userData.id}`);
  await set(nodeRef, userData);
};

export const pushOrder = async (id, order) => {
  let userRef = ref(db, `users/${id}`);
  const date = new Date();
  const nodeRef = child(userRef, `orders/${date}`);
  await set(nodeRef, order);
};
export const setPic = async (id, url) => {
  let userRef = ref(db, `users/${id}`);
  const nodeRef = child(userRef, `profilepic`);
  await set(nodeRef, url);
};

// writed()

const useFirebaseEmailPasswordAuth = () => {
  async function emailSignUp(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const userData = res.user;

      return userData;
    } catch (error) {
      return error.message;
    }
  }

  async function emailLogin(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userData = res.user;
      return userData;
    } catch (error) {
      return error.message;
    }
  }

  return [emailSignUp, emailLogin];
};

export default useFirebaseEmailPasswordAuth;

export async function getUserData() {
  const currentUser = auth.currentUser;
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      return 'Logged out!';
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function updateUsername(username) {
  updateProfile(auth.currentUser, {
    displayName: username,
  })
    .then(() => {})
    .catch((err) => {
      console.log(err.message);
    });
}

export async function updatePic(url) {
  updateProfile(auth.currentUser, {
    photoURL: url,
  })
    .then(() => {})
    .catch((err) => {
      console.log(err.message);
    });
}

export async function verifyMail() {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email sent!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function listenchanges(id) {
  let orderRef = ref(db, `users/${id}/orders`);

  onValue(orderRef, (snapshot) => {});
}

export const GoogleSign = async () => {
  try {
    let result;
    let credential;
    let token;

    if (isMobile.matches) {
      await signInWithRedirect(auth, provider);
      result = getRedirectResult(auth);
      credential = GoogleAuthProvider.credentialFromResult(result);

      token = credential.accessToken;
    } else {
      result = await signInWithPopup(auth, provider);
      credential = GoogleAuthProvider.credentialFromResult(result);
    }

    const user = result.user;

    return {
      user: user,
      token: credential.accessToken,
    };
  } catch (error) {
    const errorMsg = error.message;
    return errorMsg;
  }
};

export const linkUsers = async () => {
  fetchSignInMethodsForEmail(auth, auth.currentUser.email).then((res) => {
    if (res.includes('password')) {
      linkWithPopup(auth.currentUser, provider)
        .then((res) => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const user = res.user;
          console.log(credential, user);
        })
        .catch((err) => {
          console.log(err.message);
          if (
            err.message === 'Firebase: Error (auth/provider-already-linked).'
          ) {
            console.log('linked');
          }
          return err;
        });
    }
  });
};

export async function checkUsername(username) {
  const usersRef = query(
    ref(db, 'users'),
    ...[orderByChild('userName'), equalTo(username)]
  );
  const snapshot = await get(usersRef);
  const data = snapshot.val();
  return data;
}

export async function updateCart(id, cart) {
  let userRef = ref(db, `users/${id}`);
  const nodeRef = child(userRef, `cart`);
  await set(nodeRef, cart);
}

export async function changePass(password, id) {
  try {
    await updatePassword(auth.currentUser, password);

    let userRef = ref(db, `users/${id}`);
    const nodeRef = child(userRef, `password`);
    await set(nodeRef, password);
    console.log('pass changed');
    alert('Password changed!');
    logOut();
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
