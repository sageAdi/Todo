import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import database from '@react-native-firebase/database';

const AddTodo = ({navigation}) => {
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const handleSave = () => {
    database().ref(`/user_1/${uuidv4()}`).set({
      title,
      description,
      checked: 'false',
    });
  };

  return (
    <View>
      <View style={styles.formGroup}>
        <TextInput
          label="Title"
          placeholder="Enter title"
          mode="outlined"
          onChangeText={setTitle}
        />
        <TextInput
          label="Description"
          placeholder="Enter description"
          mode="outlined"
          multiline={true}
          numberOfLines={8}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.constainer}>
        <Button mode="contained" onPress={handleSave}>
          Save
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  constainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  formGroup: {
    padding: 10,
  },
});
