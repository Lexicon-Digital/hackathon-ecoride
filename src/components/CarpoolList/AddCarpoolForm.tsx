import React from 'react';
import {Overlay, Button, Icon, Input} from 'react-native-elements';
import {StyleSheet, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {ICarpoolTripData} from './CarpoolList';

interface IAddCarpoolForm {
  controlClose: () => void;
  isOpen: boolean;
  addCarpool: (carpool: Omit<ICarpoolTripData, 'driver'>) => void;
}

export const AddCarpoolForm: React.FC<IAddCarpoolForm> = ({
  isOpen,
  controlClose,
  addCarpool,
}) => {
  const [description, setDescription] = React.useState<string>('');
  const [date, setDate] = React.useState<Date>(new Date());

  const controlOverlay = () => {
    controlClose();
  };

  const newCarpool = () => {
    const timezone = format(date, 'dd/MM/yyyy h:mm a');
    addCarpool({
      description,
      date: timezone,
    });
    controlOverlay();
  };

  return (
    <Overlay isVisible={isOpen} onBackdropPress={controlOverlay}>
      <Text style={styles.textPrimary}>Make an EcoRide!</Text>
      <Input
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        containerStyle={{
          width: 300,
        }}
        autoCompleteType={undefined}
      />
      <Text style={styles.textPrimary}>Set EcoRide time:</Text>
      <DatePicker
        style={styles.datePicker}
        date={date}
        onConfirm={date => setDate(date)}
      />
      <Button
        buttonStyle={styles.newRide}
        disabled={!description || !date}
        icon={
          <Icon
            name="save"
            type="font-awesome"
            color="white"
            size={25}
            iconStyle={{marginRight: 10}}
            tvParallaxProperties={undefined}
          />
        }
        title="Create EcoRide"
        onPress={newCarpool}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    marginBottom: 30,
  },
  newRide: {
    backgroundColor: '#069d33',
  },
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});
