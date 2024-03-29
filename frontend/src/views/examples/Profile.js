import { Button,  Card,  CardHeader,  CardBody,  FormGroup,  Form,  Input,  Container,  Row,  Col,} from "reactstrap";
import Header from "components/Headers/Header.js";
import "../../assets/css/profile.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import routes from '../../routes';
import Reminder from "./Reminder.js"


const Profile = () => {
  // for remainde rdate field
  // const [selectedDate, setSelectedDate] = useState("");
  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // // for option employee field
  // const [selectedOption, setSelectedOption] = useState("");
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <>
      <Header />
      {/* Page content
      <div className="sidebar">
      <ul className="nav flex-column">
        {routes.map((route, index) => {
          // <li><Reminder /></li>
          // <li><Pendingreminder /></li>

          if (route.subRoutes) {
            return (
              <li className="nav-item"  >
                <span className="nav-link">{<Reminder />}</span>
                <ul className="nav flex-column ml-3">
                  {route.subRoutes.map((subRoute, subIndex) => (
                    <li className="nav-item" key={subIndex}>
                      <Link className="nav-link" to={subRoute.layout + subRoute.path}>{subRoute.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <li className="nav-item" key={index}>
                <Link className="nav-link" to={route.layout + route.path}>
                  <i className={route.icon}></i> {route.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
      <Container className="mt--7" fluid>
        <Row className="row-profile-section">
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Remainder Manage</h3>
                  </Col>
                  <Col className="text-right" xs="4">

                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>

                  <div className="pl-lg-4">
                    <Row className="form-control-main-section">
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username" > Reminder Date </label>
                          <Input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} className="form-control-alternative" />
                          {selectedDate && (<p>selectedDate: {selectedDate}</p>)}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email" > Care Team </label>
                          <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                            <option value={""}>Select Employee</option>
                            <option value={"option1"}>pallavi@vedobi.com</option>
                            <option value={"option2"}>dr.vishakha@vedobi.com</option>
                            <option value={"option3"}>kiruthika@vedobi.com</option>
                            <option value={"option4"}>mansi.rajput@vedobi.com</option>
                            <option value={"option5"}>nikita.mukeria@vedobi.com</option>
                          </select>
                          <p>Selected option:{selectedOption}</p>
                        </FormGroup>
                      </Col>
                      <Col> <Button className="form-control-outer-button">Submit </Button></Col>
                    </Row>
                  </div>
                </Form>
                <hr />
                <Row className="profile-section-table-heading">
                  <Col><Input type="checkbox"></Input></Col>
                  <Col>S.no</Col>
                  <Col>Action</Col>
                  <Col>Reminder Date.	</Col>
                  <Col>Order No.</Col>
                  <Col>Customer Name</Col>
                  <Col>Email</Col>
                  <Col>Phone</Col>
                  <Col>Customer Message</Col>
                  <Col>Added By</Col>
                  <Col>Reply Message</Col>
                  <Col>Ticket/Feedback Status</Col>
                  <Col>status</Col>
                  <Col>Reply By</Col>
                  <Col>Reminder Remark</Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Profile;
