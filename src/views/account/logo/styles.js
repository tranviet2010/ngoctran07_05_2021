import { sizeHeight, sizeWidth } from "../../../utils/helper/size.helper";
import { ifIphoneX } from "react-native-iphone-x-helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    marginLeft:sizeWidth(30),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizeHeight(5),
    marginTop: sizeHeight(6),
    width: sizeWidth(40),
    height: sizeHeight(20),
    backgroundColor:'white',
    borderRadius:100,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 20,
  },
  image: {
    width: sizeWidth(30),
    height: sizeHeight(15),
    ...ifIphoneX({
      width: sizeWidth(52),
      height: sizeHeight(15),
    }),
  },
});

export default styles;
