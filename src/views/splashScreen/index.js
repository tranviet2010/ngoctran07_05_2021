import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native';
import { LoginPhone } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { connect } from 'react-redux';
import { USER_NAME, PASSWORD, IDSHOP } from "../../utils/asynStorage/store";
import { GetIdShop } from "../../action/authAction";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../utils/helper/size.helper";


class SplashScreen extends Component {
    handload = async () => {
        let [username, password] = ['', ''];
        let id = '';
        let [codeshop, pass] = ['', ''];
        await _retrieveData(IDSHOP).then((result) => {
            if (result) {
                codeshop = result.substr(1).slice(0, -1)
            }
        })
        await _retrieveData(USER_NAME).then((result) => {
            if (result) {
                username = result.substr(1).slice(0, -1)
            }
        })
        await _retrieveData(IDSHOP).then((result) => {
            if (result) {
                id = result.substr(1).slice(0, -1)
            }
        })
        await _retrieveData(PASSWORD).then((result) => {
            if (result) {
                password = result.substr(1).slice(0, -1)
            }
        }).catch((err) => {
            console.log('err')
        })
        this.props.LoginPhone({
            IDSHOP: id,
            USERNAME: username,
            PASSWORD: password,
        })
            .then((result) => {
                console.log("this is spalce", result);
                if (result.data.ERROR === "0000") {
                    this.props.GetIdShop({
                        IDSHOP: codeshop,
                        USERNAME: '',
                    })
                        .then((res) => {
                            console.log("this is res", res)
                            if (res.data.ERROR == "0000") {
                                this.props.navigation.navigate("screenHome");
                            }

                            else {
                                Alert.alert('Thông báo', 'Sai thông tin mã shop, xin vui lòng thử lại')
                            }
                        })
                        .catch((err) => {
                            this.props.navigation.navigate("StartTwo");
                        });
                } else {
                    this.props.GetIdShop({
                        IDSHOP: codeshop,
                        USERNAME: '',
                    })
                        .then((res) => {
                            console.log("this is res", res)
                            if (res.data.ERROR == "0000") {
                                this.props.navigation.navigate("screenHome");
                            }

                            else {
                                Alert.alert('Thông báo', 'Sai thông tin mã shop, xin vui lòng thử lại')
                            }
                        })
                        .catch((err) => {
                            this.props.navigation.navigate("StartTwo");
                        });
                }
                console.log("login_result", result)
            }).catch((errr) => {
                console.log("erroooooooooo")

            })
    }
    componentDidMount() {
        setTimeout(() => {
            this.handload();
        }, 3000);
    }
    render() {
        return (
            <View>
                <Image
                    source={require('../../assets/images/first.png')}
                    style={{ width: sizeWidth(100), height: sizeHeight(100) }}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        LoginPhone: (data) => dispatch(LoginPhone(data)),
        GetIdShop: (data) => dispatch(GetIdShop(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);
