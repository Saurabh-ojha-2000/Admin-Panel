import React, { useEffect, useState } from 'react'
import Header from "components/Headers/Header.js";
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import axios from 'axios';


function Appointment() {
    useEffect(() => {
        fetchdata();
    }, [])

    const [userdata, setUserdata] = useState([]);
    const fetchdata = async () => {
        try {
            const result = await axios('http://localhost:5000/customer-feedback');
            // console.log(result.data)
            setUserdata(result.data);
        } catch (error) {
            console.log("error occured in fetching data from appointment manage" + error.stack);
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
          seconds:'2-digit'
        };
        return date.toLocaleString('en-US' , options).replace(/\//g,'-');
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
                                        <h3 className='mb-0'>Appointment Manage</h3>
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
                                                        <Button type="submit" className="form-control-table-inner-button">Search    </Button>
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
                                            <th scope="col">Doctor Comments</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Age</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Order Status</th>
                                            <th scope="col">Any suggestions for Us</th>
                                            <th scope="col">Appointment Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Dr. Reply</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userdata.map((user, i) => {
                                            return (
                                                <tr className="text-center" key={i}>
                                                    <th className="table-tr-th-border" scope="row">{i + 1}</th>
                                                    <td className="table-tr-th-border">
                                                        {/* <!-- Button trigger modal --> */}

                                                        <Button type="button" className="btn table-tr-td-action" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            <i className="fa fa-pencil"></i>
                                                        </Button>

                                                        {/* <!-- Modal --> */}
                                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                                            // value={55301}
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
                                                                                            // value={9886558888}
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
                                                                                            // value={2024}
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

                                                        {/* <!-- Button trigger modal --> */}
                                                        <Button type="button" className="table-tr-td-action" data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ backgroundColor: "#55e7d5", color: "black" }}>
                                                            <i className="fa-sharp fa-regular fa-square-plus"></i>
                                                        </Button>

                                                        {/* <!-- Modal --> */}
                                                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-xl">
                                                                <div className="modal-content">
                                                                    <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                                                        <h1 className="modal-title fs-8" id="exampleModalLabel">Doctor Prescription Manage </h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ textAlign: "center", margin: "20px" }}>Create Prescription </h1>
                                                                    <hr style={{ width: "20%", margin: "0 auto" }} />
                                                                    <div className="modal-body">
                                                                        <Form>
                                                                            <Row>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Phone<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="Mobile Number"
                                                                                            type="number"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Name<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="ex. Saurabh Ojha"
                                                                                            type="text"
                                                                                        // value={Saurabh}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Row>
                                                                            <Row>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Gender<span className="required-marker" >*</span> </Label>
                                                                                        <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                                                                            <option value={""}>Select</option>
                                                                                            <option value={"option1"}>Male</option>
                                                                                            <option value={"option2"}>Female</option>
                                                                                            <option value={"option2"}>Other</option>
                                                                                        </select>
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Age </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="Enter Age"
                                                                                            type="text"
                                                                                        // value={Saurabh}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Row>

                                                                            <Row>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Weight<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="Enter Weight"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Case of History<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="Message"
                                                                                            placeholder="Type Your Case of History Here"
                                                                                            type="textarea"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Row>

                                                                            <Row>
                                                                                <Col md={4}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Medicine Name<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="Medicine Name"
                                                                                            type="text"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={4}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Dosage Instruction<span className="required-marker" >*</span> </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="address"
                                                                                            placeholder="Dosage Instruction"
                                                                                            type="text"
                                                                                        // value={nangloi}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={4}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label"> Duration<span className="required-marker" >*</span> </Label>
                                                                                        <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                                                                                            <option value={"option1"}>1 Month</option>
                                                                                            <option value={"option2"}>2 Month</option>
                                                                                            <option value={"option3"}>3 Month</option>
                                                                                            <option value={"option4"}>6 Month</option>
                                                                                            <option value={"option5"}>9 Month</option>
                                                                                            <option value={"option5"}>12 Month</option>
                                                                                            <option value={"option5"}>18 Month</option>
                                                                                        </select>
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Row>

                                                                            <Row>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Do's</Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="Message"
                                                                                            placeholder="Do's"
                                                                                            type="textarea"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Don'ts </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="MailText"
                                                                                            placeholder="Don'ts"
                                                                                            type="textarea"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Row>

                                                                        </Form>
                                                                    </div>

                                                                    <div className="modal-footer" style={{ justifyContent: "center" }}>
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                                                        <button type="button" className="btn btn-primary">Save changes</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.type}</Button></td>
                                                    <td className="table-tr-th-border">{user.name}</td>
                                                    <td className="table-tr-th-border">{user.email}</td>
                                                    <td className="table-tr-th-border"><Button className="table-td-contact">{user.phone}</Button></td>
                                                    <td className="table-tr-th-border">{user.age}</td>
                                                    <td className="table-tr-th-border">{conertToAsiaTime(user.order_date)}</td>
                                                    <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.status}</Button></td>
                                                    <td className="table-tr-th-border">{user.suggestions}</td>
                                                    <td className="table-tr-th-border">{conertToAsiaTime(user.appointmentdate)}</td>
                                                    <td className="table-tr-th-border">{user.appttime}</td>
                                                    <td className="table-tr-th-border">{user.add_by}</td>
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

export default Appointment
