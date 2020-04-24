import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = applyMiddleware(thunkMiddleware);

export default createStore(rootReducer, composeWithDevTools(middlewares));
