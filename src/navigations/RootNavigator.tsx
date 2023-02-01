import React, { useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { ActivityIndicator } from 'react-native-paper'

import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'
import { AppContext, AuthenticatedContext } from '../providers'
import { auth } from '../configs/firebase'

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedContext)
  const { 
    friends, setFriends,
    messages, setMessages,
    userData, setUserData  
  } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log('RootNavigator => user :', user);
    
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth,
      authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser)
        }
        else {
          setUser(null)
          setMessages({})
          setUserData({})
          setFriends({})
        }
        // authenticatedUser ? setUser(authenticatedUser) : setUser(null)
        setIsLoading(false)
      }
    )

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged
  }, [user])

  if (isLoading) {
    return <ActivityIndicator animating={true} />
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}