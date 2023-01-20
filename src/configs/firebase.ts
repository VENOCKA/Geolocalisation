import Constants from 'expo-constants'
import { initializeApp } from 'firebase/app';
import { CACHE_SIZE_UNLIMITED, getFirestore, initializeFirestore, getDoc, collection, Firestore } from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
}

// initialize firebase
const app = initializeApp(firebaseConfig)

// initialize auth
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

// initialize firestore
const firestore = getFirestore(app)
export { app, auth, firestore }