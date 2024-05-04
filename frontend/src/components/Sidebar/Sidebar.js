import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media, Row, Col, Form, InputGroup, Input, InputGroupAddon,
InputGroupText ,NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Collapse } from "reactstrap";
var ps;

const Sidebar = (props) => {
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

// Inside the createLinks function
const createLinks = (routes) => {
  return routes.map((prop, key) => {
    if (prop.subRoutes) {
      return (
        <NavItem key={key}>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <i className={prop.icon} />
              {prop.name}
            </DropdownToggle>
            <DropdownMenu right style={{ left: '65%', transform: 'translateX(-50%)',    minWidth: "14rem" }}>
              {prop.subRoutes.map((subroute, subIndex) => (
                <DropdownItem key={subIndex} tag={Link} to={prop.layout + subroute.path}>
                  <i className={subroute.icon} /> {subroute.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
      );
    } else {
      return (
        <NavItem key={key}>
          <NavLink to={prop.layout + prop.path} tag={NavLinkRRD}>
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    }
  });
};

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main" >
      <Container fluid>
        {/* Brand */}
        {logo ? (<NavbarBrand className="pt-0">
          <img alt={logo.imgAlt} className="main-logo-sidebar" id ="main-logo-sidebar" src={require("../../assets/img/brand/photo-1560930253678-crm-development-company.png")} />
        </NavbarBrand>) : null}
        <div className="sidebar-dashboard">ADMIN DASHBOARD</div>


        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar >
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (<Col className="collapse-brand" xs="6">
                {logo.innerLink ? (
                  <Link to={logo.innerLink}>
                    <img alt={logo.imgAlt} src={logo.imgSrc} />
                  </Link>
                ) : (
                  <a href={logo.outterLink}>
                    <img alt={logo.imgAlt} src={logo.imgSrc} />
                  </a>
                )}
              </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>

          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>

        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;





// import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import {
//   UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media, Row, Col, Form, InputGroup, Input, InputGroupAddon,
//   InputGroupText, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Collapse
// } from "reactstrap";
// var ps;

// const Sidebar = (props) => {
//   // verifies if routeName is the one active (in browser input)
//   const activeRoute = (routeName) => {
//     return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   };

//   // Inside the createLinks function
//   // const createLinks = (routes) => {
//   //   return routes.map((prop, key) => {
//   //     if (prop.subRoutes) {
//   //       return (
//   //         // <NavItem key={key}>
//   //         //   <NavLink
//   //         //     to={prop.layout + prop.path}
//   //         //     tag={NavLinkRRD}
//   //         //   >
//   //         //     <i className={prop.icon} />
//   //         //     {prop.name}
//   //         //   </NavLink>
//   //         //   <ul className="nav flex-column ml-3" style={{ float: "right", padding: "2px", margin: "2px" }}>
//   //         //     {prop.subRoutes.map((subroute, subIndex) => (
//   //         //       <li className="nav-item" style={{ paddingBottom: "20px" }} key={subIndex}>
//   //         //         <Link to={prop.layout + subroute.path} >
//   //         //           <i className={subroute.icon} /> {subroute.name}
//   //         //         </Link>
//   //         //       </li>
//   //         //     ))}
//   //         //   </ul>
//   //         // </NavItem>
//   //         <NavItem key={key}>
//   //           <UncontrolledDropdown nav inNavbar>
//   //             <DropdownToggle nav caret>
//   //               <i className={prop.icon} />
//   //               {prop.name}
//   //             </DropdownToggle>
//   //             <DropdownMenu right className="text-center"> {/* Add text-center for center alignment or text-right for right alignment */}
//   //               {prop.subRoutes.map((subroute, subIndex) => (
//   //                 <DropdownItem key={subIndex} tag={Link} to={prop.layout + subroute.path}>
//   //                   <i className={subroute.icon} /> {subroute.name}
//   //                 </DropdownItem>
//   //               ))}
//   //             </DropdownMenu>
//   //           </UncontrolledDropdown>
//   //         </NavItem>

//   //       );
//   //     } else {
//   //       return (
//   //         <NavItem key={key}>
//   //           <NavLink to={prop.layout + prop.path} tag={NavLinkRRD} >
//   //             <i className={prop.icon} /> {prop.name}
//   //           </NavLink>
//   //         </NavItem>
//   //       );
//   //     }
//   //   });
//   // };


//   // Inside the createLinks function
//   const createLinks = (routes) => {
//     return routes.map((prop, key) => {
//       if (prop.subRoutes) {
//         return (
//           <UncontrolledDropdown nav inNavbar key={key}>
//             <DropdownToggle nav caret>
//               <i className={prop.icon} />
//               {prop.name}
//             </DropdownToggle>
//             <DropdownMenu right style={{ left: '65%', transform: 'translateX(-50%)', minWidth: "14rem" }}>
//               {prop.subRoutes.map((subroute, subIndex) => (
//                 <DropdownItem key={subIndex} tag={Link} to={prop.layout + subroute.path}>
//                   <i className={subroute.icon} /> {subroute.name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         );
//       } else {
//         return (
//           <NavItem key={key}>
//             <NavLink to={prop.layout + prop.path} tag={NavLinkRRD}>
//               <i className={prop.icon} />
//               {prop.name}
//             </NavLink>
//           </NavItem>
//         );
//       }
//     });
//   };

//   const { bgColor, routes, logo } = props;
//   let navbarBrandProps;
//   if (logo && logo.innerLink) {
//     navbarBrandProps = {
//       to: logo.innerLink,
//       tag: Link,
//     };
//   } else if (logo && logo.outterLink) {
//     navbarBrandProps = {
//       href: logo.outterLink,
//       target: "_blank",
//     };
//   }

//   return (
//     <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main" >
//       <UncontrolledDropdown main-nav >
//         <DropdownToggle main-nav className="nav-link-icon">
//           <i className="ni ni-bell-55" />
//         </DropdownToggle>
//         <DropdownMenu aria-labelledby="navbar-default_dropdown_1" className="dropdown-menu-arrow" right>
//           <DropdownItem >
//             <Container fluid>
//               {/* Brand */}
//               {logo ? (<NavbarBrand className="pt-0">
//                 <img alt={logo.imgAlt} className="navbar-brand-img" src={require("../../assets/img/brand/logo.png")} />
//               </NavbarBrand>) : null}
//               <div className="sidebar-dashboard">DASHBOARD</div>

//               {/* Collapse */}
//               <Collapse navbar >
//                 {/* Collapse header */}
//                 <div className="navbar-collapse-header d-md-none">
//                   <Row>
//                     {logo ? (<Col className="collapse-brand" xs="6">
//                       {logo.innerLink ? (
//                         <Link to={logo.innerLink}>
//                           <img alt={logo.imgAlt} src={logo.imgSrc} />
//                         </Link>
//                       ) : (
//                         <a href={logo.outterLink}>
//                           <img alt={logo.imgAlt} src={logo.imgSrc} />
//                         </a>
//                       )}
//                     </Col>
//                     ) : null}
//                     <Col className="collapse-close" xs="6">
//                       <button
//                         className="navbar-toggler"
//                         type="button"
//                       >
//                         <span />
//                         <span />
//                       </button>
//                     </Col>
//                   </Row>
//                 </div>
//                 {/* Form */}
//                 <Form className="mt-4 mb-3 d-md-none">
//                   <InputGroup className="input-group-rounded input-group-merge">
//                     <Input
//                       aria-label="Search"
//                       className="form-control-rounded form-control-prepended"
//                       placeholder="Search"
//                       type="search"
//                     />
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <span className="fa fa-search" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                   </InputGroup>
//                 </Form>

//                 {/* Navigation */}
//                 <Nav navbar>{createLinks(routes)}</Nav>

//               </Collapse>
//             </Container>
//           </DropdownItem>
//         </DropdownMenu>
//       </UncontrolledDropdown>
//     </Navbar>

//   );
// };

// Sidebar.defaultProps = {
//   routes: [{}],
// };

// Sidebar.propTypes = {
//   // links that will be displayed inside the component
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({
//     // innerLink is for links that will direct the user within the app
//     // it will be rendered as <Link to="...">...</Link> tag
//     innerLink: PropTypes.string,
//     // outterLink is for links that will direct the user outside the app
//     // it will be rendered as simple <a href="...">...</a> tag
//     outterLink: PropTypes.string,
//     // the image src of the logo
//     imgSrc: PropTypes.string.isRequired,
//     // the alt for the img
//     imgAlt: PropTypes.string.isRequired,
//   }),
// };

// export default Sidebar;
