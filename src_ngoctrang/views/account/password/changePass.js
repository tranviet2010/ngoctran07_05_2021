import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    FlatList,
    StyleSheet,
} from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import { GetInformation } from "../../../service/account";
import { changePass } from "../../../service/auth";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../components/error";
import moment from "moment";
import {
    sizeHeight,
    sizeWidth,
    sizeFont,
} from "../../../utils/helper/size.helper";
import IconComponets from "../../../components/icon";
import { COLOR } from "../../../utils/color/colors";
import { Alert } from "react-native";
class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: '',
            loading: true,

        };
    }

    changePassWord = () => {
        const {oldPassword,newPassword,confirmPassword}=this.state;
        if(newPassword!=confirmPassword){
            Alert.alert("Thông báo","Mật khẩu đã nhập không trùng nhau");
        }
        else if(oldPassword.length==0 || newPassword.length==0 || confirmPassword.length==0){
            Alert.alert("Thông báo","Mật khẩu không được để trống");
        }
        else if(oldPassword==newPassword){
            Alert.alert("Thông báo","Mật khẩu mới giống mật khẩu cũ, nhập lại");
        }
        else{
            changePass({
                OLD_PWD: oldPassword,
                NEW_PWD: newPassword
            })
                .then((res) => {
                    Alert.alert("Thông báo",`${res.data.RESULT}`);
                    
                })
                .catch({
    
                })
        }
    }
    componentDidMount() {

    }
    render() {
        const { loading, data, oldPassword, newPassword, confirmPassword } = this.state;
        return (
            <View style={{ marginTop: sizeHeight(8) }}>
                
                <View style={[styles.viewCommon, { marginTop: sizeHeight(4) }]}>
                    <TextInput
                        value={oldPassword}
                        placeholder="Mật khẩu hiện tại"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ oldPassword: text })}
                        style={styles.textInputChild}
                    />
                </View>
                <View style={{paddingLeft:sizeWidth(5)}}> 
                    <Text style={{lineHeight: 40}}>Vui lòng nhập mật khẩu mới của bạn bên dưới</Text>
                    <Text style={{fontSize:sizeFont(3.5),lineHeight: 20}}>Tối thiểu 6 kí tự bao gồm cả chữ và số</Text>
                </View>
                <View style={styles.viewCommon}>
                    
                    <TextInput
                        value={newPassword}
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                        style={styles.textInputChild}
                    />
                    
                </View>
                <View style={styles.viewCommon}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu của bạn"
                        value={confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                        style={styles.textInputChild}
                    />
                    
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:sizeHeight(5) }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changePassWord()
                        }}
                        style={{ backgroundColor: COLOR.MAIN, width: sizeWidth(30), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff' }}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewCommon: {
        paddingHorizontal: sizeWidth(2.5),
        marginVertical: sizeHeight(1),
        alignItems: "center",
        alignContent: "center",
    },
    viewTextInput: {
        width: sizeWidth(70),
        borderWidth: 1,
        borderColor: "gray",
        paddingVertical: sizeHeight(1.5),
        paddingHorizontal: sizeWidth(2),
    },
    textTitle: {
        fontSize: sizeFont(4),
        fontWeight: "500",
    },
    textInputChild: {
        width: sizeWidth(90),
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        paddingVertical: sizeHeight(1.5),
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
)(ChangePass);