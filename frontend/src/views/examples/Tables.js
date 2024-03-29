import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table, } from "reactstrap";
import Header from "components/Headers/Header.js";// core components
import axios from "axios";
import "../../assets/css/profile.css";


const Tables = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // for option employee field
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    fetchdata();
  }, [])

  const [userdata, setUserdata] = useState([]);
  const fetchdata = async () => {
    try {
      const result = await axios('http://localhost:5000/customer-feedback');
      setUserdata(result.data);
    } catch (error) {
      console.log("error occures in fetching customer-feedback data" + error.stack);
    }
  }

  const conertToAsiaTime = (utcTimestamp) =>{
    const date = new Date(utcTimestamp);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit',
    };
    return date.toLocaleString('en-US' , options).replace(/\//g,'-');
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="row-profile-section">
          <Col className="order-xl-1" xl="12 ">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Customer Feedback Manage</h3>
                  </Col>
                  <Col className="text-right" xs="4">

                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row className="form-control-main-section">
                      <Col lg="2">
                        <FormGroup>
                          <div> <label className="form-control-label" htmlFor="input-email" > Items Per Page:</label> </div>
                          <div style={{ display: "flex" }}>
                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                              <option value={""}>25</option>
                              <option value={"option1"}>50</option>
                              <option value={"option2"}>100</option>
                              <option value={"option3"}>150</option>
                              <option value={"option4"}>200</option>
                              <option value={"option5"}>250</option>
                            </select>
                            <Button className="form-control-table-inner-button">Go </Button>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="4" style={{ position: " absolute", right: "0%" }}>
                        <FormGroup className="form-control-outer-search" style={{ marginTop: "32px" }}>
                          <div className="form-control-search" style={{ display: "flex" }} >
                            <Input className="form-control-alternative" placeholder="Type Here To Search" />
                            <Button type="submit" className="form-control-table-inner-button">Submit</Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <hr />
                <Table className="align-items-center table-flush" responsive>
                  <thead className="table-thead-main-body">
                    <tr className="table-thead-tr-headings text-center">
                      <th scope="col">S.no</th>
                      <th scope="col">doctor comments	</th>
                      <th scope="col">Dr. Reply	</th>
                      <th scope="col">Order No.</th>
                      <th scope="col">Any suggestions for Us	</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Age</th>
                      <th scope="col">Diabetes Type	</th>
                      <th scope="col">Last Sugar level Readings	</th>
                      <th scope="col">Fasting Blood sugar reading	</th>
                      <th scope="col">Are you taking Insulin Dose	</th>
                      <th scope="col">Low carbohydrate diet	</th>
                      <th scope="col">Taking allopathic medicines</th>
                      <th scope="col">Cardio Exercise	</th>
                      <th scope="col">any other health Disorder/Disease	</th>
                      <th scope="col">any other Health Disorder/Disease Expl.	</th>
                      <th scope="col">How Long Have you Been Suffering</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdata.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <td className="table-tr-th-border" scope="row">{user.id}</td>
                          <td className="table-tr-th-border"><Button className="table-tr-td-doctor-comments" ><i className="fa fa-comments" /></Button></td>
                          <td className="table-tr-th-border">{user.message_reply}</td>
                          <td className="table-tr-th-border">{user.order_id}</td>
                          <td className="table-tr-th-border">{user.suggestions}</td>
                          <td className="table-tr-th-border"><Button className="table-td-purchase-fa-history">{user.type}</Button></td>
                          <td className="table-tr-th-border">{conertToAsiaTime(user.date_ct)}</td>
                          <td className="table-tr-th-border">{user.name}</td>
                          <td className="table-tr-th-border">{user.email}</td>
                          <td className="table-tr-th-border"><Button className="table-td-contact">{user.phone}</Button></td>
                          <td className="table-tr-th-border">{user.age}</td>
                          <td className="table-tr-th-border">{user.diabetes_type}</td>
                          <td className="table-tr-th-border">{user.normal_level_sugar_reeading}</td>
                          <td className="table-tr-th-border">{user.fasting_level_sugar_reeading}</td>
                          <td className="table-tr-th-border">{user.insulin_taking}</td>
                          <td className="table-tr-th-border">{user.low_carbohydrate_diet}</td>
                          <td className="table-tr-th-border">{user.allopathic_medicines}</td>
                          <td className="table-tr-th-border">{user.cardio_exercise}</td>
                          <td className="table-tr-th-border">{user.suffering_any_other_health_issue}</td>
                          <td className="table-tr-th-border">{user.other_health_issue_details}</td>
                          <td className="table-tr-th-border">{user.how_long_suffering}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
