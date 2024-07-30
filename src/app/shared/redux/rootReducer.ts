import { combineReducers } from "redux";
import snackBarReducer from "./snackBar/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  snackBar: snackBarReducer,
});

export default rootReducer;
