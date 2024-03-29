import React, { useEffect, useState } from 'react'
import Header from "components/Headers/Header.js";
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import axios from 'axios';


function History() {

  useEffect(() => {
    fetchdata();
  }, [])

  const [userdata, setUserdata] = useState([]);
  const fetchdata = async () => {
    try {
      const result = await axios('http://localhost:5000/history');
      setUserdata(result.data);
    } catch (error) {
      console.log("error occured in fetching data from interaction-history-manage" + error.stack);
    }
  }

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <Header />
      <Container className='mt--7' fluid>
        <Row className='row-history-section'>
          <Col className='order-xl-1' xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className='align-items-center'>
                  <Col xs="8">
                    <h3 className='mb-0'>Interaction History Manage</h3>
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
                      <th scope="col">Action</th>
                      <th scope="col">Order No.</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Customer Message</th>
                      <th scope="col">Reply Message</th>
                      <th scope="col">Doctor Comments</th>
                      <th scope="col">Feedback Status</th>
                      <th scope="col">Ticket Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Added By</th>
                      <th scope="col">Reply By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdata.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <th className="table-tr-th-border" scope="row">{i+1}</th>
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}
                            
                            <Button type="button" className="btn table-tr-td-action" data-bs-toggle="modal" data-bs-target="#exampleModal" >
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
                                    <Form>
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Call Type<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Select</option>
                                              <option value={"option1"}>Inbound Call</option>
                                              <option value={"option2"}>Outbound Call</option>
                                              <option value={"option3"}>Chat</option>
                                              <option value={"option4"}>Email</option>
                                              <option value={"option5"}>Whatsapp</option>
                                              <option value={"option5"}>Facebook</option>
                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Subject<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Select</option>
                                              <option value={"option1"}>FeedBack Call</option>
                                              <option value={"option2"}>Service Call</option>
                                              <option value={"option3"}>Reminder Call</option>
                                              <option value={"option4"}>Sale </option>
                                              <option value={"option5"}>Doctor Consulation</option>
                                              <option value={"option5"}>Order Verification</option>
                                              <option value={"option4"}>Enquiry about the product </option>
                                              <option value={"option4"}>Delivery Issue/Dispute </option>
                                              <option value={"option4"}>Customer Complaint </option>
                                              <option value={"option4"}>Order Cancellattion </option>
                                              <option value={"option4"}>Address Verification</option>
                                              <option value={"option4"}>NDR </option>
                                              <option value={"option4"}>RTO </option>
                                              <option value={"option4"}>Others </option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Order Number<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              value={55301}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> phone<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              type="number"
                                              value={9886558888}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Name<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              type="text"
                                            // value={Saurabh}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Email<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              type="email"
                                            // value={sourabhojha12gmail.com}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Address<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              type="text"
                                            // value={nangloi}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Date<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="1234 Main St"
                                              type="date"
                                              value={2024}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Enquiry Type<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Please Select One</option>
                                              <option value={"option1"}>Order Related Issue</option>
                                              <option value={"option2"}>Damage Product Received</option>
                                              <option value={"option3"}>Payment Related Issue</option>
                                              <option value={"option4"}>Wrong Product Received</option>
                                              <option value={"option5"}>Product Purchase</option>
                                              <option value={"option5"}>Product Feedback</option>
                                              <option value={"option5"}>Product Related Issue</option>
                                              <option value={"option5"}>Consulation</option>

                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Concern Department<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Concern Department</option>
                                              <option value={"option1"}>Dispatch/Store Department</option>
                                              <option value={"option2"}>Sales Department</option>
                                              <option value={"option3"}>Payment Gateway Department </option>
                                              <option value={"option4"}>Technical Department</option>
                                              <option value={"option5"}>Customer Care Department</option>
                                              <option value={"option5"}>Consulation</option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Message<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="Message"
                                              placeholder="Type Your Message Here"
                                              type="textarea"
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Mail Text for Customer<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="MailText"
                                              placeholder="ex. Hi Ajay, Thank you for your purchase with us. Your order should have arrived by now and we hope everything went well"
                                              type="textarea"
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Ticket Status<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Status</option>
                                              <option value={"option1"}>Open</option>
                                              <option value={"option2"}>Close</option>
                                              <option value={"option5"}>Under Process</option>
                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Feedback Status<span className="required-marker" >*</span> </Label>
                                            <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                              <option value={""}>Feedback Status</option>
                                              <option value={"option1"}>Feedback</option>
                                              <option value={"option2"}>Call Not Received</option>
                                              <option value={"option5"}>sale</option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Set Reminder Date</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="Message"
                                              type="date"
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Set Reminder Time</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="MailText"
                                              type="time"
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Reminder Remark<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="Message"
                                              placeholder="Type Your Remark Here"
                                              type="textarea"
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Doctor Comments/ Remark<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="MailText"
                                              placeholder="Type Your Comment Here"
                                              type="textarea"
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </div>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                  </div>

                                  <Table className="align-items-center table-flush" responsive>
                                    <thead className="table-thead-main-body">
                                      <tr className="table-thead-tr-headings">
                                        <th scope="col">Order No.</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Customer Message</th>
                                        <th scope="col">Reply Message</th>
                                        <th scope="col">Doctor Comments</th>
                                        <th scope="col">FeedBack Status</th>
                                        <th scope="col">Ticket Status</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Added By</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                  </Table>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="table-tr-th-border">{user.ordernumber}</td>
                          <td className="table-tr-th-border">{user.name}</td>
                          <td className="table-tr-th-border">{user.email}</td>
                          <td className="table-tr-th-border"><Button className="table-td-contact">{user.number}</Button></td>                                                
                          <td className="table-tr-th-border">{user.message}</td>
                          <td className="table-tr-th-border">{user.message_reply}</td>
                          <td className="table-tr-th-border">{user.doctor_comments}</td>
                          <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.feedback_status}</Button></td>
                          <td className="table-tr-th-border"><Button className="table-td-status">{user.status}</Button></td>
                          <td className="table-tr-th-border">{user.date}</td>
                          <td className="table-tr-th-border">{user.add_by}</td>
                          <td className="table-tr-th-border">{user.reply_by}</td>
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

    </div >
  )
}

export default History
