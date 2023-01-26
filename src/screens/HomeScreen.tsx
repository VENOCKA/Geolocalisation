import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import { signOut } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StackNavigatorParams } from '../utils/router'
import { auth } from '../configs/firebase'
import { getUser } from '../utils/database'
import { AuthenticatedContext } from '../providers'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Home'>

export const HomeScreen = ({ navigation } : Props) => {
  const { user, setUser } = useContext(AuthenticatedContext)
  const [data, setData] = useState<any>(null)

  useEffect(() => {

    getUser(user.uid)
    .then((data) => {
      setData(data)
      console.log('HomeScreen => data : ', data);
    })
    
  }, [user])
  

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Go Map" onPress={ () => navigation.navigate('Maps')} /> */}
      <Button title='Sign Out' onPress={handleLogout} />
      <View style={{flex: 1 }}>
        {data && <Image source={{ uri: data.photo }} />}

        {data && <Text>{data.name}</Text>}
        {data && <Text>{data.email}</Text>}

        {data && data.friends.map((friend: any) => {
            return (
              <Text key={friend}>{friend}</Text>
            )
          })
        }
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