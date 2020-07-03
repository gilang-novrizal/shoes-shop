import { combineReducers } from "redux";

// import reducer
import { userReducer } from "./userReducer";
import { sliderReducer } from "./sliderReducer";
import { historyReducer } from "./historyReducer";
import { productReducer } from "./productReducer";

// combine all reducer

const Reducers = combineReducers({
  user: userReducer,
  slider: sliderReducer,
  history: historyReducer,
  product: productReducer,
});

export default Reducers;
