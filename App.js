import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo';

const { height, width } = Dimensions.get("window");

export default class App extends Component {

  _controlNewToDo = text => {
    this.setState({ newToDo: text });
  };

  state = {
    newToDo: ""
  };

  render() {
    const { newToDo } = this.state;
    return <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            value={newToDo} 
            onChangeText={this._controlNewToDo} 
            placeholder="New To Do" 
            placeholderTextColor={"#999"} 
            returnKeyType={"done"} 
            autoCorrect={false} 
          />
          <ScrollView contentContainerStyle={styles.toDos} >
            <ToDo />
          </ScrollView>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "200",
    marginTop: 50,
    marginBottom: 30
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1,
        }
      },
      android: { elevation: 3, }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "600",
  },
  toDos: {
    alignItems: "center",
  },
});