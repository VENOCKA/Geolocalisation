import { createStackNavigator } from '@react-navigation/stack';

export type StackNavigatorParams = {
    Connexion: undefined;
    Connexion2: undefined;
}

export const Stack = createStackNavigator<StackNavigatorParams>();
