// import { NavigationContainer } from '@react-navigation/native'
// import { initializeApp } from 'firebase/app'
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import { Connexion } from './src/screens/mainConnexion'
// import { Maps } from './src/screens/maps'

// import { Stack } from './src/utils/router'
import { RootNavigator } from './src/navigations'



// import { firebaseConfig } from './src/configs/firebase'
import { AuthenticatedProvider } from './src/providers'

// initializeApp(firebaseConfig)

export default function App() {
  return (
    <AuthenticatedProvider>
      <SafeAreaProvider>
        <RootNavigator/>
      </SafeAreaProvider>
      {/* <NavigationContainer>
        <View style={styles.container}/>
        <Stack.Navigator initialRouteName='Connexion'>
          <Stack.Screen name='Connexion' component={Connexion}/>
          <Stack.Screen name='Maps' component={Maps}/>
        </Stack.Navigator>
      </NavigationContainer> */}
    </AuthenticatedProvider>
  );
}
