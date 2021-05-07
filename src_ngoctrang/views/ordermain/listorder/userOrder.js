import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, ScrollView, Alert, RefreshControl, Platform } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../utils/helper/size.helper';
import { connect } from 'react-redux';
var numeral = require("numeral");
import { getListOrder } from '../../../service/order';
import Loading from '../../../components/loading';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


class UserOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            Number: '',
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            selectedValue: '',
            refreshing: true,
            pickerOpacity: 0,
            opacityOfOtherItems: 1,
            label: 'Firstvalue',
            country: 'uk',
        }
    }
    showDatePicker1 = () => {
        const { startTime, endTime } = this.state;
        // if (startTime < moment()
        //     .add(-60, "day")
        //     .format("DD/MM/YYYY")) {
        //     Alert.alert("Thông báo", "Nhập lại thơi gian bắt đầu")
        // }

        this.setState({
            isDatePickerVisible: true,
        })

    };
    // searchAll = () => {
    //     const { startTime, endTime } = this.state;
    //     if (endTime < startTime) {
    //         Alert.alert("Thông báo", "Thời gian kết thúc phải lớn hơn thời gian bắt đầu")
    //     }
    // }
    hideDatePicker1 = () => {
        this.setState({
            isDatePickerVisible: false,
        })
    };
    showLogin = () => {
        return Alert.alert(
            "Thông báo",
            `Hãy đăng nhập hoặc ký tài khoản để được mua sản phầm với giá gốc, tham gia bán hàng cùng ${this.props.idshop.SHOP_NAME} và hưởng hoa hồng Cực Sốc`,
            [
                {
                    text: "Để sau",
                    style: "destructive",
                },
                {
                    text: "Đăng nhập",
                    onPress: () => {

                        this.props.navigation.navigate('SignIn')
                    },
                    style: "default",
                },
                {
                    text: "Đăng ký",
                    onPress: () => {

                        this.props.navigation.navigate('SignUp')
                    },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
    handleConfirm1 = (date) => {
        var d1 = new Date();
        if (date.getTime() > d1.getTime()) {
            Alert.alert("Thông báo", "Thời gian không hợp lệ, mời nhập lại");
        } else {
            this.setState({
                startTime: moment(date).format("DD/MM/YYYY")
            })
        }
        this.hideDatePicker1();
    };
    showDatePicker2 = () => {
        this.setState({
            inDateEndPicker: true,
        })
    };
    hideDatePicker2 = () => {
        this.setState({
            inDateEndPicker: false,
        })
    };
    handleConfirm2 = (date) => {
        var date1 = this.state.startTime;
        var d = new Date(date1.split("/").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var all = yy + "-" + mm + "-" + dd;
        var dpressent=new Date();
        // console.log("this is all",date)
        var d1 = new Date(all);

        var d0 = d1.getTime();
        var d2 = date.getTime();
        var dpre=dpressent.getTime();

        console.log(d0);
        console.log(d2);
        console.log(dpre);
        if (d2 < d0) {
            return Alert.alert("Thông báo", "Thời gian không hợp lệ, mời nhập lại")
        } else if (d2 - d0 < 5184000) {
            return Alert.alert("Thông báo", "Thời gian không được quá 60 ngày, mời nhập lại")
        }else if(dpre<d2){
            return Alert.alert("Thông báo", "Bạn đã nhập quá thời gian hiện tại, mời nhập lại")
        }
        else {
            this.setState({
                endTime: moment(date).format("DD/MM/YYYY")
            })

        }
        this.hideDatePicker2();

    };
    handleLoad = async () => {
        await getListOrder({
            USERNAME: this.props.username,
            USER_CTV: this.props.username,
            START_TIME: this.state.startTime,
            END_TIME: this.state.endTime,
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 100,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
        })
            .then((res) => {
                console.log("aaaaaaaaaa",res);
                if (res.data.ERROR == "0000") {
                    this.setState({
                        Data: res.data.INFO,
                        refreshing: false
                    })
                } else {
                    this.showLogin();
                }
            })
            .catch((err) => {
            });
    }
    // onRefresh =()=>{
    //     this.setState({
    //         refreshing:true
    //     });
    //     setTimeout(() => {
    //         this.setState({refreshing:false})
    //     }, 1000);

    // }
    componentDidMount() {
        this.handleLoad();
    }
    checkColor = (a) => {
        if (a.STATUS == 1) {
            return <View style={{ backgroundColor: '#4a8939', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>
        } else if (a.STATUS == 2) {
            return <View style={{ backgroundColor: '#149CC6', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 3) {
            return <View style={{ backgroundColor: '#149CC6', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else if (a.STATUS == 4) {
            return <View style={{ backgroundColor: '#FF0000', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        } else {
            return <View style={{ backgroundColor: '#279907', width: sizeWidth(30), height: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', }}>{a.STATUS_NAME}</Text>
            </View>

        }
    }
    render() {
        const { selectedValue, Data, loading, refreshing } = this.state;
        console.log("list data", Data);

        return (
            <View style={{ marginBottom: sizeHeight(30) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker1}
                            style={{justifyContent:'center'}}

                        >
                            <View style={{}}> 
                                <Text style={{ fontSize: 12 }}>Bắt đầu</Text>
                                <Text style={{ fontSize: 14 }}>{this.state.startTime}</Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleConfirm1}
                            onCancel={this.hideDatePicker1}
                        />
                    </View>
                    <View style={styles.confix}>
                        <TouchableOpacity
                            onPress={this.showDatePicker2}
                            style={{  justifyContent: 'center' }}
                        >
                            <View>
                                <Text style={{ fontSize: 12 }}>Kết thúc</Text>
                                <Text style={{ fontSize: 14 }}>{this.state.endTime}</Text>
                            </View>
                            <View>
                            </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.inDateEndPicker}
                            mode="date"
                            onConfirm={this.handleConfirm2}
                            onCancel={this.hideDatePicker2}
                        />
                    </View>


                </View>
                <View style={styles.confix1}>
                    <View
                        style={{

                            // The solution: Apply zIndex to any device except Android
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                            })

                        }}
                    >
                        <DropDownPicker
                            items={[
                                { label: 'Tất cả', value: '' },
                                { label: 'Đã tiếp nhận', value: '1' },
                                { label: 'Đang xử lí', value: '2' },
                                { label: 'Đang chuyển', value: '3' },
                                { label: 'Đã giao hàng', value: '1' },
                                { label: 'Hoàn thành', value: '0' },
                                { label: 'Đã huỷ', value: '4' },
                            ]}
                            defaultValue={selectedValue}
                            placeholder="Tất cả"
                            containerStyle={{ height: sizeHeight(5.7) }}
                            style={{ backgroundColor: '#fafafa', width: sizeWidth(40), borderColor: '#4a8939', borderWidth: 1 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(38) }}
                            onChangeItem={item => this.setState({
                                selectedValue: item.value
                            })}
                        />
                    </View>
                    {/* </View> */}

                    <View style={{ width: sizeWidth(38) }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ loading: true }, async () => {
                                    await getListOrder({
                                        USERNAME: this.props.username,
                                        USER_CTV: this.props.username,
                                        START_TIME: this.state.startTime,
                                        END_TIME: this.state.endTime,
                                        STATUS: this.state.selectedValue,
                                        PAGE: 1,
                                        NUMOFPAGE: 50,
                                        IDSHOP: 'http://banbuonthuoc.moma.vn',
                                    })
                                        .then((res) => {
                                            console.log("khong có dữ liệu", res);
                                            if (res.data.ERROR == "0000") {
                                                this.setState({
                                                    Data: res.data.INFO,
                                                    loading: false
                                                })
                                            } else {
                                                Alert.alert('Thông báo', 'Không có dữ liệu');
                                            }
                                        })
                                        .catch((err) => {
                                        });
                                    this.setState({ loading: false });
                                });
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    backgroundColor: '#149CC6',
                                    padding: 10,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                }}
                            >
                                Lọc
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {loading === false ? <View style={{ zIndex: -1,marginBottom:sizeHeight(50) }}><View style={{ height: 3, backgroundColor: '#B8C4C4', marginTop: sizeHeight(5) }}></View>
                    <Text style={{ fontSize: 18, paddingLeft: 5 }}>Tổng số đơn hàng: <Text style={{ fontWeight: "bold" }}>{Data.length} đơn</Text></Text>
                    <View style={{ height: 3, backgroundColor: '#B8C4C4' }}></View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => this.handleLoad()} />
                        }
                    >
                        {Data.length === 0 ? null : Data.map((Val, key) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => this.props.navigation.navigate("DetailOrder", {
                                    ID: Val.CODE_ORDER,
                                    STATUS: Val.STATUS,
                                    NAME:'Order'
                                })
                                }
                            >
                                <View style={{ borderColor: '#B8C4C4', borderWidth: 1, margin: 10, padding: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontWeight: "bold" }}>
                                                Mã ĐH: {Val.CODE_ORDER}{" "}
                                            </Text>
                                        </View>
                                        <View>
                                            {this.checkColor(Val)}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>CTV:{Val.FULL_NAME_CTV}</Text>
                                        <Text style={{ marginLeft: sizeWidth(5) }}>Mã CTV: {Val.USER_CODE}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={require('../../../assets/images/clock.png')}
                                            style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                        />
                                        <Text>
                                            {Val.CREATE_DATE}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../../assets/images/human.png')}
                                                style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                            />
                                            <Text style={{ color: '#F97932' }}>{Val.FULLNAME_RECEIVER}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: sizeWidth(5) }}>
                                            <Image
                                                source={require('../../../assets/images/phone.png')}
                                                style={{ width: sizeWidth(5), height: sizeHeight(5), }}
                                            />
                                            <Text style={{ color: '#F97932' }}>{Val.MOBILE_RECCEIVER}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingTop: 7 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Tổng tiền: <Text style={{ color: '#F90000' }}>{numeral(Val.TOTAL_MONEY).format("0,0")}</Text></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView></View> : <Loading />}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
        idshop: state.product.database,
    };
};
const styles = StyleSheet.create({
    confix: {
        width: sizeWidth(40),
        borderColor: '#4a8939',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: sizeHeight(5.7),
        justifyContent:'center',
        
        
    },
    confix1: {
        marginTop: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },

})

export default connect(
    mapStateToProps,
    null
)(UserOrder);
