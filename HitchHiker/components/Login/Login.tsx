import React from "react";
import { Button, Pressable, StyleSheet, TextInput } from 'react-native'
import { Layout } from '../Layout'
import { EScreens } from '../Navigation/Navigation'

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250,
    },
    button: {
        width: 250,
    },
});

interface ILogin {
    navigation?: any;
}

export const Login: React.FC<ILogin> = ({navigation}) => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    return (
        <Layout>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
            />
            <Pressable style={styles.button}>
                <Button title="Login" onPress={() => {navigation.navigate(EScreens.MAP)}}>
                    Login
                </Button>
            </Pressable>
        </Layout>
    );
};
