import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Keyboard, Alert, Clipboard, Platform, Modal } from "react-native";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";
import { LoginPhone } from "../../../../action/authAction";
import { Toast, Container } from "native-base";
import { GetCTVDetail } from "../../../../service/rose";

import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import {
  alphanumeric,
  checkFullName,
  isVietnamesePhoneNumber,
  checkAccountBank,
  validateEmail,
  checkAgent,
} from "../../../../utils/check";
import ComponentTextInput, {
  FormTextInput,
  FormTextInputNoIcon,
} from "../../../../components/textinput";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
// import Clipboard from '@react-native-community/clipboard';
import { _retrieveData } from "../../../../utils/asynStorage";
import { PASSWORD } from "../../../../utils/asynStorage/store";
import { COLOR } from "../../../../utils/color/colors";
import { Provider } from "react-native-paper";
import IconComponets from "../../../../components/icon";
import styles from "./style";
import moment from "moment";
import AlertDesignNotification from "../../../../components/alert/AlertDesignNotification";
import { UpdateInforAccount } from "../../../../service/account";
// import api from "../../../../api";
// import axios from "axios";
// import { bank } from './bank/listbank';
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../../../components/error";
import { GetProfile } from "../../../../action/authAction";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  maxWidth: 720,
  maxHeight: 1080,
};
class UpdateInformation extends Component {
  constructor(props) {
    super(props);
    const { authUser } = this.props;
    this.state = {
      phoneText: authUser.MOBILE,
      userName: authUser.FULL_NAME,
      idStore: authUser.USER_CODE,
      levelStore: authUser.GROUPS,
      nameLogin: authUser.USERNAME,
      email: authUser.EMAIL ? authUser.EMAIL : "",
      dayOfBirth: authUser.DOB
        ? moment(authUser.DOB, "DD/MM/YYYY").format("DD/MM/YYYY")
        : moment("01/01/1990").format("DD/MM/YYYY"),
      gender: authUser.GENDER == 'Nam' ? 1 : 0,
      address: authUser.ADDRESS ? authUser.ADDRESS : "",
      passport: authUser.SO_CMT ? authUser.SO_CMT : "",
      account: authUser.STK ? authUser.STK : "",
      nameAccount: authUser.TENTK ? authUser.TENTK : "",
      nameBank: authUser.TEN_NH,
      chinhanh: authUser.CHINHANH_NH,
      showAlert: false,
      brankBank: '',
      value:0,
      modalVisible: false,
      rose: authUser.COMISSION,
      city:
        authUser.CITY == null
          ? ""
          : {
            NAME: authUser.CITY,
            MATP: authUser.CITY_ID,
          },
      district:
        authUser.DISTRICT == null
          ? ""
          : {
            NAME: authUser.DISTRICT,
            MAQH: authUser.DISTRICT_ID,
          },
      districChild: '',
      loading: false,
      imageAvatar: !authUser.AVATAR ? "" : authUser.AVATAR,
      CMT_1: authUser.IMG1 ? authUser.IMG1 : "",
      CMT_2: authUser.IMG2 ? authUser.IMG2 : "",
      showCalendar: false,
      photo: null,
    };
    this.message = "";
    this.refs.focusFullName;
    this.refs.focusPhone;
    this.refs.focusBankNum;
    this.refs.focusEmail;
    this.refs.focusBrank;
    this.refs.focusNameBank;
    this.refs.foucsAddress;
    this.refs.focusCMNN;
    this.focusPassport;
  }

