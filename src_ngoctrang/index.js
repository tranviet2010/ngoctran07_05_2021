import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import AppNavigation from "./navigation";
import { Provider, connect } from "react-redux";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Root } from "native-base";
import { store, persistor } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { YellowBox } from "react-native";
import { _retrieveData } from "./utils/asynStorage";
import { MenuProvider } from "react-native-popup-menu";
// import codePush from "react-native-code-push";
import ProgressCircle from "react-native-progress-circle";
import SplashScreen from "react-native-splash-screen";
import { sizeWidth, sizeHeight, sizeFont } from "./utils/helper/size.helper";
import { COLOR } from "./utils/color/colors";
import { Platform } from "react-native";
var totalPercen = 0;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      timeout: 0,
      syncMessage: "",
      loading: false,
      tolal: 1,
      recived: 0,
    };
    this.time = setTimeout(() => {
      this.time = 10;
    }, 2000);
  }
  onSyncStatusChange = (SyncStatus) => {
    switch (SyncStatus) {
      case SyncStatus.CHECKING_FOR_UPDATE:
        // Show "Checking for update" notification
        break;
      case SyncStatus.AWAITING_USER_ACTION:
        // Show "Checking for update" notification
        break;
      case SyncStatus.DOWNLOADING_PACKAGE:
        // Show "downloading" notification
        break;
      case SyncStatus.INSTALLING_UPDATE:
        // Show "installing" notification
        break;
    }
  };
  onDownloadProgress = (downloadProgress) => {
    this.setState(
      {
        loading: true,
        tolal: downloadProgress.totalBytes,
        recived: downloadProgress.receivedBytes,
      },
      () => {
        totalPercen = (
          (parseFloat(this.state.recived) / parseFloat(this.state.tolal)) *
          100
        ).toFixed(2);
      }
    );

    if (downloadProgress.receivedBytes == downloadProgress.totalBytes) {
      this.time = setTimeout(() => {
        this.setState({ loading: false });
      }, 2500);
    }
    
    //this.setState({loading: false});
  };
  componentDidMount() {
    //  if (Platform.OS === "android") {
    SplashScreen.hide();
    // }
  //   codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE
  // })
  
}
  onError = (error) => {
    console.log("An error occurred. " + error);
  };
  // async UNSAFE_componentWillMount() {
  //   var updateDialogOptions = {
  //     updateTitle: "You have an update",
  //     optionalUpdateMessage: "Update available. Install?",
  //     //optionalIgnoreButtonLabel: "Nop",
  //     optionalInstallButtonLabel: "Install",
  //   };
  //   this.setState({ loading: true });
  //   codePush.sync(
  //     { installMode: codePush.InstallMode.IMMEDIATE },
  //     this.onSyncStatusChange,
  //     this.onDownloadProgress,
  //     this.onError
  //   );

  //   this.setState({ loading: false }, () => {});

  //   codePush.allowRestart();
  //   //SplashScreen.show();
  // }
  // componentWillUnmount() {
  //   clearTimeout(this.time);
  // }
  render() {
    return this.state.loading == true ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          marginTop: sizeHeight(25),
        }}
      >
        <Image
          source={require("./assets/images/logo.png")}
          resizeMode="contain"
          style={{
            width: Platform.OS === "android" ? sizeWidth(55) : sizeWidth(60),
            height: sizeHeight(15),
            //marginBottom: sizeHeight(2),
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: sizeFont(4),
            marginBottom: sizeHeight(1),
          }}
        >
          Cập nhật phiên bản mới !{" "}
        </Text>

        <ProgressCircle
          percent={totalPercen}
          radius={55}
          borderWidth={8}
          color={COLOR.BUTTON}
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 18 }}>
            {totalPercen}
            {"%"}{" "}
          </Text>
        </ProgressCircle>
      </View>
    ) : (
      <Root>
          <SafeAreaProvider>
            <Provider store={store}>
                  <AppNavigation />
            </Provider>
          </SafeAreaProvider>
      </Root>
    );
  }
}
/**<Root>
        <MenuProvider>
          <SafeAreaProvider>
            <Provider store={configureStore({})}>
              <AppNavigation />
            </Provider>
          </SafeAreaProvider>
        </MenuProvider>
      </Root> */

/** Name       │ Deployment Key                        │ Update Metadata              │ Install Metrics      │
├────────────┼───────────────────────────────────────┼──────────────────────────────┼──────────────────────┤
│ Production │ RCxg4AvURrKOVRny62_SJUfN0R7JiKyVxov1E │ Label: v1                    │ No installs recorded │
│            │                                       │ App Version: 1.5             │                      │
│            │                                       │ Mandatory: No                │                      │
│            │                                       │ Release Time: 44 minutes ago │                      │
│            │                                       │ Released By:                 │                      │
├────────────┼───────────────────────────────────────┼──────────────────────────────┼──────────────────────┤
│ Staging    │ 4h44KYqN_DMC3NmzLgmi0JTr756q5rNu0u31l │ No updates released          │ No installs recorded │ */

// export default App
// 1. npm install -g appcenter-cli
// 2. appcenter login
// 3. đăng nhập vào tài khoản gmail được share, copy code dán vào terminal
//iOS// appcenter codepush release-react -a nguyenvandu199740-gmail.com/Babu-Ios -d Production
//iOS// appcenter codepush release-react -a nguyenvandu199740-gmail.com/Babu-Ios -d Staging

// └────────────┴───────────────────────────────────────┘
//Android// appcenter codepush release-react -a nguyenvandu199740-gmail.com/Babu-Android -d Production
//Android// appcenter codepush release-react -a nguyenvandu199740-gmail.com/Babu-Android -d Staging

// 1 số lệnh:
// - list app: appcenter apps list
// - set current app: appcenter apps set-current nguyenquangminh20111997-g
// mail.com/Thoxaydung-Android
// - add app: appcenter codepush deployment add -a <owner/appname> Production
// - list key: appcenter codepush deployment list --displayKeys

//STATUS CODEPUSH
/**UP_TO_DATE: 0
UPDATE_INSTALLED: 1
UPDATE_IGNORED: 2
UNKNOWN_ERROR: 3
SYNC_IN_PROGRESS: 4
CHECKING_FOR_UPDATE: 5
AWAITING_USER_ACTION: 6
DOWNLOADING_PACKAGE: 7
INSTALLING_UPDATE: 8 */
