import { Accordion, Container, Content, Header } from 'native-base';
import React, { Component } from 'react'
import { Text, View,ScrollView,TouchableOpacity,Image } from 'react-native'
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
        // console.log("thiss is val", Val);
        const { active } = this.state;
        console.log({ active })
        return (
            <View style={{flex:1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: sizeWidth(95), height: sizeHeight(6), backgroundColor: 'white', color: '#149CC6', fontSize: 16, paddingLeft: 10, borderTopColor: '#149CC6', borderTopWidth: 1 }}>
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
                                            SUB_ID_PAR:value.SUB_ID_PARENT,
                                            ID: value.SUB_ID,
                                            NAME: "Product",
                                            name: value.SUB_NAME
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