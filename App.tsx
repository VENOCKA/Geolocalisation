import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Connexion } from './src/screens/mainConnexion';
import { Stack } from './src/utils/router';
import { Maps } from './src/screens/maps';

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
