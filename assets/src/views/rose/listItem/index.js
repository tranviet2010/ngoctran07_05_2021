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
  handleLoad = async () => {
    await GetListCTV({
      USERNAME: this.props.username,
      SEARCH: "",
      ID_CITY: "",
      I_PAGE: 1,
      NUMOFPAGE: 50,
      IDSHOP: "ABC123",
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
      IDSHOP: "ABC123"
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
    console.log("data_tt",data_tt)
    return (
      <ScrollView>
        
          {authUser.GROUPS === "3" ? (
            <SafeAreaView>
              <Header />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10 }}>Danh s??ch hoa h???ng CTV</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder="Nh???p m?? ho???c theo t??n CTV"
                    style={{ height: 40, borderColor: '#149CC6', borderRadius: 30, borderWidth: 1, width: sizeWidth(55), paddingLeft: 20 }}
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
                          IDSHOP: "ABC123",
                        })
                          .then((res) => {
                            this.setState({
                              ListData: res.data.INFO,
                              loading: false
                            })
                          })
                          .catch((err) => {
                             Alert.alert('Th??ng b??o','Kh??ng c?? d??? li???u')
                           })
                      })
                    }}
                    style={{ backgroundColor: '#149CC6', padding: 8, marginLeft: 15 }}
                  >
                    <Text>T??m ki???m</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {loading === false ? 
              <ScrollView style={{ marginTop: sizeHeight(1), height: sizeHeight(50) }}  
              >
                <DataTable
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefreshing}
                    />}
                >
                  <DataTable.Header >
                    <DataTable.Title>T??n CTV</DataTable.Title>
                    <DataTable.Title >M?? CTV</DataTable.Title>
                    <DataTable.Title >S??? d?? hoa h???ng</DataTable.Title>
                    <DataTable.Title numeric>Chi ti???t</DataTable.Title>
                  </DataTable.Header>
                  {ListData && ListData.length == 0 ? <Text></Text> : ListData.map((Val, key) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Chi ti???t hoa h???ng theo CTV", {
                        ID_NAME: Val.USERNAME,
                        ID_CODE: Val.USER_CODE
                      })
                      }
                      key={key}
                    >
                      <DataTable.Row>
                        <DataTable.Cell >{Val.USERNAME}</DataTable.Cell>
                        <DataTable.Cell >{Val.USER_CODE}</DataTable.Cell>
                        <DataTable.Cell>{numeral(Val.BALANCE).format("0,0")} ??</DataTable.Cell>
                        <DataTable.Cell numeric>Chi ti???t</DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                  ))}

                </DataTable>
              </ScrollView> : <Loading />}
              <View style={{ height: 5, backgroundColor: '#B8C4C4' }}></View>
              <View>
                <Text style={{ color: '#FF0606', fontSize: 16, paddingLeft: 10 }}>C?? {data_tt && data_tt.length} y??u c???u thanh to??n hoa h???ng m???i</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Y??u c???u thanh to??n")}
                  style={{ backgroundColor: '#FF5C03', height: 40, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Xem c??c y??u c???u thanh to??n</Text>
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
