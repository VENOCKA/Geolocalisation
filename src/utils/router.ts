import { createStackNavigator } from '@react-navigation/stack';

export type StackNavigatorParams = {
    Maps: undefined;
    Home: undefined;
    Login: undefined;
    Register: undefined;
}

export const Stack = createStackNavigator<StackNavigatorParams>();
