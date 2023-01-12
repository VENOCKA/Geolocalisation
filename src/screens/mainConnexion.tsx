import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { StackNavigatorParams } from '../utils/router'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Connexion'>

export const Connexion = ({ navigation } : Props) => {

    return(
        <View>
            <Text onPress={ () => navigation.navigate('Maps')}>
                Coucou
            </Text>
        </View>
    )
}