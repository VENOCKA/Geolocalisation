import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth/react-native'
import { signInWithEmailAndPassword } from 'firebase/auth/react-native'

import { auth } from '../configs/firebase'
import { theme } from '../configs/theme'

// import GoogleAuth from '../components/GoogleAuth'
import { StackNavigatorParams } from '../utils/router'
import { emailValidator, passwordValidator } from '../utils/validator'

import { SafeView } from '../components/SafeView'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import SocialButton from '../components/SocialButton'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Login'>

export const LoginScreen = ({ navigation } : Props) => {
  const [error, setError] = useState({isError: false, message: ''})
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [request, response, promptAsync] = useIdTokenAuthRequest(
    {
      clientId: "682223176590-shjfhtbdt389pe9or2phn89s56gr3kk0.apps.googleusercontent.com",
      expoClientId: "682223176590-buqte47v1nvq2suhrs924jja4lss5c5h.apps.googleusercontent.com",
      androidClientId: "682223176590-16ip00t032cojgg9ag9vrps1du294u1q.apps.googleusercontent.com",
      iosClientId: "682223176590-oq29cbbjmllfcahgj525783lu9usog0d.apps.googleusercontent.com",
    },
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const auth = getAuth()
      const credential = GoogleAuthProvider.credential(id_token)
      
      signInWithCredential(auth, credential)
      .then((userCredential) => {
            const user = userCredential.user
        })
        .catch((error) => {
            console.log(error.code, error.message)
            Alert.alert('Error', error.message)
        })
    }
  }, [response])

  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(userCredential => {
  //       const user = userCredential.user
  //     })
  //     .catch(error =>
  //       setError({isError: true, message: error.message})
  //     )
  // }

  const onLoginPressed = () => {
    console.log('Login pressed')

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(userCredential => {
        const user = userCredential.user
      })
      .catch(error => {
        // setError({isError: true, message: error.message})
        console.log(error)
        Alert.alert('Error', error.message)
      })
  }

  return (
    // <SafeView isSafe style={styles.container}>
    //     <TextInput
    //         mode="outlined"
    //         label="Email"
    //         placeholder="exeemple@gmail.com"
    //         value={email}
    //         onChangeText={text => setEmail(text)}
    //     />
    //     <TextInput
    //         mode="outlined"
    //         label="Password"
    //         placeholder="Password"
    //         secureTextEntry
    //         right={<TextInput.Icon icon="eye" />}
    //         onChangeText={text => setPassword(text)}
    //     />
    //     <Button mode="contained" onPress={() => handleLogin()}>
    //         Login
    //     </Button>
    //     <Button mode="contained" onPress={() => navigation.navigate('Register')}>
    //       Create Account
    //     </Button>
    //     <GoogleAuth/>
    //     {error.isError && <Text>{error.message}</Text>}
    // </SafeView>

    <Background>
        <SafeView isSafe style={styles.container}>
        {/* <BackButton goBack={() => navigation.navigate('Home')} /> */}
        <Logo />
        <Header>Welcome</Header>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => console.log('Forgot password pressed')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={() => onLoginPressed()}>
          Login
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register') }>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialButtonContainer}>
          <SocialButton 
              style={styles.socialButtonStyle}
              text={'Continue with Google'} 
              // textStyle={styles.googleSocialButtonTextStyle}
              imageSource={require('../assets/icons8-google-48.png')} 
              onPress={() => promptAsync()}
            />
            <SocialButton 
              style={styles.socialButtonStyle}
              text={'Continue with Facebook'} 
              // textStyle={styles.googleSocialButtonTextStyle}
              imageSource={require('../assets/icons8-facebook-48.png')} 
              onPress={() => console.log('SocialButtonGoogle')}
            />
          </View>
        </SafeView>
      </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  socialButtonStyle: {
    marginTop: 16,
  },
  socialButtonContainer: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
