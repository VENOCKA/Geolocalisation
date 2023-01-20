

import { Auth } from 'firebase/auth/react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from "../configs/firebase";


export const getUser = async (uid: string) => {
    const docRef = doc(firestore, 'users', uid)
    const r = await getDoc(docRef)
    return r.data()
}

export const setUser = async (uid: string, data: any) => {
    const docRef = doc(firestore, 'users', uid)
    await setDoc(docRef, data)
    console.log('User data saved');
}