import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Picker, ScrollView, RefreshControl } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { sizeHeight, sizeWidth } from '../../../../../utils/helper/size.helper';
import { connect } from 'react-redux';
import PureChart from 'react-native-pure-chart';
import { map } from 'lodash';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
var numeral = require("numeral");

class CharProduct extends Component {
    constructor(props) {
        super(props)

    }
    handle = () => {
        var { data } = this.props;
        var data1 = [];
        for (const value of data) {
            if (value.ID_PRODUCT_CATEGORY == 1) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Mỹ phẩm làm sạch', color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 }];
            }
            else if (value.ID_PRODUCT_CATEGORY == 53) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Chăn ga gối', color: 'rgba(191,152,285,6)', legendFontColor: "#7F7F7F", legendFontSize: 15 }];
            }
            else if (value.ID_PRODUCT_CATEGORY == 198) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Apple', color: 'red', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 2) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Mỹ phẩm dưỡng da', color: 'rgba(101,152,285,6)', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 256) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Smart Phone', color: '#0000FF', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 283) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Đồ Gia Dụng', color: '#FFFF00', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 291) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'SKT', color: '#00FFFF', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 293) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Thực phẩm chức năng', color: '#C0C0C0', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 295) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Đồ gia dụng', color: '#808080', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 296) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Đồ Uống Có Cồn', color: '#800000', legendFontColor: "#7F7F7F", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 48) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Nệm', color: 'rgba(131,142,185,6)', legendFontColor: "#808000", legendFontSize: 15 }];

            } else if (value.ID_PRODUCT_CATEGORY == 443) {
                data1 = [...data1, { population: value.TOTAL_ORDER, name: 'Phone', color: 'rgba(11,152,25,6)', legendFontColor: "#008000", legendFontSize: 15 }];

            }
        }
        return data1;
    }

    render() {
        const dataTable = this.handle();
        const screenWidth = Dimensions.get("window").width;
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };


        return (
            <View>
                <PieChart
                    data={dataTable}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="-5"
                    absolute
                />
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

})

export default connect(
    mapStateToProps,
    null
)(CharProduct);
