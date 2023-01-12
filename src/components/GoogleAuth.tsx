import React, { useEffect } from 'react'
import { Button } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { ResponseType } from 'expo-auth-session'
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import Constants from 'expo-constants'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleAuth() {
    const [request, response, promptAsync] = useIdTokenAuthRequest(
        {
          clientId: "682223176590-shjfhtbdt389pe9or2phn89s56gr3kk0.apps.googleusercontent.com",
        },
    )

    useEffect(() => {
      console.log(response);
      
      if (response?.type === 'success') {
        const { id_token } = response.params
        const auth = getAuth()
        const credential = GoogleAuthProvider.credential(id_token)
        console.log(auth);
        console.log(credential);
        signInWithCredential(auth, credential)
      }
    }, [response])

    return(
        <Button
            disabled={!request}
            title="Sign in with Google"
            onPress={() => promptAsync()}
        />
    )
}