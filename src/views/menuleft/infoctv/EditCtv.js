
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from "react-native-image-picker";
import { UpdateInforAccount } from "../../../service/account";
import { GetCTVDetail } from "../../../service/rose";
import DropDownPicker from 'react-native-dropdown-picker';
import IconComponets from "../../../components/icon"
import moment from "moment";
var numeral = require("numeral");
import {
    sizeWidth,
    sizeFont,
    sizeHeight,
} from "../../../utils/helper/size.helper"
import { ScrollView } from 'react-native-gesture-handler';
const options = {
    title: "Chọn ảnh",
    storageOptions: {
        skipBackup: true,
        path: "images",
    },
    maxWidth: 720,
    maxHeight: 1080,
};
class EditCtv extends Component {
    constructor(props) {
        super(props);
        const { Data1 } = this.props.route.params;
        this.state = {
            data: [],
            loading: false,
            formatBank: false,
            usernam: Data1.FULL_NAME,
            stk: Data1.STK,
            tentk: Data1.TENTK,
            tennh: Data1.TEN_NH,
            chinhanh: '',
            dateofbirth: Data1.DOB,
            phone: '',
            address: Data1.ADDRESS,
            male: Data1.GENDER,
            selectedValue:'',
            cmnd: '',
            typeaccout: Data1.GROUP_DES,
            CMT_1: null,
            CMT_2: null,
            ctvdetail: [],
            city:
            {
                NAME: Data1?.CITY,
                MATP: Data1?.CITY_ID,
            },
            district:
            {
                NAME: Data1?.DISTRICT,
                MAQH: Data1?.DISTRICT_ID,
            },
            districChild:
            {
                NAME: Data1?.WARD,
                XAID: Data1?.WARD_ID,
            },

        }
    }
    update = () => {
        const { usernam, email, phone, stk, tennh, tentk, cmnd, CMT_1, CMT_2, city, address, district, dob } = this.state;
        var cmnd1 = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        var checkmail = /[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}/;
        var checkname = /^[a-zA-Z\s]+$/;
        if (usernam == '') {
            Alert.alert('Thông báo', 'Họ và tên không được để trống');
        } else if (usernam.length > 50) {
            Alert.alert('Thông báo', 'Không nhập quá 50 kí tự');
        } else if (!checkname.test(usernam)) {
            Alert.alert('Thông báo', 'Tên không hợp lệ');
        }
        else if (address.length > 100) {
            Alert.alert('Thông báo', 'Không nhập quá 100 kí tự');
        }
        else if (!cmnd1.test(phone)) {
            Alert.alert('Thông báo', 'Nhập lại số điện thoại');
        }
        else if (!checkmail.test(email)) {
            Alert.alert('Thông báo', 'Email không hợp lệ');
        }
        else if (stk && stk.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else if (cmnd && cmnd.length > 20) {
            Alert.alert('Thông báo', 'Không nhập quá 20 kí tự');
        }
        else {
            UpdateInforAccount({
                USERNAME: this.props.username,
                USER_CTV: this.props.username,
                GENDER: '',
                NAME: usernam.trim(),
                EMAIL: email,
                CITY_NAME: city.NAME,
                DISTRICT_NAME: district.NAME,
                ADDRESS: address,
                STK: stk,
                CMT: this.state.cmnd,
                TENTK: tentk,
                TENNH: tennh,
                AVATAR: this.state.imageAvatar,
                IDSHOP: "ABC123",
                DOB: dob,
                CMT: cmnd,
                IMG1: CMT_1,
                IMG2: CMT_2,
                WARD_NAME: '',
            })
                .then((res) => {
                    this.setState({ loading: false })
                    Alert.alert("Thông báo", `${res.data.RESULT}`)
                })
                .catch((err) => {
                    this.setState({ loading: false })
                    Alert.alert("Thông báo", `${err.data.RESULT}`)
                })
        }
    }
    changeCity = (text) => {
        if (text == "- None -") {
            this.setState({ city: "", district: "", districChild: "" });
        } else {
            this.setState({ city: text, district: "", districChild: "" }, () => {
            });
        }
    };
    changeDistrict = (text) => {
        if (text == "- tất cả -") {
            this.setState({ district: "", districChild: "" });
        } else this.setState({ district: text, districChild: "" });
    };
    changeDistrictChild = (text) => {
        if (text == "- tất cả -") {
            this.setState({ districChild: "" });
        } else this.setState({ districChild: text });
    };
    upload = (source, data, type) => {
        if (source != null) {
            var photo = { ...source, name: "image.jpg", type: "image/jpeg" };

            //If file selected then create FormData
            const data = new FormData();
            data.append("name", "imagefile");
            data.append("image", photo);
            fetch("https://f5sell.com/f/upload_avatar.jsp", {
                method: "post",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data; ",
                    "Content-Disposition": "form-data",
                },
            })
                .then(async (res) => {
                    let responseJson = await res.json();
                    if (responseJson.ERROR == "0000") {
                        if (type === 1) {
                            this.setState(
                                {
                                    imageAvatar: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        } else if (type === 2) {
                            this.setState(
                                {
                                    CMT_1: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        } else if (type === 3) {
                            this.setState(
                                {
                                    CMT_2: responseJson.URL,
                                },
                                () => this.setState({ loading: false })
                            );
                        }
                        //this.props.onChange(responseJson.URL);
                    } else {
                        this.setState(
                            {
                                loading: false,
                            },
                            () => {
                                this.message = setTimeout(

                                );
                            }
                        );
                    }
                })
                .catch((err) => {
                    this.setState({ loading: false });
                });
        }
    };
    handleImage = (type) => {
        ImagePicker.showImagePicker(options, async (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState(
                    {
                        loading: true,
                    },
                    () => this.upload(source, response.data, type)
                );


            }
        });
    };
    componentDidMount() {
        const { id } = this.props.route.params;
        console.log("thissss", id);
        GetCTVDetail({
            USERNAME: id,
            USER_CTV: id,
            IDSHOP: "ABC123",
        })
            .then((res) => {

                if (res.data.ERROR == "0000") {
                    this.setState({
                        ctvdetail: res.data
                    })
                } else {
                    console.log("errrrrro")
                }
            })
            .catch((err) => {
            });
    }
    render() {
        const { data, phone, address, CMT_1, CMT_2, typeaccout, stk, tentk, tennh, chinhanh, usernam, email, dateofbirth,
            city, districChild, district, cmnd, ctvdetail, dob,selectedValue } = this.state;
        const { Data1 } = this.props.route.params;
        console.log("abccccc", ctvdetail);
        console.log("hay zo dataa1", Data1);
        return (
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: sizeWidth(100), backgroundColor: '#363636', marginTop: 10 }}>
                        <View style={{
                            justifyContent: 'center', alignContent: 'center'

                        }}>
                            <Text style={{ fontSize: 13, padding: 5, color: 'white' }}>Thông tin cá nhân</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Họ và tên<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                value={usernam}
                                onChangeText={(text) => { this.setState({ usernam: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Loại tài khoản</Text>
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
                                        { label: 'Cộng tác viên', value: '1' },
                                        { label: 'Khách hàng', value: '0' },
                                        
                                    ]}
                                    defaultValue={selectedValue}
                                    placeholder="Cộng tác viên"
                                    containerStyle={{ height: sizeHeight(5.8)}}
                                    style={{backgroundColor:'#EEEEEE',width: sizeWidth(60), borderColor: 'gray', borderWidth: 1 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(60) }}
                                    onChangeItem={item => this.setState({
                                        selectedValue: item.value
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10,zIndex:-1 }}>
                            <Text style={{ color: 'gray' }}>Số điện thoại<Text style={{ color: 'red' }}>*</Text></Text>
                            <TextInput
                                placeholder={ctvdetail.MOBILE}
                                onChangeText={(a) => { this.setState({ phone: a }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8,borderRadius:5 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10,zIndex:-2 }}>
                            <Text style={{ color: 'gray' }}>Email</Text>
                            <TextInput
                                placeholder={ctvdetail.EMAIL}
                                onChangeText={(a) => { this.setState({ email: a }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Ngày sinh</Text>
                            <View style={{ width: sizeWidth(60) }}>
                                <TextInput
                                    value={ctvdetail.DOB}
                                    onChangeText={(text) => { this.setState({ dob: text }) }}
                                    style={{ width: sizeWidth(30), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                                />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Tỉnh/TP</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListCountries", {
                                        onSetCity: this.changeCity,
                                        NAME: "editctv",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{city.NAME == undefined ? "" : ctvdetail.CITY}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#E1AC06"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Quận/huyện</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListDistrict", {
                                        onSetDistrict: this.changeDistrict,
                                        GHN_TINHID: city.MATP,
                                        NAME: "Detail container",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{district.NAME == undefined ? "" : district.NAME}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#E1AC06"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Phường/xã</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ListDistrictChild", {
                                        onSetDistrictChild: this.changeDistrictChild,
                                        GHN_TINHID: district.MAQH,
                                        NAME: "Detail container",
                                    });
                                }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8, paddingRight: 8 }}
                            >
                                <Text style={{ marginRight: 10 }}>{districChild.NAME == undefined ? "" : districChild.NAME}</Text>
                                <IconComponets
                                    name="chevron-down"
                                    size={sizeFont(5)}
                                    color="#E1AC06"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Địa chỉ</Text>
                            <TextInput
                                value={ctvdetail.ADDRESS}
                                onChangeText={(text) => { this.setState({ address: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Số CMND</Text>
                            <TextInput
                                value={ctvdetail.SO_CMT}
                                onChangeText={(text) => { this.setState({ cmnd: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginBottom: 15 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ marginTop: 5 }}>Ảnh CMND mặt trước</Text>
                                <TouchableOpacity
                                    style={{ width: sizeWidth(40), height: sizeHeight(15), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.handleImage(2) }}
                                >
                                    <Image
                                        source={CMT_1 == null ? require('../../../assets/images/camera.png') : { uri: CMT_1 }}
                                        style={{ width: 100, height: 80 }}
                                    />

                                </TouchableOpacity>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ marginTop: 5 }}>Ảnh CMND mặt sau</Text>
                                <TouchableOpacity
                                    style={{ width: sizeWidth(40), height: sizeHeight(15), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.handleImage(3) }}
                                >
                                    <Image
                                        source={CMT_2 == null ? require('../../../assets/images/camera.png') : { uri: CMT_2 }}
                                        style={{ width: 100, height: 80 }}
                                    />

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: sizeWidth(100), backgroundColor: '#363636', marginTop: 10 }}>
                        <View style={{
                            justifyContent: 'center', alignContent: 'center'

                        }}>
                            <Text style={{ fontSize: 13, padding: 5, color: 'white' }}>Tài khoản ngân hàng</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Số TK</Text>
                            <TextInput
                                value={ctvdetail.STK}
                                onChangeText={(text) => { this.setState({ stk: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Tên TK</Text>
                            <TextInput
                                value={ctvdetail.TENTK}
                                onChangeText={(text) => { this.setState({ tentk: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Ngân hàng</Text>
                            <TextInput
                                value={ctvdetail.TEN_NH}
                                onChangeText={(text) => { this.setState({ tennh: text }) }}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'gray' }}>Chi nhánh</Text>
                            <TextInput
                                value={chinhanh}
                                onChangeText={() => {}}
                                style={{ width: sizeWidth(60), height: sizeHeight(5.4),borderRadius:5, borderWidth: 1, borderColor: 'gray', paddingLeft: 8 }}
                            />
                        </View> */}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.update()
                            }}
                            style={{ backgroundColor: '#149CC6', width: sizeWidth(50), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color: '#fff' }}>CẬP NHẬT</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
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


export default connect(
    mapStateToProps,
    null
)(EditCtv);

const styles = StyleSheet.create({
    content: {
        height: sizeHeight(5),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        alignItems: 'center'
    }
})
