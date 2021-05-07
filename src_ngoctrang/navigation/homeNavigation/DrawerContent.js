import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, Share, TextInput } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { _retrieveData } from "../../utils/asynStorage";
import {
    Avatar,
    Title,
    Drawer,
    Text,
} from 'react-native-paper';
import { COLOR } from '../../utils/color/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _removeData } from "../../utils/asynStorage";
import { TOKEN, USER_NAME, PASSWORD, IDSHOP } from "../../utils/asynStorage/store";
import { connect } from "react-redux";
import { LogOut } from "../../action/authAction";
import { countNotify } from "../../action/notifyAction";
import { sizeHeight, sizeWidth, sizeFont } from '../../utils/helper/size.helper';
import {UpgradeUser} from '../../service/account';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertOption: false,
            data: 12,
            usercode:'',
            imageAvatar:this.props.authUser.AVATAR,
        };
    }
    Upgradeuser=()=>{
        UpgradeUser({
            INVITE_CODE:this.state.usercode
        })
        .then((res)=>{
            Alert.alert("Thông báo",`${res.data.RESULT}`)
        })
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
    shareApp = () => {
        const onShare = async () => {
            try {
                const result = await Share.share({
                    message:
                        'http://f5sell.com/buy/f5sell.jsp?idshop=http://banbuonthuoc.moma.vn',
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
            `Hãy giới thiệu ngọc trang cho bạn bè để cùng xây dựng cộng đồng ngọc trang Xin cảm ơn`,
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
        const { data,imageAvatar } = this.state;
        console.log("abcccc======",authUser);
        console.log("imageAvatar====",imageAvatar);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {status != '' ? <View><TouchableOpacity style={{ flexDirection: 'row', backgroundColor: COLOR.MAIN, height: 100, justifyContent: 'space-between', alignItems: "center", paddingLeft: 10, paddingTop: sizeHeight(3) }}
                    onPress={() => { this.props.navigation.navigate('Thông tin CTV') }}
                >
                    <View style={{ flexDirection: 'row',height:sizeHeight(10)}}>
                        <View style={{  
                            width: 60, height: 60, borderRadius: 50,
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Image
                                source={{uri:imageAvatar}}
                                style={{ width: 50, height: 50,borderRadius:50 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flexDirection: 'column' }}>
                            <Title style={{ fontSize: 20, color: 'white' }}>{authUser.FULL_NAME}</Title>
                            <Text style={{ color: '#fff' }}>Mã CTV: {authUser.USER_CODE}</Text>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/images/leftname.png')}
                            style={{ width: 30, height: 40 }}
                        />
                    </View>

                </TouchableOpacity></View> : <View style={{ flexDirection: 'row', backgroundColor: COLOR.MAIN, height: 100, alignItems: "center", paddingLeft: 10, }}

                >
                        <View style={{
                            width: 60, height: 60, borderRadius: 50,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image
                                source={ require('../../assets/images/user1.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row', alignItems: "center", justifyContent: 'center'

                        }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, borderRadius: 5, backgroundColor: COLOR.MAIN, borderColor: 'white', width: sizeWidth(27), height: sizeHeight(5), alignItems: 'center', justifyContent: 'center', marginLeft: sizeWidth(4) }}
                                onPress={() => {
                                    this.setState({ showAlertOption: true });
                                    this.props.navigation.navigate('SignUp')

                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14 }}>Đăng ký</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ borderWidth: 1, borderRadius: 5, backgroundColor: 'white', borderColor: 'white', width: sizeWidth(27), height: sizeHeight(5), alignItems: 'center', justifyContent: 'center', marginLeft: sizeWidth(2) }}
                                onPress={() => {
                                    this.props.navigation.navigate('SignIn')
                                }}
                            >
                                <Text style={{ color: COLOR.MAIN, fontSize: 14 }}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                <View>
                    {this.props.status == '' || this.props.authUser.GROUPS=='8' ? null : <TouchableOpacity onPress={() => { this.props.navigation.navigate('ctvdow') }} style={{ height: sizeHeight(5.5), flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, justifyContent: 'space-between', }}>
                        {this.props.authUser.GROUPS==3?<Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Danh sách CTV/ KH</Text>:<Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Danh sách CTV</Text>}
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />
                    </TouchableOpacity>}

                    <TouchableOpacity style={{ height: sizeHeight(5.5), backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', }}
                        onPress={() => { this.props.navigation.navigate('Chính sách') }}>

                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Chính sách</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Đào tạo') }} style={{ height: sizeHeight(5.5), backgroundColor: '#fff', justifyContent: 'space-between', borderBottomColor: '#000', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>


                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Đào tạo</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity style={{ height: sizeHeight(5.5), flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#000', borderBottomWidth: 1 }}
                        onPress={() => { this.props.navigation.navigate('Tin tức-sự kiện') }}>


                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Tin tức, sự kiện</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />

                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ height: sizeHeight(5.5), backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
                        onPress={() => { }}>

                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Quét mã QR code</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />

                    </TouchableOpacity> */}


                    <View style={{ height: 10, backgroundColor: COLOR.MAIN }}></View>

                    {this.props.status == '' ? null : <TouchableOpacity onPress={() => { this.props.navigation.navigate('report') }} style={{ height: sizeHeight(5.5), justifyContent: 'space-between', backgroundColor: '#fff', flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1, alignItems: 'center' }}>


                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Báo cáo</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />


                    </TouchableOpacity>}

                    {this.props.status == '' || this.props.authUser.GROUPS=='8' ? null : <TouchableOpacity onPress={() => { this.props.navigation.navigate('Rose') }} style={{ height: sizeHeight(5.5), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1, alignItems: 'center' }}>


                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Hoa hồng</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />


                    </TouchableOpacity>}

                    <TouchableOpacity style={{ height: sizeHeight(5.5), backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row' }}
                        onPress={() => this.shareApp()}>

                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Chia sẻ ứng dụng</Text>
                        <Image
                            source={require('../../assets/images/share2.png')}
                            style={{ width: 20, height: 20, marginRight: 10 }}
                        />


                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: sizeHeight(5.5), backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row' }}
                        onPress={() => { this.props.navigation.navigate('Giới thiệu') }}
                    >

                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>{`Giới thiệu shop`}</Text>
                        <Image
                            source={require('../../assets/images/leftnt.png')}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />


                    </TouchableOpacity>
                    {this.props.status === "" ? null : (
                        <View>
                            <View style={{ height: 10, backgroundColor: COLOR.MAIN }}></View>

                            <TouchableOpacity style={{ height: sizeHeight(5.5), backgroundColor: '#fff', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row' }}
                                onPress={() => { this.props.navigation.navigate('ChangePass') }}
                            >

                                <Text style={{ color: '#000', fontSize: 16, marginLeft: 20 }}>Đổi mật khẩu</Text>
                                <Image
                                    source={require('../../assets/images/leftnt.png')}
                                    style={{ width: 15, height: 15, marginRight: 10 }}
                                />


                            </TouchableOpacity>
                            <View>
                                {authUser.GROUPS == 8 ? <View style={{ paddingLeft: 10 }}>
                                    <View style={{ height: sizeHeight(5.5), backgroundColor: '#fff' }}>
                                        <Text style={{ padding: 10, fontSize: sizeFont(4.5) }}>Nâng cấp tài khoản</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <View style={{ backgroundColor: '#F4F4F4',width:sizeWidth(60),flexDirection:'row',alignItems:'center' }}>
                                            <TextInput
                                                placeholder="Nhập mã giới thiệu"
                                                style={{ width: sizeWidth(50), height: sizeHeight(6), borderRadius: 5,paddingLeft:10 }}
                                                onChangeText={(text)=>{this.setState({usercode:text})}}
                                                placeholderTextColor='#444444'
                                            />
                                            <Image 
                                                source={require('../../assets/images/codectv.png')}
                                                style={{width:25,height:25}}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.Upgradeuser();
                                            }}
                                            style={{width:sizeWidth(30),height:sizeHeight(5),backgroundColor:COLOR.MAIN,alignItems:'center',
                                            marginRight:10,justifyContent:'center',borderRadius:5}}
                                        >
                                            <Text style={{color:'#fff',fontWeight:'500'}}>Đăng ký</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null}
                            </View>
                        </View>
                    )}
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:sizeHeight(4)}}>
                    {this.props.status === "" ? null : (
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState({ showAlertOption: true });
                                this.show();
                            }}
                        >
                            <View style={{ height: sizeHeight(5),width:sizeWidth(40),backgroundColor: COLOR.MAIN,borderRadius:5,justifyContent:'center',alignItems:'center' }}>
                                <Text style={{ color: '#fff'}}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>


                {/* <View style={{ position: 'absolute', bottom: 50, width: sizeWidth(100) }}>
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
                </View> */}



            </View>
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
