import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
// core components
import routes from "routes.js";
import Index from "views/Index.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Reminder from "../views/examples/Reminder.js";
import Pendingreminder from "../views/examples/Pendingreminder.js";
import Appointment from "views/examples/Appointment.js";
import Pendingappointment from "views/examples/Pendingappointment.js";
import Leadstfn from "views/examples/Leadstfn.js";
import Leadsweb from "views/examples/Leadsweb.js";
import ReminderExpired from "views/examples/ReminderExpired.js"
import ReminderCall from "views/examples/ReminderCall.js";
import FollowUp from "views/examples/FollowUp.js";
import PostPurchaseCall from "views/examples/PostPurchaseCall.js";
import CodVerify from "views/examples/CodVerify.js";
import OrderInTransit from "views/examples/OrderInTransit.js"
import NDR from "views/examples/NDR.js";
import RTO from "views/examples/RTO.js";
import Reordermanage from "views/examples/Reordermanage";
import FollowupServiceCall from "views/examples/FollowupServiceCall";


const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar {...props} routes={routes} logo={{ innerLink: "/admin/index", imgSrc: require("../assets/img/brand/argon-react.png"), imgAlt: "...", }} />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} brandText={getBrandText(props?.location?.pathname)} />
        {/* <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes> */}
        <Routes>

          {getRoutes(routes)}
          <Route path="/order-manage" element={<Index />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/Pendingreminder" element={<Pendingreminder />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/pending-appointment" element={<Pendingappointment />} />
          <Route path="/leads-tfn" element={<Leadstfn />} />
          <Route path="/leads-web-whatsapp/FB" element={<Leadsweb />} />
          <Route path="/reminder-Expired" element={<ReminderExpired />} />
          <Route path="/reminder-call" element={<ReminderCall />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/post-purchase-call" element={<PostPurchaseCall />} />
          <Route path="/cod-verify" element={<CodVerify />} />
          <Route path="/order-in-transit" element={<OrderInTransit />} />
          <Route path="/ndr" element={<NDR />} />
          <Route path="/rto" element={<RTO />} />
          <Route path="/re-orders-manage" element={<Reordermanage />} />
          <Route path="/follow-up-service-cal" element={<FollowupServiceCall />} />

        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;

// import React, { useState } from "react";
// import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// import { Nav, Collapse } from "reactstrap";
// import routes from "routes.js";

// const Sidebar = (props) => {
//   const [expandedRoutes, setExpandedRoutes] = useState([]);

//   const toggleRoute = (route) => {
//     if (expandedRoutes.includes(route)) {
//       setExpandedRoutes(expandedRoutes.filter((r) => r !== route));
//     } else {
//       setExpandedRoutes([...expandedRoutes, route]);
//     }
//   };

//   const renderSubRoutes = (subRoutes) => {
//     return subRoutes.map((prop, key) => {
//       return (
//         <li key={key}>
//           <NavLinkRRD to={prop.layout + prop.path} activeClassName="active">
//             <i className={prop.icon} />
//             <p>{prop.name}</p>
//           </NavLinkRRD>
//         </li>
//       );
//     });
//   };

//   const renderRoutes = (routes) => {
//     return routes.map((prop, key) => {
//       if (prop.subRoutes) {
//         return (
//           <li key={key}>
//             <Link
//               to="#"
//               onClick={() => toggleRoute(prop.path)}
//               data-toggle="collapse"
//             >
//               <i className={prop.icon} />
//               <p>
//                 {prop.name}
//                 <b className="caret" />
//               </p>
//             </Link>
//             <Collapse isOpen={expandedRoutes.includes(prop.path)}>
//               <Nav>{renderSubRoutes(prop.subRoutes)}</Nav>
//             </Collapse>
//           </li>
//         );
//       } else {
//         return (
//           <li key={key}>
//             <NavLinkRRD to={prop.layout + prop.path} activeClassName="active">
//               <i className={prop.icon} />
//               <p>{prop.name}</p>
//             </NavLinkRRD>
//           </li>
//         );
//       }
//     });
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-wrapper">
//         <div className="logo">
//           <Link
//             to={props.logo.innerLink}
//             className="simple-text logo-mini"
//           >
//             <div className="logo-img">
//               <img
//                 src={props.logo.imgSrc}
//                 alt={props.logo.imgAlt}
//               />
//             </div>
//           </Link>
//         </div>
//         <Nav>{renderRoutes(routes)}</Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
