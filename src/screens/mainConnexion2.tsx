import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import { StackNavigatorParams } from '../utils/router'

type Props = NativeStackScreenProps<StackNavigatorParams, 'Connexion2'>

export const Connexion2 = ({ navigation } : Props) => {

    return(
        <View>
            <Text>
                Coucou
            </Text>
        </View>
    )
}