import React, { Component } from "react";
import {
    View,
    TextInput,
    Text,
    SectionList,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Image,
    StyleSheet,
} from "react-native";
import _ from "lodash";

import { handleMoney } from "../../../../components/money";
var numeral = require("numeral");

import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
    sizeHeight,
    sizeFont,
    sizeWidth,
} from "../../../../utils/helper/size.helper";
import { COLOR } from "../../../../utils/color/colors";
import { ScrollView } from "react-native-gesture-handler";

class FullItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params.data,
            loading: true,
            refreshing: false,
            search: "",
            loadingSearch: false,
        };
        this.see = false;
    }
    handleSearch = () => {
        const arry=this.state.data.filter(el=>el.PRODUCT_NAME.indexOf(this.state.search)!=-1)
        this.setState({
            data:arry
        })
    };
    checkTime = (a, b) => {
        var start = a;
        var end = b;
        var datePart1 = start.split("/");
        var datePart2 = end.split("/");
    
        var dateObject1 = new Date(+datePart1[2], datePart1[1] - 1, +datePart1[0]);
        var dateObject2 = new Date(+datePart2[2], datePart2[1] - 1, +datePart2[0]);
        var currentDate = new Date();
    
        return (dateObject1 < currentDate && currentDate<dateObject2) ?1:-1
      }

    render() {
        const { loading, refreshing, search,data } = this.state;
        const { navigation, authUser, status } = this.props;
        
        console.log("this is data", data);
        return (
            <View style={{ backgroundColor: "#fff", height: sizeHeight(100) }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingHorizontal: sizeWidth(2),
                        marginTop: sizeHeight(2),
                        width: sizeWidth(94),
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        marginBottom: sizeHeight(1),
                    }}
                >
                    <TextInput
                        placeholder="T??m ki???m"
                        value={search}
                        returnKeyType="search"
                        onFocus={() => (this.see = true)}
                        onBlur={() => (this.see = false)}
                        onChangeText={(text) => this.setState({ search: text })}

                        onSubmitEditing={()=>this.handleSearch()}
                        style={{
                            width: sizeWidth(85),
                            paddingVertical: sizeHeight(1.5),
                        }}
                    />

                </View>
                <View>
                    <View style={{ width: sizeWidth(96), alignItems: 'center', justifyContent: 'center' }}>
                        <FlatList
                            numColumns={2}
                            data={data}
                            keyExtractor={(item) => item.SUB_ID}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}

                                />
                            }
                            contentContainerStyle={{ paddingBottom: sizeHeight(5) }}
                            scrollToOverflowEnabled={0.5}
                            onEndReached={this.onEndReached}
                            onMomentumScrollBegin={this.onMomentumScrollBegin}
                            extraData={this.state}
                            // ListFooterComponent={() => {
                            //     return loading ? (
                            //         <ActivityIndicator size={sizeFont(7)} color="red" />
                            //     ) : null;
                            // }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.touchFlatListChild}
                                        onPress={() =>
                                            navigation.navigate("DetailProducts", {
                                                data: item,
                                                ID_PRODUCT: item.ID_PRODUCT,
                                                NAME: "SubChildItem",
                                            })
                                        }
                                    >
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <Image
                                                source={{ uri: item.IMAGE_COVER }}
                                                PlaceholderContent={<ActivityIndicator />}
                                                resizeMode="cover"
                                                style={styles.imageSize}
                                            />
                                        </View>
                                        <Text style={styles.textName}>{item.PRODUCT_NAME} </Text>
                                        {/* <Text style={styles.textCode}>{item.PRODUCT_NAME} </Text> */}
                                        <Text style={styles.textPrice}>
                                            {numeral(handleMoney(status, item, authUser)).format("0,0")}
                  VN??
                </Text>
                                    </TouchableOpacity>
                                );
                            }}
                            ListEmptyComponent={() => (
                                <View>
                                    <Text>Kh??ng c?? d??? li???u</Text>
                                </View>
                            )}
                        />
                    </View>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    touchFlatListChild: {
      borderRadius: 6,
      borderColor: COLOR.BUTTON,
      borderWidth: 0.5,
      marginVertical: sizeHeight(1),
      width: sizeWidth(47),
      overflow: "hidden",
      marginRight: sizeWidth(2),
      justifyContent:'center',
      alignItems:'center',
    },
    imageSize: {
      width: sizeWidth(45),
      justifyContent:'center',
      alignItems:'center',
      // width: sizeWidth(30),
      height: sizeHeight(20),
      
      //height: sizeHeight(20),
      overflow: "visible",
    },
    textName: {
      fontSize: sizeFont(4),
      paddingVertical: sizeHeight(3.5),
      paddingHorizontal: sizeWidth(2),
      paddingTop: sizeHeight(4.5),
      paddingVertical: sizeHeight(1),
    },
    textCode: {
      fontSize: sizeFont(4),
      fontWeight: "bold",
      paddingHorizontal: sizeWidth(2),
    },
    textPrice: {
      color: COLOR.BUTTON,
      fontSize: sizeFont(3.8),
      paddingVertical: sizeHeight(1),
      paddingHorizontal: sizeWidth(2),
    },
  });

const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullItem);
