import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { COLOR } from "../../utils/color/colors";
import {
  sizeFont,
  sizeWidth,
  sizeHeight,
} from "../../utils/helper/size.helper";
import { connect } from "react-redux";
import { LoginPhone, UpdateDivice, GetProfile } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { AUTH, USER_NAME } from "../../utils/asynStorage/store";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom, AlertCommon } from "../../components/error";
import ListProducts from "./listItem";
import {
  getListSubProducts
} from "../../service/products";
import { getListNotify } from "../../service/notify";
import { countNotify } from "../../action/notifyAction";
//const unsubscribe;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
      search: "",
      loadingSearch: false,
      message: "",
      dataSub: [],
      showModal: false,
      search: '',
    };
  }
  handleLoad = async () => {
    const data = await _retrieveData(USER_NAME)
      .then(async (result) => {
        if (result) {
          await this.props
            .GetProfile({
              IDSHOP: "ABC123",
              USER_CTV: result.substr(1).slice(0, -1),
              USERNAME: result.substr(1).slice(0, -1),
            })
            .then((result) => {
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
          getListNotify({
            USERNAME: result.substr(1).slice(0, -1),
            PAGE: 1,
            NUMOFPAGE: 5,
            IDSHOP: "ABC123",
          })
            .then((result) => {
              if (result.data.ERROR === "0000") {
                this.props.countNotify(result.data.SUM_NOT_READ);
              } else {
              }
            })
            .catch((error) => {
            });
        } else {
          await getListSubProducts({
            USERNAME: null,
            ID_PARENT: null,
            IDSHOP: "ABC123",
            SEARCH_NAME: this.state.search,
          })
            .then((result) => {
              if (result.data.ERROR == "0000") {
                for (let i = 0; i < result.data.DETAIL.length; i++) {
                  result.data.DETAIL[i].data = result.data.DETAIL[i].INFO;

                  //resultArray.push(result.data.DETAIL[i]);
                }
                this.setState(
                  {
                    data: result.data.DETAIL,
                  },
                  () => {
                    this.setState({ loading: false });
                  }
                );
              } else {
                this.setState({ loading: false }, () =>
                  AlertCommon("Th??ng b??o", result.data.RESULT, () => null)
                );
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    this.handleLoad();
    const { navigation } = this.props;
  }
  onRefreshing = () => {
    this.handleLoad();
  };
  componentWillUnmount() {
    clearTimeout(this.message);
  };
  onChange = (text) => {
    this.setState({ search: text });
  };
  loadingSear = () => {
    this.setState({
      loadingSearch: true,
    });
  };
  deleteSearch = () => {
    this.setState({ search: "" });
  };
  // componentDidUpdate(prevProps){
  //   if(this.props.searchhome!=prevProps.searchhome){
  //     this.setState({
  //       search:this.props.searchhome
  //     })
  //   }
  // }
  render() {
    const {
      loading,
      data,
      refreshing,
      loadingSearch,
      search,
    } = this.state;
    return loading ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
        overlayColor="#ddd"
      />
    ) : (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Spinner
            visible={loadingSearch}
            customIndicator={<ElementCustom />}
          />
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={COLOR.HEADER}
          />
          <ListProducts
            data={data}
            refreshing={refreshing}
            navigation={this.props.navigation}
            onRefreshing={this.onRefreshing}
            search={this.state.search}
            handleSearch={this.handleSearch}
            loadingSearch={this.state.loadingSearch}
            onChange={this.onChange}
            loadingSear={this.loadingSear}
            deleteSearch={this.deleteSearch}
          />
        </View>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.authUser.status,
    authUser: state.authUser.authUser,
    username: state.authUser.username,
    searchhome: state.notify.searchproduct,
    idshop:state.product.database,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginPhone: (data) => dispatch(LoginPhone(data)),
    UpdateDivice: (data) => dispatch(UpdateDivice(data)),
    GetProfile: (data) => dispatch(GetProfile(data)),
    countNotify: (text) => dispatch(countNotify(text)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

/**status = 0 ==> ???? ho??n th??nh
status = 1 ==> ???? ti???p nh???n
status = 2 ==> ??ang x??? l??
status = 3 ==> ??ang v???n chuy???n
status = 4 ==> ???? h???y  */
