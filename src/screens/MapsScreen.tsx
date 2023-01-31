import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import Spinner from 'react-native-loading-spinner-overlay'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthenticatedContext } from '../providers'
import { StackNavigatorParams } from '../utils/router'
import { getFriends, getUser, setGeoloc } from '../utils/database'
import { GeoPoint } from 'firebase/firestore'


type Props = NativeStackScreenProps<StackNavigatorParams, 'Maps'>



export const MapsScreen = ({ navigation } : Props) => {
  const [loading, setLoading] = useState(false);
  const [friendsMark, setFriendsMark] = useState([])

  const PushInfoIntoBdd = () => {
    Location.getCurrentPositionAsync({}).then( location2 => {
      setLatitude(location2?.coords?.latitude)
      setLongitude(location2?.coords?.longitude)
      const geoPoint = new GeoPoint(localLatitude, localLongitude)
      setGeoloc(user.uid, {
        Geoloc: {geoPoint}
      })
    })
  }

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const [localLatitude, setLatitude] = useState(0)
  const [localLongitude, setLongitude] = useState(0)
  const { user, setUser } = useContext(AuthenticatedContext)

  useEffect(() => {
    getUser(user.uid)  
    getFriends(user.uid).then()
  }, [user])

  useEffect(() => {
    PushInfoIntoBdd()
  }, [10000])


  useEffect(() => {
    startLoading();
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status : " + status);
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      await PushInfoIntoBdd()
    })();
  }, [localLatitude, localLongitude]);

  for (let i = 0; i < user.friends; i++) {
    getUser(user.friends[i])
    .then((data) => {
    })
    
  }

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
                <Marker 
                  coordinate={{
                    latitude: localLatitude,
                    longitude: localLongitude
                  }}
                  title={"Moi"}
                >
                </Marker>
                {
                  friendsMark
                }

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