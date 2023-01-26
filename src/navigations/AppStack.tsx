import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Stack, Tab } from '../utils/router'
import { ContactsScreen, HomeScreen, MapsScreen, MessageScreen } from '../screens'

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Home' 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name='Maps' 
        component={MapsScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-maps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name='Contacts' 
        component={ContactsScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
       <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      <Stack.Screen name='Message' component={MessageScreen}  />
    </Stack.Navigator>
  )
}