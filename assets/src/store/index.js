import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "../reducer";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-community/async-storage";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  // whiteList: ['authUser'],
  timeout: null
}
const persistedReducer = persistReducer(persistConfig, reducers)
  export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(Thunk))
  );
  export const persistor = persistStore(store)
  


// export const store = createStore(reducers, {}, compose(applyMiddleware(Thunk)));
