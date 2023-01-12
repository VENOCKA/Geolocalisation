import React from 'react';

import { Stack } from '../utils/router'
import { HomeScreen, MapsScreen } from '../screens'

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Maps' component={MapsScreen}/>
    </Stack.Navigator>
  )
}