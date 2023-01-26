import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View} from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getFriends } from '../utils/database'
import { AuthenticatedContext } from '../providers'


export const MessageScreen = () => {
  const { user } = useContext(AuthenticatedContext)
  const [data, setData] = useState<any>(null)


  useEffect(() => {
    
    
  }, [user])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__text}>
        <Text>Message Screen</Text> 
      </View>
        <View style={styles.container__list}>
       
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    width: '100%',
    // maxWidth: 340,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container__text: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container__list: {
    flex: 1,
    paddingHorizontal: 20,
  },
})