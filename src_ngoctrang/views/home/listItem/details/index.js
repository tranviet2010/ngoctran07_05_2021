import React, { Component } from "react";
import Share1 from 'react-native-share';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  Picker,
  Clipboard,
  Modal,
  Dimensions
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import IconComponets from "../../../../components/icon";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import styles from "../style";
import { connect } from "react-redux";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
  AlertCommon,
  AlertCommonLogin,
  ElementCustom,
} from "../../../../components/error";
import { addToCart } from "../../../../action/orderAction";
import { getDetails } from "../../../../service/products";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from "react-native-render-html";
import { handleMoney } from "../../../../components/money";
import FooterAdmin from "../footeradmin";
import _ from "lodash";
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import { GetProperties } from "../../../../service/order";
import Properti from "./properti";

var numeral = require("numeral");
const tags = _.without(
  IGNORED_TAGS,
  "table",
  "caption",
  "col",
  "colgroup",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr"
);
const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
};
const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "center",
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 0.3,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};
const tdStyle = {
  ...tableDefaultStyle,
  borderRightWidth: 0.5,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};
const thStyle = {
  ...tdStyle,
  //backgroundColor: "#CCCCCC",
  alignItems: "center",
};

class DetailProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      active: false,
      activeTab: 1,
      cartLength: this.props.listItem.length,
      loading: true,
      refreshing: false,
      data: [],
      inside: true,
      color1: '#96CD01',
      color: '#F5F5F5',
      properties: '',
      setSelectedValue: '',
    };
    this.arrayImage = [];
    this.refs._carousel;
    //this.activeTab = 1;
  }
  countPlus = () => {
    this.setState({ count: this.state.count + 1 });
  };
  countNagative = () => {
    if (this.state.count == 1) {
      return;
    } else this.setState({ count: this.state.count - 1 });
  };
  async componentDidMount() {
    const { authUser, navigation, status } = this.props;
    //ID_PRODUCT
    const { ID_PRODUCT } = this.props.route.params;
    await getDetails({
      USERNAME: status === "" ? null : authUser.USERNAME,
      IDSHOP: 'http://banbuonthuoc.moma.vn',
      IDPRODUCT: ID_PRODUCT,
    })
      .then((result) => {
        console.log("this is result", result);
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO[0] }, () =>
            this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    {
      GetProperties({
        USERNAME: this.props.username,
        LIST_PROPERTIES: this.state.data.ID_PRODUCT_PROPERTIES,
      })
        .then((res) => {
          this.setState({
            properties: res.data.DETAIL
          })
        })
        .catch((err) => { })
    }
    navigation.setParams({
      NAVIGATE: () => null,
    });

  }
  handleTouchBuy = () => {
    const { status, navigation, authUser } = this.props;
    const { count, activeTab, cartLength, loading, data } = this.state;
    if (status == "") {
      return AlertCommonLogin(
        "Th??ng b??o",
        "Vui l??ng ????ng nh???p tr?????c khi ?????t h??ng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Hu??? b???",
        "????ng nh???p"
      );
    } else {
      data.COUNT = this.state.count;
      this.props.navigation.navigate("DetailAddressCart", {
        NAME: "DetailProducts",
        item: [data],
        SUM:
          parseInt(handleMoney(status, data, authUser)) *
          parseInt(this.state.count),
      });
    }
  };
  handleTouchAdd = async () => {
    const { count, activeTab, cartLength, loading, data, properties } = this.state;
    const { status, navigation } = this.props;
    if (status == "") {
      return AlertCommonLogin(
        "Th??ng b??o",
        "Vui l??ng ????ng nh???p tr?????c khi ?????t h??ng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Hu??? b???",
        "????ng nh???p"
      );
    }
    data.newPropeti =
      await this.props.addToCart(data);
    if (cartLength == this.props.listItem.length) {
      AlertCommon("Th??ng b??o", "S???n ph???m ???? c?? trong gi??? h??ng", () => null);
    } else {
      AlertCommon(
        "Th??ng b??o",
        "Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng",
        () => null
      );
      this.setState({
        cartLength: cartLength + 1,
      });
    }
  };
  onShare = async () => {
    var { data } = this.state;
    try {
      const result = await Share.share({
        message: `${data.LINK_AFFILIATE}`,
        url: ''
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onShareFaceBook = async () => {
    var { data } = this.state;

    try {
      const result = await Share.share({
        message: `${data.CONTENT_FB

          }`,
        url: ''
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  copyIt = () => {
    var { data } = this.state;
    var email = `${data.LINK_AFFILIATE}`;
    Clipboard.setString(email);
  }
  showDanhMuc = () => {
    var { data } = this.state;
    if (data) {
      return Alert.alert(
        "Copy link catalog",
        "B???n mu???n link catalog s???n ph???m hi???n th??? c?? gi?? hay kh??ng c?? gi?? ?",
        [
          {
            text: "KH??NG C?? GI?? SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?v=568&s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E`)
            },
            style: "default",
          },
          {
            text: "HI???N TH??? GI?? SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=http://banbuonthuoc.moma.vn&c=${data.SUB_ID}&ctvid=YU2L0E`)
            },
            style: "default",
          }
        ],
        { cancelable: false }
      );
    } else {
      return alert('kh??ng c?? data');
    }
  };
  showLinkSP = () => {
    var { data } = this.state;
    if (data) {
      return Alert.alert(
        "Copy link",
        "B???n mu???n link s???n ph???m hi???n th??? c?? gi?? hay kh??ng c?? gi?? ?",
        [
          {
            text: "KH??NG C?? GI?? SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?v=536&s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E&p=${data.CODE_PRODUCT}`)
            },
            style: "default",
          },
          {
            text: "HI???N TH??? GI?? SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E&p=${data.CODE_PRODUCT}`)
            },
            style: "default",
          }
        ],
        { cancelable: false }
      );
    } else {
      return alert('kh??ng c?? data');
    }
  };
  valiText = () => {
    const valiText = <Text><HTML
      html={
        this.state.data.CONTENT_FB === null
          ? "<h1>Kh??ng c?? d??? li???u</h1>"
          : this.state.data.CONTENT_FB
      }
    /></Text>
    return valiText;
  }
  render() {
    const { count, activeTab, active, cartLength, loading, data, inside, properties, setSelectedValue } = this.state;
    const { status, authUser } = this.props;
    const images = [{
      // Simplest usage.
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      }
    }]
    const valiText = <HTML
      html={
        data.CONTENT_FB
      }
    />
    var text = valiText;

    return loading ? (
      <Spinner
        visible={loading}
        customIndicator={<ElementCustom />}
      // overlayColor="#ddd"
      />
    ) : (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView>
            <SliderBox
              images={[data.IMG1, data.IMG2, data.IMG3]}
              dotColor={COLOR.BUTTON}
              // resizeMode="contain"
              inactiveDotColor={COLOR.HEADER}
              ImageComponentStyle={{
                marginTop: 5,
                height: sizeHeight(50),
                width: sizeWidth(95)
              }}
            />
            <View style={{ marginTop: sizeHeight(3) }}>
              <Text
                style={{
                  fontSize: sizeFont(5),
                  marginLeft: sizeWidth(2),
                  paddingBottom: sizeHeight(1),
                  fontWeight: "bold"
                }}
              >
                {data.PRODUCT_NAME}
              </Text>
              <View style={styles.viewChildDetail}>
                <Text style={{ fontSize: sizeFont(4), color: COLOR.BUTTON, fontWeight: "bold" }}>
                  Gi?? s???n ph???m: {numeral(handleMoney(status, data, authUser)).format("0,0")} VN??
              </Text>

              </View>
              <View style={{ margin: sizeWidth(2), }}>
                {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text>
                  Hoa h???ng s???n ph???m: <Text style={{ color: '#3399FF' }}>{numeral(data.COMISSION_PRODUCT * data.PRICE * 0.01).format("0,0")} ({data.COMISSION_PRODUCT}%)</Text>
                </Text>}
              </View>
              <View style={{ margin: sizeWidth(2), }}>
                {data.WARRANTY != null ? <Text>B???o h??nh {data.WARRANTY} th??ng</Text> : null}
              </View>
              {/* {properties ? <View style={{ paddingLeft: 10, marginTop: 10 }}>
                {properties != [] ? properties.map((val, key) => {
                  return (
                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                      <Text style={{ fontWeight: 'bold' }}>{val.NAME}</Text>

                      <View style={{ borderColor: '#4a8939', borderWidth: 1, alignItems: 'center', borderRadius: 10 }}>
                        <Picker
                          selectedValue={setSelectedValue}
                          style={{ height: 30, width: sizeWidth(50) }}
                          onValueChange={(itemValue) => this.setState({ setSelectedValue: itemValue })}
                        >
                          {
                            val.INFO.map((val2, key) => {
                              return (
                                <Picker.Item key={key} label={val2.SUB_ID} value={val2.SUB_ID} />
                              )
                            })

                          }
                        </Picker>
                      </View>
                    </View>
                  )
                }) : null}
              </View> : null} */}
              <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                <Image
                  source={require('../../../../assets/images/ship.png')}
                  style={{ width: 45, height: 25 }}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Chi ti???t ch??nh s??ch", {
                      item: '159',
                    })
                  }
                >
                  <Text style={{ fontSize: 17, width: sizeWidth(77), marginLeft: 10, fontStyle: 'italic', textDecorationLine: 'underline' }}>Ch??nh s??ch v???n chuy???n</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                {status === "" || (status !== "" && authUser.GROUPS !== "3") ? (
                  <View
                    style={{
                      flexDirection: "row",
                      height: isIphoneX() ? sizeHeight(6) : sizeHeight(5.5),
                      width: sizeWidth(90),
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.handleTouchAdd}
                      style={styles.touchSafeAddCart}
                    >
                      <IconComponets name="cart-plus" size={sizeFont(5)} color="#fff" />
                      <Text style={{ color: "#fff", marginLeft: sizeWidth(4), textAlign: 'center' }}>
                        Th??m v??o gi??? h??ng
              </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View style={{ height: 4, backgroundColor: '#F1F2F2' }}></View>
              <View style={{ marginTop: sizeHeight(3) }}>
                {activeTab == 1 ? (
                  <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                    <HTML
                      ignoredTags={tags}
                      html={
                        data.CONTENT_WEB === null
                          ? "<h1>Kh??ng c?? d??? li???u</h1>"
                          : data.CONTENT_WEB
                      }
                      onLinkPress={(event, href) =>
                        console.log("clicked link: ", href)
                      }

                      baseFontStyle={{ fontSize: sizeFont(4) }}
                    />
                  </View>
                ) : (
                    <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                      <HTML
                        ignoredTags={tags}

                        html={
                          data.TRAINING === null
                            ? "<h1>Kh??ng c?? d??? li???u</h1>"
                            : data.TRAINING
                        }
                        baseFontStyle={{ fontSize: sizeFont(4) }}
                      />
                    </View>
                  )}
              </View>
            </View>
            {/* <View>
              <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                  { source: require('../../../../assets/images/logo.png'), dimensions: { width: 150, height: 150 } },
                  { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                  { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                  { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                  { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                ]}
              />
            </View> */}
            {status === "" || authUser.GROUPS == "3" ? <View>
              <Text style={{ padding: 5, color: 'blue', fontStyle: 'italic' }}>H??y ????ng k?? t??i kho???n ????? ???????c mua s???n ph???m n??y v???i gi?? g???c, tham gia b??n h??ng c??ng ABC123 v?? h?????ng hoa h???ng C???C S???C</Text>
              <View style={{ marginBottom: sizeHeight(5), justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.5)
                    , backgroundColor: '#4a8939', borderRadius: 25
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");

                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>????NG K??</Text>
                </TouchableOpacity>
              </View>
            </View> :
              <View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontStyle: 'italic' }}>* H?????ng d???n qu???ng c??o s???n ph???m:</Text>
                  <Text style={{ fontStyle: 'italic' }}>- B???m v??o n??t Chia s??? Facebook ????? ?????y to??n b??? h??nh ???nh/ video s???n ph???m sang Facebook c???a b???n. Ph???n text ???? ???????c copy s???n, b???n ch??? vi???c d??n v??o n???i dung b??i vi???t</Text>
                  <Text style={{ fontStyle: 'italic' }}>- B???m v??o n??t T???i ???nh v??? m??y ????? to??n b??? ???nh/video s???n ph???m v??? m??y c???a b???n ????? ????ng l??n c??c n???n t???ng kh??c</Text>
                  <Text style={{ fontStyle: 'italic' }}>- B???m v??o n??t Copy link s???n ph???m ????? g???i link s???n ph???m n??y cho kh??ch h??ng c???a b???n qua Zalo, Messenger, ...</Text>
                  <Text style={{ fontStyle: 'italic' }}>- B???m v??o n??t Copy link danh m???c ????? g???i link bao g???m t???t c??? c??c s???n ph???m c??ng lo???i v???i s???n ph???m n??y cho kh??ch h??ng ch???n qua Zalo, Messenger, ...</Text>
                  <Text style={{ fontStyle: 'italic' }}>- B???m v??o n??t Copy text gi???i thi???u ????? copy b??i vi???t gi???i thi???u s???n ph???m ????? d??n v??o Zalo, Messenger, ...</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: '#4267b2', width: sizeWidth(95), height: sizeHeight(6), borderRadius: 5
                    }}
                  >

                    <Text style={{ color: 'white' }}>Chia s??? Facebook</Text>
                  </TouchableOpacity>
                </View>
                {/* {<Modal visible={true} transparent={true}>
                  <ImageViewer imageUrls={images} />
                </Modal>} */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', backgroundColor: '#FF9900', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                      }}
                      onPress={() => { this.showDanhMuc() }}
                    >

                      <Text style={{ color: 'white' }}>Copy link danh m???c</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', backgroundColor: '#1DA1F2', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                      }}
                      onPress={() => { this.showLinkSP() }}
                    >

                      <Text style={{ color: 'white' }}>Copy link s???n ph???m</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 50 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', backgroundColor: '#4267b2', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                      }}
                    >

                      <Text style={{ color: 'white' }}>T???i ???nh v??? m??y</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', backgroundColor: '#FF9900', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                      }}
                      onPress={() => Clipboard.setString(`${valiText}`)}
                    >

                      <Text style={{ color: 'white' }}>Copy text gi???i thi???u</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            }
          </ScrollView>


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
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addToCart: (text) => dispatch(addToCart(text)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProducts);
