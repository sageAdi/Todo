import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {FAB, List} from 'react-native-paper';
import database from '@react-native-firebase/database';
import ListItem from '../components/ListItem/Listitem';

const Home = ({navigation}) => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const onValueChanged = database()
      .ref('/user_1')
      .on('value', snapshot => {
        setTodo(snapshot.val());
        // console.log('User data: ', snapshot.val());
      });
    return () => database().ref('/users_1').off('value', onValueChanged);
  }, []);

  return (
    <View style={styles.container}>
      <Text h4>Manage your Todos</Text>
      <List.Section>
        {Object.keys(todo).map(id => (
          <ListItem todo={todo} id={id} key={id} />
        ))}
      </List.Section>
      <FAB
        style={styles.fab}
        icon="plus"
        color="#ffffff"
        onPress={() => navigation.navigate('Details', {title: 'Add Todos'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
