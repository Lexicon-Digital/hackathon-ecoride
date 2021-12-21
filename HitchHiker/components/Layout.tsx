import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const styles = (props: { backgroundColor: string }) => StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.backgroundColor,
    },
})

export const Layout: React.FC = ({children}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={styles(backgroundStyle).background}>
            {children}
        </SafeAreaView>
    );
};
