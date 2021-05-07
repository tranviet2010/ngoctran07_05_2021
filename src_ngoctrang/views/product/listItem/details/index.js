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
  Button,
  Modal,
  Clipboard,
  Picker,
  Alert
} from "react-native";
// import CameraRoll from "@react-native-community/cameraroll";
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
import ImageViewer from 'react-native-image-zoom-viewer';
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
import RNFetchBlob from 'rn-fetch-blob';
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import { GetProperties } from "../../../../service/order";
import { controllers } from "chart.js";
// import { ShareDialog } from "react-native-fbsdk";

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
const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>,
};
class DetailProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      activeTab: 1,
      cartLength: this.props.listItem.length,
      loading: true,
      refreshing: false,
      dataImage:[],
      data: [],
      inside: true,
      active:false,
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
  shareLinkWithShareDialog(shareLink) {
    ShareDialog.canShow(shareLink).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLink);
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Share canceled');
        } else {
          console.log('Share success with postId: ' + result.postId);
        }
      },
      function (error) {
        console.log('Share fail with error: ' + error);
      }
    )
  }
  getDataImage=()=>{
    const {dataImage}=this.state;
    let newArray=[];
    const pushObjject=(item:string)=>{
      return {url:item}
    }
    dataImage.map((item:string)=>{
      newArray.push(pushObjject(item))
    })
    return newArray;
  }
  getPermissionAndroid = async ()=>{
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
        title:'Cấp quyền truy cập bộ nhớ',
        message:'Bạn cần cấp quyền truy cập vào bộ nhớ để lưu ảnh/video',
        buttonNegative:'Cancel',
        buttonPositive:'OK'
      },);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert('Lưu ảnh', 'Cấp quyền cho app lưu ảnh',[{text:'OK', onPress:()=>console.log('OK Pressed')}],{cancelable:false},);
    } catch (error) {
      Alert.alert('Lưu ảnh', 'Cấp quyền cho app lưu ảnh',[{text:'OK', onPress:()=>console.log('OK Pressed')}],{cancelable:false},);
    }
  }
  handleDownload = async (url) => {
    if (url === '' || url === null) {
      return
    }
    if (Platform.OS === 'android') {
      const granted = await this.getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    // this.setState({saving:true});
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    }).fetch('GET', url)
      .then(res => {
        CameraRoll.save(res.data, 'photo')
          .then(() => {
            Alert.alert('Tải về', 'Tải về thành công', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false },);
          })
          .catch(error => {
            Alert.alert('Tải về thất bại', error.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false },);
          })
        // .finally(()=>this.setState({saving:false}))
      })
      .catch(error => {
        // this.setState({saving:false})
        Alert.alert('Tải về', 'Lỗi', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false },);
        console.log("error=====",error)
      });
  }
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
        console.log("this is details", result)
        if (result.data.ERROR === "0000") {
          this.setState({ data: result.data.INFO[0] }, () =>
            this.setState({ loading: false,
              dataImage: result.data.INFO
            })
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
  shareContent = (text) => {
    Share1.shareSingle({
      title: 'Ngọc trang',
      message: 'abcccc',
      backgroundImage: 'https://f5sell.com/upload//banbuonthuocmoma@gmail.com/thuoc_tan_duoc/tim_mach/procoralan_5mg_(hop_4_vi_x_14_vien)/procoradan5mg.jpg',
      url: 'some.com',
      social: Share1.Social.FACEBOOK,
    }).catch((err) => { err && console.log(err); });
  }

  handleTouchBuy = () => {
    const { status, navigation, authUser } = this.props;
    const { data } = this.state;
    if (status == "") {
      return AlertCommonLogin(
        "Thông báo",
        "Vui lòng đăng nhập trước khi đặt hàng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Huỷ bỏ",
        "Đăng nhập"
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
    const { count, activeTab, cartLength, loading, data, properties, setSelectedValue } = this.state;
    console.log("data cart", data);
    const { status, navigation } = this.props;
    if (status == "") {
      return AlertCommonLogin(
        "Thông báo",
        "Vui lòng đăng nhập trước khi đặt hàng",
        () => null,
        () => {
          navigation.popToTop();
          navigation.navigate("SignIn");
        },
        "Huỷ bỏ",
        "Đăng nhập"
      );
    }
    await this.props.addToCart(data, setSelectedValue);
    if (cartLength == this.props.listItem.length) {
      AlertCommon("Thông báo", "Sản phẩm đã có trong giỏ hàng", () => null);
    } else {
      AlertCommon(
        "Thông báo",
        "Thêm sản phẩm vào giỏ hàng thành công",
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
        "Bạn muốn link catalog sản phẩm hiện thị có giá hay không có giá ?",
        [
          {
            text: "KHÔNG CÓ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?v=568&s=http://banbuonthuoc.moma.vn&c=${data.SUB_ID}&ctvid=${this.props.authUser.USER_CODE}`)
            },
            style: "default",
          },
          {
            text: "HIỂN THỊ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=http://banbuonthuoc.moma.vn&c=${data.SUB_ID}&ctvid=${this.props.authUser.USER_CODE}`)
            },
            style: "default",
          }
        ],
        { cancelable: false }
      );
    } else {
      return alert('không có data');
    }
  };
  showLinkSP = () => {
    var { data } = this.state;
    if (data) {
      return Alert.alert(
        "Copy link",
        "Bạn muốn link sản phẩm hiện thị có giá hay không có giá ?",
        [
          {
            text: "KHÔNG CÓ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?v=536&s=http://banbuonthuoc.moma.vn&c=${data.SUB_ID}&ctvid=${this.props.authUser.USER_CODE}&p=${data.CODE_PRODUCT}`)
            },
            style: "default",
          },
          {
            text: "HIỂN THỊ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=http://banbuonthuoc.moma.vn&c=${data.SUB_ID}&ctvid=${this.props.authUser.USER_CODE}&p=${data.CODE_PRODUCT}`)
            },
            style: "default",
          }
        ],
        { cancelable: false }
      );
    } else {
      return alert('không có data');
    }
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


    const { count, activeTab, cartLength, loading, data, inside, properties, setSelectedValue, listItem,active,dataImage } = this.state;
    console.log("this is properties", properties)
    const { status, authUser } = this.props;
    console.log("aaaaaaaaaaaaaaaaa", data.IMAGE_COVER);
    console.log("dataImage====",dataImage);
    console.log("this is data status", status);
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
              resizeMode="contain"
              inactiveDotColor={COLOR.HEADER}
              ImageComponentStyle={{
                height: sizeHeight(25),
              }}
            />
            <View style={{ marginTop: sizeHeight(3) }}>
              <Text
                style={{
                  fontSize: sizeFont(4),
                  marginLeft: sizeWidth(2),
                  paddingBottom: sizeHeight(1),
                  fontWeight: "bold"
                }}
              >
                {data.PRODUCT_NAME}
              </Text>
              <View style={styles.viewChildDetail}>
                <Text style={{ fontSize: sizeFont(4), color: COLOR.BUTTON, fontWeight: "500" }}>
                  Giá sản phẩm: {data.END_PROMOTION && this.checkTime(data.START_PROMOTION, data.END_PROMOTION) > 0 ? <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'red', marginRight: 10 }}>{numeral(data.PRICE_PROMOTION).format("0,0")} đ</Text>
                      <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: sizeFont(3.5) }}>{numeral(data.PRICE).format("0,0")} đ</Text>
                    </View>
                  </View> : <Text >
                      {numeral(data.PRICE).format("0,0")} đ
                          </Text>}
                </Text>
              </View>
              <View style={{ marginHorizontal: sizeWidth(2), }}>
                {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null :
                  <Text style={{ color: '#006699' }}>Hoa hồng sản phẩm: {data.END_PROMOTION && this.checkTime(data.START_PROMOTION, data.END_PROMOTION) > 0 ?
                    <Text>{numeral(data.COMISSION_PRODUCT * data.PRICE_PROMOTION * 0.01).format("0,0")}đ ({data.COMISSION_PRODUCT}%)</Text> :
                    <Text>{numeral(data.COMISSION_PRODUCT * data.PRICE * 0.01).format("0,0")}đ ({data.COMISSION_PRODUCT}%)</Text>}</Text>}
              </View>
              {/* {properties ? <View style={{ paddingLeft: 10, marginTop: 10 }}>
                {properties != [] ? properties.map((val, key) => {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                      <Text style={{ fontWeight: 'bold' }}>{val.NAME}</Text>

                      <View style={{ borderColor: '#4a8939', borderWidth: 1, alignItems: 'center', borderRadius: 10 }}>
                        <Picker
                          selectedValue={setSelectedValue}
                          style={{ height: 30, width: sizeWidth(50) }}
                          onValueChange={(itemValue) => this.setState({ setSelectedValue: itemValue })}
                        >
                          {
                            val.INFO.map((val2) => {
                              return (
                                <Picker.Item label={val2.SUB_ID} value={val2.SUB_ID} />
                              )
                            })

                          }
                        </Picker>
                      </View>
                    </View>
                  )
                }) : null}
              </View> : null} */}
              <View style={{ paddingLeft: 10, flexDirection: 'row', paddingBottom: 8, paddingTop: 8 }}>
                <Image
                  source={require('../../../../assets/images/ship.png')}
                  style={{ width: 45, height: 25 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Chính sách')
                  }}
                >
                  <Text style={{ fontSize: 17, width: sizeWidth(77), textDecorationLine: 'underline', marginLeft: 10 }}>Chính sách vận chuyển</Text>

                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                {status === "" || (status !== "" && authUser.GROUPS !== "3") ? (
                  <View
                    style={{
                      flexDirection: "row",
                      height: isIphoneX() ? sizeHeight(6) : sizeHeight(5.5),
                      width: sizeWidth(90)
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.handleTouchAdd}
                      style={styles.touchSafeAddCart}
                    >
                      <IconComponets name="cart-plus" size={sizeFont(5)} color="#fff" />
                      <Text style={{ color: "#fff", marginLeft: sizeWidth(4), textAlign: 'center' }}>
                        Thêm vào giỏ hàng
              </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View style={{ height: 4, backgroundColor: '#F1F2F2' }}></View>
              <View style={{ marginTop: sizeHeight(3) }}>

                <View style={{ width: sizeWidth(96), alignSelf: "center" }}>
                  <Text style={{ fontWeight: 'bold', fontSize: sizeFont(4.5) }}>Mô tả sản phẩm</Text>
                  <HTML
                    ignoredTags={tags}
                    html={
                      data.CONTENT_FB === null
                        ? "<h5>Mô tả:...</h5>"
                        : data.CONTENT_FB
                    }
                    onLinkPress={(event, href) =>
                      console.log("clicked link: ", href)
                    }
                    renderers={renderers}
                    baseFontStyle={{ fontSize: sizeFont(4) }}
                  />
                </View>
              </View>
            </View>
            {status === "" || authUser.GROUPS == 8 ? <View>
              <Text style={{ padding: 5, color: 'blue', fontStyle: 'italic' }}>Hãy đăng ký tài khoản để được mua sản phẩm này với giá gốc, tham gia bán hàng cùng ngọc trang và hưởng hoa hồng CỰC SỐC</Text>
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
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
              </View>
            </View> : <View>{this.props.authUser.GROUPS == 8 ? null : <View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => this.shareLinkWithShareDialog()}
                  style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#4267b2', width: sizeWidth(95), height: sizeHeight(6), borderRadius: 5
                  }}
                >

                  <Text style={{ color: 'white' }}>Chia sẻ Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: '#FF9900', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                    }}
                    onPress={() => { this.showDanhMuc() }}
                  >

                    <Text style={{ color: 'white' }}>Copy link danh mục</Text>
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

                    <Text style={{ color: 'white' }}>Copy link sản phẩm</Text>
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
                    onPress={()=>
                      {
                        var { data } = this.state;
                        console.log('check data', data);
                        Promise.all([this.handleDownload(data.IMAGE_COVER),this.handleDownload(data.IMG1),this.handleDownload(data.IMG2)
                      ,this.handleDownload(data.IMG3)])
                      }
                    }
                  >

                    <Text style={{ color: 'white' }}>Tải ảnh về máy</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: '#FF9900', width: sizeWidth(45), height: sizeHeight(6), borderRadius: 5
                    }}
                  >

                    <Text style={{ color: 'white' }}>Copy text giới thiệu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>}</View>
            }
            {authUser.GROUPS == 8 ?
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text style={{ fontStyle: 'italic', marginBottom: 10, fontSize: sizeFont(3.5) }}>Hãy đăng ký trở thành Cộng tác viên để được mua sản phẩm này với giá gốc, tham gia bán hàng cùng NGỌC TRANG và hưởng hoa hồng CỰC SỐC</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: sizeWidth(30), height: sizeHeight(5), backgroundColor: COLOR.MAIN, borderRadius: 15 }}>
                  {this.props.authUser.GROUPS == 8 ? <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('dremTech')

                  }} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Đăng ký CTV</Text>
                  </TouchableOpacity> : null}
                </View>
              </View> : null}
          </ScrollView>

          <View>
            <Modal visible={active} >
              
              <ImageViewer imageUrls={this.getDataImage()} onClick={()=>this.setState({active:false})}/>
            </Modal>
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
    listItem: state.order.listItem,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addToCart: (text, property) => dispatch(addToCart(text, property)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProducts);
