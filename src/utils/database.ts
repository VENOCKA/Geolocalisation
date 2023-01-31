import { Auth } from 'firebase/auth/react-native';
import { doc, getDoc, getDocs, setDoc, addDoc, collection, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { Dispatch, RefObject } from 'react';
import { FlatList } from 'react-native-gesture-handler';
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

export const onSnapshotUser = async (docRef: any, _setData: { (value: any): void }) => {
    const unsub = onSnapshot(docRef,
        (snapshot: any) => {
            _setData(snapshot.data())
            console.log('User data updated')
        },
        (err: any) => {
            console.log(err)
        }
    )
}

export const onSnapshotFriends = async (uid: string, data: any, _setData: { (value: any): void }) => {
    const docRef = collection(firestore, 'users', uid, 'friends')
    const unsub = onSnapshot(docRef,
        (snapshot: any) => {
            let friends: any = {...data}
        
            snapshot.forEach((doc: any) => {

                onSnapshotUser(doc.data().userInfo, (user: any) => {
                    const u: any = {}
                    u[doc.id] = {
                        ...user,
                        id: doc.id,
                        chatDocRef: doc.data().chatInfo,
                        userDocRef: doc.data().userInfo,
                    }
                    friends = {...friends, ...u}
                    _setData(friends)
                })
                
            })
            console.log('Friends data updated')
        },
        (error: any) => {
            console.log(error)
        }
    )
}

export const getMessage = async (chatDocRef: any, _setData: { (value: any): void }, refFlatList: RefObject<FlatList<any>>) => {
    const q = query(collection(firestore, chatDocRef.path, 'messages'), orderBy('createAt', 'asc'))

    const unsub = onSnapshot(q,
        (snapshot: any) => {
            let messages: any = []

            snapshot.forEach((doc: any) => {
                messages = [...messages, {
                    id: doc.id,
                    ...doc.data(),
                    userId: doc.data().user.id,
                }];
            })
            _setData(messages)
            refFlatList.current?.scrollToEnd()
        },
        (error: any) => {
            console.log(error)
        }
    )

    refFlatList.current?.scrollToEnd()
}

export const sendMessage = async (chatDocRef: any, uid: string, text: string) => {
    const docRef = collection(firestore, chatDocRef.path, 'messages')
    await addDoc(docRef, {
        text: text,
        user: doc(firestore, 'users', uid),
        createAt: new Date()
    })
    console.log('Message sent')
}


export const setGeoloc = async (uid: string, data: any) => {
    const docRef = doc(firestore, "users", uid)
    await updateDoc(docRef, data)
    console.log('User data saved');
}