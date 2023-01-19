import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet, Text } from 'react-native'
import MapView from 'react-native-maps'
import { StackNavigatorParams } from '../utils/router'
import * as Location from 'expo-location';

type Props = NativeStackScreenProps<StackNavigatorParams, 'Maps'>

export const MapsScreen = ({ navigation } : Props) => {

  const [localLatitude, setLatitude] = useState(0)
  const [localLongitude, setLongitude] = useState(0)


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location2 = await Location.getCurrentPositionAsync({});
      setLatitude(location2?.coords?.latitude)
      setLongitude(location2?.coords?.longitude)
    })();
  }, []);

    return(
        <View style={styles.container}>
            <Button title="Go Home" onPress={ () => navigation.navigate('Home')} />
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: localLatitude,
                longitude: localLongitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });