import * as React from 'react';
import { Image, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../SignUp/SignUp'
import { Map } from '../Map'
import { Login } from '../Login/Login'
import { CarpoolList } from '../CarpoolList/CarpoolList'
import { JoinOrganisation } from "../../views/JoinOrganisation";
import { getData } from "../../utils/AsyncStorage";
const logo = require("../../resources/images/eco-logo.png");

const Stack = createNativeStackNavigator();

export enum EScreens {
    SIGN_UP = 'SignUp',
    LOGIN = 'Login',
    MAP = 'Map',
    CARPOOL_LIST = 'CarpoolList',
    JOIN = 'JoinOrg',
}

export const Navigation = () => {
    const [initialRoute, setInitialRoute] = React.useState<string>(EScreens.JOIN)
    const [orgToJoin, setOrgToJoin] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState(true)

    const JoinOrganisationWithName: React.VFC<{navigation: Navigation}> = (props) => <JoinOrganisation organisationName={orgToJoin} {...props} />;
    // Using some hardcoded markers for demo purposes
    const MapWithMarkers: React.VFC<{navigation: Navigation}> = (props) => <Map {...props} markers={[[-37.7712, 144.9998],[-37.7846,144.9894]]} />

    React.useEffect(() => {
        (async () => {
            const orgName = await getData<string>("joinOrganisation")

            if (orgName) {
                setOrgToJoin(orgName)
                setInitialRoute(EScreens.JOIN)
            }
        })()
        setIsLoading(false)
    }, []);

    const headerStyles = {
        backgroundColor: '#000',
    };
    const headerTitleStyles = {
        color: '#FFF'
    }

    const Logo = () => <Image source={logo} style={{width:250, height:50}} />

    return isLoading
        ? <><Text>Loading...</Text></>
        : (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen
                        name={EScreens.SIGN_UP}
                        component={SignUp}
                        options={{headerTitle: () => <Logo />, headerTintColor: '#fff', headerStyle: headerStyles, headerTitleStyle: headerTitleStyles }}
                    />
                    <Stack.Screen
                        name={EScreens.LOGIN}
                        component={Login}
                        options={{headerTitle: () => <Logo />, headerTintColor: '#fff', headerStyle: headerStyles, headerTitleStyle: headerTitleStyles}}
                    />
                    <Stack.Screen
                        name={EScreens.CARPOOL_LIST}
                        component={CarpoolList}
                        options={{headerTitle: () => <Logo />, headerTintColor: '#fff', headerStyle: headerStyles, headerTitleStyle: headerTitleStyles}}
                    />
                    <Stack.Screen
                        name={EScreens.MAP}
                        component={MapWithMarkers}
                        options={{headerTitle: () => <Logo />, headerTintColor: '#fff', headerStyle: headerStyles, headerTitleStyle: headerTitleStyles}}
                    />
                    <Stack.Screen
                        name={EScreens.JOIN}
                        component={JoinOrganisationWithName}
                        options={{headerTitle: () => <Logo />, headerTintColor: '#fff', headerStyle: headerStyles, headerTitleStyle: headerTitleStyles}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
};

export type Navigation = {
    navigate: (routeName: string) => void;
};
