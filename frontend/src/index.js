import React from "react";
import ReactDOM from "react-dom/client";  
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      {/* <Route path="*" element={<Navigate to="/admin/order-manage" replace />} /> */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  </BrowserRouter>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";
// import PrivateRoute from "./PrivateRoute";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/auth/*" element={<AuthLayout />} />
//       <PrivateRoute path="/admin/*" element={<AdminLayout />} />
//       <Route path="*" element={<Navigate to="/auth" replace />} />
//     </Routes>
//   </BrowserRouter>
// );

// index.js
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";
// import PrivateRoute from "./PrivateRoute.js";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/auth/*" element={<AuthLayout />} />
//       <Route
//         path="/admin/*"
//         element={
//           <React.Fragment>
//             <PrivateRoute path="*" element={<AdminLayout />} />
//           </React.Fragment>
//         }
//       />
//       <Route path="*" element={<Navigate to="/auth" replace />} />
//     </Routes>
//   </BrowserRouter>
// );
