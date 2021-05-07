import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, FlatList, ScrollView, Alert, Modal, Image } from 'react-native';
import { connect } from "react-redux";
import { GetListCTV } from '../../../service/account';
import { GetCity } from "../../../service/countries"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../../../components/loading';
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";
var numeral = require("numeral");

class InfoCTV extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataCountry: [],
            loading: false,
            selectedValue: '',
            modalVisible: false,
            selectbool: 'Tất cả',
            codeuser: '',
        }
    }
    handleLoad = () => {
        const { authUser } = this.props;
        console.log('authscreen', authUser);
        GetListCTV({
            USERNAME: authUser.USERNAME,
            SEARCH: '',
            I_CITY: '',
            I_PAGE: 1,
            NUMOFPAGE: 50,
            IDSHOP: 'http://banbuonthuoc.moma.vn',
        })
            .then((result) => {
                console.log("aaaaaaaaaaaaaa111", result)
                if (result.data.ERROR === "0000") {
                    this.setState({ data: result.data.INFO }
                    );
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
        GetCity({

        }).then((result) => {
            console.log("wring", result)
            if (result.data.ERROR === "0000") {
                this.setState({ dataCountry: result.data.INFO })
            }
        })
    }
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const { dataCountry, data, modalVisible, selectbool, codeuser } = this.state;
        const { selectedValue, loading } = this.state;
        const { GROUPS } = this.props.authUser;
        return (
            <View>
                <View>
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                        <Text style={{ width: sizeWidth(20) }}>Tỉnh</Text>
                        <View style={{ flexDirection: 'row', height: sizeHeight(5), width: sizeWidth(55), borderColor: '#4a8939', borderWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}>


                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <ScrollView

                                        >
                                            {dataCountry.map((Value) => {
                                                return (

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({
                                                                selectedValue: Value.MATP,
                                                                selectbool: Value.NAME,
                                                                modalVisible: !modalVisible
                                                            })

                                                        }}
                                                        style={{ height: sizeHeight(5), borderTopColor: 'gray', borderTopWidth: 0.5, borderBottomColor: 'gray', borderBottomWidth: 0.5, width: sizeWidth(60), justifyContent: 'center', paddingLeft: 10 }}
                                                    >
                                                        <Text>{Value.NAME}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ modalVisible: true })
                                }}
                            >
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>{selectbool}</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Image
                                    source={require('../../../assets/images/dowmenu.png')}
                                    style={{ width: 20, height: 20, marginLeft: sizeWidth(5) }}
                                />
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ width: sizeWidth(20) }}>Tìm kiếm</Text>
                        <TextInput
                            placeholder="Theo tên hoặc mã user"
                            onChangeText={(text) => { this.setState({ codeuser: text }) }}
                            style={{ width: sizeWidth(55), height: sizeHeight(5), borderColor: '#4a8939', borderWidth: 1, paddingLeft: 10 }}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ loading: true }, async () => {
                                    await GetListCTV({
                                        USERNAME: '',
                                        SEARCH: codeuser,
                                        ID_CITY: selectedValue,
                                        I_PAGE: 1,
                                        NUMOFPAGE: 25,
                                        IDSHOP: 'http://banbuonthuoc.moma.vn',
                                    })
                                        .then((res) => {
                                            console.log('anc+errr', res)
                                            if (res.data.ERROR == "0000") {

                                                this.setState({
                                                    data: res.data.INFO,
                                                    loading: false
                                                })
                                            } else {
                                                this.showToast(res);
                                            }
                                        })
                                        .catch((err) => {
                                            this.setState({ data: [] })
                                            Alert.alert('Thông báo', 'Không có dữ liệu')
                                        });
                                    this.setState({ loading: false });
                                });
                            }}
                            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#4a8939', width: sizeWidth(30), height: sizeHeight(5), marginBottom: 10 }}
                        >

                            <Text style={{ color: 'white' }}>Lọc</Text>

                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>Tổng số: {data.length} CTV</Text>
                    {loading === false ? <View>
                        <View style={{ flexDirection: 'row', height: sizeHeight(62) }}>
                            <View>
                                <View style={styles.container1}>
                                    <View style={styles.cuttoms}>
                                        <Text style={{ color: 'white' }}>Tên CTV</Text>
                                    </View>
                                    <View style={styles.cuttoms}>
                                        <Text style={{ color: 'white' }}>Mã CTV</Text>
                                    </View>
                                    <View style={styles.cuttoms}>
                                        <Text style={{ color: 'white' }}>Số điện thoại</Text>
                                    </View>
                                    <View style={styles.cuttoms}>
                                        <Text style={{ color: 'white' }}>HH</Text>
                                    </View>
                                </View>
                                <ScrollView style={{ borderColor: '#4a8939', borderWidth: 2, backgroundColor: '#EFEFEF' }}>
                                    <View style={{ marginTop: -2 }}>
                                        {data.length === 0 ? null : data.map((Val, key) => (
                                            <View>
                                                {GROUPS == 3 ?
                                                    <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate("Detail container", {
                                                            Data: Val,
                                                        })
                                                        }
                                                    >
                                                        <View style={styles.container}>
                                                            <View style={styles.children}>
                                                                <Text >{Val.FULL_NAME}</Text>
                                                            </View>
                                                            <View style={styles.children}>
                                                                <Text >{Val.USER_CODE}</Text>
                                                            </View>
                                                            <View style={styles.children}>
                                                                <Text >{Val.FULL_NAME}</Text>
                                                            </View>
                                                            <View style={styles.children}>

                                                                <Text >{numeral(Val.BALANCE).format("0,0")}</Text>

                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    : <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate("Chi tiết hoa hồng theo CTV", {
                                                            ID_NAME: Val.USERNAME,
                                                            NAME: 'ctvdow'
                                                        })
                                                        }
                                                    >
                                                        <View style={styles.container}>
                                                            <View style={styles.children}>
                                                                <Text >{Val.FULL_NAME}</Text>
                                                            </View>
                                                            <View style={styles.children}>
                                                                <Text >{Val.USER_CODE}</Text>
                                                            </View>
                                                            <View style={styles.children}>
                                                                <Text >{Val.FULL_NAME}</Text>
                                                            </View>
                                                            <View style={styles.children}>

                                                                <Text >{numeral(Val.BALANCE).format("0,0")}</Text>

                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>}
                                            </View>
                                        ))}

                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View> : <Loading />}
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
)(InfoCTV);


const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',


    },
    container: {
        flexDirection: 'row',
    },
    children: {
        padding:5,
        borderRightColor: '#4a8939',
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeWidth(25),
        borderBottomWidth: 1,
        borderBottomColor: '#4a8939',
    },
    cuttoms: {
        borderLeftColor: 'white',
        height: sizeHeight(5),
        borderLeftWidth: 1,
        backgroundColor: "#4a8939",
        justifyContent: 'center',
        alignItems: 'center',
        width: sizeWidth(25),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: sizeWidth(80),
        height: sizeHeight(80),
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
