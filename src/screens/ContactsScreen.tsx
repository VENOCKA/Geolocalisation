import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, FAB, List, Searchbar, Text, Modal, Portal, Provider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { addFriend, getFriends } from '../utils/database'
import { AppContext, AuthenticatedContext } from '../providers'

import { StackNavigatorParams } from '../utils/router'


export const ContactsScreen = () => {
  const navigation = useNavigation<StackNavigatorParams>()
  const { user } = useContext(AuthenticatedContext)
  const { friends } = useContext(AppContext)

  const [data, setData] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let t: any[] = []
    for (const key in friends) {
      t = [...t, friends[key]]
    }
    setData(t) 
    // getFriends(user.uid)
    // .then((data) => {
    //     setData(data)
    //     console.log('ContactsScreen => data : ', data)
    // })
  }, [friends])

  useEffect(() => {
    // console.log('ContactsScreen => useEffect data : ', data);
  }, [data])

  const onChangeSearch = (query: string) => setSearchQuery(query)
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const [email, setEmail] = useState({ value: '', error: '' })

  const onAddContactPress = () => {
    console.log('ContactsScreen => onAddContactPress email : ', email);
    if (!email.value) {
      return
    }
    addFriend(user.uid, email.value)
    hideModal()
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <Provider>
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
                  key={item.id}
                  title={item.name}
                  description={item.email}
                  left={props => <Avatar.Text size={32} label={item.name[0]} />}
                  onPress={() => navigation.navigate('Message', {contact: item.id})}
              />

            ))}
        </View>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => showModal()}
        />
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} style={styles.popup}>
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
            <Button mode="contained" onPress={() => onAddContactPress()}>
              Ajouter un ami
            </Button>
          </Modal>
        </Portal>
      </Provider>
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
  popup: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
  },
})