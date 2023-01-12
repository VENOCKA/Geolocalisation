import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { StackNavigatorParams } from '../utils/router'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Connexion'>

export function Connexion({ navigation } : Props) {

    return(
        <View>
            <Text onPress={ () => navigation.navigate('Connexion2')}>
                Coucou
            </Text>
        </View>
    )
}