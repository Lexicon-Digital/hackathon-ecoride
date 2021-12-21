import React from "react";
import { Pressable, StyleSheet, Text } from 'react-native'
import { Layout } from '../Layout'
import { EScreens } from '../Navigation/Navigation'
import { Button, Input } from 'react-native-elements'
import {Navigation} from "../Navigation/Navigation";

const styles = StyleSheet.create({
    button: {
        width: 300,
    },
    loginLink: {
        textDecorationLine: "underline",
    },
    loginText: {
        marginTop: 15,
        textAlign: 'center',
    },
});

interface ISignUp {
    navigation: Navigation;
}

export const SignUp: React.FC<ISignUp> = ({navigation}) => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const isButtonDisabled = (): boolean => !username || !password;

    return (
        <Layout>
            <Input
                onChangeText={setUsername}
                value={username}
                placeholder="username"
                containerStyle={{
                    width: 300,
                }}
                autoCompleteType={undefined}
            />
            <Input
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                containerStyle={{
                    width: 300,
                }}
                autoCompleteType={undefined}
            />
            <Pressable style={styles.button}>
                <Button
                    onPress={() => navigation.navigate(EScreens.MAP)}
                    title="Sign Up"
                    disabled={isButtonDisabled()}
                    buttonStyle={{
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate(EScreens.LOGIN)}>
                <Text style={styles.loginText}>
                    Already have an account? <Text style={styles.loginLink}>Log in</Text>
                </Text>
            </Pressable>
        </Layout>
    );
};
