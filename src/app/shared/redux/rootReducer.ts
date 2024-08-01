import { combineReducers } from "redux";
import snackBarReducer from "./snackBar/reducer";
import userReducer from "./user/reducer";
import loadingReducer from "./loading/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  snackBar: snackBarReducer,
  loading: loadingReducer,
});

export default rootReducer;
