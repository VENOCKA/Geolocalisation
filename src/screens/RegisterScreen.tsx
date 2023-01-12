import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

import { auth } from '../configs/firebase'
import { SafeView } from '../components/SafeView'
import GoogleAuth from '../components/GoogleAuth'

export const RegisterScreen = () => {
  const [error, setError] = useState({isError: false, message: ''})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmePassword, setConfirmePassword] = useState('')

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     const user = userCredential.user
    // })
    .catch((error) => {
        setError({isError: true, message: error.message})
    })
    
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
        <TextInput
            mode="outlined"
            label="Confirme Password"
            placeholder="Password"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            onChangeText={text => setConfirmePassword(text)}
        />
        <Button mode="contained" onPress={() => handleRegister()}>
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