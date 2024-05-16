import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Reminder from "views/examples/Reminder.js";
import Pendingreminder from "views/examples/Pendingreminder.js";
import History from "views/examples/History.js";
import Appointment from "views/examples/Appointment.js";
import Pendingappointment from "views/examples/Pendingappointment";
import Leadstfn from "views/examples/Leadstfn";
import Leadsweb from "views/examples/Leadsweb";
import ReminderExpired from "views/examples/ReminderExpired";
import ReminderCall from "views/examples/ReminderCall";
import FollowUp from "views/examples/FollowUp";
import PostPurchaseCall from "views/examples/PostPurchaseCall";
import CodVerify from "views/examples/CodVerify";
import OrderInTransit from "views/examples/OrderInTransit";
import NDR from "views/examples/NDR";
import RTO from "views/examples/RTO";
import Reordermanage from "views/examples/Reordermanage";
import FollowupServiceCall from "views/examples/FollowupServiceCall";

var routes = [
  {
    path: "",
    name: "Order Manage",
    icon: "ni ni-tv-2 text-primary",
    component: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/order-manage",
        name: "All Orders Manage",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Index />,
        layout: "/admin",
      },
      {
        path: "/re-orders-manage",
        name: "Re Orders Manage",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Reordermanage />,
        layout: "/admin",
      },
      {
        path: "/follow-up-service-call",
        name: "Follow up/Service-call",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <FollowupServiceCall />,
        layout: "/admin",
      }
    ]
  },
  {
    path: "/call",
    name: "CALL",
    icon: "fa fa-phone-square menu-icon text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/track-order",
    name: "Track Order",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "",
    name: "Reminder Managee",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    subRoutes: [
      {
        path: "/reminder",
        name: "Reminder",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Reminder />,
        layout: "/admin",
      },
      {
        path: "/Pendingreminder",
        name: "Pending Reminder",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Pendingreminder />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/tables",
    name: "Customer Feedback",
    icon: "fa fa-eye menu-icon",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "Interaction History Manage",
    icon: "fa fa-history menu-icon text-red",
    component: <History />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "",
    name: "Appointment",
    icon: "fa fa-calendar menu-icon",
    component: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/appointment",
        name: "Appointment",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Appointment />,
        layout: "/admin",
      },
      {
        path: "/pending-appointment",
        name: "Pending Appointment",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Pendingappointment />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "",
    name: "Leads Source",
    icon: "fa fa-line-chart menu-icon",
    component: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/leads-tfn",
        name: "Leads TFN",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Leadstfn />,
        layout: "/admin",
      },
      {
        path: "/leads-web-whatsapp/FB",
        name: "Leads web whatsapp/FB",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <Leadsweb />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "",
    name: "Task Manage",
    icon: "fa-solid fa-list-check",
    component: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/reminder-Expired",
        name: "Reminder Expired",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <ReminderExpired />,
        layout: "/admin",
      },
      {
        path: "/reminder-call",
        name: "Reminder Call",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <ReminderCall />,
        layout: "/admin",
      },
      {
        path: "/follow-up",
        name: "Folow Up",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <FollowUp />,
        layout: "/admin",
      },
      {
        path: "/post-purchase-call",
        name: "Post Purchase Call",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <PostPurchaseCall />,
        layout: "/admin",
      },
      {
        path: "/cod-verify",
        name: "Cod-Verify",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <CodVerify />,
        layout: "/admin",
      },
      {
        path: "/order-in-transit",
        name: "Order In Transit",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <OrderInTransit />,
        layout: "/admin",
      },
      {
        path: "/ndr",
        name: "NDR",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <NDR />,
        layout: "/admin",
      },
      {
        path: "/rto",
        name: "RTO",
        icon: "fa-solid fa-circle-chevron-right text-primary",
        component: <RTO />,
        layout: "/admin",
      },
    ],
  }
  // {
  //   path: "/login",
  //   name: "Logout",
  //   icon: "fa-solid fa-arrow-right-from-bracket",
  //   component: () => null,
  //   layout: "/auth",
  // }


];
export default routes;