
import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Picker
} from "react-native";
import { GetListCTV } from "../../../service/account";
import { _retrieveData } from "../../../utils/asynStorage";
import _ from "lodash";
import { DataTable } from 'react-native-paper';
import Header from "../../rose/header/index";
import DropDownPicker from 'react-native-dropdown-picker';
import CtvSub from "../subchilditem/ctvsub";

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

class getwithdawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_tt: [],
            selectedValue: 'CHƯA XỬ LÝ',
        };
    }
    handleLoad = async () => {
        await GetwithdrawalCTV({
            USERNAME: this.props.username,
            PAGE: 1,
            NUMOFPAGE: 100,
            IDSHOP: "ABC123"
        }).then((res) => {
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
            status,
            authUser,
            username,
        } = this.props;
        const { data_tt, selectedValue } = this.state;

        return (
            <View>
                {/* <View>
                    <View>
                        <Picker
                            selectedValue={setSelectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => this.setState({ setSelectedValue: itemValue })}
                        >
                            <Picker.Item label="Chưa xử lí" value="Chưa xử lí" />
                            <Picker.Item label="Đồng ý" value="Đồng ý" />
                            <Picker.Item label="Từ chối" value="Từ chối" />
                        </Picker>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                        >
                            <Text>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View>
                    <View>
                        <View>
                            <Text>Vui lòng chọn trạng thái</Text>
                            {/* <View
                                style={{

                                    // The solution: Apply zIndex to any device except Android
                                    ...(Platform.OS !== 'android' && {
                                        zIndex: 10
                                    })

                                }}
                            >
                                <DropDownPicker
                                    items={[
                                        { label: 'ĐÃ ĐỒNG Ý', value: '1' },
                                        { label: 'ĐÃ TỪ CHỐI', value: '2' },
                                        { label: 'TẤT CẢ TRẠNG THÁI', value: '3' }
                                    ]}
                                    defaultValue={selectedValue}
                                    containerStyle={{ height: 40 }}
                                    style={{ backgroundColor: '#fafafa', width: sizeWidth(38), borderColor: '#E1AC06', borderWidth: 2 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(38) }}
                                    onChangeItem={item => this.setState({
                                        selectedValue: item.value
                                    })}
                                />
                            </View> */}
                        </View>
                        <View style={styles.container1}>
                            <View style={[styles.cuttoms, styles.children1]}>
                                <Text style={{ color: 'white' }}>Nội dung</Text>
                            </View>
                            <View style={styles.cuttoms}>
                                <Text style={{ color: 'white' }}>Trạng thái</Text>
                            </View>
                        </View>
                        <ScrollView style={{ marginTop: sizeHeight(0), height: sizeHeight(100), borderColor: '#149CC6', borderTopColor: '#fff', borderWidth: 2, zIndex: 0 }}>
                            <View>
                                {data_tt.map((Val, key) => (
                                    <View>
                                        <View style={styles.container}>
                                            <View style={styles.children}>
                                                <Text >CTV: {Val.FULL_NAME}</Text>
                                                <Text >Thời gian: {Val.UPDATE_TIME}</Text>
                                                <Text >Số dư lúc yêu cầu: {numeral(Val.BALANCE).format("0,0")} đ</Text>
                                                <Text>Yêu cầu rút: <Text style={{ color: 'red', fontWeight: 'bold' }}>{numeral(Val.AMOUNT).format("0,0")} đ</Text></Text>
                                            </View>
                                            <View style={styles.children2}>
                                                {Val.IS_PROCESS === 1 ? <Text style={{ backgroundColor: '#149CC6', padding: 5, paddingLeft: 20, paddingRight: 20 }}>Đồng ý</Text> : <Text style={{ backgroundColor: '#E1AC06', padding: 5, paddingLeft: 20, paddingRight: 20 }}>Từ chối</Text>}
                                            </View>

                                        </View>
                                    </View>
                                ))}

                            </View>

                        </ScrollView>
                    </View>
                </View>
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

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(getwithdawal);


const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1000,
    },
    container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: '#149CC6',
    },
    children: {
        borderRightColor: '#149CC6',
        borderRightWidth: 2,
        padding: 7,
        width: sizeWidth(60),

    },
    children1: {
        width: sizeWidth(60.5),
        justifyContent: 'space-around',

    },
    children2: {
        width: sizeWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cuttoms: {
        marginTop: 5,
        padding: 10,
        backgroundColor: "#E1AC06",
        alignItems: 'center',
        width: sizeWidth(39.5),
    },
})
