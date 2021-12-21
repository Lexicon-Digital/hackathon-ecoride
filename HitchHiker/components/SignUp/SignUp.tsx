import React from "react";
import { Button, StyleSheet, TextInput } from 'react-native'
import { Layout } from '../Layout'

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

interface ISignUp {
    navigation?: any;
}

export const SignUp: React.FC<ISignUp> = ({navigation}) => {
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
            <Button title="Sign Up" onPress={() => {navigation.navigate("Map")}}>
                Sign Up
            </Button>
        </Layout>
    );
};
