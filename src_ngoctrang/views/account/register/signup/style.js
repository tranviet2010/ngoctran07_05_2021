import { COLOR } from "../../../../utils/color/colors";
import {
  sizeHeight,
  sizeWidth,
  sizeFont,
} from "../../../../utils/helper/size.helper";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: "#4a8939",
  },
  logo: { marginTop: sizeHeight(-5) },

  touchSignUp: {
    backgroundColor: '#fff',
    paddingVertical: sizeHeight(2),
    borderRadius: 50,
    width: sizeWidth(73),
  },
  textSignUp: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLOR.MAIN,
    fontSize: sizeFont(4),
  },
  viewFooter: {
    alignSelf: "center",
    marginTop: sizeHeight(6),
  },
  logoSignup:{
    marginTop:sizeHeight(5),
    justifyContent: "center",
    alignItems: "center",
  },  
  iconSignup:{
    justifyContent: "center",
    alignItems: "center",
    width:sizeWidth(30),
    height:sizeHeight(15),
    borderRadius:100,
    backgroundColor:'white',
  },
  viewSignup:{
    
  },  
  textFoot: { textAlign: "center", fontSize: sizeFont(4),color:'#fff' },
});

export default styles;
