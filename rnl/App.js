import React, { Component } from "react";
import { FlatList, Image, View, Text } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something two"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something three"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something four"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something five"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something six"
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <View style={{ padding: 0, width: 160, height: 200 }}>
              <Image source={{ uri: rowData.imageUrl }} style={{ resizeMode: 'center', height: 160, width: 160}}/>
              <Text style={{ marginBottom: 10 }}>
                {rowData.title}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => item.title}
      />
    );
  }
}
