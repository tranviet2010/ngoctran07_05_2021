import React, { Component, PureComponent, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { _retrieveData } from "../../../utils/asynStorage";
import { HeaderLeftComponet } from "../../../components/header"
import IconComponets from "../../../components/icon";
import _ from "lodash";
import { Image } from "react-native-elements";
import Listcate from "./Listcate";
import { getListTrend } from "../../../service/products";

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import {
  AlertCommon
} from "../../../components/error";
import { COLOR } from "../../../utils/color/colors";
import styles from "./style";
import { connect } from "react-redux";
var numeral = require("numeral");
import moment from "moment";
import { getListProduct1 } from "../../../service/products";
import { getListSubProducts } from "../../../service/products";

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      scrollY: new Animated.Value(0),
      data: [],
      images:[
        require('../../../assets/images/banner.png'),
        require('../../../assets/images/slide2.png'),
        require('../../../assets/images/slide3.jpg'),
      ],
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      open: false,
      dataList: [],
      search: '',
      data1111: [],
      value: this.props.searchText,
    };
    this.count = 0;


  }
  renderSearch = (text) => {
    getListSubProducts({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: "http://banbuonthuoc.moma.vn",
      SEARCH_NAME: text,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

            //resultArray.push(result.data.DETAIL[i]);
          }
          this.setState(
            {
              data: result.data.DETAIL,
            }
          );
        } else {

          this.setState(
            {
              data: [],
            }
          );

        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  getData = () => {
    getListSubProducts({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: 'http://banbuonthuoc.moma.vn',
      SEARCH_NAME: this.state.search,
    })
      .then((result) => {
        if (result.data.ERROR == "0000") {
          for (let i = 0; i < result.data.DETAIL.length; i++) {
            result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

            //resultArray.push(result.data.DETAIL[i]);
          }
          this.setState(
            {
              data: result.data.DETAIL,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState({ loading: false }, () =>
            AlertCommon("Thông báo", result.data.RESULT, () => null)
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.getData();
    getListProduct1({
      USERNAME: this.props.username,
      ID_PARENT: '',
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            dataList: res.data.DETAIL
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
    getListTrend({
      USERNAME: '',
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data1111: result.data.INFO,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState({ loading: false }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });

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
  render() {
    const {
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
      searchText,
      listItem,
      countNotify
    } = this.props;
    // console.log('this is check',this.checkTime('21/10/2020','21/10/2020'));
    const { Data, loading, Rose, dataList, open, search, data, open2, value, data1111 } = this.state;
    const sphot = data1111 ? data1111.filter((Val, index, array) => {
      return Val.STATUS_TREND == 1;
    }) : null
    const sphot1 = data1111 ? data1111.filter((Val, index, array) => {
      return Val.STATUS_TREND == 2;
    }) : null
    const sphot2 = data1111 ? data1111.filter((Val, index, array) => {
      return Val.STATUS_TREND == 3;
    }) : null
    const sphot3 = data1111 ? data1111.filter((Val, index, array) => {
      return Val.STATUS_TREND == 4;
    }) : null
    return (
      <View style={{ marginBottom: sizeHeight(5) }}>
        <View style={{
          height: sizeHeight(34), backgroundColor: COLOR.MAIN, paddingTop: sizeHeight(3.5),
          flexDirection: 'column', justifyContent: 'space-evenly'
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, width: sizeWidth(100), paddingRight: 10 }}>
            <View>
              <Text style={{ color: '#fff' }}>Ngọc Trang</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate("infomation", {
                    NAME: 'Product',
                  })}
                  >
                <HeaderLeftComponet
                  navigation={navigation}
                  name="bell"
                  size={sizeFont(5)}
                  color="#fff"
                />
                {countNotify == 0 ? null : <View style={styles.viewList}>
                  {countNotify < 100 ? <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: sizeFont(3),
                    }}
                  >
                    {countNotify}
                  </Text> : <Text style={{
                    fontSize: sizeFont(2), color: "#fff",
                  }}>99+</Text>}
                </View>}
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Carts", {
                      NAME: "Product",
                    })
                  }
                >
                  {authUser.GROUPS != 3 ? <HeaderLeftComponet
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate("Carts", {
                        NAME: "Product",
                      })
                    }
                    name="shopping-cart"
                    size={sizeFont(5)}
                    color="white"
                  /> : null}
                  {listItem.length != 0 ? (
                    <View style={styles.viewList}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: sizeFont(3),
                        }}
                      >
                        {listItem.length}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{ alignItems: 'center',justifyContent:'center',height:sizeHeight(20),width:sizeWidth(95) }}>
            <SliderBox
              images={this.state.images}
              autoplay={true}
              autoplayDelay={5000}
              circleLoop
              // dotColor={COLOR.BUTTON}
              // resizeMode="contain"
              // inactiveDotColor={COLOR.HEADER}
              dotColor={COLOR.MAIN}
              paginationBoxVerticalPadding={5}
              ImageComponentStyle={{
                width: sizeWidth(95), height: sizeHeight(20) 
              }}
            />
          </View>
          </View>
          <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <View>
              <TextInput
                placeholder="Tìm kiếm sản phẩm"
                returnKeyType="search"
                onChangeText={(text) => this.renderSearch(text)}
                style={{
                  paddingLeft: 10,
                  height: sizeHeight(6),
                  width: sizeWidth(65),
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}
              />
              {/* <Image 
              source={require('../../../assets/images/search.png')}
              style={{width:25,height:25,position:'absolute',backgroundColor:'red',right:0}}
            /> */}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Image
                source={require('../../../assets/images/phieu.png')}
                style={{ width: 25, height: 25 }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({ open: !this.state.open })
                }}
              >
                <Text style={{ color: '#fff' }}>Danh mục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView horizontal={true} >
          <View style={styles.trending}>
            <Text style={{ color: COLOR.MAIN }}>Tất cả</Text>
          </View >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FullItem', {
            name: 'Sản phẩm nổi bật',
            data: sphot
          })} style={styles.trending1}>
            <Text>Sản phẩm nổi bật</Text>
          </TouchableOpacity >

          <TouchableOpacity onPress={() => this.props.navigation.navigate('FullItem', {
            name: 'Sản phẩm bán chạy',
            data: sphot1
          })} style={styles.trending1}><Text>Sản phẩm bán chạy</Text></TouchableOpacity >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FullItem', {
            name: 'Sản phẩm mới',
            data: sphot2
          })} style={styles.trending1}><Text>Sản phẩm mới</Text></TouchableOpacity >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FullItem', {
            name: 'Sản phẩm  khuyến mãi',
            data: sphot3
          })} style={styles.trending1}><Text>Sản phẩm khuyến mãi</Text></TouchableOpacity >
        </ScrollView>
        <View style={{ margin: sizeHeight(1) }} >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View>
              {open ? <ScrollView style={{ zIndex: 2000}}>{dataList.map((Val) => {
                return (
                  // <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(95), height: sizeHeight(4.5), backgroundColor: 'white', color: '#149CC6', fontSize: 16, paddingLeft: 10, borderBottomColor: '#149CC6', borderBottomWidth: 1 }}>
                  //   <Text
                  //     style={{ justifyContent: 'center', alignContent: 'center' }}
                  //     onPress={() => {
                  //       navigation.navigate("ChildListItem", {
                  //         name: Val.NAME,
                  //         ID: Val.ID,
                  //       });
                  //     }}
                  //   >{Val.NAME}</Text>
                  // </View>
                  <Listcate Val={Val} navigation={navigation} />
                )
              })}</ScrollView> : null}
            </View>

          </View>

        </View>
        <View style={{ marginTop: sizeHeight(1), height: sizeHeight(100), paddingBottom: sizeHeight(25) }}>
          <Animated.SectionList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                useNativeDriver: false,
              }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.getData}
              />
            }
            sections={data}
            contentContainerStyle={{ paddingBottom: sizeHeight(25) }}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, section, index }) => {
              if (index == section.INFO.length - 1) {
                this.count = 0;
              }

              return this.count == 0 ? (
                <View
                  style={{
                    borderBottomWidth: 6,
                    borderBottomColor: COLOR.COLOR_BOTTOM,
                    paddingLeft: sizeWidth(2.5),
                  }}
                >
                  <FlatList
                    data={section.INFO}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                      this.count = this.count + 1;
                      return (
                        <TouchableOpacity
                          style={styles.touchFlatListChild}
                          onPress={() =>
                            navigation.navigate("DetailProducts", {
                              ID_PRODUCT: item.ID_PRODUCT,
                              NAME: "Home",
                            })
                          }
                        >
                          {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >= 0 ?
                            <View style={{ position: 'absolute', right: 5, top: 5, width: sizeWidth(10), height: sizeHeight(2.5),backgroundColor:'red', justifyContent: 'center', alignItems: 'center',zIndex:100,borderRadius:2 }}>
                              <Text style={{ fontSize: sizeFont(3), color: '#fff',fontSize:sizeFont(2) }}>-{numeral((item.PRICE - item.PRICE_PROMOTION) / item.PRICE * 100).format('0.00')}%</Text>
                            </View> : null}
                          <View
                            style={{
                              width: "100%",
                              height: sizeHeight(15),
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={{ uri: item.IMAGE_COVER }}
                              PlaceholderContent={<ActivityIndicator />}
                              resizeMode="contain"
                              style={styles.imageSize}
                            />
                          </View>
                          <Text style={styles.textName}>
                            {_.truncate(item.PRODUCT_NAME, {
                              length: 20,
                            })}{" "}
                          </Text>
                          {item.END_PROMOTION && this.checkTime(item.START_PROMOTION, item.END_PROMOTION) >=0 ? <View>
                            <View style={styles.textPrice1}>
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textPrice}>{numeral(item.PRICE_PROMOTION).format("0,0")} đ</Text>
                                <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3) }}>{numeral(item.PRICE).format("0,0")} đ</Text>
                              </View>
                              {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5 }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE_PROMOTION * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>}
                            </View>
                          </View> : <View style={{ flexDirection: 'column' }}><Text style={styles.textPrice}>
                            {numeral(item.PRICE).format("0,0")} đ
                          </Text>
                              {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text style={{ color: '#3399FF', fontSize: sizeFont(3.5), paddingBottom: 5 }}>HH: {numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")}đ ({item.COMISSION_PRODUCT}%)</Text>}
                            </View>}
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item) => item.ID_PRODUCT.toString()}
                  />
                </View>
              ) : null;
            }}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={({ section: { PARENT_NAME, ID } }) => (
              <View style={styles.viewHeader}>
                <Text style={styles.title}>{PARENT_NAME} </Text>
                <TouchableOpacity
                  style={styles.touchViewMore}
                  onPress={() => {
                    navigation.navigate("ChildListItem", {
                      name: PARENT_NAME,
                      ID: ID,
                    });
                  }}
                >
                  <Text style={styles.textViewMore}>Xem tất cả</Text>
                  <IconComponets
                    size={sizeFont(4)}
                    color={"#166CEE"}
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop: state.product.database,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
