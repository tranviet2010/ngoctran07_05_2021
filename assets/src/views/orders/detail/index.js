import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import {
  getDetailOrdered,
  updateOrder,
  updateOrderShop,
} from "../../../service/order";

import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { Image, CheckBox } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./style";
import moment from "moment";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { ActivityIndicator, Text } from "react-native-paper";
import IconComponets from "../../../components/icon";
import Loading from "../../../components/loading";
var numeral = require("numeral");

class DetailsOrdered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      dayStart: "",
      dayEnd: "",
      statusOrser: "",
      showCalendar: false,
      note: "",
      noteShop: "",
      update: false,
      checked: false,
    };
    this.time;
  }
  changeStatus = (text) => {
    this.setState({
      statusOrser: text,
    });
  };
  handleDate = (item, type) => {
    if (type == 1) {
      this.setState({ dayStart: moment(item).format("DD/MM/YYYY") }, () =>
        this.setState({ showCalendar: false })
      );
    } else {
      this.setState({ dayEnd: moment(item).format("DD/MM/YYYY") }, () =>
        this.setState({ showCalendar: false })
      );
    }
  };
  async componentDidMount() {
    const { CODE_ORDER } = this.props.route.params;
    const { username } = this.props;
    await this.handleLoad();
  }
  handleLoad = async () => {
    const { CODE_ORDER } = this.props.route.params;
    const { username, authUser } = this.props;
    await getDetailOrdered({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: CODE_ORDER,
      IDSHOP: "ABC123",
    })
      .then((result) => {
        console.log("data getdetailOrderd",result)
        if (result.data.ERROR == "0000") {
          console.log("get_order1213",result)
          this.setState(
            {
              data: result.data.INFO,
              dayStart: moment(
                result.data.ORDER.CREATE_DATE,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY"),
              dayEnd:
                result.data.ORDER.TIME_RECEIVER == null
                  ? moment(new Date()).format("DD/MM/YYYY")
                  : moment(
                      result.data.ORDER.TIME_RECEIVER,
                      "DD/MM/YYYY"
                    ).format("DD/MM/YYYY"),
              noteShop:
                result.data.ORDER.NOTE === null ? "" : result.data.ORDER.NOTE,

              statusOrser: +result.data.ORDER.STATUS,
              checked: result.data.ORDER.UNIT === 0 ? false : true,
            },
            () => {
              this.setState({ loading: false }, () => {
              });
            }
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  handleMoney = (item) => {
    var result = 0;
    for (let i = 0; i < item.length; i++) {
      result += +parseFloat(item[i].MONEY);
    }
    return numeral(result).format("0,0");
  };

  handleTotalMoney = (item, item2) => {
    var result = 0;
    if (item2.ISSETUP === "0") {
      for (let i = 0; i < item.length; i++) {
        if (item[i].COST_SHIP !== null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SHIP);
        } else {
          result += parseFloat(item[i].MONEY);
        }
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        if (item[i].COST_SHIP === null && item[i].COST_SETUP === null) {
          result += parseFloat(item[i].MONEY);
        } else if (item[i].COST_SETUP === null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SHIP);
        } else if (item[i].COST_SHIP == null) {
          result += parseFloat(item[i].MONEY) + parseFloat(item[i].COST_SETUP);
        } else {
          result +=
            parseFloat(item[i].MONEY) +
            parseFloat(item[i].COST_SHIP) +
            parseFloat(item[i].COST_SETUP);
        }
      }
      return numeral(result).format("0,0");
    }
    return numeral(result).format("0,0");
  };
  changeTitle = () => {
    const { dayStart, dayEnd, statusOrser, data } = this.state;
    if (statusOrser === 0) {
      return "???? ho??n th??nh";
    } else if (statusOrser === 1) return "???? ti???p nh???n";
    else if (statusOrser === 2) return "??ang x??? l?? ";
    else if (statusOrser === 3) return "??ang v???n chuy???n";
    else if (statusOrser === 4) return "Hu??? ????n h??ng";
    else if (statusOrser === 7) return "???? giao h??ng";
  };
  updateOrderDetail = (item) => {
    const { note, noteShop, statusOrser } = this.state;
    const { authUser } = this.props;
    updateOrder({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: item.ID_CODE_ORDER,
      STATUS: statusOrser,
      NOTE: noteShop,
      IDSHOP: "ABC123",
    })
      .then(async (result) => {
        if (result.data.ERROR === "0000") {
          await this.handleLoad();
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Th??ng b??o", result.data.RESULT, () => null);
            }, 100);
          });
        } else {
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Th??ng b??o", result.data.RESULT, () => null);
            }, 100);
          });
        }
      })
      .catch((error) => {
        this.setState({ update: false });
      });
  };
  updateOrderDetailShop = (item) => {
    const { note, noteShop, statusOrser, checked, dayEnd, data } = this.state;
    const { authUser } = this.props;
    updateOrderShop({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: item.ID_CODE_ORDER,
      STATUS: statusOrser,
      NOTE: noteShop,
      IDSHOP: "ABC123",
      ID: item.ID_CODE_ORDER,
      TIME_RECEIVER: dayEnd,
      UNIT: checked === false ? 0 : 1,
    })
      .then(async (result) => {
        if (result.data.ERROR === "0000") {
          await this.handleLoad();
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Th??ng b??o", result.data.RESULT, () => null);
            }, 100);
          });
        } else {
          this.setState({ update: false }, () => {
            this.time = setTimeout((ele, index) => {
              return AlertCommon("Th??ng b??o", result.data.RESULT, () => null);
            }, 100);
          });
        }
      })
      .catch((error) => {
        this.setState({ update: false });
      });
  };

  componentWillUnmount() {
    clearTimeout(this.time);
  }
  handleFeeShip = (item) => {
    var feeShip = 0;
    for (let i = 0; i < item.length; i++) {
      feeShip += parseFloat(item[i].COST_SHIP);
    }
    return feeShip;
  };
  handleFeeSetUp = (item) => {
    var feeSetUp = 0;
    for (let i = 0; i < item.length; i++) {
      feeSetUp += parseFloat(item[i].COST_SETUP);
    }
    return feeSetUp;
  };
  render() {
    const {
      loading,
      data,
      dayEnd,
      dayStart,
      showCalendar,
      note,
      noteShop,
      update,
    } = this.state;

    console.log("datais fall",data)
    const { authUser, navigation } = this.props;
    const { TYPE, NAME } = this.props.route.params;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : data.length == 0 ? null : (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Spinner
          visible={update}
          customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
        />
        <View style={{ backgroundColor: "#fff" }}>
          {authUser.GROUPS === "3" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: sizeHeight(1.5),
                paddingHorizontal: sizeWidth(3),
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                M?? ??H: {data[1].ID_CODE_ORDER}{" "}
              </Text>
              <Text
                style={{ textDecorationLine: "underline", color: COLOR.BLUE }}
                onPress={() => {
                  navigation.navigate("ListStores", {
                    NAME: NAME,
                    item: { CODE_ORDER: data[1].ID_CODE_ORDER },
                    authUser: authUser,
                  });
                }}
              >
                Xem kho{" "}
              </Text>
            </View>
          ) : null}
          <View style={{}}>
            <Text style={styles.textTitle}>N???i dung ????n h??ng</Text>
            <View
              style={{
                borderBottomWidth: 3,
                borderBottomColor: "#ddd",
                width: sizeWidth(95),
                alignSelf: "center",
              }}
            >
              <FlatList
                data={data[0]}
                keyExtractor={(item) => item.ID}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: sizeHeight(2),
                      }}
                    >
                      <Image
                        source={{ uri: item.IMAGE_COVER }}
                        style={{
                          width: sizeWidth(25),
                          height: sizeHeight(15),
                          overflow: "hidden",
                        }}
                        resizeMode="contain"
                        PlaceholderContent={<ActivityIndicator />}
                      />
                      <View
                        style={{
                          marginLeft: sizeWidth(5),
                          width: sizeWidth(66),
                        }}
                      >
                        <View style={styles.space}>
                          <Text
                            style={{
                              paddingBottom: sizeHeight(0.2),
                              fontSize: sizeFont(4),
                            }}
                          >
                            {item.PRODUCT_NAME}{" "}
                          </Text>
                          <Text style={styles.textOrder}>
                            {item.MODEL_PRODUCT}{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>Thu???c t??nh</Text>
                          <Text style={{ color: "#888" }}>
                            {item.PROPERTIES == null ? "" : item.PROPERTIES}{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>????n gi?? thu KH</Text>
                          <Text style={styles.textCommon}>
                            {numeral(item.PRICE).format("0,0")} VN??{" "}
                          </Text>
                        </View>
                        <View style={styles.viewItemChild}>
                          <Text style={styles.size}>S??? l?????ng</Text>
                          <Text style={styles.textCommon}>x{item.NUM} </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: sizeHeight(2) }}>
              <View style={{ flex: 0.8 }} />
              <View style={{ flex: 2.5 }}>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>Th??nh ti???n</Text>
                  <Text style={styles.textPrice}>
                    {this.handleMoney(data[0])} VN??
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>
                    Ph?? v???n chuy???n d??? ki???n
                  </Text>
                  <Text style={styles.textPrice}>
                    {numeral(this.handleFeeShip(data[0])).format("0,0")} VN??
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text style={styles.textTitlePrice}>Ph?? l???p ?????t d??? ki???n</Text>
                  <Text style={styles.textPrice}>
                    {data[1].ISSETUP === "0"
                      ? 0
                      : numeral(this.handleFeeSetUp(data[0])).format("0,0")}
                    {" VN??"}
                  </Text>
                </View>
                <View style={styles.viewPrice}>
                  <Text
                    style={{
                      backgroundColor: "rgb(243,116,29)",
                      color: "#fff",
                      paddingHorizontal: sizeWidth(2.5),
                      paddingVertical: sizeHeight(0.2),
                    }}
                  >
                    T???ng ti???n thanh to??n
                  </Text>
                  <Text style={[styles.textPrice, { fontWeight: "bold" }]}>
                    {this.handleTotalMoney(data[0], data[1])} VN??
                  </Text>
                </View>
                <View style={styles.viewSetting}>
                  <IconComponets
                    name="wrench"
                    size={sizeFont(6)}
                    color="#999"
                  />
                  <Text style={styles.textSetting}>
                    {data[1].ISSETUP === "1" ? "C??" : "Kh??ng"} l???p ?????t
                  </Text>
                </View>
              </View>
            </View>

            {TYPE === 1 && authUser.GROUPS === "3" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: sizeWidth(6),
                }}
              >
                <CheckBox
                  center
                  title="Kho thu ti???n"
                  iconType="material-community"
                  checkedIcon={
                    !this.state.checked ? "circle-slice-8" : "circle-slice-8"
                  }
                  size={sizeFont(8)}
                  uncheckedIcon="circle-outline"
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                  checkedColor={COLOR.BUTTON}
                  checked={this.state.checked}
                  containerStyle={{
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  }}
                />
                <CheckBox
                  center
                  title="Shop thu ti???n"
                  size={sizeFont(8)}
                  iconType="material-community"
                  checkedIcon={
                    this.state.checked ? "circle-o" : "circle-slice-8"
                  }
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                  uncheckedIcon="circle-outline"
                  checkedColor={COLOR.BUTTON}
                  uncheckedColor={"#ddd"}
                  checked={!this.state.checked}
                  containerStyle={{
                    backgroundColor: "#fff",
                    borderWidth: 0,
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.reciver}>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>Ng?????i nh???n:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].FULLNAME_RECEIVER}{" "}
              </Text>
            </View>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>S??? ??i???n tho???i:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].MOBILE_RECEIVER}
              </Text>
            </View>
            <View style={styles.viewChild}>
              <View style={styles.viewTable}>
                <Text style={styles.textReciver}>?????a ch???:</Text>
              </View>
              <Text style={styles.textReciverDetail}>
                {data[1].ADDRESS_RECEIVER}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.textTitle}>T??nh tr???ng ????n h??ng</Text>

          <View
            style={{
              marginTop: sizeHeight(1),
              width: sizeWidth(96),
              alignSelf: "center",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: sizeHeight(1),
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity
                //disabled={data[1].STATUS === "1" ? false : true}
                disabled={TYPE === 4 || TYPE === 0 ? true : false}
                onPress={() => {
                  if (TYPE === 1 || TYPE === 3 || TYPE === 7 || TYPE === 2) {
                    this.props.navigation.navigate("StatusBuyer", {
                      onSetStatus: this.changeStatus,
                      TYPE: TYPE,
                      STATUS: data[1].STATUS_NAME,
                    });
                  }
                }}
                style={styles.touchTwo}
              >
                <Text style={styles.textFirst}>Tr???ng th??i</Text>
                <View style={styles.viewIconShop}>
                  <Text style={styles.textSecondShop}>
                    {this.changeTitle()}{" "}
                  </Text>
                  <IconComponets
                    name="angle-down"
                    size={sizeFont(7)}
                    color={"#fff"}
                    //style={{ position: "absolute", right: sizeWidth(2) }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              // disabled={this.props.authUser.GROUPS === "3" ? false : true}
              style={styles.touchTwo}
            >
              <Text style={styles.textFirst}>Th???i gian d??? ki???n nh???n h??ng:</Text>
              <TouchableOpacity
                style={styles.viewTimeDeliver}
                onPress={() => {
                  if ((TYPE === 1 || TYPE === 2) && authUser.GROUPS === "3") {
                    this.setState(
                      { showCalendar: true },
                      () => (this.type = 2)
                    );
                  }
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR.BUTTON,
                  }}
                >
                  <Text style={[styles.textTime]}>{dayEnd} </Text>
                </View>
                {(TYPE === 1 || TYPE === 2) && authUser.GROUPS === "3" ? (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: sizeWidth(8),
                      borderBottomColor: COLOR.BUTTON,
                    }}
                  >
                    <IconComponets
                      name="pen"
                      size={sizeFont(5)}
                      color={COLOR.BUTTON}
                      style={{ paddingBottom: 0 }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: sizeHeight(1) }}>
              <Text
                style={{
                  fontSize: sizeFont(4),
                  color: "#888",
                  marginBottom: sizeHeight(1),
                }}
              >
                Ghi ch??
              </Text>
              <TextInput
                value={noteShop}
                editable={TYPE === 4 || TYPE === 0 ? false : true}
                onChangeText={(text) => this.setState({ noteShop: text })}
                style={styles.textNote}
              />
            </View>
            <DateTimePickerModal
              isVisible={showCalendar}
              mode="date"
              minimumDate={new Date()}
              onConfirm={(day) => {
                this.handleDate(day, this.type);
              }}
              onCancel={() => this.setState({ showCalendar: false })}
            />
          </View>
          <TouchableOpacity
            style={styles.touchSearch}
            disabled={TYPE === 4 || TYPE === 0 ? true : false}
            onPress={() => {
              this.setState({ update: true }, () => {
                if (authUser.GROUPS !== "3") this.updateOrderDetail(data[1]);
                else {
                  this.updateOrderDetailShop(data[1]);
                }
              });
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>C???P NH???T</Text>
          </TouchableOpacity>
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
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsOrdered);
