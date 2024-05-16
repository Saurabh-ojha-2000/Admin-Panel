// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   // Check if token exists in cookies
//   const tokenExists = document.cookie.includes("token=");

//   return (
//     <Route
//       {...rest}
//       element={tokenExists ? <Component /> : <Navigate to="/auth" replace />}
//     />
//   );
// };

// export default PrivateRoute;

// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   // Check if token exists in cookies
//   const tokenExists = document.cookie.includes("token=");

//   return (
//     <Route
//       {...rest}
//       element={tokenExists ? <Element /> : <Navigate to="/auth" replace />}
//     />
//   );
// };

// export default PrivateRoute;

// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check if token exists in cookies
  const tokenExists = document.cookie.includes("token=");

  return tokenExists ? <Route {...rest} element={<Element />} /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
