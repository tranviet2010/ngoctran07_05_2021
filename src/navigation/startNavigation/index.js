import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../views/account";
import SignUp from "../../views/account/register/signup";
import SignIn from "../../views/account/register/signin";
import UpdateInformation from "../../views/account/profile/update";
import {
  HeaderRightComponet,
  HeaderLeftComponet,
} from "../../components/header";
import { sizeFont, sizeWidth } from "../../utils/helper/size.helper";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLOR } from "../../utils/color/colors";
import { connect } from "react-redux";
import ListBank from "../../views/account/profile/update/bank";
import ListCountries from "../../views/orders/collaborator/countries";
import ListDistrict from "../../components/district";
import ListDistrictChild from "../../components/districtChild";
import UpdateAccount from "../../views/account/profile/updateadmin";
import PolicyAgent from "../../views/account/profile/header/agent/PolicyAgent";
import NewAgent from "../../views/account/profile/header/agent/NewAgent";
import SendNotify from "../../views/account/profile/infor/noti/SendNotify";
import SelectNotify from "../../views/account/profile/infor/noti/SelectNotify";
import MangeStore from "../../views/account/profile/header/store/MangeStore";
import MangeAgent from "../../views/account/profile/header/agent/MangeAgent";
import AddNewAgent from "../../views/account/profile/header/agent/AddNewAgent";
import NewStore from "../../views/account/profile/header/store/NewStore";
import Report from "../../views/account/profile/header/report/Report";
import Debt from "../../views/account/profile/header/debt/Debt";
import Introduction from "../../views/account/profile/infor/introduction/Introduction";
import EditIntroduction from "../../views/account/profile/infor/introduction/EditIntroduction";
import Policy from "../../views/account/profile/infor/policy/Policy";
import NewPolicy from "../../views/account/profile/infor/policy/NewPolicy";
import Tranning from "../../views/account/profile/infor/traning";
import TitleTraning from "../../views/account/profile/infor/traning/TitleTraning";
import News from "../../views/account/profile/infor/news/News";
import AddNews from "../../views/account/profile/infor/news/AddNews";
import { StyleSheet } from "react-native";
import DetailPolicy from "../../views/account/profile/infor/policy/DetailPolicy";
import EditPolicy from "../../views/account/profile/infor/policy/EditPolicy";
import UpdateStore from "../../views/account/profile/header/store/UpdateStore";
import DetailStore from "../../views/account/profile/header/store/DetailStore";
import About from "../../views/account/about";
import UpdateNewAgent from "../../views/account/profile/header/agent/UpdateNewAgent";
import LevelCTV from "../../components/levelctv";
// import StartOne from '../../views/account/register/start/startOne';
// import StartTwo from '../../views/account/register/start/startTwo';

const AccountStack = createStackNavigator();

