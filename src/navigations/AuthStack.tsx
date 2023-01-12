import React from 'react'

import { Stack } from '../utils/router'
import { LoginScreen } from '../screens'
import { RegisterScreen } from '../screens/RegisterScreen'

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}