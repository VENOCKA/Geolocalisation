import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Connexion } from './components/screens/mainConnexion';
import { createStackNavigator } from '@react-navigation/stack';
import { Connexion2 } from './components/screens/mainConnexion2';

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Connexion: undefined;
  Connexion2: undefined;
};

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
