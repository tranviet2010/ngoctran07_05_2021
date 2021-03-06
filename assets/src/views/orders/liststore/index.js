import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, Image } from "react-native";
import { listStores } from "../../../service/order";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../components/error";
import {
  sizeWidth,
  sizeHeight,
  sizeFont,
} from "../../../utils/helper/size.helper";
import { StyleSheet } from "react-native";
import { COLOR } from "../../../utils/color/colors";
import IconComponets from "../../../components/icon";
var numeral = require("numeral");
import moment from "moment";
export default class ListStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
    this.time;
  }
  componentDidMount() {
    const { item, authUser } = this.props.route.params;
    listStores({
      USERNAME: authUser.USERNAME,
      CODE_ORDER: item.CODE_ORDER,
      IDSHOP: "ABC123",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () =>
            this.setState({ loading: false })
          );
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  handleMoney = (item) => {
    if (item.COST_SHIP === null && item.COST_SETUP === null) {
      return parseFloat(item.MONEY) * parseFloat(item.NUM);
    } else if (item.COST_SETUP === null) {
      return (
        (parseFloat(item.MONEY) + parseFloat(item.COST_SHIP)) *
        parseFloat(item.NUM)
      );
    } else if (item.COST_SHIP == null) {
      return (
        (parseFloat(item.MONEY) + parseFloat(item.COST_SETUP)) *
        parseFloat(item.NUM)
      );
    } else {
      return (
        (parseFloat(item.MONEY) +
          parseFloat(item.COST_SHIP) +
          parseFloat(item.COST_SETUP)) *
        parseFloat(item.NUM)
      );
    }
  };
  render() {
    const { loading, data } = this.state;
    const { item, authUser } = this.props.route.params;
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
        //overlayColor="#ddd"
      />
    ) : (
      <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => {
            return item.STORE_SUCCESS !== null ? (
              <View style={styles.container}>
                <View style={styles.viewHeader}>
                  <Text>Kho: {item.STORE_SUCCESS} </Text>
                  <Text style={styles.textStatus}>???? ti???p nh???n</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "#999",
                    borderBottomWidth: 1,
                    marginVertical: sizeHeight(1),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: sizeWidth(2.5),
                  }}
                >
                  <Text>M?? ??H: {item.ID_CODE_ORDER}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <IconComponets
                      name={"stopwatch"}
                      size={sizeFont(5)}
                      color="#999"
                      style={{ marginRight: sizeWidth(2) }}
                    />
                    <Text>
                      {moment.utc(item.CREATE_DATE).format("hh:mm DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: sizeWidth(2.5),
                  }}
                >
                  <Image
                    source={{ uri: item.IMAGE_COVER }}
                    style={{
                      width: sizeWidth(20),
                      height: sizeHeight(20),
                      flex: 1,
                      marginRight: sizeWidth(2.5),
                    }}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 4 }}>
                    <View style={styles.viewCommon}>
                      <Text>{item.PRODUCT_NAME} </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {item.MODEL_PRODUCT}{" "}
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>Thu???c t??nh </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>????n gi?? thu KH</Text>
                      <Text style={styles.textThinCommon}>
                        {numeral(item.MONEY).format("0,0")} ??
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>S??? l?????ng</Text>
                      <Text style={styles.textThinCommon}>x{item.NUM}</Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>Ph?? ship</Text>
                      <Text style={styles.textThinCommon}>
                        {numeral(item.COST_SHIP).format("0,0")} ??
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>Ph?? l???p ?????t</Text>
                      <Text style={styles.textThinCommon}>
                        {numeral(item.COST_SETUP).format("0,0")} ??
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>T???ng ti???n thu KH</Text>
                      <Text style={styles.textBoldCommon}>
                        {numeral(this.handleMoney(item)).format("0,0")} ??
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    borderTopColor: "#999",
                    borderTopWidth: 1,
                    paddingVertical: sizeHeight(2),
                  }}
                >
                  <Text
                    style={{
                      position: "absolute",
                      right: sizeWidth(2.5),
                      bottom: sizeHeight(1),
                      //fontSize: sizeFont(4)
                      //paddingVertical: sizeHeight(2),
                    }}
                  >
                    {item.UNIT === 0 ? "Shop thu ti???n" : "Kho thu ti???n"}{" "}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <View style={styles.viewHeader}>
                  <Text />
                  <Text style={styles.textStatus}>Ch??? kho ti???p nh???n</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "#999",
                    borderBottomWidth: 1,
                    marginVertical: sizeHeight(1),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: sizeWidth(2.5),
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.IMAGE_COVER }}
                    style={{
                      width: sizeWidth(20),
                      height: sizeHeight(10),
                      flex: 1,
                      marginRight: sizeWidth(2.5),
                    }}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 4, marginBottom: sizeHeight(2) }}>
                    <View style={styles.viewCommon}>
                      <Text>{item.PRODUCT_NAME} </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {item.MODEL_PRODUCT}{" "}
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>????n gi?? thu KH</Text>
                      <Text style={styles.textThinCommon}>
                        {numeral(item.MONEY).format("0,0")} ??
                      </Text>
                    </View>
                    <View style={styles.viewCommon}>
                      <Text>S??? l?????ng</Text>
                      <Text style={styles.textThinCommon}>x{item.NUM}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.BUTTON,
    borderRadius: 2,
    marginTop: sizeHeight(5),
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizeWidth(2.5),
    paddingTop: sizeHeight(1),
  },
  textStatus: {
    backgroundColor: "rgb(243,116,29)",
    color: "#fff",
    paddingHorizontal: sizeWidth(2.5),
    paddingVertical: sizeHeight(0.2),
  },
  viewCommon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: sizeHeight(0.5),
  },
  textThinCommon: {
    color: COLOR.BUTTON,
  },
  textBoldCommon: {
    color: COLOR.BUTTON,
    fontWeight: "bold",
  },
});
