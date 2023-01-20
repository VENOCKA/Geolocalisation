import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import Spinner from 'react-native-loading-spinner-overlay'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { StackNavigatorParams } from '../utils/router'


type Props = NativeStackScreenProps<StackNavigatorParams, 'Maps'>

export const MapsScreen = ({ navigation } : Props) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const [localLatitude, setLatitude] = useState(0)
  const [localLongitude, setLongitude] = useState(0)


  useEffect(() => {
    startLoading();
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status : " + status);
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      await Location.getCurrentPositionAsync({}).then( location2 => {
        setLatitude(location2?.coords?.latitude)
        setLongitude(location2?.coords?.longitude)
        console.log("latitude : " + localLatitude)
        console.log("Longitude : " + localLongitude)
      })
    })();
  }, [localLatitude, localLongitude]);

    return(
        <SafeAreaView style={styles.container}>
            <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            />
            { localLatitude !== 0 && localLongitude !== 0 ?
            <>
              {/* <Button title="Go Home" onPress={ () => navigation.navigate('Home')} /> */}
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: localLatitude,
                  longitude: localLongitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
              >

              </MapView> 
            </>
            : null}
            
        </SafeAreaView>
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
    spinnerTextStyle: {
      color: '#FFF',
    },
  });