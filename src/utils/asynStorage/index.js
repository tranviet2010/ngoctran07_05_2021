import AsyncStorage from "@react-native-community/async-storage";

export const _storeData = (field, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(field, JSON.stringify(value))
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const _retrieveData = async (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(field)
      .then((data) => {
        console.log("get data",data)
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const _removeData = (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(field)
      .then(() => {
      })
      .catch((error) => {
      });
  });
};
