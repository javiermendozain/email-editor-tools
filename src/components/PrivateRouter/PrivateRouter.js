import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useToasts } from "react-toast-notifications";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
const PrivateRouter = ({ ...rest }) => {
  const { auth, profile } = useSelector((state) => state.firebase);
  const { addToast } = useToasts();

  // check if user is logged
  const isLogged = isLoaded(auth) && !isEmpty(auth) && profile.TANDC;

  // Get location request of props
  const { location, onlyAdmin } = rest;

  // Waitting for get auth
  if (!isLoaded(auth))
    return (
      <div className="text-center pt-5">
        <small className="spinner-border spinner-border-sm "></small>
      </div>
    );

  // Waitting for get Profile
  if (!isLoaded(profile))
    return (
      <div className="text-center pt-5">
        <small className="spinner-border spinner-border-sm "></small>
      </div>
    );

  // if component is only for admin and user don't have admin property as true, redirect to home
  if (onlyAdmin && !profile.admin) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  }

  // Check email on profile
  if (isLogged && !profile.email) {
    addToast("Ingresa tu email", {
      appearance: "error",
      autoDismiss: true,
    });

    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  // If the user is logged shown the component requested
  if (isLogged) return <Route {...rest} />;

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRouter;
