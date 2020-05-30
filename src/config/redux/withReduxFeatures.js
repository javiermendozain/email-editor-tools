// Dependencies
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// Providers
import withProvider from "./withProvider";

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middleware = [promise];

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({ store });
