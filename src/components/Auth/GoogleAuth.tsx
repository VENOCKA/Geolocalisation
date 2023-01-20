import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'

import { googleAuth, idToken } from '../../utils/auth'

import SocialButton from '../SocialButton'

export default function GoogleAuth() {
    const [request, response, promptAsync] = useIdTokenAuthRequest(idToken, { useProxy: true })

    useEffect(() => {
      googleAuth(response)
    }, [response])

    return(
      <SocialButton 
        style={styles.socialButtonStyle}
        text={'Continue with Google'} 
        // textStyle={styles.googleSocialButtonTextStyle}
        imageSource={require('../../assets/icons8-google-48.png')} 
        onPress={() => promptAsync()}
      />
    )
}

const styles = StyleSheet.create({
  socialButtonStyle: {
    marginTop: 16,
  },
})