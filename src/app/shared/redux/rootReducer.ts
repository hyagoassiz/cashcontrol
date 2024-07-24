import { combineReducers } from "redux";
import snackBarReducer from "./snackBar/reducer";

const rootReducer = combineReducers({ snackBarReducer });

export default rootReducer;
