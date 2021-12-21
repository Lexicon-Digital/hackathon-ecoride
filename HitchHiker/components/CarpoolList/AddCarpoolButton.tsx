import React from 'react';
import { SpeedDial } from 'react-native-elements'
import { StyleSheet } from 'react-native'

interface IAddCarpoolButton {
    openForm: () => void;
}

export const AddCarpoolButton: React.FC<IAddCarpoolButton> = ({openForm}) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const controlDial = () => {
        setOpen(false);
        openForm();
    }

    return (
        <SpeedDial
            isOpen={open}
            icon={{ name: 'settings', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            buttonStyle={styles.mainFAB}
        >
            <SpeedDial.Action
                buttonStyle={styles.speedDialFAB}
                icon={{ name: 'add', color: '#fff' }}
                title="Add"
                onPress={controlDial}
            />
            <SpeedDial.Action
                buttonStyle={styles.speedDialFAB}
                icon={{ name: 'person', color: '#fff' }}
                title="Profile"
                onPress={() => console.log('Help me!')}
            />
        </SpeedDial>
    );
};


const styles = StyleSheet.create({
    mainFAB: {
        backgroundColor: '#069d33',
    },
    speedDialFAB: {
        backgroundColor: '#03b173',
    },
});
