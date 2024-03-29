import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Form, Progress, Table, Container, Row, Col, FormGroup, Input, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import axios from "axios";
function Leadsweb() {
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
    fetch_leads_fbweb_data();
    fetch_lead_fbweb_purchasetime();
  }, [])

  const [leadfbwebdata, setLeadfbwebdata] = useState([]);
  const fetch_leads_fbweb_data = async () => {
    try {
      const csresult = await axios('http://localhost:5000/lead-fb-web');
      console.log(csresult);
      setLeadfbwebdata(csresult.data);
    }
    catch (err) {
      console.log("error occured in fetching api of call-form ");
    }
  }

  const [userdata, setUserdata] = useState([]);
  const fetch_lead_fbweb_purchasetime = async () => {
    try {
      const result = await axios('http://localhost:5000/Index');
      setUserdata(result.data);
    }
    catch (err) {
      console.log("error fetching in api of Index from database" + err.stack);
    }
  };

  return (
    <>
      <Header />
      <Container className='mt--7' fluid>
        <div className="row-profile-section">
          <Col className='order-xl-1' xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className='align-items-center'>
                  <Col xs="8">
                    <h3 className='mb-0'>Leads Web Whatsapp/FB</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>

                <div className="modal-body-leads-webwhatsapp">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail" className="feedback-modal-label">Customer Number<span className="required-marker" >*</span> </Label>
                          <Input
                            id="exampleAddress"
                            name="address"
                            placeholder="1234 Main St"
                            type="number"
                            value={9886558888}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail" className="feedback-modal-label"> Status<span className="required-marker" >*</span> </Label>
                          <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                            <option value={""}>Select</option>
                            <option value={"option1"}>Sale </option>
                            <option value={"option2"}>FollowUp</option>
                            <option value={"option3"}>Not Interested</option>
                            <option value={"option4"}>Not Responding</option>
                            <option value={"option5"}>Call Facility Not Available</option>
                            <option value={"option6"}>Close</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail" className="feedback-modal-label">Leads Source</Label>
                          <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                            <option value={"option1"}>web whatsapp </option>
                            <option value={"option2"}>FB</option>
                          </select>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail" className="feedback-modal-label">Message</Label>
                          <Input
                            id="exampleAddress"
                            name="MailText"
                            placeholder="Type Your Message Here"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>

                <div className="modal-footer" style={{ justifyContent: 'center' }}>
                  <button type="button" className="btn btn-primary">Submit</button>
                </div>

                <hr />
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
                            <Button type="submit" className="form-control-table-inner-button">Search    </Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="table-thead-main-body">
                    <tr className="table-thead-tr-headings text-center">
                      <th scope="col">S.No.</th>
                      <th scope="col">Client Number</th>
                      <th scope="col">Leads Source</th>
                      <th scope="col">Purchase Time</th>
                      <th scope="col">Remark</th>
                      <th scope="col">Add By</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadfbwebdata.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <th className="table-tr-th-border" scope="row" >{i + 1}</th>
                          <td className="table-tr-th-border"><Button className="table-td-contact">{user.number}</Button></td>
                          <td className="table-tr-th-border"><Button className="table-td-action p-1">{user.source}</Button></td>
                          <td className="table-tr-th-border"><Button className="table-td-purchase-time btn btn-secondary">{userdata[i]?.no_purchasetime || 0}</Button></td>
                          <td className="table-tr-th-border">{user.message}</td>
                          <td className="table-tr-th-border">{user.add_by}</td>
                          <td className="table-tr-th-border"><Button className="table-td-createby">{user.status}</Button></td>
                          <td className="table-tr-th-border">{user.date_add.slice(0, 10)}</td>
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}

                            <Button type="button" className="table-td-createby p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "#4141e7", color: "white" }}>
                              <i className="fa fa-pencil" />
                            </Button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                    <h1 className="modal-title fs-8" id="exampleModalLabel">FeedBack</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ textAlign: "center", margin: "20px" }}>Customer Support Queries Order No.55301
                                  </h1>
                                  <hr style={{ width: "40%", margin: "0 auto" }} />
                                  <div className="modal-body">
                                    <div className="modal-body-leads-webwhatsapp">
                                      <Form>
                                        <Row>
                                          <Col md={6}>
                                            <FormGroup>
                                              <Label for="exampleEmail" className="feedback-modal-label">Customer Number<span className="required-marker" >*</span> </Label>
                                              <Input
                                                id="exampleAddress"
                                                name="address"
                                                placeholder="1234 Main St"
                                                type="number"
                                                value={9886558888}
                                              />
                                            </FormGroup>
                                          </Col>

                                          <Col md={6}>
                                            <FormGroup>
                                              <Label for="exampleEmail" className="feedback-modal-label"> Status<span className="required-marker" >*</span> </Label>
                                              <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                                <option value={""}>Select</option>
                                                <option value={"option1"}>Sale </option>
                                                <option value={"option2"}>FollowUp</option>
                                                <option value={"option3"}>Not Interested</option>
                                                <option value={"option4"}>Not Responding</option>
                                                <option value={"option5"}>Call Facility Not Available</option>
                                                <option value={"option6"}>Close</option>
                                              </select>
                                            </FormGroup>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col md={6}>
                                            <FormGroup>
                                              <Label for="exampleEmail" className="feedback-modal-label">Leads Source</Label>
                                              <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                                <option value={"option1"}>web whatsapp </option>
                                                <option value={"option2"}>FB</option>
                                              </select>
                                            </FormGroup>
                                          </Col>

                                          <Col md={6}>
                                            <FormGroup>
                                              <Label for="exampleEmail" className="feedback-modal-label">Message</Label>
                                              <Input
                                                id="exampleAddress"
                                                name="MailText"
                                                placeholder="Type Your Message Here"
                                                type="textarea"
                                              />
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                      <button type="button" className="btn btn-primary">Submit</button>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default Leadsweb;
