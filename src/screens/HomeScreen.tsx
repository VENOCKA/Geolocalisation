import React, { useState } from 'react'
import { StyleSheet, Button } from 'react-native'
import { signOut } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StackNavigatorParams } from '../utils/router'
import { auth } from '../configs/firebase'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Home'>

export const HomeScreen = ({ navigation } : Props) => {

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Go Map" onPress={ () => navigation.navigate('Maps')} /> */}
      <Button title='Sign Out' onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})