import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Toast, Container } from "native-base";
import LogoApp from "../../logo";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import ComponentTextInput from "../../../../components/textinput";
import { connect } from "react-redux";
import { LoginPhone } from "../../../../action/authAction";
import Loading from "../../../../components/loading";
import ErrorDisplay, {
  ToastCommon,
  AlertCommon,
} from "../../../../components/error";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: "",
      password: "",
      loading: false,
    };
    this.times;
    this.message = "";
  }
  showToast = (res) => {
    Toast.show({
      text: res.data.RESULT,
      duration: 3000,
      textStyle: {
        color: "red",
        fontSize: sizeFont(4),
        textAlign: "center",
      },
      style: {
        backgroundColor: "#ddd",
        borderRadius: 6,
      },
    });
  };
  render() {
    const { phoneText, password, loading } = this.state;
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          backgroundColor: "#fff",
          paddingBottom: sizeHeight(20),
          //height: "100%",
        }}
      >
        <View style={{ height: sizeHeight(86) }}>
          <View style={{}}>
            <LogoApp />
          </View>
          <View style={{}}>
            <ComponentTextInput
              placeholder="Số điện thoại của bạn"
              placeholderTextColor="#999"
              type="phone"
              size={sizeFont(6)}
              nameIcon={"user-circle"}
              name={"times-circle"}
              value={phoneText}
              onChangeText={(text) => this.setState({ phoneText: text })}
              //primary={"#017DFF"}
              primary={"#fff"}
              color={COLOR.COLOR_ICON}
              onDelete={() => this.setState({ phoneText: "" })}
              style={{}}
            />
            <ComponentTextInput
              placeholder="Mật khẩu"
              placeholderTextColor="#999"
              type="password"
              size={sizeFont(6)}
              nameIcon={"lock-alt"} color="red"
              onChangeText={(text) => this.setState({ password: text })}
              // primary={"#017DFF"}
              primary={"#fff"}
              color={COLOR.COLOR_ICON}
              value={password}
              onDelete={() => this.setState({ password: "" })}
              style={{}}
            />
          </View>
          <View style={{ alignSelf: "center", marginTop: sizeHeight(8) }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ loading: true }, async () => {
                  if (phoneText == " " && phoneText == "") {
                    AlertCommon("Thông báo", "Vui lòng nhập số điện thoại", () => null);
                  } else if (password == "") {
                    AlertCommon("Thông báo", "Vui lòng nhập mật khẩu", () => null);
                  } else {
                    await this.props
                      .LoginPhone({
                        IDSHOP: 'ABC123',
                        USERNAME: phoneText,
                        PASSWORD: password,
                      })
                      .then((res) => {
                        if (res.data.ERROR == "0000") {
                          this.props.navigation.popToTop();
                          this.props.navigation.navigate("screenHome");
                        } else {
                          AlertCommon("Thông báo", "Tên đăng nhập hoặc mật khẩu không đúng", () => null);
                        }
                      })
                      .catch((err) => {
                      });
                  }
                  this.setState({ loading: false });
                });
              }}
              style={{
                backgroundColor: COLOR.BUTTON_SIGN_IN,
                paddingVertical: sizeHeight(1.5),
                borderRadius: 100,
                width: sizeWidth(65),
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: sizeFont(4),
                  fontWeight: "600",
                }}
              >
                ĐĂNG NHẬP
              </Text>
            </TouchableOpacity>
            {this.message ? <ErrorDisplay message={this.message} /> : null}
            {loading ? <Loading /> : null}
            <TouchableOpacity
              style={{ marginTop: sizeHeight(5) }}
              onPress={() =>
                AlertCommon(
                  "Thông báo",
                  "Vui lòng liên hệ với f5sell để được cấp lại mật khẩu mới",
                  () => null
                )
              }
            >
              <Text style={{ textAlign: "center" }}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: sizeHeight(5) }}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={{ textAlign: "center", fontSize: sizeFont(4) }}>
                Bạn chưa có tài khoản ? Đăng kí ngay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { LoginPhone: (data) => dispatch(LoginPhone(data)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);