import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";
import { Toast, Container } from "native-base";
import Feather from "react-native-vector-icons/Feather"
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import { connect } from "react-redux";
import { LoginPhone } from "../../../../action/authAction";
import Loading from "../../../../components/loading";
import ErrorDisplay, {
  AlertCommon,
} from "../../../../components/error";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: "",
      password: "",
      loading: false,
      isdisvisi:true,
    };
    this.times;
    this.message = "";
  }
  showToast = (res) => {
    Toast.show({
      text: res.data.RESULT,
      duration: 3000,
      textStyle: {
        color: "red",
        fontSize: sizeFont(4),
        textAlign: "center",
      },
      style: {
        backgroundColor: "#ddd",
        borderRadius: 6,
      },
    });
  };
  render() {
    const { phoneText, password, loading,isdisvisi } = this.state;
    return (
      <View style={{ height: sizeHeight(100), backgroundColor: COLOR.MAIN, }}>
        <View style={{ justifyContent:'center', alignItems: 'center', flexDirection: 'column', height: sizeHeight(50),marginTop:sizeHeight(0) }}>
        <View style={{ alignItems: 'center', justifyContent:'space-between', padding: 20,flexDirection:'row',width:sizeWidth(100) }}>
            <View></View>
            <TouchableOpacity
              
              onPress={() => this.props.navigation.navigate("screenHome")}
            >
              <Image
                source={require('../../../../assets/images/daux1.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center',marginBottom:sizeHeight(5) }}>
            <Text style={{color:"#fff",fontSize:18,fontWeight:'bold'}}>Đăng nhập</Text>
          </View>
          <View>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Số điện thoại</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d',borderRadius:5
            }}>
              <Image
                source={require('../../../../assets/images/user1.png')}
                style={{ width: 25, height: 25 }}
              />
              <TextInput
                placeholder="Nhập số điện thoại"
                placeholderTextColor='#fff'
                onChangeText={(text) => this.setState({ phoneText: text })}
                style={{ width: sizeWidth(80), height: sizeHeight(7), padding: 10, color: '#fff' }}
              />
            </View>
          </View>
          <View style={{ marginTop: sizeHeight(5) }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 7 }}>Mật khẩu</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: sizeWidth(90),
              backgroundColor: '#f8f9fa3d',borderRadius:5
            }}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Image
                  source={require('../../../../assets/images/pass1.png')}
                  style={{ width: 25, height: 25 }}
                />
                <TextInput
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor='#fff'
                  secureTextEntry={isdisvisi?true:false}
                  onChangeText={(text) => this.setState({ password: text })}
                  style={{ width: sizeWidth(70), height: sizeHeight(7), padding: 10, color: '#fff'}}
                />
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.setState({isdisvisi:!isdisvisi})
                  
                }}
                style={{width:sizeWidth(10)}}
              >
                  {
                    isdisvisi?<Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                    
                  />:<Feather
                  name="eye"
                  color="grey"
                  size={20}
                  
                />
                  }
              </TouchableOpacity>
            </View>
          </View>
          <View>
            
          </View>
        </View>
        <View style={{ alignSelf: "center"}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true }, async () => {
                if (phoneText == " " && phoneText == "") {
                  AlertCommon("Thông báo", "Vui lòng nhập số điện thoại", () => null);
                } else if (password == "") {
                  AlertCommon("Thông báo", "Vui lòng nhập mật khẩu", () => null);
                } else {
                  await this.props
                    .LoginPhone({
                      IDSHOP: 'http://banbuonthuoc.moma.vn',
                      USERNAME: phoneText,
                      PASSWORD: password,
                    })
                    .then((res) => {
                      console.log("khi log in",res)
                      if (res.data.ERROR == "0000") {
                        this.props.navigation.popToTop();
                        this.props.navigation.navigate("screenHome");
                      } else {
                        Alert.alert('Thông báo', `${res.data.RESULT}`)
                      }
                    })
                    .catch((err) => {
                    });
                }
                this.setState({ loading: false });
              });
            }}
            style={{
              backgroundColor: "#fff",
              paddingVertical: sizeHeight(1.5),
              borderRadius: 100,
              width: sizeWidth(65),
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: COLOR.MAIN,
                textAlign: "center",
                fontSize: sizeFont(4),
                fontWeight: 'bold',
              }}
            >
              ĐĂNG NHẬP
              </Text>
          </TouchableOpacity>
          {this.message ? <ErrorDisplay message={this.message} /> : null}
          {loading ? <Loading /> : null}
          <TouchableOpacity
            style={{ marginTop: sizeHeight(5) }}
            onPress={() =>
              AlertCommon(
                "Thông báo",
                "Vui lòng liên hệ với ngọc trang để được cấp lại mật khẩu mới",
                () => null
              )
            }
          >
            <Text style={{ textAlign: "center",color:"#fff" }}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: sizeHeight(5) }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ textAlign: "center", fontSize: sizeFont(4),color:"#fff" }}>
              Bạn chưa có tài khoản ? Đăng kí ngay
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { LoginPhone: (data) => dispatch(LoginPhone(data)) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);