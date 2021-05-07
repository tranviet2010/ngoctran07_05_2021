import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, TextInput, Image, Easing, View } from "react-native";
import DetailOrder from "../../views/ordermain/detailorder";
import Rose from "../../views/rose/listItem/index";
import { COLOR } from "../../utils/color/colors";
import DetailRose from '../../views/rose/subchilditem/detailrose';
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import Subchilditem from "../../views/rose/subchilditem";
import getwithdawal from "../../views/rose/subchilditem/getwithdawal";
import {
  HeaderLeftComponet,
  HeaderRightComponet,
} from "../../components/header";
import { connect } from "react-redux";
import { Badge, Text } from "react-native-paper";

const HomeStack = createStackNavigator();

const configNavigation = {
  // animation: "spring",
  // config: {
  //   stiffness: 1000,
  //   damping: 500,
  //   mass: 7,
  //   overshootClamping: true,
  //   restDisplacementThreshold: 0.01,
  //   restSpeedThreshold: 0.01,
  // },
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.bezier(0, 0.25, 0.5, 0.75, 1),
  }
}

MyHomeStack = (props) => {
  const { status, navigation, route, authUser, listItem, countNotify } = props;
  console.log({ props });
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator
      screenOptions={{
        transitionSpec: {
          open: configNavigation,
          close: configNavigation,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

      }}
    >
      <HomeStack.Screen
        name="Rose"
        component={Rose}
        navigation={navigation}
        options={({ route }) => ({
          title: "Hoa hồng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS == 'ios' ? sizeHeight(12) : sizeHeight(9),
            color: 'white',
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/list.png')}
                style={{
                  width: 25,
                  height: 22,
                  marginLeft: 10
                }}
              />

            </TouchableOpacity>

          ),
          // headerRight: () => {
          //   return (
          //     <View style={{ marginRight: 20 }}>
          //       <HeaderLeftComponet
          //         navigation={navigation}
          //         onPress={() => navigation.navigate("Thông báo", {
          //           NAME: "Order",
          //         })}
          //         name="bell"
          //         size={sizeFont(6)}
          //         color="#fff"
          //       />
          //       <View style={styles.viewList}>
          //         {countNotify < 100 ? <Text
          //           style={{
          //             color: "#fff",
          //             textAlign: "center",
          //             fontSize: sizeFont(3),
          //           }}
          //         >
          //           {countNotify}
          //         </Text> : <Text style={{
          //           fontSize: sizeFont(2), color: "#fff",
          //         }}>99+</Text>}
          //       </View>
          //     </View>
          //   );
          // },
        })}
      />

      <HomeStack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={({ route }) => ({
          title: "Chi tiết đơn hàng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(10),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: '#fff'
        })}
      />

      <HomeStack.Screen
        name="Thông báo"
        component={Notification}
        options={{
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Rose")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => null}
              name="list"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Chi tiết hoa hồng theo CTV"
        component={Subchilditem}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="detailrose"
        component={DetailRose}
        options={{
          title: "Yêu cầu thanh toán hoa hồng",
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Rose")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Yêu cầu thanh toán"
        component={getwithdawal}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
  )

};

const styles = StyleSheet.create({
  viewList: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    backgroundColor: "red",
    color: "#fff",
    borderRadius: sizeWidth(2.5),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: sizeHeight(-1),
    right: sizeWidth(-1),
  },
});

const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    listItem: state.order.listItem,
    countNotify: state.notify.countNotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
