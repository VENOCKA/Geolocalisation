import React from 'react';

import { Stack, Tab } from '../utils/router'
import { HomeScreen, MapsScreen } from '../screens'

export const AppStack = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Maps' component={MapsScreen}/>
    </Tab.Navigator>
  )
}