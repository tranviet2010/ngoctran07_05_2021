import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../utils/helper/size.helper";
import { COLOR } from "../../utils/color/colors";
import { connect } from "react-redux";
import { addToCart, removeAllToCart, removeToCart } from "../../action/orderAction";
import { AlertCommonLogin } from "../../components/error";
import {getConfigCommission} from '../../service/order'
import styles from "./style";
import IconComponets from "../../components/icon";
import { handleMoney } from "../../components/money";
var numeral = require("numeral");
class Carts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      loading: true,
      SUM: 0,
      ok: false,
      rose: 0,
      sumall: '',
      moneyAll: 0,
      tramtong:'',
    };
  }
  checkTime = (a, b) => {
    var start = a;
    var end = b;
    var datePart1 = start.split("/");
    var datePart2 = end.split("/");
    var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
    var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
    var currentDate = new Date();
    
    return (dateObject1 < currentDate && currentDate<dateObject2) ?1:-1
  }
  countPlus = (item) => {
    this.handleHH();
    const { status, authUser } = this.props;
    item.COUNT = item.COUNT + 1;
    if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0) {
      this.setState({
        SUM: this.state.SUM + parseInt(item.PRICE_PROMOTION),
        rose: this.state.rose + parseInt(item.PRICE_PROMOTION * 0.01 * item.COMISSION_PRODUCT)
      });
    } else {
      this.setState({
        SUM: this.state.SUM + parseInt(handleMoney(status, item, authUser)),
        rose: this.state.rose + parseInt(item.PRICE * 0.01 * item.COMISSION_PRODUCT)
      });
    }

    //this.setState({ count: this.state.count + 1 });
  };
  countNagative = (item) => {
    this.handleHH();
    const { status, authUser } = this.props;
    if (item.COUNT == 1) {
      return;
    } else if (item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0) {
      item.COUNT = item.COUNT - 1;
      this.setState({
        SUM: this.state.SUM - parseInt(item.PRICE_PROMOTION),
        rose: this.state.rose - parseInt(item.PRICE_PROMOTION * 0.01 * item.COMISSION_PRODUCT)
      });
    } else {
      item.COUNT = item.COUNT - 1;
      this.setState({
        SUM: this.state.SUM - parseInt(item.PRICE),
        rose: this.state.rose - parseInt(item.PRICE * 0.01 * item.COMISSION_PRODUCT)
      });
    }
  };
  handleHH=()=>{
  
    console.log(this.state.SUM);
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
  }
  componentDidMount() {
    const {
      navigation,
      removeAllToCart,
      listItem,
      authUser,
      status,
    } = this.props;
    var sum1 = 0;
    var sum2 = 0;
    var rose1 = 0;
    var rose2 = 0;
    var idsum1 = ""
    var idsum2 = ""
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].COUNT = 1;
      if (listItem[i].END_PROMOTION && this.checkTime(listItem[i].START_PROMOTION, listItem[i].END_PROMOTION) > 0) {
        sum1 += parseInt(listItem[i].PRICE_PROMOTION);
        rose1 += parseInt(listItem[i].PRICE_PROMOTION * 0.01 * listItem[i].COMISSION_PRODUCT);
        idsum1 += parseInt(listItem[i].PRICE_PROMOTION) + '#';
      } else {
        sum2 += parseInt(listItem[i].PRICE);
        rose2 += parseInt(listItem[i].PRICE * 0.01 * listItem[i].COMISSION_PRODUCT);
        idsum2 += parseInt(listItem[i].PRICE) + '#';
      }
    }
    this.setState({
      SUM: sum1 + sum2,
      rose: rose1 + rose2,
      sumall: idsum1 + idsum2,
     
    });
    navigation.setParams({
      onDelete: () =>
        AlertCommonLogin(
          "X??c nh???n",
          "B???n c?? ch???c ch???n mu???n xo?? to??n b??? h??ng ho?? trong gi??? h??ng?",
          () => removeAllToCart(),
          () => null,
          "Xo?? t???t c???",
          "Hu???"
        ),
    });
  }
  render() {
    const { listItem, authUser, status } = this.props;
    const { count, SUM, rose, sumall, moneyAll,tramtong } = this.state;
    console.log("this tramtong", tramtong);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2 }}>
          <FlatList
            data={listItem.length == 0 ? null : listItem}
            keyExtractor={(item) => item.CODE_PRODUCT}
            extraData={this.state}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    width: sizeWidth(96),
                    alignSelf: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      resizeMode="contain"
                      source={{ uri: item.IMAGE_COVER }}
                      style={{ width: sizeWidth(20), height: sizeHeight(20) }}
                    />
                  </View>
                  <View style={{ marginTop: sizeHeight(3), flex: 3 }}>
                    <View >
                      <TouchableOpacity
                        onPress={() => this.props.removeToCart(item)}
                        style={{ position: 'absolute', right: 0, top: -15, color: 'red' }}>
                        <Image
                          source={require('../../assets/images/daux.png')}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: sizeFont(4),
                        marginLeft: sizeWidth(2),
                        width: sizeWidth(60),
                        paddingBottom: sizeHeight(1),
                        fontWeight: "bold",
                      }}
                    >
                      {item.PRODUCT_NAME}
                    </Text>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>Thu???c t??nh:</Text>
                      <IconComponets
                        name="edit"
                        size={sizeFont(6)}
                        color={COLOR.BUTTON}
                        onPress={() => { console.log('gio hang') }}
                      />
                    </View>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>????n gi??:</Text>
                      <Text
                        style={{ fontSize: sizeFont(4), color: "#F90000", fontWeight: "bold" }}
                      >
                        {/* {numeral().format(
                          "0,0"
                        )} */}
                        {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) > 0 ? numeral(item.PRICE_PROMOTION).format(
                          "0,0"
                        ) : numeral(item.PRICE).format(
                          "0,0"
                        )}
                        VN??
                      </Text>
                    </View>
                    <View style={styles.viewChildDetail}>
                      <Text style={styles.textTitle}>S??? l?????ng:</Text>
                      <View style={styles.viewCount}>
                        <Text
                          onPress={() => this.countNagative(item)}
                          style={styles.textCount}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            paddingHorizontal: sizeWidth(6),
                            paddingVertical: sizeHeight(1),
                            textAlign: "center",
                          }}
                        >
                          {item.COUNT == undefined ? 1 : item.COUNT}{" "}
                        </Text>
                        <Text
                          onPress={() => this.countPlus(item)}
                          style={styles.textCount}
                        >
                          +
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <SafeAreaView
          style={{
            flex: 0.5,
            borderTopWidth: 4,
            borderTopColor: "#ddd",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: sizeHeight(1),
              paddingHorizontal: sizeWidth(2),
            }}
          >
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
              T???ng ti???n h??ng
            </Text>
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold", color: "#F90000" }}>
              {numeral(listItem.length === 0 ? 0 : SUM).format("0,0")} VN??
            </Text>
          </View>
          {this.props.authUser.GROUPS == 8 ? null : <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: sizeHeight(1),
              paddingHorizontal: sizeWidth(2),
            }}
          >
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold" }}>
              Hoa h???ng s???n ph???m:
            </Text>
            <Text style={{ fontSize: sizeFont(4), fontWeight: "bold", color: "#149CC6" }}>
              {numeral(listItem.length === 0 ? 0 : rose).format("0,0")} VN??
            </Text>
          </View>}
          <Text style={{ fontSize: 14, paddingLeft: 10, fontStyle: 'italic' }}>(Ch??a bao g???m ph?? v???n chuy???n)</Text>
          {this.props.authUser.GROUPS == 8 ? null : <Text style={{ fontSize: 14, paddingLeft: 10, fontStyle: 'italic' }}>(Hoa h???ng ???????c c???ng sau khi ho??n th??nh ????n h??ng)</Text>}
          <View style={{ alignSelf: "center", marginTop: sizeHeight(2) }}>
            <TouchableOpacity
              style={{
                backgroundColor: listItem.length == 0 ? "#ddd" : "#149CC6",
                paddingVertical: sizeHeight(1),
                height: sizeHeight(5),
                borderRadius: 4,
                width: sizeWidth(80),
              }}
              disabled={listItem.length == 0 ? true : false}
              onPress={() => {
                this.props.navigation.navigate("DetailAddressCart", {
                  SUM: this.state.SUM,
                  NAME: "Carts",
                  NUM: this.state.count,
                  LIST: listItem,
                  ROSE: rose,
                  PRICEALL: sumall.substring(0, sumall.length - 1)
                });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: sizeFont(4),
                }}
              >
                T???O ????N H??NG
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    listItem: state.order.listItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeToCart: (text) => dispatch(removeToCart(text)),
    addToCart: (text) => dispatch(addToCart(text)),
    removeAllToCart: (text) => dispatch(removeAllToCart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);
