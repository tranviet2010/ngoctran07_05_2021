import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { ElementCustom, AlertCommon } from "../../../components/error";
import Spinner from "react-native-loading-spinner-overlay";
import { getListProductDetails } from "../../../service/products";
import { Image } from "react-native-elements";

import { COLOR } from "../../../utils/color/colors";
import {
  sizeHeight,
  sizeFont,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { handleMoney } from "../../../components/money";
var numeral = require("numeral");
class SubChildItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      loadingMore: false,
    };
    this.message;
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }
  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };
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
  onEndReached = ({ distanceFromEnd }) => {
    const { loadingMore } = this.state;
    const { ID, SUB_ID_PARENT } = this.props.route.params;

    if (!this.onEndReachedCalledDuringMomentum) {
      this.offset = this.offset + 1;
      this.setState(
        {
          loadingMore: true,
        },
        () => {
          getListProductDetails({
            USERNAME: null,
            SUB_ID_PARENT: SUB_ID_PARENT,
            SUB_ID: ID,
            PAGE: this.offset,
            NUMOFPAGE: 10,
            IDSHOP: "ABC123",
          })
            .then((result) => {
              if (result.data.ERROR === "0000") {
                this.setState(
                  { data: [...this.state.data, ...result.data.INFO] },
                  () => {
                    this.setState({ loadingMore: false });
                  }
                );
              } else {
                this.setState({ loadingMore: false }, () => {
                  this.message = setTimeout(() => {
                    AlertCommon("Thông báo", result.data.RESULT, () => null);
                  }, 10);
                });
              }
            })
            .catch((error) => {
              this.setState({ loadingMore: false });
            });
          this.onEndReachedCalledDuringMomentum = true;
        }
      );
    }
  };
  onRefresh = () => {
    const { ID, SUB_ID_PARENT } = this.props.route.params;
    this.offset = 1;
    getListProductDetails({
      USERNAME: null,
      SUB_ID_PARENT: SUB_ID_PARENT,
      SUB_ID: ID,
      PAGE: this.offset,
      NUMOFPAGE: 10,
      IDSHOP: "ABC123",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () => { });
        } else {
          this.setState({ loading: false }, () => {
            this.message = setTimeout(() => {
              AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 10);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    const { ID, SUB_ID_PARENT } = this.props.route.params;
    getListProductDetails({
      USERNAME: null,
      SUB_ID_PARENT: SUB_ID_PARENT,
      SUB_ID: ID,
      PAGE: this.offset,
      NUMOFPAGE: 10,
      IDSHOP: "ABC123",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO }, () => {
            this.setState({ loading: false });
          });
        } else {
          this.setState({ loading: false }, () => {
            this.message = setTimeout(() => {
              AlertCommon("Thông báo", result.data.RESULT, () => null);
            }, 10);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { data, loading, refreshing } = this.state;
    const { navigation, authUser, status } = this.props;
    console.log("data is subchilitem", data);
    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
      //overlayColor="#ddd"
      />
    ) : (
        <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
          <FlatList
            numColumns={2}
            data={data}
            keyExtractor={(item) => item.SUB_ID}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
            scrollToOverflowEnabled={0.5}
            onEndReached={this.onEndReached}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            extraData={this.state}
            ListFooterComponent={() => {
              return loading ? (
                <ActivityIndicator size={sizeFont(7)} color="red" />
              ) : null;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.touchFlatListChild}
                  onPress={() =>
                    navigation.navigate("DetailProducts", {
                      data: item,
                      ID_PRODUCT: item.ID_PRODUCT,
                      NAME: "SubChildItem",
                    })
                  }
                >
                  {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ?
                            <View style={{ position: 'absolute', right: 5, top: 5, width: sizeWidth(10), height: sizeHeight(2.5),backgroundColor:'red', justifyContent: 'center', alignItems: 'center',zIndex:100,borderRadius:2 }}>
                              <Text style={{ fontSize: sizeFont(3), color: '#fff',fontSize:sizeFont(2) }}>-{numeral((item.PRICE - item.PRICE_PROMOTION) / item.PRICE * 100).format('0.00')}%</Text>
                            </View> : null}
                  <Image
                    source={{ uri: item.IMAGE_COVER }}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode="cover"
                    style={styles.imageSize}
                  />
                  <Text style={styles.textName}>{item.PRODUCT_NAME} </Text>
                  <Text style={styles.textCode}>Mã SP: {item.CODE_PRODUCT} </Text>
                  <Text style={{}}>{item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ? <View>
                    <View style={styles.textPrice1}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', alignItems: 'center' }}>
                        <Text style={styles.textPrice}>{numeral(item.PRICE_PROMOTION).format("0,0")} đ</Text>
                        <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3), marginLeft: sizeWidth(1) }}>{numeral(item.PRICE).format("0,0")} đ</Text>
                      </View>
                      {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5,marginLeft:sizeWidth(2) }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE_PROMOTION * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>}
                    </View>
                  </View> : <View style={{ flexDirection: 'column' }}><Text style={styles.textPrice}>
                    {numeral(item.PRICE).format("0,0")} đ
                          </Text>
                      {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5,marginLeft:sizeWidth(2) }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>}
                    </View>}</Text>

                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View>
                <Text>Không có dữ liệu</Text>
              </View>
            )}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  touchFlatListChild: {
    borderRadius: 6,
    borderColor: COLOR.BUTTON,
    borderWidth: 0.5,
    marginVertical: sizeHeight(1),
    width: sizeWidth(47),
    overflow: "hidden",
    marginRight: sizeWidth(2),
  },
  imageSize: {
    width: sizeWidth(45),
    // width: sizeWidth(30),
    height: sizeHeight(20),
    //height: sizeHeight(20),
    overflow: "visible",
  },
  textName: {
    fontSize: sizeFont(4),
    paddingVertical: sizeHeight(3.5),
    paddingHorizontal: sizeWidth(2),

    paddingVertical: sizeHeight(1),
  },
  textCode: {

    fontSize: sizeFont(4),
    fontWeight: "bold",
    paddingHorizontal: sizeWidth(2),
  },
  textPrice: {
    color: COLOR.BUTTON,
    fontSize: sizeFont(3.8),
    paddingVertical: sizeHeight(1),
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
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubChildItem);
