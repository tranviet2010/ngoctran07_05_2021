import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../../../style/newitem/style";
import {
  sizeWidth,
  sizeFont,
  sizeHeight,
} from "../../../utils/helper/size.helper";
import IconComponets from "../../../components/icon";
import { Switch } from "react-native-paper";
import { COLOR } from "../../../utils/color/colors";
import { GetLevelCTV } from "../../../service/account";
import Spinner from "react-native-loading-spinner-overlay";
import { ElementCustom } from "../../../components/error";
import ImagePicker from "react-native-image-crop-picker";
export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      loadingSlow: true,
      levelCTV: [],
    };
  }
  handleLevelCTV = () => {
    GetLevelCTV({
      IDSHOP: "BABU12",
    })
      .then((result) => {
        if (result.data.ERROR === "0000") {
          this.setState({ levelCTV: result.data.INFO }, () =>
            this.setState({ loadingSlow: false })
          );
        } else {
          this.setState({ loadingSlow: false });
        }
        console.log("discount", result.data);
      })
      .catch((error) => {
        this.setState({ loadingSlow: false });
        console.log(error);
      });
  };
  componentDidMount() {
    this.handleLevelCTV();
  }

  render() {
    const { data } = this.props.route.params;
    const { status, loadingSlow, levelCTV } = this.state;
    console.log("data 10", levelCTV, data);
    return loadingSlow ? (
      <Spinner
        visible={loadingSlow}
        customIndicator={<ElementCustom />}
        // overlayColor="#ddd"
      />
    ) : (
      <ScrollView>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>
            Tên sản phẩm <Text style={styles.textRed}>*</Text>
          </Text>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>
            Mã sản phẩm <Text style={styles.textRed}>*</Text>
          </Text>

          <TextInput style={styles.textInput} />
        </View>
        <View style={[styles.viewFlex, { marginTop: 4 }]}>
          <Text style={styles.textTitle} />
          <Text style={styles.fontRed}>
            (không dấu và khoảng trắng bao gồm chữ cái và số *)
          </Text>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>
            Chọn danh mục <Text style={styles.textRed}>*</Text>
          </Text>
          <View style={styles.viewFlexDown}>
            <TextInput style={styles.textInputDown} />
            <IconComponets
              name="chevron-down"
              size={sizeFont(6)}
              color="#999"
            />
          </View>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>Xu thế</Text>
          <View style={styles.viewFlexDown}>
            <TextInput style={styles.textInputDown} />
            <IconComponets
              name="chevron-down"
              size={sizeFont(6)}
              color="#999"
            />
          </View>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>Hiển thị</Text>
          <Switch
            value={status}
            onValueChange={() => this.setState({ status: !status })}
            color={COLOR.BUTTON}
          />
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>
            Giá <Text style={styles.textRed}>*</Text>
          </Text>
          <View style={styles.viewFlexPrice}>
            <TextInput style={styles.textInputPrice} />
            <Text>VNĐ</Text>
          </View>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.textTitle}>
            Giá vốn <Text style={styles.textRed}>*</Text>
          </Text>
          <View style={styles.viewFlexPrice}>
            <TextInput style={styles.textInputPrice} />
            <Text>VNĐ</Text>
          </View>
        </View>
        <View
          style={{
            borderTopColor: COLOR.HEADER,
            borderTopWidth: 4,
            marginTop: sizeHeight(2),
          }}
        />
        <View style={styles.viewShop}>
          <Text style={styles.textTitle}>Chính sách giá Đại lý</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: sizeHeight(1),
            }}
          >
            <View style={[styles.viewChildShop, { flex: 1 }]}>
              <Text style={styles.textShop}>Cấp ĐL</Text>
            </View>
            <View style={[styles.viewChildShop, { flex: 0.6 }]}>
              <Text style={styles.textShop}>Chênh %</Text>
            </View>
            <View style={[styles.viewChildShop, { flex: 0.8 }]}>
              <Text style={styles.textShop}>Chênh tiền</Text>
            </View>
            <View style={[styles.viewChildShop, { flex: 0.8 }]}>
              <Text style={styles.textShop}>Giá ĐL</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.viewShop,
            { borderTopWidth: 0, marginTop: 0, paddingBottom: sizeHeight(2) },
          ]}
        >
          {levelCTV.map((element, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: sizeHeight(0.5),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginRight: sizeWidth(2),
                  }}
                >
                  <Text style={styles.textDetailShop}>
                    {element.NAME_LEVEL}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    flexDirection: "row",
                    marginRight: sizeWidth(2),
                  }}
                >
                  <TextInput style={styles.textInputChildPrice} />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    flexDirection: "row",
                    marginRight: sizeWidth(2),
                  }}
                >
                  <TextInput style={styles.textInputChildPrice} />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    flexDirection: "row",
                    marginRight: sizeWidth(2),
                  }}
                >
                  <TextInput style={[styles.textInputChildPrice]} />
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            borderTopColor: COLOR.HEADER,
            borderTopWidth: 4,
          }}
        />
        <View>
          <Text>Thuộc tính</Text>
          <View>
            <Text>Màu</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  multiple: true,
                }).then((images) => {
                  console.log(images);
                });
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../assets/images/camera.png")}
                style={{ width: sizeWidth(20), height: sizeHeight(20) }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}