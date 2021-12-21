import React, {useState} from "react";
import {LinearProgress, Overlay, Text as RNEText} from "react-native-elements";
import {Button, SafeAreaView, StyleSheet, Text, ToastAndroid, View} from "react-native";
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
    const [isLoading, setIsLoading] = useState(false);
    const handleJoin = async () => {
        setIsLoading(true)
        // Fake wait to simulate request being confirmed by admin
        await new Promise(resolve => { setTimeout(resolve, 4000)});

        ToastAndroid.show(`You have been accepted into ${organisationName}'s organisation`, 1000);

        setIsLoading(false)
        navigation.navigate("SignUp")
    };

    return (
        <SafeAreaView style={styles.joinOrg}>
            <RNEText h1 style={styles.title}>EcoRide</RNEText>
            <Text style={styles.inviteMessage}>You've been invited to join {organisationName}'s organisation!</Text>
            <View>
                {isLoading && <LinearProgress />}
                <Button title={`Request to join ${organisationName}`} onPress={handleJoin} disabled={isLoading} />
            </View>
        </SafeAreaView>
    );
};
