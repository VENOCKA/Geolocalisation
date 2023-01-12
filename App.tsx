import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Connexion } from './src/screens/mainConnexion';
import { Connexion2 } from './src/screens/mainConnexion2';
import { Stack } from './src/utils/router';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
