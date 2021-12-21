import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = (props: {backgroundColor: string; width?: number}) =>
  StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.backgroundColor,
      maxWidth: 450,
      width: props?.width,
    },
  });

interface ILayout {
  width?: number;
}

export const Layout: React.FC<ILayout> = ({children, width}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    width: width,
  };

  return (
    <SafeAreaView style={styles(backgroundStyle).background}>
      {children}
    </SafeAreaView>
  );
};
