import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Keyboard,
  Modal,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { Provider } from "react-native-paper";
import { Avatar, CheckBox } from "react-native-elements";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import {
  checkFullName,
  isVietnamesePhoneNumber,
  alphanumeric,
} from "../../../utils/check";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { FormTextInput } from "../../../components/textinput";
import { orderProduct } from "../../../service/order";
import { AlertCommon } from "../../../components/error";
import Loading from "../../../components/loading";
import { handleMoney } from "../../../components/money";
import { removeToCart, removeAllToCart } from "../../../action/orderAction";
import { getConfigCommission } from '../../../service/order';
import { GetCTVDetail } from '../../../service/rose';

var numeral = require("numeral");
class DetailAddressCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: this.props.authUser.MOBILE,
      userName: this.props.authUser.FULL_NAME,
      idStore: "",
      levelStore: "",
      city:
        this.props.authUser.CITY == null
          ? ""
          : {
            NAME: this.props.authUser.CITY,
            MATP: this.props.authUser.CITY_ID,
          },
      district:
        this.props.authUser.DISTRICT == null
          ? ""
          : {
            NAME: this.props.authUser.DISTRICT,
            MAQH: this.props.authUser.DISTRICT_ID,
          },
      districChild:
        this.props.authUser.WARD == null
          ? ""
          : {
            NAME: this.props.authUser.WARD,
            XAID: this.props.authUser.WARD_ID,
          },
      address: this.props.authUser.ADDRESS,
      passport: "",
      account: "",
      nameAccount: "",
      nameBank: "",
      showAlert: false,
      codeuser: '',
      checked: true,
      note: "",
      ROSE: this.props.route.params.ROSE,
      SUM: this.props.route.params.SUM,
      message: "",
      loading: false,
      value: false,
      shipcode: false,
      Numbercode: 'CK',
      money: '',
      moneyAll: '',
      modalVisible: false,
      tramtong: '',
      check: this.props.authUser.GROUPS == 5 ? true : false,
      checktinh: this.props.authUser.GROUPS == 5 ? true : false,
      checkquan: this.props.authUser.GROUPS == 5 ? true : false,
      checkxa: this.props.authUser.GROUPS == 5 ? true : false,
    };
    this.message = "";
  }
  changeCity = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ city: "", district: "", districChild: "" });
    } else {
      this.setState({ city: text, district: "", districChild: "", checktinh: !this.state.checktinh }, () => {
      });
    }
  };
  changeDistrict = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ district: "", districChild: "" });
    } else this.setState({ district: text, districChild: "",checkquan:!this.state.checkquan });
  };
  changeDistrictChild = (text) => {
    if (text == "- t???t c??? -") {
      this.setState({ districChild: "" });
    } else this.setState({ districChild: text,checkxa:!this.state.checkxa });
  };
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");

    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    return dateObject2 - dateObject1;
  }
  handleNumber = (item) => {
    const { status, authUser } = this.props;
    var resutl = {
      AMOUNT: "",
      PRICE: "",
      CODE_PRODUCT: "",
      MONEY: "",
      BONUS: "",
      ID_PRODUCT_PROPERTIES: "",
    };
    var MONEY1 = '';
    var MONEY2 = '';
    if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) < 0) {
      for (let i = 0; i < item.length; i++) {
        resutl.AMOUNT = resutl.AMOUNT + item[i].COUNT + "#";
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
        resutl.BONUS = resutl.BONUS + item[i].PRICE * item[i].COMISSION_PRODUCT * 0.01 + "#";
        resutl.ID_PRODUCT_PROPERTIES =
          resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        resutl.AMOUNT = resutl.AMOUNT + item[i].COUNT + "#";
        resutl.CODE_PRODUCT = resutl.CODE_PRODUCT + item[i].CODE_PRODUCT + "#";
        resutl.BONUS = resutl.BONUS + item[i].PRICE_PROMOTION * item[i].COMISSION_PRODUCT * 0.01 + "#";
        resutl.ID_PRODUCT_PROPERTIES =
          resutl.ID_PRODUCT_PROPERTIES + item[i].ID_PRODUCT_PROPERTIES + "#";
      }
    }

    resutl.BONUS = resutl.BONUS.substring(0, resutl.BONUS.length - 1);
    resutl.AMOUNT = resutl.AMOUNT.substring(0, resutl.AMOUNT.length - 1);
    resutl.CODE_PRODUCT = resutl.CODE_PRODUCT.substring(0, resutl.CODE_PRODUCT.length - 1);
    resutl.PRICE = this.props.route.params.PRICEALL;
    resutl.ID_PRODUCT_PROPERTIES = resutl.ID_PRODUCT_PROPERTIES.substring(
      0,
      resutl.ID_PRODUCT_PROPERTIES.length - 1
    );

    return resutl;
  };
  endMoney = () => {
    const { listItem } = this.props;
    const { money } = this.state;
    var sumMoney = this.allOne(listItem);
    var number;
    if (money > sumMoney) {
      number = this.state.SUM - sumMoney;
    }
    else {
      number = this.state.SUM - money;
    }
    return numeral(number).format(
      "0,0"
    );;
  }
  endRose = () => {
    const { money } = this.state;
    const { listItem } = this.props;
    var sumMoney = this.allOne(listItem);

    if (money > sumMoney) {
      return 0;
    } else {
      return numeral(sumMoney - money).format(
        "0,0"
      );
    }
  }
  onMua = () => {
    const { listItem } = this.props;
    var monney1 = "";
    var monney2 = "";
    for (let i = 0; i < listItem.length; i++) {
      if (listItem[i].END_PROMOTION && this.checkTime(listItem[i].START_PROMOTION, listItem[i].END_PROMOTION) > 0) {
        monney1 += parseInt(listItem[i].PRICE_PROMOTION) * listItem[i].COUNT + '#';
      } else {
        monney2 += parseInt(listItem[i].PRICE) * listItem[i].COUNT + '#';
      }
    }
    this.setState({
      moneyAll: monney1 + monney2,
    });
  }
  handleBook = () => {
    const {
      phoneText,
      userName,
      city,
      district,
      address,
      Numbercode,
      districChild,
      money,
      note,
      moneyAll,
    } = this.state;
    const { listItem, authUser, navigation } = this.props;
    const { item } = this.props.route.params;
    Keyboard.dismiss();
    if (
      userName.trim() == "" ||
      
      userName.length > 50
    ) {
      AlertCommon(
        "Th??ng b??o",
        "H??? v?? t??n kh??ng ch???a k?? t??? ?????c bi???t v?? kh??ng qu?? 50 k?? t???",
        () => null
      );
    } else if (address.length > 100) {
      AlertCommon(
        "Th??ng b??o",
        "Kh??ng cho nh???p qu?? 100 k?? t???",
        () => null
      );
    }
    else if (!isVietnamesePhoneNumber(phoneText)) {
      AlertCommon(
        "Th??ng b??o",
        "S??? ??i???n tho???i kh??ng h???p l???",
        () => null
      );
    }
    else if (address.length > 100) {
      AlertCommon(
        "Th??ng b??o",
        "B???n ???? nh???p qu?? 100 k?? t??? cho ph??p",
        () => null
      );
    }

    else {
      this.setState(
        {
          loading: true,
          message: "",
        },
        async () => {
          var result;
          if (item == undefined) {
            result = await this.handleNumber(listItem);
          } else {
            result = await this.handleNumber(item);
          }
          orderProduct({
            USERNAME: authUser.USERNAME,
            CODE_PRODUCT: result.CODE_PRODUCT,
            AMOUNT: result.AMOUNT,
            PRICE: result.PRICE,
            MONEY: moneyAll.substring(0, moneyAll.length - 1),
            BONUS: result.BONUS,
            FULL_NAME: userName,
            DISTCOUNT: money,
            NOTE: note,
            ID_PRODUCT_PROPERTIES: '',
            MOBILE_RECEIVER: phoneText,
            ID_CITY: city.MATP,
            PAYMENT_TYPE: Numbercode,
            ID_DISTRICT: district.MAQH,
            ADDRESS: address,
            ID_WARD: districChild.XAID,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
          })
            .then((result) => {
              console.log("this is orderProduct", result);
              if (result.data.ERROR == "0000") {
                this.setState(
                  {
                    loading: false,
                    message: result.data.RESULT,
                  },
                  () => {
                    this.props.removeAllToCart();
                    return AlertCommon("Th??ng b??o", `${result.data.RESULT}`, () => {
                      navigation.navigate("Order"),
                        navigation.popToTop();
                    });
                  }
                );
              } else {
                this.setState(
                  {
                    loading: false,
                    message: result.data.RESULT,
                  },
                  () => {
                    return AlertCommon("Th??ng b??o", `${result.data.RESULT}`, () =>
                      this.props.navigation.navigate("home")
                    );
                  }
                );
              }
            })
            .catch((error) => {
              console.log("errro",)
            });
        }
      );
    }

  };
  checkError = () => {
    const {
      phoneText,
      userName,
      city,
      district,
      districChild,
      address,
      note,
      showAlert,
      SUM,
      value
    } = this.state;
    if (value) {
      return true;
    } else {
      if (
        phoneText == "" ||
        userName == "" ||
        city == "" ||
        district == "" ||
        address == ""
      ) {
        return false;
      } else {
        return true;
      }
    }

  };
  shipCode = () => {
    this.setState({
      city: '',
      district: '',
      districChild: '',
      address: '',
    })
  }
  handleTotlaMoney = (item) => {
    var sumMoney = 0;
    // if (this.state.checked) {
    //   for (let i = 0; i < item.length; i++) {
    //     sumMoney +=
    //       parseFloat(item[i].COST_SHIP) + parseFloat(item[i].COST_SETUP);
    //   }
    // } else {
    //   for (let i = 0; i < item.length; i++) {
    //     sumMoney += parseFloat(item[i].COST_SHIP);
    //   }
    // }
    return numeral(this.state.SUM).format(
      "0,0"
    );
  };
  roseMoney = (item) => {
    var sumMoney = 0;
    for (let i = 0; i < item.length; i++) {
      sumMoney +=
        parseFloat(item[i].HHMAX);
    }

    return numeral(sumMoney).format(
      "0,0"
    );
  }
  roseDetail = (item) => {
    const { tramtong } = this.state;
    var sumMoney1;
    var a = 1;
    if (a = 1 && tramtong != undefined) {
      sumMoney1 = this.state.SUM * tramtong * 0.01;
      return sumMoney1;
    } else {
      return 0;
    }
  }
  roseDetail2 = (item) => {
    var sumMoney1 = 0;
    var a = 1;
    if (a = 1) {
      sumMoney1 = this.state.SUM * 0.01 * this.state.codeuser;
      return sumMoney1;
    }
  }
  allOne = (a) => {
    var all = parseFloat(this.roseDetail(a)) + parseFloat(this.state.ROSE) + parseFloat(this.roseDetail2(a));
    return all;
  }

  componentDidMount() {
    this.onMua();
    getConfigCommission({
      USERNAME: this.props.authUser.USERNAME,
      VALUES: this.state.SUM,
      IDSHOP: 'http://banbuonthuoc.moma.vn'
    })
      .then((res) => {
        this.setState({
          tramtong: res.data.VALUE,
        })
      })
      .catch(() => {
        console.log("Errrrr");
      })

    GetCTVDetail({
      USERNAME: this.props.authUser.USERNAME,
      USER_CTV: this.props.authUser.USERNAME,
      IDSHOP: 'http://banbuonthuoc.moma.vn'
    })
      .then((res) => {
        this.setState({
          codeuser: res.data.COMISSION
        })
      })
  }
  render() {
    const {
      phoneText,
      userName,
      city,
      district,
      address,
      SUM,
      districChild,
      value,
      shipcode,
      Numbercode,
      money,
      modalVisible,
      ROSE,
      check,
      checktinh,
      checkquan,
      checkxa,
      tramtong
    } = this.state;
    const { listItem, authUser } = this.props;
    console.log("this is item", this.props.authUser);
    var abc = this.allOne(listItem);
    if (money > abc) {
      Alert.alert('L???i', "S??? ti???n gi???m gi?? kh??ng v?????t qu?? hoa h???ng t???ng")
    }
    return (
      <ScrollView>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <View style={{ width: sizeWidth(90), height: sizeHeight(7), backgroundColor: '#4a8939', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    <View></View>
                    <Text style={{ color: '#fff' }}>Chi ti???t hoa h???ng</Text>
                    <TouchableOpacity

                      onPress={() => {
                        this.setState({ modalVisible: !this.state.modalVisible });
                      }}
                    >
                      <Image
                        source={require('../../../assets/images/daux.png')}
                        style={{ width: 25, height: 25 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                      <Text style={{ color: '#000' }}>Hoa h???ng theo gi?? tr??? ????n h??ng</Text>
                      <Text>{numeral(this.roseDetail(listItem)).format(
                        "0,0"
                      )} ??</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                      <Text style={{ color: '#000' }}>Hoa h???ng theo m???t h??ng</Text>
                      <Text>{numeral(ROSE).format(
                        "0,0"
                      )} ??</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                      <Text style={{ color: '#000' }}>Hoa h???ng theo c???ng t??c vi??n</Text>
                      <Text>{numeral(this.roseDetail2(listItem)).format(
                        "0,0"
                      )} ??</Text>
                    </View>
                    {this.props.authUser.GROUPS == 3 ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                      <Text style={{ color: '#000' }}>Hoa h???ng CTV gi???i thi???u</Text>
                      <Text>{this.roseDetail(listItem)} ??</Text>
                    </View> : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5, height: 1, backgroundColor: 'gray' }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: sizeWidth(80), margin: 5 }}>
                      <Text style={{ color: '#000' }}>Hoa h???ng t???ng</Text>
                      <Text>{numeral(this.allOne(listItem)).format(
                        "0,0"
                      )} ??</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingBottom: sizeHeight(10)
          }}
        >
          <View style={styles.infor}>
            <Text style={styles.textInfor}>Th??ng tin kh??ch h??ng</Text>
            {this.props.authUser.GROUPS == 8 ? null : <Text onPress={() => this.setState({ check: false, checktinh: false,checkquan:false,checkxa:false })}
              style={{ color: '#fff', textDecorationLine: 'underline' }}
            >T??? ?????t h??ng</Text>}
          </View>
          <View style={{ alignSelf: "center" }}>
            <FormTextInput
              props={{
                placeholder: "H??? v?? t??n",
                placeholderTextColor: "#Fafafa",
                type: "name",
                size: sizeFont(6),
                name: "times-circle",
                value: !check ? userName : null,
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
                placeholder: "??i???n tho???i",
                placeholderTextColor: "#999",
                type: "phone",
                size: sizeFont(6),
                name: "times-circle",
                value: !check ? phoneText : null,
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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => { this.setState({ value: true, city: '', district: '', districChild: '', address: '' }) }}
              >
                <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: `${value ? '#4a8939' : 'white'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                </View>
                <Text style={{ marginLeft: 10 }}>L???y h??ng t???i kho</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={() => { this.setState({ value: false }) }}
              >
                <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: `${value ? 'white' : '#4a8939'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                </View>
                <Text style={{ marginLeft: 10 }}>Giao h??ng t???i</Text>
              </TouchableOpacity>
            </View>

            <View>
              {value ? null : <View style={{ alignSelf: "center", marginTop: sizeHeight(1) }}>
                <FormTextInput
                  props={{
                    placeholder: "T???nh/Th??nh ph???",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(8),
                    name: "chevron-down",
                    value: !checktinh ? city.NAME : null,
                    onChangeText: (text) => null,
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
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
                      NAME: "DetailAddressCart",
                    });
                  }}
                  changeColor={COLOR.BUTTON}
                  light
                />
                <FormTextInput
                  props={{
                    placeholder: "Qu???n/Huy???n",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(6),
                    name: "chevron-down",
                    value: !checkquan ? district.NAME : null,
                    onChangeText: (text) => null,
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
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
                        NAME: "DetailAddressCart",
                      });
                    }
                  }}
                  changeColor={COLOR.BUTTON}
                  light
                />
                <FormTextInput
                  props={{
                    placeholder: "Ph?????ng/X?? *",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(6),
                    name: "chevron-down",
                    value: !checkxa ? districChild.NAME : null,
                    onChangeText: (text) => null,
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
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
                      console.log("dis", district);
                      this.props.navigation.navigate("ListDistrictChild", {
                        onSetDistrictChild: this.changeDistrictChild,
                        GHN_TINHID: district.MAQH,
                        NAME: "DetailAddressCart",
                      });
                    }
                  }}
                  changeColor={COLOR.BUTTON}
                  light
                />
                <FormTextInput
                  props={{
                    placeholder: "?????a ch???",
                    placeholderTextColor: "#999",
                    type: "email",
                    size: sizeFont(6),
                    name: "times-circle",
                    value: !check ? address : null,
                    onChangeText: (text) => this.setState({ address: text }),
                    primary: "#017DFF",
                    color: COLOR.BUTTON,
                    onDelete: () => this.setState({ address: "" }),
                    style: styles.styleWidth,
                  }}
                  eye={false}
                  onSetSee={this.onSetSee}
                  styleTextInput={{
                    width: sizeWidth(78),
                  }}
                  styleChild={styles.styleChild}
                />
              </View>}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.infor}>
              <Text style={styles.textInfor}>Gi?? tr??? h??ng h??a</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: sizeHeight(2),
            }}
          >
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>????n h??ng:</Text>
              <Text
                style={[
                  styles.textMoney,
                ]}
              >
                {this.handleTotlaMoney(listItem)} ??
              </Text>
            </View>
            <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Ph?? v???n chuy???n:</Text>
              <Text
                style={[
                  styles.textMoney,
                ]}
              >
                {/* {this.roseMoney(listItem)} ?? */}
                0 ??
              </Text>
            </View>
            {/* <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>T???ng ti???n:</Text>
              <Text
                style={[
                  styles.textMoney,
                  {
                    color: COLOR.BUTTON,
                  },
                ]}
              >
                {this.handleTotlaMoney(listItem)} ??
              </Text>
            </View> */}
            {this.props.authUser.GROUPS == 8 ? null : <View style={styles.viewMoney}>
              <Text style={styles.textTitle}>Hoa h???ng t???ng: <Text style={{ color: '#149CC6' }} onPress={() => { this.setState({ modalVisible: true }) }}>Chi ti???t</Text></Text>
              <Text
                style={[
                  styles.textMoney,
                  {
                    color: '#4b4c4b',
                  },
                ]}
              >
                {numeral(this.allOne(listItem)).format("0,0")} ??
              </Text>
            </View>}
            {this.props.authUser.GROUPS == 8 ? null : <View style={{ marginTop: 10 }}>
              <View style={styles.infor}>
                <Text style={styles.textInfor}>Thanh to??n</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingLeft: 20, color: '#4b4c4b', paddingBottom: 10 }}>S??? ti???n mu???n gi???m gi??</Text>
                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    style={{ borderColor: '#DDD', borderWidth: 1, width: sizeWidth(90), paddingLeft: 10, height: sizeHeight(6) }}
                    onChangeText={(text) => this.setState({ money: text })}
                    // value={money == '' ? null : numeral(money).format("0,0")}
                    keyboadType="numeric"
                    placeholder="Nh???p s??? ti???n"
                  />
                  <Text style={{ width: sizeWidth(90), fontStyle: 'italic', marginTop: 5, marginBottom: 5, color: '#4b4c4b' }}>CTV c?? th??? nh???p gi???m gi?? v???i s??? ti???n kh??ng qu?? s??? hoa h???ng t???ng ({numeral(this.allOne(listItem)).format(
                    "0,0"
                  )} ??) c???a ch??nh ????n h??ng</Text>
                </View>
                <View style={{ margin: sizeWidth(5), }}>
                  <View style={styles.viewMoney}>
                    <Text style={{ fontSize: sizeFont(4), color: '#4b4c4b', fontWeight: 'bold' }}>T???ng ti???n</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: sizeFont(4), color: COLOR.MAIN }}>{this.endMoney()} ??</Text>
                  </View>
                  <View style={styles.viewMoney}>
                    <Text><Text style={{ fontSize: sizeFont(4), color: '#4b4c4b', fontWeight: 'bold' }}>Hoa h???ng sau khi gi???m tr???</Text> { }</Text>
                    <Text style={{ color: "#149CC6", fontWeight: 'bold', fontSize: sizeFont(4), color: '#ff0613' }}>{this.endRose()} ??</Text>
                  </View>
                  <Text style={{ fontStyle: 'italic', color: '#4b4c4b' }}>(Hoa h???ng ???????c c???ng sau khi ho??n th??nh ????n h??ng)</Text>
                </View>
              </View>
            </View>}
            <View
              style={{
                marginTop: sizeHeight(2),
                // borderTopWidth: 4,
                // borderTopColor: "#DDD",

              }}
            >
              {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>H??nh th???c thanh to??n</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => { this.setState({ shipcode: true, Numbercode: 'COD' }) }}
                >
                  <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: `${shipcode ? '#4a8939' : 'white'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                  </View>
                  <Text style={{ marginLeft: 10 }}>COD</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row' }}
                  onPress={() => { this.setState({ shipcode: false, Numbercode: 'CK' }) }}
                >
                  <View style={{ borderRadius: 50, width: 20, height: 20, borderColor: '#4a8939', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: `${shipcode ? 'white' : '#4a8939'}`, borderRadius: 50, width: 12, height: 12 }}></View>
                  </View>
                  <Text style={{ marginLeft: 10 }}>Chuy???n kho???n</Text>
                </TouchableOpacity>
              </View> */}
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={{ borderColor: '#DDD', borderWidth: 1, width: sizeWidth(90), height: sizeHeight(6), paddingLeft: 6 }}
                  placeholder="Ghi ch?? cho shop"
                  onChangeText={(text) => this.setState({ note: text })}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={{ alignSelf: "center", marginTop: sizeHeight(8) }}>
              <TouchableOpacity
                disabled={this.checkError() == false ? true : false}
                style={[
                  styles.touchOrder,
                  {
                    backgroundColor:
                      this.checkError() == false ? "#999" : COLOR.MAIN,
                  },
                ]}
                onPress={this.handleBook}
              >
                <Text style={{ color: "#FFF", textAlign: "center", fontWeight: '500' }}>
                  ?????T H??NG
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.loading ? (
            <View style={{ alignSelf: "center" }}>
              <Loading />
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    listItem: state.order.listItem,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { removeAllToCart: (text) => dispatch(removeAllToCart()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAddressCart);
