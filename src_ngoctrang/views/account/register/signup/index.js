import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  TextInput,
  Image,
} from "react-native";
import { ComponentSign } from "../../../../components/textinput";
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import {checkPassword} from "../../../../utils/helper/password_validator";
import { COLOR } from "../../../../utils/color/colors";
import styles from "./style";
import { AlertCommon } from "../../../../components/error";
import { regUser } from "../../../../service/auth";
import { result } from "lodash";
import IconComponets from "../../../../components/icon";
import {
  checkFullName,
  isVietnamesePhoneNumber,
  checkPass,
  validateEmail,
  alphanumeric,
} from "../../../../utils/check";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: "",
      phoneText: "",
      passwordText: "",
      emailText: "",
      cityText: "",
      districtText: "",
      addressText: "",
      idShop: "",
      codeinfo: "",
      confirmPassword: ""
    };
  }
  onBack = () => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate("home");
  };
  handleReg = () => {
    const { phoneText, passwordText, emailText, cityText, districtText, confirmPassword, nameText, codeinfo } = this.state;
    Keyboard.dismiss();
    if (phoneText.trim() == "" || !isVietnamesePhoneNumber(phoneText)) {
      AlertCommon(
        "Thông báo",
        "Vui lòng nhập số điện thoại và chỉ gồm 10 chữ số",
        () => null
      );
    }
    else if (
      nameText.trim() == "" ||
      !alphanumeric(nameText) ||
      nameText.length > 50
    ) {
      AlertCommon(
        "Thông báo",
        "Vui lòng nhập họ và tên chỉ gồm chữ và số và nhỏ hơn 50 kí tự",
        () => null
      );
    }
    else if (passwordText.length<8) {
      AlertCommon(
        "Mật khẩu yếu",
        "Mật khẩu phải có độ dài lớn hơn 8",
        () => null
      );
    }
    else if (confirmPassword !== passwordText) {
      AlertCommon("Thống báo", "Xác thực mật khẩu không chính xác", () => null
      );
    } else {
      regUser({
        FULL_NAME: nameText,
        MOBILE: phoneText,
        EMAIL: emailText,
        ID_CITY: '',
        ID_DISTRICT: '',
        INVITE_CODE: codeinfo,
        ADDRESS: districtText,
        PASSWORD: passwordText,
        IDSHOP: 'http://banbuonthuoc.moma.vn',
      })
        .then((result) => {
          if (result.data.ERROR == "0000") {
            return AlertCommon("Thông báo", result.data.RESULT, () => { this.props.navigation.navigate("SignIn") });
          } else {
            return AlertCommon("Thông báo", result.data.RESULT, () => null);
          }
        })
        .catch((err) => {
        });

    }

  };
  render() {
    const { phoneText, passwordText, codeinfo, confirmPassword, emailText, cityText, districtText, addressText, idShop, nameText } = this.state;
    return (
      <ScrollView
        style={{ height: sizeHeight(100), backgroundColor: COLOR.MAIN }}

      >
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(3) }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', padding: 20, flexDirection: 'row', width: sizeWidth(100) }}>
            <View></View>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold' }}>Đăng ký</Text>
            <TouchableOpacity

              onPress={() => this.props.navigation.navigate("screenHome")}
            >
              <Image
                source={require('../../../../assets/images/daux1.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Số điện thoại * (tài khoản)</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/phone1.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập số điện thoại"
                placeholderTextColor='#fff'
                onChangeText={(text) => this.setState({ phoneText: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>
          <View style={{ marginTop: sizeHeight(2.5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Họ và tên *</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/pen.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập họ và tên"
                placeholderTextColor='#fff'
                onChangeText={(text) => this.setState({ nameText: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>


          <View style={{ marginTop: sizeHeight(2.5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Mật khẩu</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/pass1.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập mật khẩu"
                placeholderTextColor='#fff'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ passwordText: text })}
                changeRef={(ref) => (this.focusPass = ref)}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>

          <View style={{ marginTop: sizeHeight(2.5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Xác nhận mật khẩu</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/pass1.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập xác nhận mật khẩu"
                placeholderTextColor='#fff'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ confirmPassword: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>

          <View style={{ marginTop: sizeHeight(2.5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Mã giới thiệu</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d', borderRadius: 5
            }}>
              <Image
                source={require('../../../../assets/images/codectv.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập mã giới thiệu"
                placeholderTextColor='#fff'
                onChangeText={(text) => this.setState({ codeinfo: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewFooter}>
          <TouchableOpacity style={styles.touchSignUp} onPress={this.handleReg}>
            <Text style={styles.textSignUp}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: sizeHeight(5) }}
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.textFoot}>
              Bạn đã có tài khoản ? Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom:
              Platform.OS == "ios" ? sizeHeight(25) : sizeHeight(10),
          }}
        />
      </ScrollView>
    );
  }
}
