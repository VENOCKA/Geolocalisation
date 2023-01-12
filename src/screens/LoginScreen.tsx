import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth/react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { auth } from '../configs/firebase'
import { SafeView } from '../components/SafeView'
import GoogleAuth from '../components/GoogleAuth'
import { StackNavigatorParams } from '../utils/router'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Login'>

export const LoginScreen = ({ navigation } : Props) => {
  const [error, setError] = useState({isError: false, message: ''})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    // .then(userCredential => {
    //   const user = userCredential.user
    // })
    .catch(error =>
      setError({isError: true, message: error.message})
    )
  }

  return (
    <SafeView isSafe style={styles.container}>
        <TextInput
            mode="outlined"
            label="Email"
            placeholder="exeemple@gmail.com"
            value={email}
            onChangeText={text => setEmail(text)}
        />
        <TextInput
            mode="outlined"
            label="Password"
            placeholder="Password"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            onChangeText={text => setPassword(text)}
        />
        <Button mode="contained" onPress={() => handleLogin()}>
            Login
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('Register')}>
          Create Account
        </Button>
        <GoogleAuth/>
        {error.isError && <Text>{error.message}</Text>}
    </SafeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12
  }
})