import {
  REMOVE_ALL_TO_CART,
  ADD_TO_CART,
  REMOVE_TO_CART,
} from "../action/types";

const INIT_STATE = {
  listItem: [],
};
function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].CODE_PRODUCT === nameKey.CODE_PRODUCT) {
      return false;
    }
  }
  return true;
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REMOVE_ALL_TO_CART: {
      return {
        ...state,
        listItem: [],
      };
    }
    case ADD_TO_CART: {
      console.log(search(action.payload, state.listItem));
      if (search(action.payload, state.listItem) == false) {
        return {
          ...state,
          listItem: state.listItem,
        };
      } else
        return {
          ...state,
          listItem: [...state.listItem, action.payload],
        };
    }
    case REMOVE_TO_CART: {
      return {
        ...state,
        listItem: state.listItem.filter(
          (element, index) => element.CODE_PRODUCT != action.payload.CODE_PRODUCT
        ),
      };
    }
    default:
      return { ...state };
  }
};
