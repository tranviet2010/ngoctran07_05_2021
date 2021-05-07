import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Switch } from "react-native-paper";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import IconComponets from "../../../../components/icon";
import { COLOR } from "../../../../utils/color/colors";
import {
  HeaderRightTool,
  ButtonShowStore,
} from "../../../../components/header";
import { getListStore, syncstatusStore } from "../../../../service/products";
import { ElementCustom } from "../../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
var numeral = require("numeral");

export default class FooterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      ok: false,
    };
  }
  componentDidMount() {
    const { item } = this.props;
    getListStore({ CODE_PRODUCT: item.CODE_PRODUCT })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          for (let i = 0; i < result.data.INFO.length; i++) {
            result.data.INFO[i].switch = false;
          }
          this.setState({ data: result.data.INFO }, () =>
            this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  handleSyns = (item) => {
    syncstatusStore({
      ID_PRODUCT: item.ID,
      STATUS: item.switch === true ? 1 : 0,
    })
      .then((result) => {})
      .catch((error) => {
      });
  };

  handleSwitch = async (item) => {
    item.switch = !item.switch;
    await this.handleSyns(item);
    this.setState({ ok: !this.state.ok });
  };
  render() {
    const { loading, data } = this.state;

    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        // overlayColor="#ddd"
      />
    ) : (
      <SafeAreaView style={styles.conatiner}>
        <Text style={styles.title}>Danh sách các kho cung cấp</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID}
          extraData={this.state.ok}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.viewContainer}>
                <View style={{}}>
                  <Text style={{ fontSize: sizeFont(4) }}>Kho:</Text>
                </View>
                <View style={styles.viewChild}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: sizeHeight(1),
                    }}
                  >
                    <Text style={styles.textTitle}>{item.SHOP_NAME} </Text>
                    <Text style={styles.textCommon}>
                      {numeral(item.PRICE).format("0,0")} Đ
                    </Text>
                  </View>
                  <View style={styles.viewCar}>
                    <View style={styles.viewShip}>
                      <IconComponets
                        name="shipping-fast"
                        size={sizeFont(5)}
                        color="#999"
                      />
                      <Text style={styles.textCommon}>
                        {numeral(item.COST_SHIP).format("0,0")}{" "}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <IconComponets
                        name="tools"
                        size={sizeFont(5)}
                        color="#999"
                      />
                      <Text style={styles.textCommon}>
                        {numeral(item.COST_SETUP).format("0,0")}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.touchSwitch}>
                  <Switch
                    value={item.switch}
                    onValueChange={() => this.handleSwitch(item)}
                    color={COLOR.BUTTON}
                  />
                </View>
                <View style={styles.touchDot}>
                  <ButtonShowStore
                    onPress={() => this.props.navigation.navigate("Giỏ hàng")}
                    onPressOne={() => {
                      this.handleSyns(item);
                      item.switch = false;
                      this.setState({ ok: true });
                    }}
                    name="ellipsis-v-alt"
                    size={sizeFont(6)}
                    color="#000"
                    soild
                  />
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    height: sizeHeight(35),
  },
  title: {
    color: "#fff",
    backgroundColor: COLOR.HEADER,
    paddingVertical: sizeHeight(2),
    fontSize: sizeFont(4),
    paddingLeft: sizeWidth(5),
  },
  textCommon: {
    color: COLOR.BUTTON,
    fontSize: sizeFont(4),
    marginLeft: sizeWidth(2),
  },
  textTitle: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
  },
  touchDot: {
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
  touchSwitch: {
    alignSelf: "center",
    position: "absolute",
    right: sizeWidth(15),
  },
  viewContainer: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
    paddingVertical: sizeHeight(2),
    paddingHorizontal: sizeWidth(2.5),
  },
  viewChild: {
    marginLeft: sizeWidth(2),
    borderRightWidth: 3,
    borderRightColor: "#999",
    paddingRight: sizeWidth(5),
  },
  viewShip: {
    flexDirection: "row",
    marginRight: sizeWidth(6),
    alignSelf: "center",
  },
  viewCar: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
