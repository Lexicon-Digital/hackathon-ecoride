import React from "react";
import { Button, Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { Layout } from '../Layout'
import { EScreens } from '../Navigation/Navigation'

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
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
            <Pressable style={styles.button}>
                <Button title="Sign Up" onPress={() => navigation.navigate(EScreens.MAP)}>
                    Sign Up
                </Button>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate(EScreens.LOGIN)}>
                <Text style={styles.loginText}>
                    Already have an account? <Text style={styles.loginLink}>Log in</Text>
                </Text>
            </Pressable>
        </Layout>
    );
};
