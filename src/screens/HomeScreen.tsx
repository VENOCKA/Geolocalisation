import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { signOut } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { StackNavigatorParams } from '../utils/router'
import { auth } from '../configs/firebase'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Home'>

export const HomeScreen = ({ navigation } : Props) => {

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }

  return (
    <View style={styles.container}>
      <Button title="Go Map" onPress={ () => navigation.navigate('Maps')} />
      <Button title='Sign Out' onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});