  handleDate = (item) => {
    this.setState({ showCalendar: false }, () =>
      this.setState({ dayOfBirth: moment(item).format("DD/MM/YYYY") })
    );
  };
  updateAccount = () => {
    const {
      gender,
      userName,
      passport,
      district,
      districChild,
      city,
      address,
      account,
      nameAccount,
      nameBank,
      imageAvatar,
      CMT_1,
      CMT_2,
      dayOfBirth,
      phoneText,
      email,
      brankBank,
      chinhanh,
    } = this.state;
    const { authUser } = this.props;
    Keyboard.dismiss();
    if (userName.trim() === "" || userName.length > 50 || !checkFullName(userName)) {
      return Alert.alert(
        "Th??ng b??o",
        "Nh???p h??? v?? t??n ch??? g???m ch???, kh??ng c?? k?? t??? ????c bi???t v?? nh??? h??n 50 k?? t???",
        // () => this.focusFullName.focus()
      );
    } else if (
      !isVietnamesePhoneNumber(phoneText) ||
      phoneText.length > 10
    ) {
      return Alert.alert(
        "Th??ng b??o",
        "Nh???p ????ng s??? ??i???n tho???i 0xxxxxxxxx",
        // () => this.focusPhone.focus()
      );
    } else if (
      !alphanumeric(address) ||
      address.length > 100
    ) {
      return Alert.alert(
        "Th??ng b??o",
        "?????a ch??? kh??ng nh???p qu?? 100 k?? t???, kh??ng bao g???m c??c k?? t??? ?????c bi???t",
        // () => this.focusPhone.focus()
      );
    }
    else if (
      nameAccount && (nameAccount.length > 100) &&
      account.trim() !== ""
    ) {
      Alert.alert(
        "Th??ng b??o",
        "T??n t??i kho???n kh??ng qu?? 100 k?? t??? v?? kh??ng ch???a k?? t??? ?????c bi???t",
        // () => this.focusBankNum.focus()
      );
    } else if (email != null && !validateEmail(email) && email.trim().length !== 0) {
      Alert.alert("Th??ng b??o", "Nh???p sai ?????nh d???ng email",
        // () =>this.focusEmail.focus()
      );
    }  else if (dayOfBirth == "") {
      Alert.alert("Th??ng b??o", "Nh???p ng??y th??ng n??m sinh c???a b???n", () => null);
    } 
    else if(!checkAccountBank(passport) || passport.length<8){
      Alert.alert("Th??ng b??o", "S??? CMND/CCCD ch??? nh???p v??o l?? s???, kh??ng ch???a c??c k?? t??? ?????c bi???t", () => null);
    }
    else if (
      nameBank && nameBank.length === 0 &&
      (account.length !== 0 ||
        nameAccount.length !== 0 ||
        brankBank.length !== 0) 
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Nh???p th??ng tin t??i kho???n ng??n h??ng",
        () => null
      );
    } else if (
      account && account.length === 0 &&
      (nameBank.length !== 0 ||
        nameAccount.length !== 0 ||
        brankBank.length !== 0 ||
        nameAccount.length > 20
      )
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Nh???p th??ng tin t??i kho???n nh??? h??n 20 ch??? s???",
      );
    }else if(!checkAccountBank(account)){
      Alert.alert(
        "Th??ng b??o",
        "S??? t??i kho???n ch??? g???m s??? v?? nh??? h??n 20 ch??? s???",
      );
    }
    else if (
      !checkFullName(nameAccount)
    ) {
      Alert.alert(
        "Th??ng b??o",
        "T??n t??i kho???n ch??? g???m ch???, kh??ng ch???a k?? t??? ?????c bi???t v?? nh??? h??n 50 k?? t???",
        // () => this.focusNameBank.focus()
      );
    } else if (
      chinhanh && (chinhanh.length > 50 || !alphanumeric(chinhanh)) &&
      chinhanh.trim() !== ""
    ) {
      Alert.alert(
        "Th??ng b??o",
        "Chi nh??nh ch??? g???m ch??? v?? s??? v?? nh??? h??n 50 k?? t???",
        // () => this.focusNameBank.focus()
      );
    }
    else {
      this.setState({
        loading: true,
      });
      UpdateInforAccount({
        USERNAME: authUser.USERNAME,
        USER_CTV: authUser.USERNAME,
        NAME: userName,
        DOB: dayOfBirth,
        GENDER: gender,
        EMAIL: email.trim(),
        CITY_NAME: city === "" ? "" : city.NAME,
        DISTRICT_NAME: district === "" ? "" : district.NAME,
        ADDRESS: address.trim(),
        STK: account.trim(),
        TENTK: nameAccount,
        TENNH: nameBank,
        AVATAR: imageAvatar,
        IDSHOP: 'http://banbuonthuoc.moma.vn',
        CMT: passport.trim(),
        IMG1: CMT_1,
        CHINHANHNH: chinhanh,
        IMG2: CMT_2,
        WARD_NAME: districChild ? districChild.vn_name : null,
        OLD_PWD: "",
        NEW_PWD: "",
        MOBILE: phoneText.trim(),
        LEVEL_AGENCY: authUser.LEVEL_AGENCY,
      })
        .then((result) => {
          console.log("update", result);
          if (result.data.ERROR === "0000") {
            this.setState( 
              {
                loading: false,
              },
              async () => {
                var password = '';
                await _retrieveData(PASSWORD).then((result) => {
                  if (result) {
                    password = result.substr(1).slice(0, -1)
                  }
                })
                this.props.LoginPhone({
                  IDSHOP: 'http://banbuonthuoc.moma.vn',
                  USERNAME: authUser.USERNAME,
                  PASSWORD: password,
                })
                  .then((result) => {
                    console.log(result, "login");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", result.data.RESULT, () => {
                      this.props.navigation.popToTop();
                      this.props.navigation.navigate("product");
                    }),
                  10
                );
              },
              this.GetCTV()
            );
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", result.data.RESULT, () => {
                      // this.props.navigation.popToTop();
                      // this.props.navigation.navigate("Home");
                    }),
                  10
                );
              }
            );
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          this.message = setTimeout(
            () => AlertCommon("Th??ng b??o", "C?? l???i x???y ra", () => null),
            5
          );
          console.log(error);
        });
    }
  };
  changeCity = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "" }, () => {
      });
    }
  };
  upload = (source, data, type) => {
    if (source != null) {
      var photo = { ...source, name: "image.jpg", type: "image/jpeg" };
      this.setState({
        loading: true,
      });
      const data = new FormData();
      data.append("name", "imagefile");
      data.append("image", photo);
      fetch("https://f5sell.com/f/upload_avatar.jsp", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
          "Content-Disposition": "form-data",
        },
      })
        .then(async (res) => {
          let responseJson = await res.json();
          console.log(responseJson);
          if (responseJson.ERROR == "0000") {
            console.log("Upload Successful", responseJson.URL);
            if (type === 1) {
              this.setState(
                {
                  imageAvatar: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 2) {
              this.setState(
                {
                  CMT_1: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            } else if (type === 3) {
              this.setState(
                {
                  CMT_2: responseJson.URL,
                },
                () => this.setState({ loading: false })
              );
            }
            //this.props.onChange(responseJson.URL);
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.message = setTimeout(
                  () =>
                    AlertCommon("Th??ng b??o", responseJson.RESULT, () => null),
                  10
                );
              }
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.setState({ loading: false });
          this.message = setTimeout(
            () => AlertCommon("Th??ng b??o", "C?? l???i x???y ra", () => null),
            5
          );
        });
    }
  };
  componentWillUnmount() {
    // this._unsubscribe();
    clearTimeout(this.message);
  }
  changeDistrict = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "" });
  };
  changeDistrictChild1 = (text) => {
    this.setState({ nameBank: text })
  }
  changeDistrictChild = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text });
  };
  handleImage = (type) => {
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data, type)
        );

        // console.log("image", response);
      }
    });
  };
  handleImageCamera = (type) => {
    launchCamera(options, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            loading: true,
          },
          () => this.upload(source, response.data, type)
        );

        console.log("image", response);
      }
    });
  }
  handlePicCamere = () => {

  }


  changeStateAccount = (text) => {
    this.setState({
      account: text,
    });
  };
  changeStateName = (text) => {
    this.setState({
      nameAccount: text,
    });
  };
  changechinhanh = (text) => {
    this.setState({
      chinhanh: text,
    });
  };
  GetCTV = () => {
    const { authUser } = this.props;
    GetCTVDetail({
      USERNAME: authUser.USERNAME,
      USER_CTV: authUser.USERNAME,
      IDSHOP: 'http://banbuonthuoc.moma.vn'
    }).then((res) => {
      console.log("abccccc", res.data)
      this.setState({
        districChild: res.data.WARD,
        imageAvatar: res.data.AVATAR
      })
    })
  }
  deleteStateAccount = () => {
    this.setState({
      account: "",
    });
  };
  deleteStateName = () => {
    this.setState({
      nameAccount: "",
    });
  };
  deleteStateBank = () => {
    this.setState({
      nameBank: "",
    });
  };
  componentDidMount() {
    this.GetCTV();
  }
  render() {
    const {
      phoneText,
      userName,
      idStore,
      levelStore,
      email,
      dayOfBirth,
      gender,
      city,
      district,
      districChild,
      address,
      passport,
      nameBank,
      nameAccount,
      account,
      showAlert,
      loading,
      imageAvatar,
      CMT_1,
      CMT_2,
      chinhanh,
      nameLogin,
      value,
      modalVisible,
      showCalendar,
      photo,
      rose,
    } = this.state;
    const { authUser } = this.props;
    
    console.log('authUser========CMT_1', CMT_1);
    console.log("districChild======", authUser);
    return (
      <Provider>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner
            visible={loading}
            customIndicator={<ElementCustom />}
          />
          <View style={styles.viewAvatar}>
            {this.state.imageAvatar == null ? (
              <IconComponets
                name="user-circle"
                size={sizeFont(20)}
                color={COLOR.HEADER}
              />
            ) : (
                <Avatar
                  size={"large"}
                  containerStyle={{
                    borderWidth: 0.2,
                    borderColor: COLOR.HEADER,
                  }}
                  rounded
                  source={{
                    uri: imageAvatar,
                  }}
                />
              )}

            <TouchableOpacity
              style={styles.viewTouchCamera}
              onPress={() => this.setState({
                modalVisible:true,
                value:1
              })}
            >
              <IconComponets
                name="camera"
                size={sizeFont(6)}
                color={COLOR.HEADER}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ backgroundColor: "#F6F6F7", marginTop: sizeHeight(2) }}
          >
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Th??ng tin C???ng t??c vi??n</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <FormTextInput
                props={{
                  placeholder: "T??n ????ng nh???p",
                  placeholderTextColor: "#Fafafa",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: nameLogin,
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ userName: "" }),
                  style: styles.styleWidth,
                }}
                editable={false}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />

              <FormTextInput
                props={{
                  placeholder: "H??? v?? t??n",
                  placeholderTextColor: "#Fafafa",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: userName,
                  onChangeText: (text) => this.setState({ userName: text }),
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ userName: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
              <FormTextInput
                props={{
                  placeholder: "S??? ??i???n tho???i",
                  placeholderTextColor: "#999",
                  type: "phone",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: phoneText,
                  onChangeText: (text) => this.setState({ phoneText: text }),
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ phoneText: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
              <FormTextInput
                props={{
                  placeholder: "Hoa h???ng ??u ????i theo CTV",
                  placeholderTextColor: "#999",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: rose,
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ email: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                editable={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
              <View style={{ height: sizeHeight(8), width: sizeWidth(91), marginTop: 10, marginBottom: 10, borderColor: COLOR.HEADER, borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: 'gray', marginTop: -5 }}>M?? c???ng t??c vi??n</Text>
                  <Text style={{ lineHeight: 30 }}>{this.props.authUser.USER_CODE}</Text>
                </View>
                <TouchableOpacity
                  onPress={
                    () => Clipboard.setString(`${this.props.authUser.USER_CODE}`),
                    () => Toast.show({
                      text: 'Text ???? ???????c copy !',
                      buttonText: 'Ok'
                    })
                  }
                >
                  <Text>copy</Text>
                </TouchableOpacity>
              </View>
              <FormTextInput
                props={{
                  placeholder: "Email",
                  placeholderTextColor: "#999",
                  type: "name",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: email,
                  onChangeText: (text) => this.setState({ email: text }),
                  primary: "#017DFF",
                  color: COLOR.COLOR_ICON,
                  onDelete: () => this.setState({ email: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
            </View>
            <View style={styles.viewGender}>
              <TouchableOpacity>
                <Text style={styles.textDayTitle}>Ng??y sinh</Text>
                <Text
                  style={styles.textDayOfBirth}
                  onPress={() => this.setState({ showCalendar: true })}
                >
                  {dayOfBirth}{" "}
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={[styles.textDayTitle, { textAlign: "right" }]}>
                  Gi???i t??nh
                </Text>
                <View style={styles.viewChildGender}>
                  <Text
                    onPress={() => {
                      this.setState({ gender: 1 });
                    }}
                    style={[
                      styles.textGender,
                      {
                        backgroundColor: gender == 1 ? "#fff" : "#ddd",
                      },
                    ]}
                  >
                    Nam
                  </Text>
                  <Text
                    onPress={() => {
                      this.setState({ gender: 0 });
                    }}
                    style={[
                      styles.textGender,
                      {
                        backgroundColor: gender == 0 ? "#fff" : "#ddd",
                      },
                    ]}
                  >
                    N???
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
              <FormTextInput
                props={{
                  placeholder: "T???nh/Th??nh ph???",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(8),
                  name: "chevron-down",
                  value: city.NAME == undefined ? "" : city.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.HEADER,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  this.props.navigation.navigate("ListCountries", {
                    onSetCity: this.changeCity,
                    NAME: "Th??ng tin CTV",
                  });
                }}
                changeColor={COLOR.HEADER}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Qu???n/Huy???n",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value: district.NAME == undefined ? "" : district.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.HEADER,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  if (city == "") {
                    this.message = "Vui l??ng ch???n T???nh/Th??nh ph???";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrict", {
                      onSetDistrict: this.changeDistrict,
                      GHN_TINHID: city.MATP,
                      NAME: "Th??ng tin CTV",
                    });
                  }
                }}
                changeColor={COLOR.HEADER}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "Ph?????ng/X??",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "chevron-down",
                  value: districChild == undefined ? '' : districChild.NAME,
                  onChangeText: (text) => null,
                  primary: "#017DFF",
                  color: COLOR.HEADER,
                  onDelete: () => null,
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(76),
                }}
                styleChild={styles.styleChild}
                pointerEvents="none"
                onPressCustom={() => {
                  if (city == "") {
                    this.setState({ showAlert: true });
                  } else if (district == "") {
                    this.message = "Vui l??ng ch???n Qu???n/Huy???n";
                    this.setState({ showAlert: true });
                  } else {
                    this.props.navigation.navigate("ListDistrictChild", {
                      onSetDistrictChild: this.changeDistrictChild,
                      GHN_TINHID: district.MAQH,
                      NAME: "Th??ng tin CTV",
                    });
                  }
                }}
                changeColor={COLOR.HEADER}
                light
              />
              <FormTextInput
                props={{
                  placeholder: "?????a ch???",
                  placeholderTextColor: "#999",
                  type: "email",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: address,
                  onChangeText: (text) => this.setState({ address: text }),
                  primary: "#017DFF",
                  color: COLOR.HEADER,
                  onDelete: () => {
                    this.setState({ address: "" });
                  },
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />

              <FormTextInput
                props={{
                  placeholder: "S??? CMND/ CCCD",
                  placeholderTextColor: "#999",
                  type: "phone",
                  size: sizeFont(6),
                  name: "times-circle",
                  value: passport,
                  onChangeText: (text) => this.setState({ passport: text }),
                  primary: "#017DFF",
                  color: COLOR.HEADER,
                  onDelete: () => this.setState({ passport: "" }),
                  style: styles.styleWidth,
                }}
                eye={false}
                onSetSee={this.onSetSee}
                styleTextInput={{
                  width: sizeWidth(78),
                }}
                styleChild={styles.styleChild}
              />
            </View>
            <View style={styles.viewImage}>
              <View style={styles.viewImageChild}>
                <Text>???nh CMND m???t tr?????c</Text>
                <View style={styles.viewCMT}>
                  <TouchableOpacity
                    style={styles.touchCMT}
                    onPress={() => this.setState({
                      modalVisible:true,
                      value:2
                    })}
                  >
                    {CMT_1 == "" ? (
                      <IconComponets
                        name="camera"
                        size={sizeFont(20)}
                        color={COLOR.HEADER}
                      />
                    ) : (
                        <Image
                          resizeMode="cover"
                          style={styles.imageCMT}
                          source={{
                            uri: CMT_1,
                          }}
                        />
                      )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.viewImageChild}>
                <Text>???nh CMND m???t sau</Text>
                <View style={styles.viewCMT}>
                  <TouchableOpacity
                    style={styles.touchCMT}
                    onPress={() => this.setState({
                      modalVisible:true,
                      value:3
                    })}
                  >
                    {CMT_2 == "" ? (
                      <IconComponets
                        name="camera"
                        size={sizeFont(20)}
                        color={COLOR.HEADER}
                      />
                    ) : (
                        <Image
                          resizeMode="cover"
                          style={styles.imageCMT}
                          source={{
                            uri: CMT_2,
                          }}
                        />
                      )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: sizeHeight(2) }}>
              <View style={styles.infor}>
                <Text style={styles.textInfor}>T??i kho???n ng??n h??ng</Text>
              </View>
              <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
                <FormTextInput
                  props={{
                    placeholder: "S??? t??i kho???n",
                    placeholderTextColor: "#999",
                    type: "phone",
                    size: sizeFont(6),
                    name: "times-circle",
                    value: account,
                    onChangeText: (text) => this.changeStateAccount(text),
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
                    onDelete: () => deleteStateAccount(),
                    style: styles.styleWidth,
                  }}
                  eye={false}
                  onSetSee={this.onSetSee}
                  styleTextInput={{
                    width: sizeWidth(78),
                  }}
                  styleChild={styles.styleChild}
                />
                <FormTextInput
                  props={{
                    placeholder: "T??n t??i kho???n",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(6),
                    name: "times-circle",
                    value: nameAccount,
                    onChangeText: (text) => this.changeStateName(text),
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
                    onDelete: () => this.setState({ nameAccount: '' }),
                    style: styles.styleWidth,
                  }}
                  eye={false}
                  onSetSee={this.onSetSee}
                  styleTextInput={{
                    width: sizeWidth(78),
                  }}
                  styleChild={styles.styleChild}
                />
                <FormTextInput
                  props={{
                    placeholder: "Ng??n ha??ng",
                    placeholderTextColor: "#999",
                    type: "email",
                    value: nameBank,
                    size: sizeFont(6),
                    name: "chevron-down",
                    onChangeText: (text) => null,
                    primary: "#017DFF",
                    color: COLOR.HEADER,
                    onDelete: () => null,
                    style: styles.styleWidth,
                  }}
                  eye={false}
                  onSetSee={this.onSetSee}
                  styleTextInput={{
                    width: sizeWidth(76),
                  }}
                  styleChild={styles.styleChild}
                  pointerEvents="none"
                  value={nameBank}
                  onPressCustom={() => {

                    this.props.navigation.navigate("Listbank", {
                      onSetDistrictChild: this.changeDistrictChild1,
                      NAME: "Th??ng tin CTV",
                    });

                  }}
                  changeColor={COLOR.HEADER}
                  light
                />
                <FormTextInput
                  props={{
                    placeholder: "Chi nh??nh",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(6),
                    name: "times-circle",
                    value: chinhanh,
                    onChangeText: (text) => this.changechinhanh(text),
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
                    onDelete: () => this.setState({ chinhanh: '' }),
                    style: styles.styleWidth,
                  }}
                  eye={false}
                  onSetSee={this.onSetSee}
                  styleTextInput={{
                    width: sizeWidth(78),
                  }}
                  styleChild={styles.styleChild}
                />

              </View>
              <TouchableOpacity
                onPress={this.updateAccount}
                style={{
                  backgroundColor: COLOR.HEADER,
                  paddingVertical: sizeHeight(2),
                  borderRadius: 6,
                  width: sizeWidth(70),
                  alignSelf: "center",
                  marginTop: sizeHeight(4),
                  marginBottom: sizeHeight(4),
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: sizeFont(4),
                  }}
                >
                  C???P NH???T
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <AlertDesignNotification
            showAlert={showAlert}
            message={this.message}
            title="Th??ng b??o"
            onClose={() => this.setState({ showAlert: false })}
          />
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleImage(value)
                      }}
                    >
                      <Text style={{marginBottom:20}}>Ch???n t??? th?? vi???n</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.handleImageCamera(value)}
                    >
                      <Text>Ch???n t??? camera</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3",marginTop:20 }}
                    onPress={() => {
                      this.setState({
                        modalVisible: !modalVisible
                      })
                    }}
                  >
                    <Text style={styles.textStyle}>????ng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                this.setState({
                  modalVisible: true
                })
              }}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </TouchableOpacity> */}
          </View>
          <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            date={new Date(moment("01/01/1990").format("DD/MM/YYYY"))}
            maximumDate={new Date()}
            onConfirm={(day) => {
              this.handleDate(day);
            }}
            onCancel={() => this.setState({ showCalendar: false })}
          />
          <View
            style={{
              paddingBottom: sizeHeight(30),
              backgroundColor: "#F6F6F7",
            }}
          />

        </ScrollView>
      </Provider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetProfile: (text) => dispatch(GetProfile(text)),
    LoginPhone: (data) => dispatch(LoginPhone(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInformation);
