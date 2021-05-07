import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";
import { COLOR } from "../../../../utils/color/colors";
import IconComponets from "../../../../components/icon";
import { UpdateInforAccount } from "../../../../service/account";
import { connect } from "react-redux";
import { AlertCommon, ElementCustom } from "../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { GetProfile } from "../../../../action/authAction";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      nameShop: authUser.USERNAME,
      phoneText: "",
      emailText: authUser.EMAIL ? authUser.EMAIL : "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      imageAvatar: authUser.AVATAR ? authUser.AVATAR : "",
      loading: false,
    };
  }
  handleImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data)
        );
      }
    });
  };
  upload = (source, data) => {
    if (source != null) {
      var photo = { ...source, name: "image.jpg", type: "image/jpeg" };

      //If file selected then create FormData
      const data = new FormData();
      data.append("name", "imagefile");
      data.append("image", photo);
      fetch("http://admin.babumart.vn/f/upload_image.jsp", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
          "Content-Disposition": "form-data",
        },
      })
        .then(async (res) => {
          let responseJson = await res.json();
          if (responseJson.ERROR == "0000") {

            this.setState(
              {
                imageAvatar: responseJson.URL,
              },
              () => this.setState({ loading: false })
            );

            //this.props.onChange(responseJson.URL);
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Thông báo", result.data.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
        });
    }
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  }
  updateAmdmin = () => {
    const {
      phoneText,
      emailText,
      oldPassword,
      newPassword,
      confirmPassword,
      imageAvatar,
      nameShop,
    } = this.state;
    const { authUser } = this.props;
    UpdateInforAccount({
      USERNAME: authUser.USERNAME,
      USER_CTV: authUser.USERNAME,
      NAME: nameShop,
      DOB: null,
      GENDER: null,
      EMAIL: emailText,
      CITY_NAME: null,
      DISTRICT_NAME: null,
      ADDRESS: null,
      STK: null,
      TENTK: null,
      TENNH: null,
      AVATAR: imageAvatar,
      IDSHOP: 'http://banbuonthuoc.moma.vn',
      CMT: null,
      IMG1: null,
      IMG2: null,
      WARD_NAME: null,
      OLD_PWD: oldPassword,
      NEW_PWD: newPassword,
    })
      .then((result) => {
        if (result.data.ERROR === "00000") {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.props
                .GetProfile({
                  IDSHOP: 'http://banbuonthuoc.moma.vn',
                  USER_CTV: this.props.authUser.USERNAME,
                  USERNAME: this.props.authUser.USERNAME,
                })
                .then((result) => {
                })
                .catch((error) => {
                  this.setState({ loading: false });
                });
              this.message = setTimeout(
                () => AlertCommon("Thông báo", result.data.RESULT, () => null),
                10
              );
            }
          );
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.message = setTimeout(
                () =>
                  AlertCommon("Thông báo", result.data.RESULT, () => {
                    this.props.navigation.popToTop();
                    this.props.navigation.navigate("home");
                  }),
                10
              );
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  render() {
    const {
      nameShop,
      phoneText,
      emailText,
      oldPassword,
      newPassword,
      confirmPassword,
      loading,
      imageAvatar,
    } = this.state;
    const { authUser } = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Spinner
          visible={loading}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <View
          style={{
            marginVertical: sizeHeight(2),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {authUser.AVATAR == null ? (
            <IconComponets
              name="user-circle"
              size={sizeFont(20)}
              color={COLOR.BUTTON}
            />
          ) : (
            <Avatar
              size={"xlarge"}
              containerStyle={{
                borderWidth: 0.2,
                borderColor: COLOR.BUTTON,
              }}
              rounded
              source={{
                uri: imageAvatar,
              }}
            />
          )}
          <TouchableOpacity
            onPress={this.handleImage}
            style={{
              position: "absolute",
              bottom: sizeHeight(4),
              right: sizeWidth(20),
            }}
          >
            <IconComponets
              name="camera"
              size={sizeFont(8)}
              color={COLOR.BUTTON}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewCommon}>
          <Text style={styles.textTitle}>Tên shop</Text>
          <TextInput
            value={nameShop}
            onChangeText={(text) => this.setState({ nameShop: text })}
            style={styles.viewTextInput}
          />
        </View>
        <View style={styles.viewCommon}>
          <Text style={styles.textTitle}>Số điện thoại</Text>
          <TextInput
            value={phoneText}
            keyboardType="number-pad"
            onChangeText={(text) => this.setState({ phoneText: text })}
            style={styles.viewTextInput}
          />
        </View>
        <View style={styles.viewCommon}>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            value={emailText}
            onChangeText={(text) => this.setState({ emailText: text })}
            style={styles.viewTextInput}
          />
        </View>
        <View style={{ marginTop: sizeHeight(8) }}>
          <Text
            style={{
              backgroundColor: "#999",
              fontSize: sizeFont(4),
              fontWeight: "bold",
              opacity: 0.8,
              paddingVertical: sizeHeight(2),
              paddingHorizontal: sizeWidth(2.5),
            }}
          >
            Đổi mật khẩu
          </Text>
          <View style={[styles.viewCommon, { marginTop: sizeHeight(4) }]}>
            <Text style={styles.textTitle}>Mật khẩu cũ</Text>
            <TextInput
              value={oldPassword}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ oldPassword: text })}
              style={styles.textInputChild}
            />
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.textTitle}>Mật khẩu mới</Text>
            <TextInput
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ newPassword: text })}
              style={styles.textInputChild}
            />
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.textTitle}>Nhập lại mật khẩu mới</Text>
            <TextInput
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              style={styles.textInputChild}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (newPassword !== confirmPassword) {
              AlertCommon(
                "Thông báo",
                "Mật khẩu mới không trùng khớp",
                () => null
              );
            } else {
              this.setState({ loading: true }, () => this.updateAmdmin());
            }
          }}
          style={{
            backgroundColor: COLOR.BUTTON,
            paddingVertical: sizeHeight(2),
            marginVertical: sizeHeight(2),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: sizeFont(4),
            }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.5),
    marginVertical: sizeHeight(1),
    alignItems: "center",
    alignContent: "center",
  },
  viewTextInput: {
    width: sizeWidth(70),
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2),
  },
  textTitle: {
    fontSize: sizeFont(4),
    fontWeight: "500",
  },
  textInputChild: {
    width: sizeWidth(50),
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: sizeHeight(1.5),
    paddingHorizontal: sizeWidth(2),
  },
});
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { GetProfile: (text) => dispatch(GetProfile(text)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccount);
