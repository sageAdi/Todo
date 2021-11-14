import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {List, RadioButton} from 'react-native-paper';
import database from '@react-native-firebase/database';

const ListItem = ({todo, id}) => {
  const [checked, setChecked] = useState();
  const styles = StyleSheet.create({
    listChecked:
      checked === 'true'
        ? {backgroundColor: '#808080', margin: 4}
        : {backgroundColor: '#c9e9f6', margin: 4},
  });
  const handleOnRadioBtnPressed = () => {
    if (todo[id].checked === 'true') {
      database().ref(`/user_1/${id}`).update({checked: 'false'});
      setChecked('false');
    } else {
      database().ref(`/user_1/${id}`).update({checked: 'true'});
      setChecked('true');
    }
  };
  return (
    <List.Item
      title={todo[id].title}
      description={todo[id].description}
      key={id}
      style={styles.listChecked}
      onPress={() => console.log('listPressed')}
      left={() => (
        <RadioButton
          status={todo[id].checked === 'true' ? 'checked' : 'unchecked'}
          onPress={() => handleOnRadioBtnPressed(id)}
        />
      )}
    />
  );
};

export default ListItem;
