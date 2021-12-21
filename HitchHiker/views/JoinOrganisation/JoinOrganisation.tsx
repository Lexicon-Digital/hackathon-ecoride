import React from "react";
import {Button, SafeAreaView, StyleSheet, Text} from "react-native";
import { Text as RNEText } from "react-native-elements";

type JoinOrganisationProps = {
    organisationName: string;
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

export const JoinOrganisation: React.VFC<JoinOrganisationProps> = ({ organisationName }) => {

    const handleJoinOrganisation = () => {};

    return (
        <SafeAreaView style={styles.joinOrg}>
            <RNEText h1 style={styles.title}>Hitch Hiker</RNEText>
            <Text style={styles.inviteMessage}>You've been invited to join {organisationName}'s organisation!</Text>
            <Button title={`Join ${organisationName}`} onPress={handleJoinOrganisation} />
        </SafeAreaView>
    );
};