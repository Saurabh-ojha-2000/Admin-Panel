import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import "../../assets/css/dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  useEffect(() => {
    fetchuserdata();
    pendingremindercalls();
    todayscalls();
    todayspendingreminder();
    dashbaordtotalsales();
    todayappointment();
    pendingappointment();
  }, [])


  const [userData, setUserData] = useState([]);
  const fetchuserdata = async () => {
    try { 
      const result = await axios('http://localhost:5000/admin-users');
      setUserData(result.data);
    } catch (error) {
      console.log("error occured in fetching data for admin users" + error.stack);
    }
  }

  const [callingdata, setCallingdata] = useState([]);
  const pendingremindercalls = async () => {
    try {
      const callingresult = await axios('http://localhost:5000/pending-reminder-calls');
      setCallingdata(callingresult.data);
    } catch (error) {
      console.warn("error occured in fetching data from database")
    }
  }

  const [todaycall, setTodaycall] = useState([]);
  const todayscalls = async () => {
    try {
      const todaycallresult = await axios('http://localhost:5000/today-call');
      setTodaycall(todaycallresult.data[0]);
    } catch (error) {
      console.log("error occured in fetching data from todayscall api from database" + error.stack);
    }
  }

  const [todayspendingremindervalue, setTodayspendingremindervalue] = useState([]);
  const todayspendingreminder = async () => {
    try {
      const todayspendingreminderresult = await axios('http://localhost:5000/todays-pending-reminder');
      setTodayspendingremindervalue(todayspendingreminderresult.data[0]); // Accessing the first element of the array
    } catch (error) {
      console.log("error occurs in fetching todays-pending-reminder api" + error.stack);
    }

  }

  const [salesvalue, setSalesvalue] = useState([]);
  const dashbaordtotalsales = async () => {
    try {
      const salesresult = await axios('http://localhost:5000/dashbaord-total-sales');
      setSalesvalue(salesresult.data[0]);
    } catch (error) {
      console.log("error in fetching api of dashboardsales" + error.stack);
    }
  }

  const [totalappoitnment, setTotalappointment] = useState([]);
  const todayappointment = async () => {
    try {
      const todayappointmentresult = await axios('http://localhost:5000/todays-appointment');
      setTotalappointment(todayappointmentresult.data[0]);
    } catch (error) {
      console.log("error occured in fetching api of todays-appointment from database");
    }
  }

  const [bookIdCount, setBookIdCount] = useState(null);
  const pendingappointment=async()=>{
    try {
      const pendingappointmentresult = await axios('http://localhost:5000/pending-appointment');
      setBookIdCount(pendingappointmentresult.data[0]);
    } catch (error) {
      console.log("error occured in fetching api of pending-appointment from database"+error.stack)      
    }
  }
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {userData.map((user, i) => {
                return (
                  <Col lg="6" xl="3" className="mb-4" key={i}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0" >{user.name}</CardTitle>
                            <span className="h2 font-weight-bold mb-0"> {callingdata[i]?.idsdata1 || 0} </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                              <i className="fa fa-phone" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">Reminder Call Pending.</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>)
              })}

              <Col lg="6" xl="9" className="card-stats-main">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <Col className="card-stats-col-last" >
                        {/* <Row><p className="card-stats-row-heading"><i className="fa fa-user"></i> Todays call </p></Row> */}
                        <Row><p className="card-stats-row-heading"><img src={require("../../assets/img/brand/icons8-call.gif")} alt="call"></img> Todays call </p></Row>
                        <Row className="card-stats-row-number">{todaycall?.totalcall || '0'}</Row>
                        <Row><p>Last call D/T</p></Row>
                        <Row><p className="card-stats-date">{todaycall?.lastcall || "0"}</p></Row>
                      </Col>

                      <Col className="card-stats-col-last">
                        <Row> <p className="card-stats-row-heading"><i className="fa fa-user"></i> Sales </p></Row>
                        <Row className="card-stats-row-number">{salesvalue?.totalsale || '0'}</Row>
                        <Row><p>Last order DT</p></Row>
                        <Row><p className="card-stats-date">{salesvalue?.lastcall || '0'}</p></Row>
                      </Col>

                      <Col className="card-stats-col-last">
                        <Row> <p className="card-stats-row-heading"><i className="fa fa-user"></i> Pending Reminder </p></Row>
                        <Row className="card-stats-row-number">
                          <span className="card-stats-pending">{todayspendingremindervalue?.total_pending_reminder_calls || '0'}</span></Row>
                        <Row><p>Todays</p></Row>
                      </Col>

                      <Col className="card-stats-col-last">
                        <Row><p className="card-stats-row-heading"><i className="fa fa-user"></i> Appointment</p></Row>
                        <Row className="card-stats-row-number">{totalappoitnment?.bookid || '0'}     </Row>
                        <Row><p>Todays</p> </Row>
                      </Col>

                      <Col >
                        <Row> <p className="card-stats-row-heading"><i className="fa fa-user"></i> Pending Appointment</p></Row>
                        <Row className="card-stats-row-number"><span className="card-stats-pending">{bookIdCount?.bookId || "0"}</span></Row>
                        <Row><p>Total</p></Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
export default Header;