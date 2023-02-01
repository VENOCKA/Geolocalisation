import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View} from 'react-native'
import { Avatar, Card, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getMessage, onSnapshotMessages, sendMessage } from '../utils/database'
import { AppContext, AuthenticatedContext } from '../providers'
import { StackNavigatorParams } from '../utils/router'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'


export const MessageScreen = () => {
  const { user } = useContext(AuthenticatedContext)
  const { friends, messages, setMessages } = useContext(AppContext)
  const navigation = useNavigation<StackNavigatorParams>()
  const [contact, setContact] = useState<any>(null)
  const [id, setId] = useState<any>(null)
  const [data, setData] = useState<any>([])
  const [text, setText] = useState("")
  const refFlatList = useRef<FlatList>(null)


  useEffect(() => {
    console.log('MessageScreen => useEffect navigation : ', navigation.getState().routes[1].params.contact);
    
    setContact(navigation.getState().routes[1].params.contact)
  }, [navigation])

  useEffect(() => {
    setData([])
    if (!contact) {
      return
    }
    if (!friends[contact]?.chatDocRef) {
      return
    }

    if (!messages[friends[contact]?.chatDocRef.id]) {
      onSnapshotMessages(friends[contact].chatDocRef, messages, setMessages, refFlatList)
    }

    // getMessage(friends[contact].chatDocRef, setData, refFlatList)
    setId(friends[contact].chatDocRef.id)
  }, [contact])

  useEffect(() => {
    if (!id) {
      return
    }
    setData(messages[id])
  }, [messages[id]])


  const onSubmitEditingPress = () => {
    if (!text) {
      return
    }
    sendMessage(friends[contact]?.chatDocRef, user.uid, text, friends[contact])
    setText("")
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__text}>
        <Text>Message Screen</Text> 
      </View>
      { data && (
        <FlatList
          style={styles.container__list}
          ref={refFlatList}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container__message} key={item.id}>
              { item.userId === user.uid ? (
                  <Card style={[styles.container__card, styles.container__card_right]}>
                    <Card.Content style={styles.container__card_Content}>
                      <Text variant="bodySmall">{item.text}</Text>
                      <Avatar.Text size={16} label={'U'} />
                    </Card.Content>
                  </Card>
                ) : (
                  <Card style={[styles.container__card, styles.container__card_left]}>
                    <Card.Content style={styles.container__card_Content}>
                      <Avatar.Text size={16} label={friends[item.userId].name[0]} />
                      <Text variant="bodySmall">{item.text}</Text>
                    </Card.Content>
                  </Card>
                )
              }
            </View>
            )}
          onContentSizeChange={() => refFlatList.current?.scrollToEnd()}
          onLayout={() => refFlatList.current?.scrollToEnd()}
          keyExtractor={item => item.id}
        />
      )
      }
      
      <View style={styles.container__input}>
        <TextInput
          // label="Email"
          mode='outlined'
          value={text}
          onChangeText={text => setText(text)}
          onSubmitEditing={() => onSubmitEditingPress()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  container__message: {
    marginHorizontal: 20,
  },
  container__input: {
    // flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  container__text: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container__list: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  container__card_Content: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  container__card: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  container__card_right: {
    alignSelf: 'flex-end',
  },
  container__card_left: {
    alignSelf: 'flex-start',
  }
})