const navigationOptions = {
  //To hide the ActionBar/NavigationBar
  header: null,
};
MyAccountStack = (props) => {

  const { status, navigation, route, authUser,startUser } = props;
 
  // if (authUser==="") {
  //   navigation.setOptions({ tabBarVisible: true });
  // } else {
  //   navigation.setOptions({ tabBarVisible: false });
  // }
  return (
    <AccountStack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="StartOne"
    >
      {/* <AccountStack.Screen
        name="StartOne"
        component={StartOne}
      >
      </AccountStack.Screen>
      
      <AccountStack.Screen
        name="StartTwo"
        component={StartTwo}
      >
      </AccountStack.Screen> */}
     
      <AccountStack.Screen
        name="Account"
        component={Account}
      />
      <AccountStack.Screen
        name="SignUp"
        component={SignUp}
        
      />
      <AccountStack.Screen
        name="SignIn"
        component={SignIn}
        
      />
      <AccountStack.Screen
        name="ListBank"
        component={ListBank}
        options={{
          title: "Ch???n ng??n h??ng",
          headerBackTitle: null,
          headerTruncatedBackTitle: null,
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderLeftComponet
              navigation={navigation}
              onPress={() => navigation.navigate("UpdateInformation")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerStyle: {
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
            backgroundColor: COLOR.HEADER,
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <AccountStack.Screen
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
      <AccountStack.Screen
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
      <AccountStack.Screen
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
      <AccountStack.Screen
        name="UpdateAccount"
        component={UpdateAccount}
        options={{
          title: "C???p nh???t th??ng tin",
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
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => null,
        }}
      />

      <AccountStack.Screen
        name="PolicyAgent"
        component={PolicyAgent}
        options={{
          title: "Ch??nh s??ch ?????i l??",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("NewAgent");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="NewAgent"
        component={NewAgent}
        options={{
          title: "Th??m m???i c???p ?????i l??",
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
              onPress={() => navigation.navigate("PolicyAgent")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="SendNotify"
        component={SendNotify}
        options={{
          title: "G???i th??ng b??o",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="SelectNotify"
        component={SelectNotify}
        options={{
          title: "Ch???n ?????i t?????ng th??ng b??o",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="MangeAgent"
        component={MangeAgent}
        options={{
          title: "Danh s??ch ?????i l??",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("AddNewAgent");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="AddNewAgent"
        component={AddNewAgent}
        options={{
          title: "Th??m m???i ?????i l??",
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
              onPress={() => navigation.navigate("MangeAgent")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="MangeStore"
        component={MangeStore}
        options={{
          title: "Danh s??ch kho",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("NewStore");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="NewStore"
        component={NewStore}
        options={{
          title: "Th??m m???i kho",
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
              onPress={() => navigation.navigate("MangeStore")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="Report"
        component={Report}
        options={{
          title: "B??o c??o",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />
      <AccountStack.Screen
        name="Debt"
        component={Debt}
        options={{
          title: "C??ng n???",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="Introduction"
        component={Introduction}
        options={({ route }) => ({
          title: "Gi???i thi???u",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("EditIntroduction");
              }}
              name="edit"
              size={sizeFont(5)}
              color="#fff"
              //style={styles.touchPlus}
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="EditIntroduction"
        component={EditIntroduction}
        options={({ route }) => ({
          title: "Ch???nh s???a gi???i thi???u",
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
              onPress={() => navigation.navigate("Introduction")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="Policy"
        component={Policy}
        options={({ route }) => ({
          title: "Ch??nh s??ch",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("NewPolicy");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        })}
      />
      <AccountStack.Screen
        name="NewPolicy"
        component={NewPolicy}
        options={({ route }) => ({
          title: "Th??m m???i ch??nh s??ch",
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
              onPress={() => navigation.navigate("Policy")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="Tranning"
        component={Tranning}
        options={({ route }) => ({
          title: "Danh m???c ????o t???o",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("Chi ti???t ????o t???o");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        })}
      />
      <AccountStack.Screen
        name="TitleTraning"
        component={TitleTraning}
        options={({ route }) => ({
          title: "????o t???o b??n h??ng",
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
              onPress={() => navigation.navigate("Tranning")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("TitleTraning");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="News"
        component={News}
        options={({ route }) => ({
          title: "Tin t???c s??? ki???n",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                navigation.navigate("AddNews");
              }}
              name="plus"
              size={sizeFont(5)}
              color="#fff"
              style={styles.touchPlus}
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="AddNews"
        component={AddNews}
        options={({ route }) => ({
          title: "Th??m m???i tin t???c, s??? ki???n",
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
              onPress={() => navigation.navigate("News")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="DetailPolicy"
        component={DetailPolicy}
        options={({ route }) => ({
          title: "N???i dung ch??nh s??ch",
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
              onPress={() => navigation.navigate("Policy")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
          headerRight: () => (
            <HeaderRightComponet
              navigation={navigation}
              onPress={() => {
                route.params.NAVIGATION();
              }}
              name="edit"
              size={sizeFont(5)}
              color="#fff"
            />
          ),
        })}
      />

      <AccountStack.Screen
        name="EditPolicy"
        component={EditPolicy}
        options={{
          title: "Ch???nh s???a ch??nh s??ch",
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
              onPress={() => navigation.navigate("DetailPolicy")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="UpdateStore"
        component={UpdateStore}
        options={{
          title: "C???p nh???t th??ng tin kho",
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
              onPress={() => navigation.navigate("DetailStore")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="DetailStore"
        component={DetailStore}
        options={{
          title: "Chi ti???t kho",
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
              onPress={() => navigation.navigate("MangeStore")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="About"
        component={About}
        options={{
          title: "V??? ch??ng t??i",
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
              onPress={() => navigation.navigate("Account")}
              name="chevron-left"
              size={sizeFont(6)}
              color="#fff"
            />
          ),
        }}
      />

      <AccountStack.Screen
        name="UpdateNewAgent"
        component={UpdateNewAgent}
        options={({ route }) => ({
          title: route.params.TITLE,
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
        })}
      />

      <AccountStack.Screen
        name="LevelCTV"
        component={LevelCTV}
        options={({ route }) => ({
          title: "Lo???i",
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
        })}
      />
    </AccountStack.Navigator>
  );
};
const mapStateToProps = (state) => {
  return {
    startUser:state.authUser.startthu,
    status: state.authUser.status,
    authUser: state.authUser.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountStack);
