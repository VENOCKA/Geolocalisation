import { createStackNavigator } from '@react-navigation/stack';

export type StackNavigatorParams = {
    Connexion: undefined;
    Maps: undefined;
}

export const Stack = createStackNavigator<StackNavigatorParams>();
