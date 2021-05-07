import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image } from 'react-native'
import { COLOR } from '../../../utils/color/colors';
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../../utils/helper/size.helper";

export default class Listcate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }
    render() {
        const { Val, navigation } = this.props;
        console.log("thiss is val", Val);
        const { active } = this.state;
        console.log({ active })
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(95), height: sizeHeight(6), backgroundColor: 'white', color: '#149CC6', fontSize: 16, paddingLeft: 10, borderBottomColor:COLOR.MAIN, borderBottomWidth: 1 }}>
                    <Text
                        style={{ justifyContent: 'center', alignContent: 'center'}}
                        onPress={() => {
                            navigation.navigate("ChildListItem", {
                                name: Val.NAME,
                                ID: Val.ID, 
                            });
                        }}
                    >{Val.NAME}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ active: !active })
                        }}
                    >
                        {active?<Image 
                            source={require('../../../assets/images/dowmenu.png')}
                            style={{width:15,height:15,marginRight:10}}
                        />:<Image 
                        source={require('../../../assets/images/leftmenu.png')}
                        style={{width:15,height:15,marginRight:10}}
                    />}

                    </TouchableOpacity>
                </View>
                {active ? (
                    <View >
                        {Val.INFO.map((value) => (
                            <View>
                                <Text
                                    style={{ justifyContent: 'center', alignContent: 'center',padding:10,paddingLeft:20 }}
                                    onPress={() => {
                                        navigation.navigate("SubChildItem", {
                                            name:value.SUB_NAME,
                                            SUB_ID_PAR:value.SUB_ID_PARENT,
                                            ID: value.SUB_ID,
                                            NAME: "Product",
                                        });
                                    }}
                                >{value.SUB_NAME}</Text>
                            </View>
                        ))}
                    </View>
                ) : false}
            </View>
        )
    }
}