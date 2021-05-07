import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { GetInformation } from "../../../../../service/account";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../../../components/error";
import { Image } from "react-native-elements";
import { sizeWidth, sizeHeight } from "../../../../../utils/helper/size.helper";
import moment from "moment";
import _ from "lodash";
import { COLOR } from "../../../../../utils/color/colors";
// 1: gioi thieu; 2: chinh sach ;3 :dao tao; 4: tin tuc
//(danh mục chỉ trên TYPES =daotao thì có, ko thì trống)

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    const { authUser } = this.props;
    GetInformation({
      USERNAME: authUser.USERNAME,
      TYPES: 4,
      CATEGORY: "",
      IDSHOP: 'http://banbuonthuoc.moma.vn',
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState(
            {
              data: result.data.INFO,
              
            },
            () => this.setState({ loading: false })
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { loading, data } = this.state;
    console.log("this us",data);
    return loading === true ? (
      <Spinner
        visible={loading}
        animation="fade"
        customIndicator={<ElementCustom />}
      />
    ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.ID}
            ListEmptyComponent={() => (
              <View>
                <Text>Không có dữ liệu</Text>
              </View>
            )}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={styles.container}
                  onPress={()=>{
                    this.props.navigation.navigate("detailNew", {
                      item: item.ID,
                    })
                  }}
                >
                  <Image
                    
                    PlaceholderContent={<ActivityIndicator />}
                    source={item.IMAGE_COVER == null
                      ? require("../../../../../assets/images/camera.png")
                      : { uri: item.IMAGE_COVER }}
                    resizeMode="center"
                    style={{
                      width: sizeWidth(25),
                      height: sizeHeight(10),
                      flex: 1,
                      marginRight: sizeWidth(2),
                    }}
                  />
                  <View style={{ flex: 2 }}>
                    <View style={styles.viewTime}>
                      <Text style={styles.textTitle}>
                        {_.truncate(item.TITLE, {
                          length: 23,
                        })}{" "}
                      </Text>
                      <Text style={styles.textTime}>
                        {moment(item.CREATE_DATE, "DD/MM/YYYY").format(
                          "DD/MM/YYYY"
                        )}{" "}
                      </Text>
                    </View>
                    <Text>{_.truncate(item.DESCRIPTION, {
                          length: 30,
                        })}{" "}</Text>
                    <Text style={styles.textSee}>xem chi tiết</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
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
    idshop: state.product.database,
  };
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: sizeWidth(2),
    paddingVertical: sizeHeight(2),
  },
  viewTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSee: {
    paddingTop:sizeHeight(2),
    color: COLOR.BLUE,
  },
  textTitle: {
    fontWeight: "bold",
  },
  textTime: {
    color: "#999",
    fontSize:11
  },
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
