import React, { useEffect } from 'react'
import { Button } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth/react-native'


WebBrowser.maybeCompleteAuthSession()

export default function GoogleAuth() {
    const [request, response, promptAsync] = useIdTokenAuthRequest(
        {
          clientId: "682223176590-shjfhtbdt389pe9or2phn89s56gr3kk0.apps.googleusercontent.com",
          // expoClientId: "682223176590-buqte47v1nvq2suhrs924jja4lss5c5h.apps.googleusercontent.com",
          // androidClientId: "682223176590-16ip00t032cojgg9ag9vrps1du294u1q.apps.googleusercontent.com",
          // iosClientId: "682223176590-oq29cbbjmllfcahgj525783lu9usog0d.apps.googleusercontent.com",
        },
    )

    useEffect(() => {

      if (response?.type === 'success') {
        const { id_token } = response.params
        const auth = getAuth()
        const credential = GoogleAuthProvider.credential(id_token)
        
        signInWithCredential(auth, credential)
        // .then((userCredential) => {
        //     const user = userCredential.user

        // })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
        })
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