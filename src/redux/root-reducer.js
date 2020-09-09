import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["hidden"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: persistReducer(cartPersistConfig,cartReducer),
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
