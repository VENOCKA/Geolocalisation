import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { theme } from '../configs/theme'
import { StackNavigatorParams } from '../utils/router'
import { createAccount } from '../utils/auth'
import { confirmePasswordValidator, emailValidator, passwordValidator } from '../utils/validator'

import { SafeView } from '../components/SafeView'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import SocialButton from '../components/SocialButton'
import GoogleAuth from '../components/Auth/GoogleAuth'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Register'>

export const RegisterScreen = ({ navigation } : Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmePassword, setConfirmePassword] = useState({ value: '', error: '' })

  const handleRegister = () => {

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmePasswordError = confirmePasswordValidator(password.value, confirmePassword.value)

    if (emailError || passwordError || confirmePasswordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmePassword({ ...confirmePassword, error: confirmePasswordError })
      return
    }
    
    createAccount(email.value, password.value, confirmePassword.value)
    
  }

  return (
    <Background>
      <SafeView isSafe style={styles.container}>
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
        <TextInput
          label="Confirme Password"
          returnKeyType="done"
          value={confirmePassword.value}
          onChangeText={text => setConfirmePassword({ value: text, error: '' })}
          error={!!confirmePassword.error}
          errorText={confirmePassword.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => console.log('Forgot password pressed')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={() => handleRegister()}>
          Create Account
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Back to </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login') }>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialButtonContainer}>
          <GoogleAuth />
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
