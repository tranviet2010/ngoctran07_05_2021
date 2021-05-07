import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { ReportDetailCTV } from '../../../../service/account';


const Detail =(props)=>{
    const [data,setData] = useState([]);
    const year = props.route.params.year;
    const userCTV = props.route.params.userCTV;
    const fullName = props.route.params.fullName;
    const userCode = props.route.params.userCode;
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');

    useEffect(()=>{
        ReportDetailCTV({
            USERNAME: props.authUser.username,
            USER_CTV: userCTV,
            YEAR: year,
            MONTH:'',
            PAGE:'1',
            NUMOFPAGE:'30',
            IDSHOP: props.authUser.idshop,
        })
        .then(res=>{
            console.log("detail ctv", res);
            setPhone(res.data.MOBILE);
            setEmail(res.data.EMAIL);
            if (res.data.ERROR ==='0000') {
                setData(res.data.INFO);   
            }else{
                setData([]);
            }
        })
    },[]);

    return(
        <View style={{paddingHorizontal:10, alignSelf:'baseline'}}>
            <Text style={{fontWeight:'bold'}}>Tên CTV: {fullName}</Text>
            <Text>Mã CTV: {userCode}</Text>
            <Text>Số điện thoại: {phone}</Text>
            <Text>Email: {email}</Text>
            <ScrollView horizontal={true}>
                <View style={{flexDirection:'column'}}>
                    <View style={styles.titleColumn}>
                        <Text style={[styles.textTitle, styles.columnTime]}>Thời gian tạo</Text>
                        <Text style={[styles.textTitle, styles.columnTime]}>Thời gian hoàn thành</Text>
                        <Text style={[styles.textTitle, styles.otherColumn]}>Mã đơn hàng</Text>
                        <Text style={[styles.textTitle, styles.otherColumn]}>Doanh thu</Text>
                        <Text style={[styles.textTitle, styles.otherColumn]}>Hoa hồng</Text>
                    </View>

                    <ScrollView>
                    <View>
                        {data && data.map((value, index)=>{
                            return(
                                <View style={styles.titleColumn}>
                                    <Text style={[styles.textContent, styles.columnTime]}>{value.CREATE_DATE}</Text>
                                    <Text style={[styles.textContent, styles.columnTime]}>{value.FN_TIME}</Text>
                                    <Text style={[styles.textContent, styles.otherColumn]}>{value.CODE_ORDER}</Text>
                                    <Text style={[styles.textContent, styles.otherColumn, {color:'#e1ac06'}]}>{value.SUM_MONEY}đ</Text>
                                    <Text style={[styles.textContent, styles.otherColumn, {color:'#009500'}]}>{value.SUM_COMMISSION}đ</Text>
                                </View>
                            )
                        })}
                    </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
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
    titleColumn:{
        flexDirection:'row',
        borderWidth:0.5,
    },
    textTitle:{
        borderWidth:0.5,
        padding:5,
        fontWeight:'bold',
    },
    textContent:{
        borderTopWidth:0,
        borderWidth:0.5,
        padding:5,
    },
    columnTime:{
        width:120
    },
    otherColumn:{
        width:100
    }
})

export default connect(mapStateToProps,null)(Detail);