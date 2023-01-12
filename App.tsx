import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'

import { Connexion } from './src/screens/mainConnexion'
import { Connexion2 } from './src/screens/mainConnexion2'

import { Stack } from './src/utils/router'

import { firebaseConfig } from './src/configs/firebase'

initializeApp(firebaseConfig)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connexion'>
        <Stack.Screen name='Connexion' component={Connexion}/>
        <Stack.Screen name='Connexion2' component={Connexion2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
