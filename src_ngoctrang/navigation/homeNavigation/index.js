import React, { useState } from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, Easing, Platform } from "react-native";
import { COLOR } from "../../utils/color/colors";

import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import Notification from "../../views/notification";
import DetailOrder from "../../views/ordermain/detailorder";
import {
  HeaderLeftComponet,
  HeaderRightComponet,
  HeaderRightTool,
} from "../../components/header";

import ChildListItem from "../../views/home/childitem";
import { connect } from "react-redux";
import { View } from "native-base";
import DetailProducts from "../../views/home/listItem/details";
import DetailAddressCart from "../../views/carts/addresscart";
import ListCountries from "../../views/orders/collaborator/countries";
import ListDistrict from "../../components/district";
import ListDistrictChild from "../../components/districtChild";
import bank from "../../components/bank";
import { Badge, Text } from "react-native-paper";
import SubChildItem from "../../views/home/subchilditem";
import NameItems from "../../views/home/nameitem";
import InfoCTV from "../../views/menuleft/infoctv";
// import Info from "../../views/menuleft/infoctv/usechildren";
import Info from "../../views/account/profile/update/index";
import EducateCTV from "../../views/account/profile/infor/traning";
import IntroduceCTV from "../../views/account/profile/infor/introduction/Introduction";
import NewCTV from "../../views/account/profile/infor/news/News";
import Polycitech from "../../views/account/profile/infor/policy/Policy";
import TitleTraning from "../../views/account/profile/infor/traning/TitleTraning";
import DetailPolicy from "../../views/account/profile/infor/policy/DetailPolicy";
import Product from "../productNavigation";
import CtvDetail from "../../views/menuleft/infoctv/cvtdetail";
import { searchHome } from "../../action/notifyAction";
import Report from "../../views/menuleft/reportctv/index";
import Reportall from "../../views/menuleft/reportctv/reportShop/reportAll";
import ReportTime from "../../views/menuleft/reportctv/reportShop/reportTime";
import ReportCTV from "../../views/menuleft/reportctv/reportShop/reportCTV";
import ReportProduct from "../../views/menuleft/reportctv/reportShop/reportProduct";
import DetailNew from "../../views/account/profile/infor/news/DetailNews";
import Subchilditem from "../../views/rose/subchilditem";
import FullItem from "../../views/home/listItem/FullItem";
import Rose from "../../views/rose/listItem/index";
import DetailRose from '../../views/rose/subchilditem/detailrose';
import { isIphoneX } from 'react-native-iphone-x-helper';
import ReportDay from "../../views/menuleft/reportctv/reportShop/ReportDay";
import SetupAccout from "../../views/menuleft/infoctv/setupaccout";
import Editctv from "../../views/menuleft/infoctv/EditCtv";
import DrawerContent from "./DrawerContent";
import getwithdawal from "../../views/rose/subchilditem/getwithdawal";
import ChangePass from "../../views/account/password/changePass";

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

  console.log("controller", countNotify);
  const [value, setvalue] = useState('')
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
        name="HomePay"
        component={DrawerContent}
        options={({ route }) => ({
          title: "",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS == "ios" ? sizeHeight(10) : sizeHeight(9),
          },
          headerTitleStyle: {
            color: COLOR.HEADER,
          },
          headerShown: false,
        })}
      />

      <HomeStack.Screen
        name="ChildListItem"
        component={ChildListItem}
        options={({ route }) => ({
          title: route.params.name,
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
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="FullItem"
        component={FullItem}
        options={({ route }) => ({
          title: "T???t c???",
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
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="ChangePass"
        component={ChangePass}
        options={({ route }) => ({
          title: "?????i m???t kh???u",
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
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="DetailAddressCart"
        component={DetailAddressCart}
        options={({ route }) => ({
          title: "T???o ????n h??ng",
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Ch??nh s??ch"
        component={Polycitech}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate('HomePay')}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={({ route }) => ({
          title: "Chi ti???t ????n h??ng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: sizeHeight(10),
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="report"
        component={Report}
        options={{
          title: 'B??o c??o',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="detailrose"
        component={Subchilditem}
        options={{
          title: 'Chi ti???t hoa h???ng theo CTV',
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="setupaccout"
        component={SetupAccout}
        options={{
          title: 'Ch???nh s???a th??ng tin CTV/ KH',
          headerStyle: {
            backgroundColor: COLOR.HEADER
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="reportall"
        component={Reportall}
        options={{
          title: 'B??o c??o chung',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("report")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="editctv"
        component={Editctv}
        options={{
          title: 'C???p nh???t th??ng tin CTV/KH',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Detail container")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="reportTime"
        component={ReportTime}
        options={{
          title: 'B??o c??o theo m???t h??ng',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="reportProduct"
        component={ReportProduct}
        options={{
          title: 'B??o c??o bi???n ?????ng',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleAlign: "center",
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Th??ng tin CTV"
        component={Info}
        options={{
          title: 'C???p nh???t th??ng tin',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="Chi ti???t hoa h???ng theo CTV"
        component={Subchilditem}
        options={{
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
        name="ctvdow"
        component={InfoCTV}
        options={{
          title: "Danh s??ch CTV/ KH",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="????o t???o"
        component={EducateCTV}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="Chi ti???t ch??nh s??ch"
        component={DetailPolicy}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Chi ti???t ????o t???o"
        component={TitleTraning}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
        }}
      />
      <HomeStack.Screen
        name="Tin t???c-s??? ki???n"
        component={NewCTV}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="detailNew"
        component={DetailNew}
        options={{
          title: 'Chi ti???t',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("Tin t???c-s??? ki???n")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />

      <HomeStack.Screen
        name="reportCTV"
        component={ReportCTV}
        options={{
          title: 'B??o c??o theo CTV',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("report")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="reportday"
        component={ReportDay}
        options={{
          title: 'B??o c??o chung',
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("reportall")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}

      />
      <HomeStack.Screen
        name="Gi???i thi???u"
        component={IntroduceCTV}
        options={{
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Detail container"
        component={CtvDetail}
        options={{
          title: "Chi ti???t CTV/ KH",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("ctvdow")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      {/* <HomeStack.Screen
        name="DetailProducts"
        component={DetailProducts}
        options={({ route }) => ({
          title: "Chi ti???t s???n ph???m",
          headerTitleAlign: "center",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTintColor: '#fff',
          headerRight: () => {
            return (
              <View>
                <TouchableOpacity
                  style={{ marginRight: sizeWidth(3) }}
                >
                  {authUser.GROUPS != 3 ? <HeaderLeftComponet
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate("Carts", {
                        NAME: "HomePay",
                      })
                    }
                    name="shopping-cart"
                    size={sizeFont(6)}
                    color="white"
                  /> : null}
                  {listItem.length != 0 ? (
                    <View style={styles.viewList}>
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: sizeFont(3),
                        }}
                      >
                        {listItem.length}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )
          }
        })}
      /> */}
      <HomeStack.Screen
        name="ListCountries"
        component={ListCountries}
        options={({ route }) => ({
          title: "Ch???n T???nh/Th??nh ph???",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="ListDistrict"
        component={ListDistrict}
        options={({ route }) => ({
          title: "Ch???n Qu???n/Huy???n",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="ListDistrictChild"
        component={ListDistrictChild}
        options={({ route }) => ({
          title: "Ch???n Ph?????ng/X??",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="Listbank"
        component={bank}
        options={({ route }) => ({
          title: "Ch???n Ng??n Ha??ng",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        })}
      />
      <HomeStack.Screen
        name="SubChildItem"
        component={SubChildItem}
        options={({ route }) => ({
          title: route.params.name,
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <HomeStack.Screen
        name="NameItems"
        component={NameItems}
        options={({ route }) => ({
          title: "Danh m???c s???n ph???m",
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
              onPress={() => navigation.navigate(route.params.NAME)}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () =>
            authUser.GROUPS === "3" ? (
              <HeaderRightComponet
                navigation={navigation}
                onPress={() => route.params.showModal()}
                name="plus"
                size={sizeFont(5)}
                color="#fff"
                style={styles.touchPlus}
              />
            ) : null,
        })}
      />








      <HomeStack.Screen
        name="Rose"
        component={Rose}
        navigation={navigation}
        options={({ route }) => ({
          title: "Hoa h???ng",
          headerStyle: {
            backgroundColor: COLOR.HEADER,
            height: Platform.OS == 'ios' ? sizeHeight(10) : sizeHeight(10),
            color: 'white',
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("HomePay")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          // headerRight: () => {
          //   return (
          //     <View style={{ marginRight: 20 }}>
          //       <HeaderLeftComponet
          //         navigation={navigation}
          //         onPress={() => navigation.navigate("Th??ng b??o", {
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
        name="detailrose1"
        component={DetailRose}
        options={{
          title: "Y??u c???u thanh to??n hoa h???ng",
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
        name="Y??u c???u thanh to??n"
        component={getwithdawal}
        options={{
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
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  touchPlus: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: sizeFont(4),
    width: sizeFont(8),
    height: sizeFont(8),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: sizeWidth(4),
  },
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
    idshop: state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchHome: (text) => dispatch(searchHome(text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHomeStack);
