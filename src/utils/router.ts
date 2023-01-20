import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

export type StackNavigatorParams = {
    Maps: undefined;
    Home: undefined;
    Login: undefined;
    Register: undefined;
}

export const Stack = createStackNavigator<StackNavigatorParams>()

export const Tab = createMaterialBottomTabNavigator<StackNavigatorParams>()
