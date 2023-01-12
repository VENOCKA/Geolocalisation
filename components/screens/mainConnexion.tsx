import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'

type RootStackParamList = {
    Connexion: undefined;
  Connexion2: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Connexion'>

export function Connexion({ navigation } : Props) {

    return(
        <View>
            <Text onPress={ () => navigation.navigate('Connexion2')}>
                Coucou
            </Text>
        </View>
    )
}