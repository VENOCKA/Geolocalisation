

import { Auth } from 'firebase/auth/react-native';
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from "../configs/firebase";


export const getUser = async (uid: string) => {
    const docRef = doc(firestore, 'user', uid)
    const r = await getDoc(docRef)
    return r.data()
}
