import React, { Component } from 'react';
import { StyleSheet,Text,View, Dimensions, TouchableOpacity, TextInput } from "react-native";

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
    
    state = { 
        isEditing: false,
        isCompleted: false,
        toDoValue: "",
    };

    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>
                    {isEditing ? 
                        <TextInput 
                            value={toDoValue} 
                            style={[styles.text, styles.input, isCompleted ? styles.completedText: styles.uncompletedText]}
                            multiline={true}
                            returnKeyType={"done"}
                            autoCorrect={false}
                            onChange={this._controlInput}
                            onBlur={this._finishEditing}
                             />
                    :
                        <Text style={[styles.text, isCompleted ? styles.completedText: styles.uncompletedText]}>
                            { text }
                        </Text>
                    }
                </View>
                {isEditing ? 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>️✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>️✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>️❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

    _toggleComplete = () => {
        this.setState(prevState => {
            return { isCompleted: !prevState.isCompleted }
        });
    };

    _startEditing = () => {
        const { text } = this.props;
        this.setState({ 
            isEditing: true,
            toDoValue: text,
        });
    };

    _finishEditing = () => {
        this.setState({ isEditing: false });  
    };

    _controlInput = text => {
        this.setState({ toDoValue: text })
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "row",
    width: width / 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 17,
    marginVertical: 20
  },
  input: {
    marginVertical: 15,
    paddingBottom: 5,
    width: width / 2,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  }
});
