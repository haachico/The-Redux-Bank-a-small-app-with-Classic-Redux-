import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extensions";
import thunk from "redux-thunk";
import accountReducer from "./accounts/accountSlice";
import customerReducer from "./customers/customerSlice";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
