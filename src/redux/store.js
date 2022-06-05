// import { configureStore } from "@reduxjs/toolkit";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import userReducer from "./reducer/userReducer";
const thunkMiddleware = require("redux-thunk").default;

const mainReducer = combineReducers({
  user: userReducer,
});
const store = createStore(mainReducer, applyMiddleware(thunkMiddleware));
export default store;
