import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Modal,
  TouchableHighlight
} from "react-native";
import { _retrieveData } from "../../../utils/asynStorage";
import { getListOrder } from "../../../service/order"
import _ from "lodash";
import { Image } from "react-native-elements";
import Loading from '../../../components/loading';

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import styles from "./style";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { Getwithdrawal } from "../../../service/rose";
import moment from "moment";
var numeral = require("numeral");

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
      Data: [],
      loading: false,
      Rose: [],
      endTime: moment(new Date()).format("DD/MM/YYYY"),
      loading: true,
      search: '',
      modalVisible: false,
    };
  }
  handleLoad = async () => {
    await getListOrder({
      USERNAME: '',
      USER_CTV: '',
      START_TIME: '',
      END_TIME: '',
      STATUS: '',
      PAGE: 1,
      NUMOFPAGE: 200,
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Data: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
  }
  handleLoad1 = async () => {
    await Getwithdrawal({
      USERNAME: this.props.username,
      USER_CTV: this.props.username,
      START_TIME: "01/01/2018",
      END_TIME: this.state.endTime,
      PAGE: 1,
      NUMOFPAGE: 10,
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((res) => {
        if (res.data.ERROR == "0000") {
          this.setState({
            Rose: res.data.INFO
          })
        } else {
          this.showToast(res);
        }
      })
      .catch((err) => {
      });
  }
  // componentWillReceiveProps=(nextProps,nextState)=>{
  //   if(this.props.search!=nextProps.search){
  //     this.setState({
  //         search:this.props.search
  //     })
  //   }
  // }
  componentDidMount() {
    this.handleLoad();
    this.handleLoad1();
  }
  handleScreen = (text, title, type) => {
    const { navigation } = this.props;
    navigation.navigate(text, { TITLE: title, TYPE: type });
  };
  render() {
    const {
      data,
      navigation,
      status,
      authUser,
    } = this.props;
    var dataSet = [];
    const { Data, Rose, loading, search, modalVisible } = this.state;
    const sphot = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 1;
    }) : null
    const sphot1 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 2;
    }) : null
    const sphot2 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 3;
    }) : null
    const sphot3 = data ? data.filter((Val, index, array) => {
      return Val.STATUS_TREND == 4;
    }) : null
    return (
      <View>
        {data ? <View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: sizeHeight(7) }}>
                    <View>
                      <TouchableOpacity
                        style={{
                          width: sizeWidth(35), height: sizeHeight(6), marginRight: sizeWidth(5), borderColor: 'white', borderWidth: 2,
                          justifyContent: 'center', alignItems: 'center', borderRadius: 5
                        }}
                        onPress={() => { navigation.navigate("SignIn"), this.setState({ modalVisible: !this.state.modalVisible }) }}
                      >
                        <Text style={{ color: 'white' }}>Đăng nhập</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => { navigation.navigate("SignUp"), this.setState({ modalVisible: !this.state.modalVisible }) }}
                        style={{
                          width: sizeWidth(35), height: sizeHeight(6),
                          justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'white'
                        }}
                      >
                        <Text style={{ color: '#4a8939' }}>Đăng ký</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => {
                      this.setState({ modalVisible: !this.state.modalVisible });
                    }}
                  >
                    <Text style={styles.textStyle}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          {status == '' || authUser.GROUPS == 8 ? <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            {authUser.GROUPS == 8 ? <TouchableOpacity
              style={{
                width: sizeWidth(90), height: sizeHeight(6), backgroundColor: '#000090',
                justifyContent: 'center', alignItems: 'center', borderRadius: 50
              }}
              onPress={() => this.props.navigation.navigate('Thông tin CTV')}
            >
              <Text style={{ color: 'white' }}>Đăng ký để trở thành Cộng tác viên</Text>
            </TouchableOpacity> : <TouchableOpacity
              style={{
                width: sizeWidth(90), height: sizeHeight(6), backgroundColor: '#000090',
                justifyContent: 'center', alignItems: 'center', borderRadius: 50
              }}
              onPress={() => { this.setState({ modalVisible: true }) }}
            >
                <Text style={{ color: 'white' }}>Đăng ký để trở thành Cộng tác viên</Text>
              </TouchableOpacity>}
          </View> : <View style={{ margin: sizeHeight(1) }} >
              {authUser.GROUPS === "3" ? (
                <View style={{ height: 100, width: '100%' }}>
                  <View style={{height: sizeHeight(5), borderRadius: 5, backgroundColor: '#149CC6',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{  color: 'white', fontSize: 16 }}>
                      Số đơn hàng đang chờ xử lý hiện tại
                </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {loading === true ? <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image
                        source={require('../../../assets/images/monney.png')}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                      <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                        {Data.length} đơn
                      </Text>
                    </View> : <Loading />}
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ loading: false }, async () => {
                            await this.handleLoad1();
                            this.setState({ loading: true })
                          })
                        }}
                      >
                        <Image
                          source={require('../../../assets/images/reload.png')}
                          style={{
                            height: 40,
                            width: 40
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>) : (
                  <View style={{ height: 100, width: '100%' }}>
                    <View style={{ height: sizeHeight(4.5), borderRadius: 50, backgroundColor: '#149CC6', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>
                        Số dư hoa hồng hiện tại
                     </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      {loading ? <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/images/monney.png')}
                          style={{
                            height: 40,
                            width: 40
                          }}
                        />
                        {status === "" ? (<Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>0 đ</Text>) : (
                          <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                            {Rose.length == 0 ? 0 : numeral(Rose[0].BALANCE).format("0,0")} đ
                          </Text>
                        )}
                      </View> : <Loading />}
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ loading: false }, async () => {
                              await this.handleLoad1();
                              this.setState({ loading: true })
                            })
                          }}
                        >
                          <Image
                            source={require('../../../assets/images/reload.png')}
                            style={{
                              height: 40,
                              width: 40
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>

            </View>}
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text >SẢN PHẨM NỔI BẬT</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                  onPress={() => this.props.navigation.navigate('FullItem', {
                    data: sphot
                  })}
                >Xem thêm</Text>
                <Image source={require('../../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
              </View>
            </View>
            <FlatList
              data={sphot}
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
                        length: 12,
                      })}{" "}
                    </Text>
                    <Text style={styles.textPrice}>
                      {numeral(
                        handleMoney(status, item, authUser)
                      ).format("0,0")} đ
                          </Text>
                    {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text>
                      HH: <Text style={{ color: '#3399FF' }}>{numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")} ({item.COMISSION_PRODUCT}%)</Text>
                    </Text>}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.ID_PRODUCT.toString()}
            />
          </View>
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
          <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>SẢN PHẨM BÁN CHẠY</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                  onPress={() => this.props.navigation.navigate('FullItem', {
                    data: sphot1
                  })}
                >Xem thêm</Text>
                <Image source={require('../../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
              </View>
            </View>
            <FlatList
              data={sphot1}
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
                        length: 12,
                      })}{" "}
                    </Text>
                    <Text style={styles.textPrice}>
                      {numeral(
                        handleMoney(status, item, authUser)
                      ).format("0,0")} đ
                          </Text>
                    <Text>
                      {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text>
                        HH: <Text style={{ color: '#3399FF' }}>{numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")} ({item.COMISSION_PRODUCT}%)</Text>
                      </Text>}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.ID_PRODUCT.toString()}
            />
          </View>
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
          <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>SẢN PHẨM MỚI</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                  onPress={() => this.props.navigation.navigate('FullItem', {
                    data: sphot2
                  })}
                >Xem thêm</Text>
                <Image source={require('../../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
              </View>
            </View>
            <FlatList
              data={sphot2}
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
                        length: 12,
                      })}{" "}
                    </Text>
                    <Text style={styles.textPrice}>
                      {numeral(
                        handleMoney(status, item, authUser)
                      ).format("0,0")} đ
                          </Text>
                    <Text>
                      {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text>
                        HH: <Text style={{ color: '#3399FF' }}>{numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")} ({item.COMISSION_PRODUCT}%)</Text>
                      </Text>}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.ID_PRODUCT.toString()}
            />
          </View>
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
          <View style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>SẢN PHẨM KHUYẾN MÃI</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: sizeFont(4), color: '#166CEE' }}
                  onPress={() => this.props.navigation.navigate('FullItem', {
                    data: sphot3
                  })}
                >Xem thêm</Text>
                <Image source={require('../../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
              </View>
            </View>
            <FlatList
              data={sphot3}
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
                        length: 12,
                      })}{" "}
                    </Text>
                    <Text style={styles.textPrice}>
                      {numeral(
                        handleMoney(status, item, authUser)
                      ).format("0,0")} đ
                    </Text>
                    <Text>
                      {this.props.authUser.GROUPS == 8 || this.props.authUser.GROUPS == undefined ? null : <Text>
                        HH: <Text style={{ color: '#3399FF' }}>{numeral(item.COMISSION_PRODUCT * item.PRICE * 0.01).format("0,0")} ({item.COMISSION_PRODUCT}%)</Text>
                      </Text>}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.ID_PRODUCT.toString()}
            />
          </View>
          <View style={{ height: 5, backgroundColor: '#F1F2F2' }}></View>
        </View> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    search: state.notify.searchproduct,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);
