import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../service/order';
import Shoporder from './listorder/shoporder';
import UserOrder from './listorder/userOrder';
import {GetCity,GetDistrict} from '../../service/countries';

class OrderMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            city:'',
            district:'',
            citymain:'',
        }
    }
    componentDidMount(){
        const {Data}=this.props;
        GetCity({

        }).then((res)=>{
                this.setState({
                    city:res.data.INFO
                })
                // var name=res.data.INFO;
                // for(let i=0;i<name.lenght;i++){
                //     if(name[i].MATP==Data.ID_CITY){
                //         console.log("abccccc");
                //     }else{
                //         console.log("cbdd")
                //     }
                // }
        })
        GetDistrict({
            ID_CITY:Data.ID_CITY
        }).then((res)=>{
            this.setState({
                district:res
            })
        })
    }
    render() {
        const {Data}=this.props;
        console.log("districtdistrictdistrict",this.state.district);
        return (
            <View style={styles.status}>
                <View style={styles.status1}><Text>Nhận hàng tại</Text></View>
                <View style={styles.status2}><Text>{Data.ADDRESS_RECEIVER + '-'}</Text></View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
    };
};
const styles = StyleSheet.create({
    confix: {
        fontSize: 15,
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 15,
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    confix2: {
        borderColor: '#4a8939',
        borderWidth: 2,
        width: sizeWidth(40),
        height: sizeHeight(7),
        borderRadius: 15,
    },
    status: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingLeft: 10
    },
    status1: {
        width: sizeWidth(30),
        borderColor: '#CCCECE',
        borderWidth: 1,
        height: sizeHeight(4),
        justifyContent: 'center',
        alignItems: 'baseline',
        paddingLeft: 10
    },
    status2: {
        width: sizeWidth(70),
        borderColor: '#CCCECE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    confix15: {
        justifyContent:'center',
        width: sizeWidth(40),
        borderColor: '#4a8939',
        padding: 5,
        height:sizeHeight(5.6),
        borderWidth: 1,
        borderRadius: 5,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#fff",
        width: sizeWidth(90),
        height: sizeHeight(40),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

    },
})
export default connect(
    mapStateToProps,
    null
)(OrderMain);
