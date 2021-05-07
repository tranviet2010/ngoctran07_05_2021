import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../style";
import { COLOR } from "../../../../utils/color/colors";
import { sizeFont } from "../../../../utils/helper/size.helper";
import IconComponets from "../../../../components/icon";
import { connect } from "react-redux";

class Information extends Component {
  navigationNavigate = (item) => {
    const { authUser, navigation } = this.props;
    navigation.navigate(item);
  };
  render() {
    const { authUser } = this.props;
    return authUser.GROUPS === "3" ? (
      <View style={{}}>
        <Text style={styles.textTitle}>Thông tin</Text>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("Introduction")}
        >
          <Text style={styles.textContent}>Giới thiệu</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("Policy")}
        >
          <Text style={styles.textContent}>Chính sách</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("Tranning")}
        >
          <Text style={styles.textContent}>Đào tạo</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.navigationNavigate("News")}
        >
          <Text style={styles.textContent}>Tin tức sự kiện</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Điều khoản</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchCommon, { borderBottomWidth: 0 }]}
          onPress={() => this.props.navigation.navigate("SendNotify")}
        >
          <Text style={styles.textContent}>Gửi thông báo</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.COLOR_RIGHT}
            light
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <Text style={styles.textTitle}>Thông tin</Text>
        <TouchableOpacity
          style={styles.touchCommon}
          onPress={() => this.props.navigation.navigate("About")}
        >
          <Text style={styles.textContent}>Babu Mart</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Điều khoản</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchCommon}>
          <Text style={styles.textContent}>Chia sẻ</Text>
          <IconComponets
            name="chevron-right"
            size={sizeFont(4)}
            color={COLOR.BUTTON}
            light
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Information);
