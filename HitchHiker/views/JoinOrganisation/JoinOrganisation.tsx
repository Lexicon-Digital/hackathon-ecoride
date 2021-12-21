import React from "react";
import { Text as RNEText } from "react-native-elements";
import {Button, SafeAreaView, StyleSheet, Text, ToastAndroid} from "react-native";
import {Navigation} from "../../components/Navigation/Navigation";

type JoinOrganisationProps = {
    organisationName: string;
    navigation: Navigation;
};

const styles = StyleSheet.create({
    joinOrg: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        height: "100%",
    },
    title: {
        textAlign: "center",
    },
    inviteMessage: {
        textAlign: "center"
    }
});

export const JoinOrganisation: React.VFC<JoinOrganisationProps> = ({ organisationName, navigation }) => {
    const handleJoin = async () => {
        await new Promise(resolve => { setTimeout(resolve, 4000)});

        ToastAndroid.show(`You have been accepted into ${organisationName}'s organisation`, 1000);

        navigation.navigate("SignUp")
    };

    return (
        <SafeAreaView style={styles.joinOrg}>
            <RNEText h1 style={styles.title}>Hitch Hiker</RNEText>
            <Text style={styles.inviteMessage}>You've been invited to join {organisationName}'s organisation!</Text>
            <Button title={`Request to join ${organisationName}`} onPress={handleJoin} />
        </SafeAreaView>
    );
};