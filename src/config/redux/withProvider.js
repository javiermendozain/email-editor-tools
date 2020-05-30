// Dependencies
import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import 'firebase/firestore';

// Firebase configuration
import firebaseConfig from "../firebase/configureFirebase";

// Path firebase
import { DB_PATHS } from "../../helpers";

const tagManagerArgs = {
  gtmId: process?.env?.REACT_APP_GTMID?.toString(),
};

// Initialize Tag Manager google
TagManager.initialize(tagManagerArgs);

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
// firebase.firestore(); // <- needed if using firestore

// react-redux-firebase config
const rrfConfig = {
  // userProfile: DB_PATHS.root.users.ref(),
  // useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Props for ReactReduxFirebase
const rrfProps = {
  firebase,
  config: rrfConfig,
  // createFirestoreInstance, // <- needed if using firestore
};

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({ store }) => (WrappedComponent) => (props) => {
  rrfProps.dispatch = store.dispatch;

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ToastProvider>
            <WrappedComponent {...props} />
          </ToastProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default withProvider;
