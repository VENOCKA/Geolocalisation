import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session'
import { useIdTokenAuthRequest, useAuthRequest } from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth/react-native'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth/react-native'

import { auth } from '../configs/firebase'
import { getUser, setUser } from './database'
import { confirmePasswordValidator, emailValidator, passwordValidator } from './validator'

export const useGoogleAuthRequest = () => {
    const [request, response, promptAsync] = useIdTokenAuthRequest(
        {
          clientId: "682223176590-shjfhtbdt389pe9or2phn89s56gr3kk0.apps.googleusercontent.com"
            // expoClientId: "682223176590-buqte47v1nvq2suhrs924jja4lss5c5h.apps.googleusercontent.com",
            // androidClientId: "682223176590-16ip00t032cojgg9ag9vrps1du294u1q.apps.googleusercontent.com",
            // iosClientId: "682223176590-oq29cbbjmllfcahgj525783lu9usog0d.apps.googleusercontent.com",
        },
    )
    return [ request, response, promptAsync ]
}

export const idToken = {
      clientId: "682223176590-shjfhtbdt389pe9or2phn89s56gr3kk0.apps.googleusercontent.com",
    // expoClientId: "682223176590-buqte47v1nvq2suhrs924jja4lss5c5h.apps.googleusercontent.com",
    // androidClientId: "682223176590-16ip00t032cojgg9ag9vrps1du294u1q.apps.googleusercontent.com",
    // iosClientId: "682223176590-oq29cbbjmllfcahgj525783lu9usog0d.apps.googleusercontent.com",
}


export const googleAuth = async (response: AuthSessionResult | null) => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      const auth = getAuth()
      await signInWithCredential(auth, credential)
      .then((userCredential) => {
        getUser(userCredential.user.uid)
        .then((user) => {
          if (!user) {
            setUser(userCredential.user.uid, {
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              photo: userCredential.user.photoURL,
              friends: [],
            })
          }
        })
        .catch((error) => {
          console.log(error)
        }) 
      })
      .catch((error) => {
        console.log(error)
      })
    }
}

export const emailAuth = async (email: string, password: string) => {
    // const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      getUser(userCredential.user.uid)
        .then((user) => {
          if (!user) {
            setUser(userCredential.user.uid, {
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              photo: userCredential.user.photoURL,
              friends: [],
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const createAccount = async (email: string, password: string, confirmePassword: string) => {
    // const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      getUser(userCredential.user.uid)
        .then((user) => {
          if (!user) {
            setUser(userCredential.user.uid, {
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              photo: userCredential.user.photoURL,
              friends: [],
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}