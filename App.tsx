import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'

import { Connexion } from './src/screens/mainConnexion'
import { Maps } from './src/screens/maps'

import { Stack } from './src/utils/router'

import { firebaseConfig } from './src/configs/firebase'

initializeApp(firebaseConfig)

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}/>
      <Stack.Navigator initialRouteName='Connexion'>
        <Stack.Screen name='Connexion' component={Connexion}/>
        <Stack.Screen name='Maps' component={Maps}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
