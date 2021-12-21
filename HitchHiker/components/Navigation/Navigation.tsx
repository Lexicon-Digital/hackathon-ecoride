import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../SignUp/SignUp'
import { Map } from '../Map'
import { Login } from '../Login/Login'

const Stack = createNativeStackNavigator();

export enum EScreens {
    SIGN_UP = 'SignUp',
    LOGIN = 'Login',
    MAP = 'Map',
}

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={EScreens.SIGN_UP}>
                <Stack.Screen name={EScreens.SIGN_UP} component={SignUp} options={{title: 'Sign Up'}} />
                <Stack.Screen name={EScreens.LOGIN} component={Login} options={{title: 'Login'}} />
                <Stack.Screen name={EScreens.MAP} component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
