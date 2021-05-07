import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import { sizeWidth, sizeFont } from "../../../../../utils/helper/size.helper";
import IconComponets from "../../../../../components/icon";

export default class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      image: "",
    };
  }
  render() {
    const { title, content, image } = this.state;
    return (
      <View>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>Tiêu đề*</Text>
          <TextInput
            value={title}
            style={styles.textInputTitle}
            onChangeText={(text) =>
              this.setState({
                title: text,
              })
            }
          />
        </View>
        <View
          style={{
            paddingHorizontal: sizeWidth(2.5),
          }}
        >
          <Text style={styles.textTitle}>Ảnh đại diện</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <IconComponets size={sizeFont(5)} color="#999" name="camera" />
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.textTitle}>Nội dung</Text>
          <TextInput
            multiline
            value={content}
            style={styles.textInputContent}
            onChangeText={(text) =>
              this.setState({
                content: text,
              })
            }
          />
        </View>

        <TouchableOpacity style={styles.touchAdd}>
          <Text style={styles.textAdd}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
