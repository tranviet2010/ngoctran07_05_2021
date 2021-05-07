import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image,Platform } from 'react-native';
import { LoginPhone } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { connect } from 'react-redux';
import { USER_NAME, PASSWORD } from "../../utils/asynStorage/store";
import { GetIdShop } from "../../action/authAction";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../utils/helper/size.helper";


class SplashScreen extends Component {
    handload = async () => {
        let [username, password] = ['', ''];
        await _retrieveData(USER_NAME).then((result) => {
            if (result) {
                username = result.substr(1).slice(0, -1)
            }
        })
        await _retrieveData(PASSWORD).then((result) => {
            if (result) {
                password = result.substr(1).slice(0, -1)
            }
        })
        this.props.LoginPhone({
            IDSHOP: 'http://banbuonthuoc.moma.vn',
            USERNAME: username,
            PASSWORD: password,
        })
            .then((result) => {
                console.log("this is spalce", result);
                    this.props.navigation.navigate("screenHome");
               
            })
            .catch((err) => {
                
            });
    }
    componentDidMount() {
        this.handload();
    }
    render() {
        return (
            <View style={{ width: sizeWidth(100), height: sizeHeight(100),flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
                <Image
                    source={require('../../assets/images/spalce.png')}
                    style={{ width: sizeWidth(65), height: sizeHeight(10) }}
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);
