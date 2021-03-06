import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { COLOR } from "../../utils/color/colors";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import { connect } from "react-redux";
import { LoginPhone, UpdateDivice, GetProfile } from "../../action/authAction";
import { GetInformation } from "../../service/account";
import { _retrieveData } from "../../utils/asynStorage";
import { Getwithdrawal } from "../../service/order";
import { AUTH, USER_NAME } from "../../utils/asynStorage/store";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../components/error";
import ListProducts from "./listItem";
import {
  getListSubProducts,
} from "../../service/products";
import { getListNotify } from "../../service/notify";
import { countNotify } from "../../action/notifyAction";
import { getListTrend } from "../../service/products";
import News from "../account/profile/infor/news/News";
import _ from "lodash";
//const unsubscribe;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      data_intro: [],
      data_tech: [],
      data_news: [],
      refreshing: false,
      search: "",
      loadingSearch: false,
      message: "",
      dataSub: [],
      showModal: false,
      data_rose: [],
    };
    this.see = false;

    this.message;
    this.refs.viewHome;
    //this._unsubscribe;
  }
  handleLoad = async () => {
    var resultArray = [];
    const data = await _retrieveData(USER_NAME)
      .then(async (result) => {
        if (result) {
          await this.props
            .GetProfile({
              IDSHOP: "ABC123",
              USER_CTV: result.substr(1).slice(0, -1),
              USERNAME: result.substr(1).slice(0, -1),
            })
            .then((result) => {
              console.log('getprofile', result)
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
          getListNotify({
            USERNAME: result.substr(1).slice(0, -1),
            PAGE: 1,
            NUMOFPAGE: 5,
            IDSHOP: "ABC123",
          })
            .then((result) => {
              console.log('data notify', result);
              if (result.data.ERROR === "0000") {
                this.props.countNotify(result.data.SUM_NOT_READ);
              } else {
              }
            })
            .catch((error) => {
            });

        } else {
          await getListSubProducts({
            USERNAME: null,
            ID_PARENT: null,
            IDSHOP: "ABC123",
            SEARCH_NAME: this.state.search,
          })
            .then((result) => {
              if (result.data.ERROR == "0000") {
               
              } else {
                this.setState({ loading: false }, () => {
                  AlertCommon("Th??ng b??o", result.data.RESULT, () => null)
                  console.log(this.state.data)
                }
                );
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: false });
      });
  };
  // handleLoad1 = () => {
  //   Getwithdrawal({
  //     USERNAME: this.props.username,
  //     USER_CTV: this.props.username,
  //     START_TIME: this.state.startTime,
  //     END_TIME: this.state.endTime,
  //     PAGE: 1,
  //     NUMOFPAGE: 10,
  //     IDSHOP: "ABC123",
  //   })
  //     .then((res) => {
  //       console.log("data_rose", res)
  //       if (res.data.ERROR == "0000") {
  //         this.setState({
  //           data_rose: res.data.INFO
  //         })
  //       } else {
  //         this.showToast(res);
  //       }
  //     })
  //     .catch((err) => {
  //     });
  // }
  componentDidMount() {
    this.handleLoad();
    
    const { navigation } = this.props;

    GetInformation({
      USERNAME: this.props.authUser.USERNAME,
      TYPES: 4,
      CATEGORY: "",
      IDSHOP: "ABC123",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data_news: result.data.INFO,
              
            },
            () => this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
    
  getListTrend({
      USERNAME: '',
      IDSHOP: 'ABC123',
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data: result.data,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState({ loading: false }, () => {
            AlertCommon("Th??ng b??o", result.data.RESULT, () => null)
            console.log(this.state.data)
          }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  onRefreshing = () => {
    this.handleLoad();
  };
  componentWillUnmount() {
    // this._unsubscribe();
    clearTimeout(this.message);
  }
  render() {
    const {
      loading,
      data,
      refreshing,
      search,
      data_intro,
      loadingSearch,
      showModal,
      dataSub,
    } = this.state;
    const { startthu,authUser,idshop } = this.props;
    const { navigation } = this.props;
    
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
        overlayColor="#ddd"
      />
    ) : (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Spinner
            visible={loadingSearch}
            customIndicator={<ElementCustom />}
          //overlayColor="#ddd"
          />
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={COLOR.HEADER}
          //translucent 
          />

          <ScrollView>
            <ListProducts
              data={data.INFO}
              refreshing={refreshing}
              navigation={this.props.navigation}
              onRefreshing={this.onRefreshing}
              search={this.state.search}
              handleSearch={this.handleSearch}
              loadingSearch={this.state.loadingSearch}
              onChange={this.onChange}
            />
            <View></View>
            <View style={{ paddingLeft: 5, paddingRight: 5 }}>

              {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.title}>Ch??nh s??ch</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Ch??nh s??ch")}
              ><Text style={styles.title}>Xem th??m</Text></TouchableOpacity>
            </View>
            <View>
                
            </View>

          
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.title}>????o t???o</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Ch??nh s??ch")}
              ><Text style={styles.title}>Xem th??m</Text></TouchableOpacity>
            </View>
            <View>
                 
            </View> */}
            {this.state.data_news==[]?null:<View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop:5 }}>
                <Text style={styles.title}>TIN T???C</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Tin t???c-s??? ki???n")}
                    style={{flexDirection:'row',alignItems:'center'}}
                ><Text style={[styles.title,styles.content]}>Xem th??m</Text>
                  <Image source={require('../../assets/images/right.png')}
                  style={{ height: 15, width: 15, marginLeft: 7 }}
                />
                </TouchableOpacity>
              </View>
              <View>
                <News navigation={navigation} data={this.state.data_news}/>
              </View>
              </View>

              }
            </View>
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: sizeFont(4.5)
  },
  content:{
    color:'#166CEE'
  }
})


const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    searchhome: state.notify.searchhome,
    idshop:state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginPhone: (data) => dispatch(LoginPhone(data)),
    UpdateDivice: (data) => dispatch(UpdateDivice(data)),
    GetProfile: (data) => dispatch(GetProfile(data)),
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);




/**status = 0 ==> ???? ho??n th??nh
status = 1 ==> ???? ti???p nh???n
status = 2 ==> ??ang x??? l??
status = 3 ==> ??ang v???n chuy???n
status = 4 ==> ???? h???y  */
