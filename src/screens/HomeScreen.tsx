import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import { signOut } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StackNavigatorParams } from '../utils/router'
import { auth } from '../configs/firebase'
import { getFriends, getUser, onSnapshotFriends } from '../utils/database'
import { AuthenticatedContext, AppContext } from '../providers'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Home'>

export const HomeScreen = ({ navigation } : Props) => {
  const { user } = useContext(AuthenticatedContext)
  const { 
    friends, setFriends,
    messages, setMessages,
    userData, setUserData  
  } = useContext(AppContext)

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    onSnapshotFriends(
      user.uid, 
      friends, 
      setFriends
    )
  }, [])

  useEffect(() => {
    // console.log('HomeScreen => useEffect userData : ', userData);
    
    getUser(user.uid)
    .then((data) => {
      setUserData({...userData, ...data})
      setData(data)
    })
  }, [user])

  useEffect(() => {
    // console.log('HomeScreen => useEffect friends : ', friends);
  }, [friends])


  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Go Map" onPress={ () => navigation.navigate('Maps')} /> */}
      <Button title='Sign Out' onPress={handleLogout} />
      <View style={{flex: 1 }}>
        {userData && <Image source={{ uri: userData.photo }} />}
        {userData && <Text>{userData.name}</Text>}
        {userData && <Text>{userData.email}</Text>}
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // width: '100%',
    // maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})