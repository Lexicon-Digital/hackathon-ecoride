import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {Layout} from '../Layout';
import {EScreens} from '../Navigation/Navigation';
import {Input, Button} from 'react-native-elements';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  button: {
    width: 300,
  },
  loginLink: {
    textDecorationLine: 'underline',
  },
  loginText: {
    marginTop: 15,
    textAlign: 'center',
  },
});

interface ILogin {
  navigation?: any;
}

export const Login: React.FC<ILogin> = ({navigation}) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const isButtonDisabled = (): boolean => !username || !password;

  return (
    <Layout>
      <Input
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        containerStyle={{
          width: 300,
        }}
        autoCompleteType={undefined}
      />
      <Input
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        containerStyle={{
          width: 300,
        }}
        autoCompleteType={undefined}
      />
      <Pressable style={styles.button}>
        <Button
          onPress={() => navigation.navigate(EScreens.CARPOOL_LIST)}
          title="Login"
          disabled={isButtonDisabled()}
          buttonStyle={{
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(EScreens.SIGN_UP)}
      >
        <Text style={styles.loginText}>
          Don't have an account? <Text style={styles.loginLink}>Sign up</Text>
        </Text>
      </Pressable>
    </Layout>
  );
};
