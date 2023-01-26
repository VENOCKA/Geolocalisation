import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, FAB, List, Searchbar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { getFriends } from '../utils/database'
import { AuthenticatedContext } from '../providers'

import { StackNavigatorParams } from '../utils/router'


export const ContactsScreen = () => {
  const navigation = useNavigation<StackNavigatorParams>()
  const { user } = useContext(AuthenticatedContext)
  const [data, setData] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    
    getFriends(user.uid)
    .then((data) => {
        setData(data)
        console.log('ContactsScreen => data : ', data)
    })
    
  }, [user])

  const onChangeSearch = (query: string) => setSearchQuery(query)
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__text}>
        <Text>Contacts Screen</Text> 
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.container__list}>
        {data && data.map((item: any) => (
            <List.Item
                key={item.userId}
                title={item.userInfo.name}
                description="Item description"
                left={props => <Avatar.Text size={32} label={item.userInfo.name[0]} />}
                onPress={() => navigation.navigate('Message')}
            />

          ))}
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
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
    paddingHorizontal: 10,
  },
  container__list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})