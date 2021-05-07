import { Easing } from "react-native";
import { strToAlphaBet } from "../helper/common.helper";

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkStringMoney = (item) => {
  var resutl = "";
  var count = 0;
  for (let i = item.length - 1; i >= 0; i--) {
    if ((resutl.length - count) % 3 === 0 && resutl.length !== 0) {
      resutl = resutl + ",";
      count += 1;
    }
    resutl = resutl + item[i];
  }
  console.log("9999", resutl);

  return resutl
    .split("")
    .reverse()
    .join("");
};

export const configNavigation = {
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
  },
};

export const alphanumeric = (inputtxt) => {
  var letterNumber = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else return false;
};
export const checkModal = (inputtxt) => {
  var letterNumber = /^[0-9a-zA-Z\_\-]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else return false;
};

export const checkAccountBank = (inputtxt) => {
  var letterNumber = /^[0-9]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else return false;
};

export const checkMoney = (inputtxt) => {
  var letterNumber = /^[0-9\.]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else return false;
};
export const HasWhiteSpace = (s) => {
  return /\s/g.test(s);
};
export function isVietnamesePhoneNumber(number) {
  return /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

export const checkFullName = (inputtxt) => {
  var str = inputtxt.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  var letterNumber = /^[0-9a-zA-Z\s]+$/;
  console.log("strrrrrr",str);
  if (str.match(letterNumber)) {
    return true;
  } else return false;
};

export const checkAgent = (text) => {
  var strs = strToAlphaBet(text);
  return checkFullName(strs);
};

export const checkContent = (text) => {
  var strs = strToAlphaBet(text);
  var letterNumber = /^[0-9a-zA-Z\s\.\,]+$/;
  if (strs.match(letterNumber)) {
    return true;
  } else return false;
};
export const checkPercent = (text) => {
  var letterNumber = /^[0-9\.]+$/;
  if (text.match(letterNumber)) {
    return true;
  } else return false;
};

export const checkNumberPercent = (text) => {
  var sums = 1;
  var dot = 0;
  var index = text.split(".");
  for (let i = 0; i < text.length; i++) {
    if (text[i] == ".") {
      dot++;
    }
  }

  if (dot > 1 || index[0].length > 2) {
    return false;
  } else {
    return true;
  }
};

export const checkSpaceMoney = (text) => {
  return text.trim().split(" ");
};