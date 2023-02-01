import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { theme } from '../configs/theme'

import { emailAuth } from '../utils/auth'
import { StackNavigatorParams } from '../utils/router'
import { emailValidator, passwordValidator } from '../utils/validator'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import SocialButton from '../components/SocialButton'
import GoogleAuth from '../components/Auth/GoogleAuth'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Login'>

export const LoginScreen = ({ navigation } : Props) => {
  const [error, setError] = useState({isError: false, message: ''})
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  // const [request, response, promptAsync] = useGoogleAuthRequest()

  // useEffect(() => {
  //   googleAuth(response)
  // }, [response])

  const onLoginPressed = () => {
    console.log('Login pressed')

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    emailAuth(email.value, password.value)
  }

  return (
    <Background>
      
        <SafeAreaView style={styles.container}>
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
          <GoogleAuth />
          {/* <SocialButton 
              style={styles.socialButtonStyle}
              text={'Continue with Google'} 
              // textStyle={styles.googleSocialButtonTextStyle}
              imageSource={require('../assets/icons8-google-48.png')} 
              onPress={() => promptAsync()}
            /> */}
            <SocialButton 
              style={styles.socialButtonStyle}
              text={'Continue with Facebook'} 
              // textStyle={styles.googleSocialButtonTextStyle}
              imageSource={require('../assets/icons8-facebook-48.png')} 
              onPress={() => console.log('SocialButtonGoogle')}
            />
          </View>
        </SafeAreaView>
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
