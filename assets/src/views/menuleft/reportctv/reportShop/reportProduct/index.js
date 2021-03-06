import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Picker, ScrollView, RefreshControl
} from 'react-native'
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import { ReportFluc } from "../../../../../service/account";
import YearReport from './YearReport';
import MothReport from './MothReport';
import ChartProduct from './ChartProduct';
import DropDownPicker from 'react-native-dropdown-picker';

var numeral = require("numeral");
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "",
            isselectedValue: '',
            selectedYear: "2019",
            selectedMoth: '',
            data: [],
            load: true,
            display:''
        }
    }
    handle = () => {
        const { selectedMoth, selectedYear, selectedValue,display } = this.state;
        ReportFluc({
            USERNAME: this.props.username,
            YEAR: selectedYear,
            MONTH: selectedMoth,
            PR_CODE: '',
            REPORT_TYPE: selectedMoth,
            DISPLAY_TYPE: display,
            IDSHOP: "ABC123"
        })
            .then((result) => {
                console.log("this is ReportItem", result);
                this.setState({
                    data: result.data.INFO
                })
            }).catch((err) => {
                console.log("errrro", err)
            })
    }
    componentDidMount() {
        this.handle();
    }
    config = () => {
        if (this.state.selectedValue == 1) {
            return (<YearReport data={this.state.data} />)
        } else {
            return (<MothReport data={this.state.data} />)
        }
    }
    render() {
        const { selectedValue, isselectedValue,display, load, selectedMoth, selectedYear, data } = this.state;
        const color = load ? '#E1AC06' : '#F5F5F5';
        const color3 = load ? '#F5F5F5' : '#E1AC06';
        const colorText1 = load ? 'white' : 'black';
        const colorText2 = load ? 'black' : 'white';
        return (
            <ScrollView style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text>Ki???u th???ng k??</Text>
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
                                { label: 'Theo n??m', value: '1' },
                                { label: 'Theo th??ng', value: '2' }
                            ]}
                            defaultValue={selectedValue}
                            placeholder="- T???t c??? -"
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa', width: sizeWidth(35), borderColor: '#E1AC06', borderWidth: 2 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(35) }}
                            onChangeItem={item => this.setState({
                                selectedValue: item.value
                            }, () => { this.handle() })}
                        />
                    </View>

                    <View>
                        {selectedValue == 1 ? <View><View
                            style={{

                                // The solution: Apply zIndex to any device except Android
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                })

                            }}
                        >
                            <DropDownPicker
                                items={[
                                    { label: '2019', value: '2019' },
                                    { label: '2020', value: '2020' }
                                ]}
                                defaultValue={selectedYear}
                                placeholder="N??m"
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa', width: sizeWidth(35), borderColor: '#E1AC06', borderWidth: 2 }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(35) }}
                                onChangeItem={item => this.setState({
                                    selectedYear: item.value
                                }, () => { this.handle() })}
                            />
                        </View></View> :
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
                                        { label: '10', value: '10' },
                                        { label: '3', value: '3' }
                                    ]}
                                    defaultValue={selectedMoth}
                                    placeholder=""
                                    containerStyle={{ height: 40 }}
                                    style={{ backgroundColor: '#fafafa', width: sizeWidth(35), borderColor: '#E1AC06', borderWidth: 2 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(35) }}
                                    onChangeItem={item => this.setState({
                                        selectedMoth: item.value
                                    }, () => { this.handle() })}
                                />
                            </View>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                    <Text>Hi???n th??? theo</Text>


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
                                { label: 'Danh m???c s???n ph???m', value: '1' },
                                { label: 'Thu???c t??nh s???n ph???m', value: '2' },
                                { label: 'S???n ph???m', value: '3' }
                            ]}
                            defaultValue={display}
                            placeholder="Danh m???c s???n ph???m"
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa', width: sizeWidth(50), borderColor: '#E1AC06', borderWidth: 2 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', width: sizeWidth(50) }}
                            onChangeItem={item => this.setState({
                                display: item.value
                            }, () => { this.handle() })}
                        />
                    </View>

                </View>
                <View style={{ height: 5, backgroundColor: '#CDD1D1', marginTop: 10, marginBottom: 10 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <View>
                        <TouchableOpacity
                            style={{ width: sizeWidth(46), height: sizeHeight(7), borderColor: '#E1AC06', borderWidth: 2, justifyContent: 'center', backgroundColor: `${color}` }}
                            onPress={() => this.setState({
                                load: true,
                            })}
                        >
                            <Text style={{ textAlign: 'center', color: `${colorText1}` }}>Hi???n th??? d???ng b???ng</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ width: sizeWidth(46), height: sizeHeight(7), borderColor: '#E1AC06', borderWidth: 2, justifyContent: 'center', backgroundColor: `${color3}` }}
                            onPress={() => this.setState({
                                load: false,

                            })}
                        >
                            <Text style={{ textAlign: 'center', color: `${colorText2}` }}>Hi???n th??? d???ng bi???u ?????</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {load === true ? this.config() : <ChartProduct data={data} />}
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
const styles = StyleSheet.create({
    mainUser: {
        flexDirection: 'row',
    },
    row1: {
        borderLeftColor: '#BFC4C4',
        borderLeftWidth: 1,
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row2: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row3: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row4: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row5: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row6: {
        textAlign: 'center',
        width: sizeWidth(30),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    row7: {
        textAlign: 'center',
        width: sizeWidth(20),
        borderRightColor: '#BFC4C4',
        borderRightWidth: 1,
    },
    custom: {
        borderBottomColor: '#BFC4C4',
        borderBottomWidth: 1,

    },
    customTop: {
        borderTopColor: '#BFC4C4',
        borderTopWidth: 1,
    },
    container: {
        borderColor: '#E1AC06',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: "center"
    },
})

export default connect(
    mapStateToProps,
    null
)(index);
