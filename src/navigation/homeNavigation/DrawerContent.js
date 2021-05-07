import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, Share,SafeAreaView } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { _retrieveData } from "../../utils/asynStorage";
import {
    Avatar,
    Title,
    Drawer,
    Text,
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _removeData } from "../../utils/asynStorage";
import { TOKEN, USER_NAME, PASSWORD, IDSHOP } from "../../utils/asynStorage/store";
import { connect } from "react-redux";
import { LogOut } from "../../action/authAction";
import { countNotify } from "../../action/notifyAction";
import { sizeHeight, sizeWidth } from '../../utils/helper/size.helper';
import { COLOR } from '../../utils/color/colors';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertOption: false,
            data: 12,
        };
    }
    show = () => {
        return Alert.alert(
            "Đăng xuất",
            "Bạn chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Cancel",
                    style: "destructive",
                },
                {
                    text: "OK",
                    onPress: () => {
                        Promise.all(_removeData(TOKEN));
                        Promise.all(_removeData(USER_NAME));
                        Promise.all(_removeData(PASSWORD));
                        this.props.countNotify(0);
                        this.props.LogOut();
                        this.props.navigation.navigate('HomePay')
                    },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
    show1 = () => {
        return Alert.alert(
            "Thông báo",
            "Bạn chắc chắn muốn thay đổi shop và đăng xuất ?",
            [
                {
                    text: "Cancel",
                    style: "destructive",
                },
                {
                    text: "OK",
                    onPress: () => {
                        Promise.all(_removeData(TOKEN));
                        Promise.all(_removeData(USER_NAME));
                        Promise.all(_removeData(PASSWORD));
                        Promise.all(_removeData(IDSHOP));
                        this.props.countNotify(0);
                        this.props.LogOut();
                        this.props.navigation.navigate('StartTwo')
                    },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
    shareApp = () => {
        const onShare = async () => {
            try {
                const result = await Share.share({
                    message:
                        'http://f5sell.com/buy/f5sell.jsp',
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                alert(error.message);
            }
        }
        return Alert.alert(
            "Thông báo",
            `Hãy giới thiệu ${this.props.idshop.SHOP_NAME} cho bạn bè để cùng xây dựng cộng đồng ${this.props.idshop.SHOP_NAME} Xin cảm ơn`,
            // `Hãy giới thiệu CHỢ CHUNG CƯ cho bạn bè để cùng xây dựng cộng đồng mua bán hàng online mạnh hơn. Xin cảm ơn`,
            [
                {
                    text: "Để sau",
                    style: "destructive",
                },
                {
                    text: "Chia sẻ",
                    onPress: () => { onShare() },
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    };
    handleLoad = async () => {
        await _retrieveData(USER_NAME)
            .then((res) => {
                this.setState({
                    data: res
                })
            })
    }
    componentDidMount() {
        this.handleLoad();
    }
    render() {
        const { authUser, status } = this.props;
        const { data } = this.state;
        console.log("this is authuser", authUser);
        return (
            <SafeAreaView style={{ flex:1,backgroundColor:COLOR.MAIN }}>
                {status != '' ? <View><TouchableOpacity style={{ flexDirection: 'row', backgroundColor: "#E1AC06", height: 100, justifyContent: 'space-between', alignItems: "center", paddingLeft: 10 }}
                    onPress={() => { this.props.navigation.navigate('Thông tin CTV') }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: 60, height: 60, borderRadius: 50,
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                        }}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flexDirection: 'column' }}>
                            <Title style={{ fontSize: 20, color: 'white' }}>{authUser.USERNAME}</Title>
                            <Text style={{ color: '#fff' }}>Mã CTV: {authUser.USER_CODE}</Text>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/images/leftname.png')}
                            style={{ width: 30, height: 40 }}
                        />
                    </View>

                </TouchableOpacity></View> : <View style={{ flexDirection: 'row', backgroundColor: "#E1AC06", height: 100, alignItems: "center", paddingLeft: 10, }}

                >
                        <View style={{
                            width: 60, height: 60, borderRadius: 50,
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                        }}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row', alignItems: "center", justifyContent: 'center'

                        }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, backgroundColor: '#E1AC06', borderColor: 'white', width: sizeWidth(27), height: sizeHeight(5), alignItems: 'center', justifyContent: 'center', marginLeft: sizeWidth(4) }}
                                onPress={() => {
                                    this.setState({ showAlertOption: true });
                                    this.props.navigation.navigate('SignUp')

                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14 }}>Đăng ký</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ borderWidth: 1, backgroundColor: 'white', borderColor: 'white', width: sizeWidth(27), height: sizeHeight(5), alignItems: 'center', justifyContent: 'center', marginLeft: sizeWidth(2) }}
                                onPress={() => {
                                    this.props.navigation.navigate('SignIn')
                                }}
                            >
                                <Text style={{ color: '#E1AC06', fontSize: 14 }}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                <Drawer.Section>
                    {this.props.status === '' ? null : <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/info.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        label={({ focused, color }) => <View>{this.props.authUser.GROUPS==3?<Text style={{ color: '#E1AC06', fontSize: 16 }}>Danh sách CTV/ KH</Text>:<Text style={{ color:'#E1AC06', fontSize: 16 }}>Danh sách CTV</Text>}</View>}
                        onPress={() => { this.props.navigation.navigate('ctvdow') }}
                    />}

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/report.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Chính sách</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => { this.props.navigation.navigate('Chính sách') }}
                    />
                    {this.props.status == '' ? null : <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/chinh.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Báo cáo</Text>}

                        onPress={() => { this.props.navigation.navigate('report') }}
                    />}
                    {this.props.status == '' ? null : <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/teach.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Đào tạo</Text>}

                        onPress={() => { this.props.navigation.navigate('Đào tạo') }}
                    />}
                    {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/qrcode.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Quét mã QR code</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => { }}
                    /> */}
                    {this.props.status == '' ? null : <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/new.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}

                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Tin tức, sự kiện</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => { this.props.navigation.navigate('Tin tức-sự kiện') }}
                    />}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/share1.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Chia sẻ ứng dụng</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => this.shareApp()}

                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/pass.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Đổi mật khẩu</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => this.props.navigation.navigate("UpdateAccount")}

                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}
                        label={({ focused, color }) => <Text style={{ color: '#E1AC06', fontSize: 16 }}>Giới thiệu F5sell</Text>}
                        style={{height:sizeHeight(5.5),backgroundColor:'#fff',justifyContent:'center'}}
                        onPress={() => { this.props.navigation.navigate('Giới thiệu') }}
                    />
                </Drawer.Section>
                <View>
                    {this.props.status === "" ? null : (
                        <TouchableOpacity style={{ flexDirection: 'row', height: 100, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => {
                                this.setState({ showAlertOption: true });
                                this.show();
                            }}
                        >
                            <Image
                                source={require('../../assets/images/logout.png')}
                                style={{ width: 27, height: 27, marginRight: 10 }}
                            />
                            <Text style={{ color: 'red', fontSize: 16 }}>Đăng xuất</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* {this.props.authUser.GROUPS == 3 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.show1()
                        }}
                        style={{ marginTop: sizeHeight(1) }}
                    >
                        <Text style={{ color: 'red' }}>Đổi mã shop</Text>
                    </TouchableOpacity>
                </View> : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('StartTwo')
                            }}
                            style={{ marginTop: sizeHeight(1) }}
                        >
                            <Text style={{ color: 'red' }}>Đổi mã shop</Text>
                        </TouchableOpacity>
                    </View>} */}
                <View style={{ position: 'absolute', bottom: sizeHeight(10), width: sizeWidth(80) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Thông báo", "Hiện tại shop chưa có Fanpage trên Facebook")
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/facebook.png')}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Thông báo", "Hiện tại shop chưa có group trên Facebook")
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/group.png')}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Thông báo", "Hiện tại shop chưa có website")
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/infomation.png')}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        LogOut: (data) => dispatch(LogOut(data)),
        countNotify: (text) => dispatch(countNotify(text)),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        idshop: state.product.database,
    }
}
const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginTop: 25,
        borderBottomColor: 'white',
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerContent);
