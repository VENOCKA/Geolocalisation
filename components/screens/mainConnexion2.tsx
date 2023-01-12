import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'

type RootStackParamList = {
    Connexion2: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Connexion2'>

export function Connexion2({ navigation } : Props) {

    return(
        <View>
            <Text>
                Coucou
            </Text>
        </View>
    )
}