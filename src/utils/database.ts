

import { Auth } from 'firebase/auth/react-native';
import { doc, getDoc, getDocs, setDoc, getDocFromCache, collection } from 'firebase/firestore'
import { firestore } from "../configs/firebase";


export const getUser = async (uid: string) => {
    const docRef = doc(firestore, 'users', uid)
    const docSnap = await getDoc(docRef)
    // console.log(docSnap);
    
    return docSnap.data()
}

export const setUser = async (uid: string, data: any) => {
    const docRef = doc(firestore, 'users', uid)
    await setDoc(docRef, data)
    console.log('User data saved');
}

export const getFriends = async (uid: string) => {
    const docRef = collection(firestore, 'users', uid, 'friends')
    const docSnap = await getDocs(docRef)
    
    const friends: any = []

    await (async () => {
        for (const doc of docSnap.docs) {
            const userInfo = await getDoc(doc.data().userInfo).then((doc) => doc.data())

            friends.push({
                chatDocRef: doc.data().chatInfo,
                userDocRef: doc.data().userInfo,
                userInfo: userInfo,
                userId: doc.id
            })
        }
    })()

    return friends
}
