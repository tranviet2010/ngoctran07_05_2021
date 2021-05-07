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
  Picker,
  Alert
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
import { Platform } from "react-native";
import { ToastAndroid } from "react-native";
import { Toast } from "native-base";
import { PermissionsAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
// import CameraRoll from "@react-native-community/cameraroll";
// import { ShareDialog } from "react-native-fbsdk";
import Clipboard from '@react-native-community/clipboard';
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
      IDSHOP: "ABC123",
      IDPRODUCT: ID_PRODUCT,
    })
      .then((result) => {
        console.log("this is details",result)
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
    const { count, activeTab, cartLength, loading, data, properties,setSelectedValue } = this.state;
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
    await this.props.addToCart(data,setSelectedValue);
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

  copyIt = () => {
    var { data } = this.state;
    var email = `${data.LINK_AFFILIATE}`;
    Clipboard.setString(email);
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

  showMess =()=>{
    Toast.show({text:"Thành công",buttonText:"OK"});
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
              Clipboard.setString(`https://f5sell.com/catalog?v=568&s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E`);
              this.showMess();
            },
            style: "default",
          },
          {
            text: "HIỂN THỊ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E`);
              this.showMess();
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
              Clipboard.setString(`https://f5sell.com/catalog?v=536&s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E&p=${data.CODE_PRODUCT}`);
              this.showMess();
            },
            style: "default",
          },
          {
            text: "HIỂN THỊ GIÁ SP",
            onPress: () => {
              Clipboard.setString(`https://f5sell.com/catalog?s=ABC123&c=${data.SUB_ID}&ctvid=YU2L0E&p=${data.CODE_PRODUCT}`);
              this.showMess();
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
  render() {


    const { count, activeTab, cartLength, loading, data, inside, properties, setSelectedValue } = this.state;
    console.log("this is properties",properties)
    const { status, authUser } = this.props;
    console.log({setSelectedValue});

    console.log("this is data status", status);
    console.log("this is data product", data);
    var color = inside ? "#E1AC06" : "#F5F5F5";
    var color2 = inside ? "#F5F5F5" : "#E1AC06";


    var colorText = inside ? "white" : "#C5C9C9";
    var colorText1 = inside ? "#C5C9C9" : "white";

    var colorBor = inside ? "black" : "#C5C9C9";
    var colorBor1 = inside ? "#C5C9C9" : "black";

    var backGround = inside ? "#149CC6" : "#C6C6C6";
    var backGround1 = inside ? "#C6C6C6" : "#149CC6";
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
              <View style={{marginHorizontal: sizeWidth(2),}}>
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

                      <View style={{ borderColor: '#E1AC06', borderWidth: 1, alignItems: 'center', borderRadius: 10 }}>
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

              <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                <Image
                  source={require('../../../../assets/images/ship.png')}
                  style={{ width: 45, height: 25 }}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Chi tiết chính sách", {
                      item: '566',
                    })
                  }
                >
                  <Text style={{ fontSize: 17, width: sizeWidth(77), marginLeft: 10, fontStyle: 'italic', textDecorationLine: 'underline' }}>Chính sách vận chuyển</Text>
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
                <Text style={{fontWeight:'bold',fontSize:sizeFont(4.5)}}>Mô tả sản phẩm</Text>
                  <HTML
                    ignoredTags={tags}
                    html={
                      data.CONTENT_WEB === null
                        ? "<h5>Mô tả:...</h5>"
                        : data.CONTENT_WEB
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
            {status === "" ? <View>
              <Text style={{ padding: 5, color: 'blue',fontStyle:'italic' }}>Hãy đăng ký tài khoản để được mua sản phẩm này với giá gốc, tham gia bán hàng cùng ABC123 và hưởng hoa hồng CỰC SỐC</Text>
              <View style={{marginBottom: sizeHeight(5), justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center', alignItems: 'center',width:sizeWidth(60),height:sizeHeight(5.5)
                    ,backgroundColor:'#E1AC06',borderRadius:25
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
                >
                  <Text style={{color:'#fff',fontWeight:'bold'}}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
              </View>
                </View> :<View>{this.props.authUser.GROUPS==8?null:              <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: '#4267b2', width: sizeWidth(95), height: sizeHeight(6), borderRadius: 5
                    }}
                    onPress={()=>{
                      this.shareLinkWithShareDialog(data)
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
                      onPress={()=>{this.showDanhMuc()}}
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
                      onPress={()=>{this.showLinkSP()}}
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
                      onPress={()=>{
                        this.showMess()
                      }}
                    >
                      <Text style={{ color: 'white' }}>Copy text giới thiệu</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>}</View>

              // <View>
              //   <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              //     <TouchableOpacity
              //       onPress={() => this.setState({ inside: true })}
              //       style={{
              //         flexDirection: 'row', width: sizeWidth(45), height: sizeHeight(7.5), backgroundColor: `${color}`,
              //         alignItems: 'center', justifyContent: 'center', borderRadius: 5
              //       }}
              //     >
              //       <View style={{
              //         borderRightColor: `${colorBor}`, borderRightWidth: 1, height: sizeHeight(7.5), alignItems: 'center',
              //         justifyContent: 'center'
              //       }}>
              //         {inside === false ? <Image
              //           source={require('../../../../assets/images/content.png')}
              //           style={{ width: 35, height: 35, marginRight: 5 }}
              //         /> : <Image
              //             source={require('../../../../assets/images/content_active.png')}
              //             style={{ width: 35, height: 35, marginRight: 5 }}
              //           />}
              //       </View>
              //       <Text style={{ color: `${colorText}`, paddingLeft: 5 }}>Nội dung affaliate</Text>
              //     </TouchableOpacity>
              //     <TouchableOpacity
              //       onPress={() => this.setState({ inside: false })}
              //       style={{ flexDirection: 'row', width: sizeWidth(45), height: sizeHeight(7.5), backgroundColor: `${color2}`, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
              //     >
              //       <View style={{
              //         borderRightColor: `${colorBor1}`, borderRightWidth: 1, height: sizeHeight(7.5), alignItems: 'center',
              //         justifyContent: 'center'
              //       }}>
              //         {inside === true ? <Image
              //           source={require('../../../../assets/images/fb.png')}
              //           style={{ width: 35, height: 35, marginRight: 5 }}
              //         /> : <Image
              //             source={require('../../../../assets/images/fb_active.png')}
              //             style={{ width: 35, height: 35, marginRight: 5 }}
              //           />}
              //       </View>
              //       <Text style={{ color: `${colorText1}`, paddingLeft: 5 }}>Chia sẻ facebook</Text>
              //     </TouchableOpacity>
              //   </View>
              //   <View style={{ flexDirection: 'row', padding: 10 }}>
              //     <View style={{ width: sizeWidth(45), height: 5, backgroundColor: `${backGround}` }}></View>
              //     <View style={{ width: sizeWidth(50), height: 5, backgroundColor: `${backGround1}` }}></View>
              //   </View>
              //   <View style={{ marginBottom: 20, paddingLeft: 18 }}>
              //     {inside ? <View>
              //       <View>
              //         <HTML
              //           html={
              //             data.TRAINING === null
              //               ? "<h1>Không có dữ liệu</h1>"
              //               : data.TRAINING
              //           }
              //         />
              //       </View>
              //       <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              //         <TouchableOpacity
              //           onPress={() => {
              //             this.onShare();
              //           }}
              //           style={{ backgroundColor: '#E1AC06', width: sizeWidth(35), borderRadius: 5, padding: 7 }}
              //         >
              //           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              //             <Image
              //               source={require('../../../../assets/images/share.png')}
              //               style={{ width: 35, height: 35 }}
              //             />
              //             <Text style={{ color: 'white' }}>Chia sẻ link</Text>
              //           </View>

              //         </TouchableOpacity>

              //         <TouchableOpacity
              //           onPress={() => {
              //             this.copyIt();
              //           }}
              //           style={{ backgroundColor: '#222220', width: sizeWidth(35), borderRadius: 5, padding: 7 }}
              //         >
              //           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              //             <Image
              //               source={require('../../../../assets/images/copy.png')}
              //               style={{ width: 35, height: 35 }}
              //             />
              //             <Text style={{ color: 'white' }}>Copy link</Text>
              //           </View>

              //         </TouchableOpacity>
              //       </View>
              //     </View> : <View>
              //         <Text >Nội dung bán hàng</Text>
              //         <View>
              //           <HTML
              //             html={
              //               data.CONTENT_FB === null
              //                 ? "<h1>Không có dữ liệu</h1>"
              //                 : data.CONTENT_FB
              //             }
              //           />
              //         </View>
              //         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              //           <TouchableOpacity
              //             onPress={() => {
              //               this.onShareFaceBook();
              //             }}
              //             style={{ backgroundColor: '#E1AC06', width: sizeWidth(35), borderRadius: 5, padding: 7 }}
              //           >
              //             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              //               <Image
              //                 source={require('../../../../assets/images/share.png')}
              //                 style={{ width: 35, height: 35 }}
              //               />
              //               <Text style={{ color: 'white' }}>Chia sẻ</Text>
              //             </View>

              //           </TouchableOpacity>

              //           <TouchableOpacity

              //             style={{ backgroundColor: '#222220', width: sizeWidth(35), borderRadius: 5, padding: 7 }}
              //           >
              //             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              //               <Image
              //                 source={require('../../../../assets/images/dow.png')}
              //                 style={{ width: 35, height: 35 }}
              //               />
              //               <Text style={{ color: 'white' }}>Tải về máy</Text>
              //             </View>

              //           </TouchableOpacity>
              //         </View>
              //       </View>
              //     }
              //   </View>
              // </View>
            }
          </ScrollView>


        </View>
      );
  }


  shareLinkWithShareDialog = async(data)=>{
    const sharePhotoContent = {
      contentType : 'link',
      // photos: [{ imageUrl: data.IMG1 }],
      contentUrl: data.IMAGE_COVER,
      contentDescription: data.PRODUCT_NAME,
    }
    ShareDialog.canShow(sharePhotoContent).then(
      function(canShow){
        if(canShow){
          return ShareDialog.show(sharePhotoContent);
        }
      }
    ).then(
      function(result){
        if(result.isCancelled){
          console.log('Share canceled');
        }else{
          console.log('Share success with postId: '+result.postId);
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    )
    //data.IMAGE_COVER, data.IMG1, data.IMG2, data.IMG3
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

  handleDownload= async (url)=>{
    if (url==='' || url === null) {
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
      appendExt:'png',
    }).fetch('GET', url)
      .then(res=>{
        CameraRoll.save(res.data, 'photo')
          .then(()=>{
            Alert.alert('Tải về', 'Tải về thành công',[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable: false},);
          })
          .catch(error=>{
            Alert.alert('Tải về thất bại', error.message,[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable: false},);
          })
          // .finally(()=>this.setState({saving:false}))
      })
      .catch(error=>{
        // this.setState({saving:false})
        Alert.alert('Tải về', 'Lỗi',[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable: false},);
      });
  };
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
  return { addToCart: (text,property) => dispatch(addToCart(text,property)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProducts);
