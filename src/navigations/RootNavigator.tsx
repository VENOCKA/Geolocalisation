import React, { useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { ActivityIndicator } from 'react-native-paper'

import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'
import { AuthenticatedContext } from '../providers'
import { auth } from '../configs/firebase'

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log('RootNavigator => user :', user);
    
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth,
      authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null)
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