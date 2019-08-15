import { combineReducers } from "redux";
import { coursesReducer } from "./coursesReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { authReducer } from "./authReducer";
import { sharedReducer } from "./sharedReducer";

export const rootReducer = combineReducers({
  courses: coursesReducer,
  auth: authReducer,
  shared: sharedReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
