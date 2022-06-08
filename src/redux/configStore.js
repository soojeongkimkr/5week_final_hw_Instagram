import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import home from "./module/home"
import user from "./module/user"

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({
  home,
  user,
});

const store = createStore(rootReducer, enhancer);

export default store;
