import { Auth } from 'firebase/auth/react-native';
import { doc, getDoc, getDocs, setDoc, addDoc, collection, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
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
    let friends: any = {...data}

    const unsub = onSnapshot(docRef,
        (snapshot: any) => {
        
            snapshot.docChanges().forEach((change: any) => {

                onSnapshotUser(change.doc.data().userInfo, (user: any) => {
                    const u: any = {}
                    friends[change.doc.id] = {
                        ...user,
                        id: change.doc.id,
                        chatDocRef: change.doc.data().chatInfo,
                        userDocRef: change.doc.data().userInfo,
                    }
                    // friends = {...friends, ...u}
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

export const onSnapshotMessages = async (chatDocRef: any, data: any, _setData: { (value: any): void }, refFlatList: RefObject<FlatList<any>>) => {
    const q = query(collection(firestore, chatDocRef.path, 'messages'), orderBy('createAt', 'asc'))
    const unsub = onSnapshot(q,
        (snapshot: any) => {
            let messages: any = {...data}
            let u: any = []
        
            snapshot.docChanges().forEach((change: any) => {
                u = [...u, {
                    id: change.doc.id,
                    ...change.doc.data(),
                    userId: change.doc.data().user.id,
                }]  
            })
            messages[chatDocRef.id] = u

            _setData(messages) 
            console.log('New message added')
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

export const sendMessage = async (chatDocRef: any, uid: string, text: string, friend: any) => {
    if (!chatDocRef) {
        const colRef = collection(firestore, 'chats')
        const userDocRef = doc(firestore, "users", uid)

        const newChat = await addDoc(colRef, {})

        const docRef = collection(firestore, newChat.path, 'messages')

        const a = await addDoc(docRef, {
            text: text,
            user: userDocRef,
            createAt: new Date()
        })

        const userChatRef = collection(firestore, 'users', uid, 'friends')
        const friendChatRef = collection(firestore, 'users', friend.id, 'friends')

        await updateDoc(doc(userChatRef, friend.id), {
            chatInfo: newChat,
        })

        await updateDoc(doc(friendChatRef, uid), {
            chatInfo: newChat,
        })

        console.log('new Message sent')
    }
    else {
        const docRef = collection(firestore, chatDocRef.path, 'messages')
        const a = await addDoc(docRef, {
            text: text,
            user: doc(firestore, 'users', uid),
            createAt: new Date()
        })
        console.log('Message sent')
    }
}


export const setGeoloc = async (uid: string, data: any) => {
    const docRef = doc(firestore, "users", uid)
    await updateDoc(docRef, data)
    console.log('User data saved');
}

export const addFriend = async (uid: string, email: any) => {
    const q = query(collection(firestore, 'users'), where('email', '==', email))

    let friend: any = null
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            
            friend = {
                ...doc.data(),
                id: doc.id,
            }
        })
    })


    if (!friend) {
        return 'User not found'
    }
    console.log(friend);
    
    // const userExists = await getDoc(doc(firestore, 'users', friend.id)).then((doc) => doc.exists())
    // if (!userExists) {
    //     return 'User not found'
    // }
    
    const userDocRef = collection(firestore, 'users', uid, 'friends')
    const friendDocRef = collection(firestore, 'users', friend.id, 'friends')

    await setDoc(doc(userDocRef, friend.id), {
        userInfo: doc(firestore, 'users', friend.id),
        chatInfo: null,
    })

    await setDoc(doc(friendDocRef, uid), {
        userInfo: doc(firestore, 'users', uid),
        chatInfo: null,
    })

}