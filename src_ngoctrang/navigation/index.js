import React, { useState, useEffect } from "react";
import { Easing } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyHomeStack from "./homeNavigation";
import OrderStack from "./orderNavigation";
import MyProductStack from "./productNavigation";
import { connect } from "react-redux";
import Signin from '../views/account/register/signin/index'
import SignUp from '../views/account/register/signup/index'
import { _retrieveData } from '../utils/asynStorage'
import SplashScreen from "../views/splashScreen";
import { sizeHeight, sizeFont, sizeWidth } from "../utils/helper/size.helper";
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLOR } from "../utils/color/colors";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
const AppStack = (props) => {

  return (
    <Tab.Navigator
      // initialRouteName="account"
      initialRouteName="product"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Home") {
            const image = focused
              ? require('../assets/images/homeactive.png')
              : require('../assets/images/home.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          } else if (route.name == "order") {
            const image = focused
              ? require('../assets/images/order.png')
              : require('../assets/images/orderactive.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          }
          else if (route.name == "product"){
            const image = focused
              ? require('../assets/images/productactive.png')
              : require('../assets/images/product.png')
            return (
              <Image
                source={image}
                style={{ width: 35, height: 35 }}
                // marginBottom:20
              />
            );

          }else if (route.name == "rose"){
            const image = focused
              ? require('../assets/images/menuactive.png')
              : require('../assets/images/menu.png')
            return (
              <Image
                source={image}
                style={{ width: 25, height: 25 }}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.MAIN,
        inactiveTintColor: "#B7B7B7",
        tabStyle: {
          paddingTop: 10,
          backgroundColor: "#fff",
        },
        labelStyle: {
          flex: 1,
          fontSize: sizeFont(3),
          paddingTop:6,
        },
        labelPosition: "below-icon",
        style: {
          height: isIphoneX() ? sizeHeight(12) : sizeHeight(8),
        }
      }}
    >
      <Stack.Screen
        name="order"
        component={OrderStack}
        options={{ title: "Đơn hàng" }}
      />
      <Stack.Screen
        name="product"
        component={MyProductStack}
        options={{ title: "Sản phẩm" }}
      />
      <Stack.Screen
        name="rose"
        component={MyHomeStack}
        options={{ title: "Menu" }}
      />
    </Tab.Navigator>
  )
}
function AppNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: configNavigation,
            close: configNavigation,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Tab.Screen name="SplashScreen" component={SplashScreen} />
        <Tab.Screen name="screenHome" component={AppStack} />
        <Tab.Screen name="SignIn" component={Signin} />
        <Tab.Screen name="SignUp" component={SignUp} />    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
