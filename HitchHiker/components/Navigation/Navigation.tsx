import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../SignUp/SignUp'
import { Map } from '../Map'
import { Login } from '../Login/Login'
import {JoinOrganisation} from "../../views/JoinOrganisation";
import {getData} from "../../utils/AsyncStorage";
import {Text} from "react-native";

const Stack = createNativeStackNavigator();

export enum EScreens {
    SIGN_UP = 'SignUp',
    LOGIN = 'Login',
    MAP = 'Map',
    JOIN = 'JoinOrg',
}

export const Navigation = () => {
    const [initialRoute, setInitialRoute] = React.useState<string>(/*EScreens.SIGN_UP*/"JoinOrg")
    const [orgToJoin, setOrgToJoin] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState(true)

    const JoinOrganisationWithName: React.VFC<{navigation: Navigation}> = (props) => <JoinOrganisation organisationName={orgToJoin} {...props} />;

    React.useEffect(() => {
        (async () => {
            const orgName = await getData<string>("joinOrganisation")

            if (orgName) {
                setOrgToJoin(orgName)
                setInitialRoute(EScreens.JOIN)
            }
        })()
        setIsLoading(false)
    }, [])

    return isLoading
        ? <Text>Loading...</Text>
        : (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen name={EScreens.SIGN_UP} component={SignUp} options={{title: 'Sign Up'}} />
                    <Stack.Screen name={EScreens.LOGIN} component={Login} options={{title: 'Login'}} />
                    <Stack.Screen name={EScreens.MAP} component={Map} />
                    <Stack.Screen name={EScreens.JOIN} component={JoinOrganisationWithName}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
};

export type Navigation = {
    navigate: (routeName: string) => void;
};
