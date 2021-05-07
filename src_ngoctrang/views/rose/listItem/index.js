import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  TextInput,
  Animated,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { GetListCTV } from "../../../service/account";
import { _retrieveData } from "../../../utils/asynStorage";
import _ from "lodash";
import { DataTable } from 'react-native-paper';
import Header from "../../rose/header/index";
import CtvSub from "../subchilditem/ctvsub";
import Loading from '../../../components/loading';

import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { connect } from "react-redux";
import { handleMoney } from "../../../components/money";
import { GetwithdrawalCTV } from "../../../service/rose";
var numeral = require("numeral");

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0, 1, 2, 0],
      scrollY: new Animated.Value(0),
      ListData: [],
      data_tt: [],
      onChangeText: '',
      loading: false,
    };
    this.count = 0;
  }
  sumData=()=>{
    const {ListData}=this.state;
    var sum=0;
    if(ListData){
    for(let i=0;i<ListData.length;i++){
        sum+=parseFloat(ListData[i].BALANCE);
    }
    return sum;
  }
  }
  handleLoad = async () => {
    await GetListCTV({
      USERNAME: this.props.username,
      SEARCH: "",
      ID_CITY: "",
      I_PAGE: 1,
      NUMOFPAGE: 50,
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((res) => {
        console.log("get list ctv", res)
        this.setState({
          ListData: res.data.INFO
        })
      })
      .catch((err) => { })
    await GetwithdrawalCTV({
      USERNAME: this.props.username,
      PAGE: 1,
      NUMOFPAGE: 100,
      IDSHOP: 'http://banbuonthuoc.moma.vn'
    }).then((res) => {
      console.log("this is GetwithdrawalCTV",res);
      this.setState({
        data_tt: res.data.INFO
      })
    })
      .catch((err) => { })
  }
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      data,
      refreshing,
      navigation,
      onRefreshing,
      status,
      authUser,
      username,
    } = this.props;
    const { ListData, data_tt, loading, onChangeText } = this.state;
    console.log("data_tt",ListData)
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>
        
          {authUser.GROUPS === "3" ? (
            <SafeAreaView>
                      {authUser.GROUPS === '3' ? (
          <View style={{}} >
            <View style={{ height: 100, width: sizeWidth(100) }}>
              <View style={{justifyContent:'center',alignItems:'center',height: sizeHeight(4.5),width:sizeWidth(100), backgroundColor: COLOR.MAIN,marginTop:10 }}>  
                <Text style={{color: '#fff', fontSize: 16 }}>
                  Số dư hoa hồng hiện tại
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Image
                    source={require('../../../assets/images/monney.png')}
                    style={{
                      height: 40,
                      width: 40
                    }}
                  />
                  <Text style={{ fontSize: 20, color: '#FF5C03', alignItems: 'center', fontWeight: 'bold', paddingTop: 8, paddingLeft: 5 }}>
                    {numeral(this.sumData()).format("0,0")}
                 </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 5, backgroundColor: '#f1f2f2' }}></View>
          </View>) : null}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10 }}>Danh sách hoa hồng CTV</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder="Nhập mã hoặc theo tên CTV"
                    style={{ height: 35, borderColor: COLOR.MAIN, borderRadius: 30, borderWidth: 1, width: sizeWidth(55), paddingLeft: 10 }}
                    onChangeText={(text) => this.setState({ onChangeText: text })}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ loading: true }, async () => {
                        await GetListCTV({
                          USERNAME: username,
                          SEARCH: onChangeText,
                          ID_CITY: "",
                          I_PAGE: 1,
                          NUMOFPAGE: 50,
                          IDSHOP: 'http://banbuonthuoc.moma.vn',
                        })
                          .then((res) => {
                            this.setState({
                              ListData: res.data.INFO,
                              loading: false
                            })
                          })
                          .catch((err) => {
                            
                             this.setState({
                              ListData: [],
                              loading: false
                            })
                           })
                      })
                    }}
                    style={{ backgroundColor: '#149CC6', padding: 7, marginLeft: 15 }}
                  >
                    <Text style={{color:'#fff'}}>Tìm kiếm</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {loading === false ? 
              <ScrollView style={{ marginTop: sizeHeight(1), height: sizeHeight(45) }}  
              >
                <DataTable
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefreshing}
                    />}
                >
                  <DataTable.Header >
                    <DataTable.Title>Tên CTV</DataTable.Title>
                    <DataTable.Title >Mã CTV</DataTable.Title>
                    <DataTable.Title >Số dư hoa hồng</DataTable.Title>
                    <DataTable.Title numeric>Chi tiết</DataTable.Title>
                  </DataTable.Header>
                  {ListData && ListData.length == 0 ? <Text></Text> : ListData.map((Val, key) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Chi tiết hoa hồng theo CTV", {
                        ID_NAME: Val.USERNAME,
                        ID_CODE: Val.USER_CODE
                      })
                      }
                      key={key}
                    >
                      <DataTable.Row>
                        <DataTable.Cell >{Val.FULL_NAME}</DataTable.Cell>
                        <DataTable.Cell >{Val.USER_CODE}</DataTable.Cell>
                        <DataTable.Cell>{numeral(Val.BALANCE).format("0,0")} đ</DataTable.Cell>
                        <DataTable.Cell numeric>Chi tiết</DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                  ))}

                </DataTable>
              </ScrollView> : <Loading />}
              <View style={{ height: 5, backgroundColor: '#B8C4C4' }}></View>
              <View>
                <Text style={{ color: '#FF0606', fontSize: 16, padding: 10 }}>Có {data_tt && data_tt.length} yêu cầu thanh toán hoa hồng mới</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Yêu cầu thanh toán")}
                  style={{ backgroundColor: COLOR.MAIN, height: 40, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Xem các yêu cầu thanh toán</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>) : (
              <View>
                <CtvSub navigation={navigation}/>
              </View>
            )}
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    idshop:state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts);


const styles = StyleSheet.create({
  viewText: {
    padding: 10,
    lineHeight: 10,
    borderBottomColor: '#D9E2E2',
    borderBottomWidth: 8,
  }
})
