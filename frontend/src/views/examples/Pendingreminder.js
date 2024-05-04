import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // core components
import "../../assets/css/profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "./CustomPagination";


const Profile = () => {

  const conertToAsiaTime = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      seconds: '2-digit'
    };
    return date.toLocaleString('en-US', options).replace(/\//g, '-');
  }

  // for remainde rdate field
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // for option employee field
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange1 = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    purchasetime();
  }, [])

  const [puchasetimedata, setPuchasetimedata] = useState([]);
  const purchasetime = async (pt) => {
    try {
      const response = await axios.get(`http://localhost:5000/purchaseTime?ordernumber=${pt}`);
      setPuchasetimedata(response.data);
    } catch (error) {
      console.log("Error in purchaseTime:", error);
    }
  }

  // Pagination
  const [userdata, setUserdata] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0); // Initialize totalRecords state
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    // Retrieve the current page from local storage if available
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    } else {
      setCurrentPage(1); // Default to page 1 if not found in local storage
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [currentPage]);

  // for option to filter data showing rows field
  const [selectedOptionrecordPerPage, setSelectedOptionrecordPerPage] = useState("");
  const handleChange = (event) => {
    setSelectedOptionrecordPerPage(event.target.value);
  };


  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await fetchdata(); // Fetch data using the selected option
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  // route for showing data of Pending-Reminder-manage

  const fetchdata = async () => {
    try {
      const result = await axios(`http://localhost:5000/reminder?page=${currentPage}&limit=${selectedOptionrecordPerPage}`);
      setUserdata(result.data.data);
      setTotalRecords(result.data.totalRecords);
    }
    catch (err) {
      console.log('error cocured in fetching axios from pending-reminder' + err.stack);
    }
  }

  const changeCPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // route for handle feedback form modal 
  const [feedbackvalues, setFeedbackValues] = useState({
    calltype: "",
    subject: "",
    ordernumber: "",
    date: "",
    enquiry: "",
    concern_department: "",
    message: "",
    mail_message: "",
    status: "",
    feedback_status: "",
    reminder_date: "",
    reminder_time: "",
    reminder: "",
    doctor_comments: ""
  })

  axios.defaults.withCredentials = true;

  const handleFeedbackForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/feedback-form-modal`, feedbackvalues);

      if (response.data.Status === 'Success') {
        alert('Data updated successfully');
        window.location.reload();
      } else {
        alert(response.data.Error || 'Something went wrong in sending data');
      }
    } catch (error) {
      console.error('Error occurred while fetching from backend:', error);
      alert('Error occurred while sending data to the server');
    }
  };

  useEffect(() => {
    fetchdataIHmodal2();
  }, [])

  const [userdata2, setUserdata2] = useState([]);
  const fetchdataIHmodal2 = async (phoneNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/feedbackFormModalTable?phone=${phoneNumber}`);
      setUserdata2(response.data);
    }
    catch (err) {
      console.log('error cocured in fetching axios from feedbackFormModalTable' + err.stack);
    }
  }
  // to show date =  current date in feedback modal
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [selectedDateModal, setSelectedDateModal] = useState(currentDate);

  // route for showing data of purchaseTime from purchaseTime route and tbl_payment_orders table
  const [purchaseTimeData, setPurchaseTimeData] = useState([]);
  const setPurchaseTime = async (phonenumber) => {
    try {
      const result = await axios.get(`http://localhost:5000/purchaseTime?contact=${phonenumber}`);
      setPurchaseTimeData(result.data);
    } catch (error) {
      console.log("error occured int fetching data of purchase time", err.stack);
    }
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
                    <h3 className="mb-0">Pending Reminder Manage</h3>
                  </Col>
                  <Col className="text-right" xs="4">

                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="pl-lg-4">
                  <Row className="form-control-main-section">
                    <Col lg="4">
                      <Form>
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email" > Care Team </label>
                          <div style={{ display: "flex" }}>

                            <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
                              <option value={""}>Select Employee</option>
                              <option value={" pallavi@vedobi.com"}>pallavi@vedobi.com</option>
                              <option value={" dr.vishakha@vedobi.com"}>dr.vishakha@vedobi.com</option>
                              <option value={" kiruthika@vedobi.com"}>kiruthika@vedobi.com</option>
                              <option value={" mansi.rajput@vedobi.com"}>mansi.rajput@vedobi.com</option>
                              <option value={" nikita.mukeria@vedobi.com"}>nikita.mukeria@vedobi.com</option>
                            </select>
                            <Button className="form-control-table-inner-button">Submit </Button>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>

                    <Col lg="4">
                      <Form onSubmit={handlesubmit}>
                        <FormGroup>
                          <div> <label className="form-control-label" htmlFor="input-email" > Items Per Page:</label> </div>
                          <div style={{ display: "flex" }}>
                            <select id="option" value={selectedOptionrecordPerPage} onChange={handleChange} className="form-control-alternative">
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                              <option value={150}>150</option>
                              <option value={200}>200</option>
                              <option value={250}>250</option>
                            </select>
                            <Button type="submit" className="form-control-table-inner-button">Go</Button>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </div>

                <hr />
                <Table className="align-items-center table-flush" responsive>
                  <thead className="table-thead-main-body">
                    <tr className="table-thead-tr-headings text-center">
                      <th scope="col">S.no</th>
                      <th scope="col">Action</th>
                      <th scope="col">Reminder Date.	</th>
                      <th scope="col">Order No.</th>
                      <th scope="col">Purchase Time	</th>
                      <th scope="col">Calls Time	</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Customer Message</th>
                      <th scope="col">Added By</th>
                      <th scope="col">Reply Message</th>
                      <th scope="col">Ticket/Feedback Status</th>
                      <th scope="col">status</th>
                      <th scope="col">Reply By</th>
                      <th scope="col">Reminder Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdata.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <th className="table-tr-th-border" scope="row">{i + 1}</th>

                          {/* FeedBack Form Modal  Starts here */}
                          <td className="table-tr-th-border">

                            {/* <!-- Button trigger modal --> */}

                            <Button type="button" className="btn table-td-action" data-bs-toggle="modal" style={{ backgroundColor: "#4141e7", color: "white" }}
                              data-bs-target={`#exampleModal-${i}`}
                              onClick={() => {
                                // setFeedbackValues({ ...feedbackvalues, ordernumber: user.shopping_order_id, date: selectedDateModal })
                                fetchdataIHmodal2(user?.number);
                              }}
                            >
                              <i className="fa fa-pencil" />

                            </Button>

                            {/* <!-- Modal --> */}

                            <div className="modal fade" id={`exampleModal-${i}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${i}`} aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                    <h1 className="modal-title fs-8" id={`exampleModalLabel-${i}`}>FeedBack</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel-${i}`} style={{ textAlign: "center", margin: "20px" }}>
                                    Customer Support Queries Order No. {user.ordernumber}
                                  </h1>
                                  <hr style={{ width: "40%", margin: "0 auto" }} />
                                  <div className="modal-body">
                                    <Form onSubmit={handleFeedbackForm}>

                                      {/* call type and subject */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Call Type<span className="required-marker" >*</span> </Label>
                                            <select id="option" name="calltype" onChange={(e) => setFeedbackValues({ ...feedbackvalues, calltype: e.target.value })} className="form-control-alternative">
                                              <option value={""}>Select</option>
                                              <option value={"Inbound Call"}>Inbound Call</option>
                                              <option value={"Outbound Call"}>Outbound Call</option>
                                              <option value={"Chat"}>Chat</option>
                                              <option value={"Email"}>Email</option>
                                              <option value={"Whatsapp"}>Whatsapp</option>
                                              <option value={"Facebook"}>Facebook</option>
                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Subject<span className="required-marker" >*</span> </Label>
                                            <select id="option" className="form-control-alternative" name="subject" onChange={(e) => setFeedbackValues({ ...feedbackvalues, subject: e.target.value })}>
                                              <option value={""}>Select</option>
                                              <option value={"FeedBack Call"}>FeedBack Call</option>
                                              <option value={"Service Call"}>Service Call</option>
                                              <option value={"Reminder Call"}>Reminder Call</option>
                                              <option value={"Sale"}>Sale </option>
                                              <option value={"Doctor Consulation"}>Doctor Consulation</option>
                                              <option value={"Order Verification"}>Order Verification</option>
                                              <option value={"Enquiry about the product"}>Enquiry about the product </option>
                                              <option value={"Delivery Issue/Dispute "}>Delivery Issue/Dispute </option>
                                              <option value={"Customer Complaint"}>Customer Complaint </option>
                                              <option value={"Order Cancellattion"}>Order Cancellattion </option>
                                              <option value={"Address Verification"}>Address Verification</option>
                                              <option value={"NDR"}>NDR </option>
                                              <option value={"RTO"}>RTO </option>
                                              <option value={"Others"}>Others </option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* order number and phone */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Order Number</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="ordernumber"
                                              placeholder="12354"
                                              value={user.ordernumber}
                                              readOnly
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> phone</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="number"
                                              placeholder="ex- 9201XXXXXX"
                                              type="number"
                                              defaultValue={user.number}
                                              readOnly
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* name and email */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Name </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="name"
                                              placeholder="ex- saurabh ojha"
                                              type="text"
                                              defaultValue={user.name}
                                              readOnly
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Email </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="email"
                                              placeholder="Please enter your email"
                                              type="email"
                                              defaultValue={user.email}
                                              readOnly
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* address and date */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Address<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="address"
                                              placeholder="ex-1234 Main St"
                                              type="text"
                                              defaultValue={user.address}
                                              readOnly
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Date<span className="required-marker" >*</span> </Label>
                                            <Input id="exampleAddress" type="date" name="date" placeholder="1234 Main St" value={selectedDateModal} readOnly />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* enquiry type and concern department */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Enquiry Type<span className="required-marker" >*</span> </Label>
                                            <select id="option" className="form-control-alternative" name="enquiry" onChange={(e) => setFeedbackValues({ ...feedbackvalues, enquiry: e.target.value })} >
                                              <option value={""}>Please Select One</option>
                                              <option value={"Order Related Issue"}>Order Related Issue</option>
                                              <option value={"Damage Product Received"}>Damage Product Received</option>
                                              <option value={"Payment Related Issue"}>Payment Related Issue</option>
                                              <option value={"Wrong Product Received"}>Wrong Product Received</option>
                                              <option value={"Product Purchase"}>Product Purchase</option>
                                              <option value={"Product Feedback"}>Product Feedback</option>
                                              <option value={"Product Related Issue"}>Product Related Issue</option>
                                              <option value={"Consulation"}>Consulation</option>
                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Concern Department<span className="required-marker" >*</span> </Label>
                                            <select id="option" className="form-control-alternative" name="concern_department" onChange={(e) => setFeedbackValues({ ...feedbackvalues, concern_department: e.target.value })}  >
                                              <option value={""}>Concern Department</option>
                                              <option value={"Dispatch/Store Department"}>Dispatch/Store Department</option>
                                              <option value={"Sales Department"}>Sales Department</option>
                                              <option value={"Payment Gateway Department"}>Payment Gateway Department </option>
                                              <option value={"Technical Department"}>Technical Department</option>
                                              <option value={"Customer Care Department"}>Customer Care Department</option>
                                              <option value={"Consulation"}>Consulation</option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* message and mail textfor customer */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Message<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="message"
                                              placeholder="Type Your Message Here"
                                              type="textarea"
                                              value={user.message} readOnly
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, message: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Mail Text for Customer<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="mail_message"
                                              placeholder="ex. Hi Ajay, Thank you for your purchase with us. Your order should have arrived by now and we hope everything went well"
                                              type="textarea"
                                              value={user.mail_message}
                                              readOnly
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, mail_message: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* ticket status and feedback status */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Ticket Status<span className="required-marker" >*</span> </Label>
                                            <select id="option" className="form-control-alternative" name="status" onChange={(e) => setFeedbackValues({ ...feedbackvalues, status: e.target.value })} >
                                              <option value={""}>Status</option>
                                              <option value={"Open"}>Open</option>
                                              <option value={"Close"}>Close</option>
                                              <option value={"Under Process"}>Under Process</option>
                                            </select>
                                          </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Feedback Status<span className="required-marker" >*</span> </Label>
                                            <select id="option" className="form-control-alternative" name="feedback_status" onChange={(e) => setFeedbackValues({ ...feedbackvalues, feedback_status: e.target.value })} >
                                              <option value={""}>Feedback Status</option>
                                              <option value={"Feedback"}>Feedback</option>
                                              <option value={"Call Not Received"}>Call Not Received</option>
                                              <option value={"sale"}>sale</option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* reminder date and time */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Set Reminder Date</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="reminder_date"
                                              type="date"
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, reminder_date: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label">Set Reminder Time</Label>
                                            <Input
                                              id="exampleAddress"
                                              name="reminder_time"
                                              type="time"
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, reminder_time: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>

                                      {/* reminder remark and doctor comments */}
                                      <Row>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Reminder Remark<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="reminder"
                                              placeholder="Type Your Remark Here"
                                              type="textarea"
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, reminder: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                          <FormGroup>
                                            <Label for="exampleEmail" className="feedback-modal-label"> Doctor Comments/ Remark<span className="required-marker" >*</span> </Label>
                                            <Input
                                              id="exampleAddress"
                                              name="doctor_comments"
                                              placeholder="Type Your Comment Here"
                                              type="textarea"
                                              onChange={(e) => setFeedbackValues({ ...feedbackvalues, doctor_comments: e.target.value })}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                      </div>
                                    </Form>
                                  </div>

                                  {/* show all the table data */}
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
                                    <tbody style={{ border: "1px solid black" }}>
                                      {userdata2.map((user, i) => {
                                        return (
                                          <tr className="text-center" key={i}>
                                            <td className="table-tr-th-border"><Button className="table-td-contact">{user.ordernumber}</Button></td>
                                            <td className="table-tr-th-border">{user.name}</td>
                                            <td className="table-tr-th-border">{user.message}</td>
                                            <td className="table-tr-th-border">{user.message_reply}</td>
                                            <td className="table-tr-th-border">{user.doctor_comments}</td>
                                            <td className="table-tr-th-border">{user.feedback_status}</td>
                                            <td className="table-tr-th-border">{user.status}</td>
                                            <td className="table-tr-th-border">{user.date}</td>
                                            <td className="table-tr-th-border"><Button className="table-td-createby">{user.add_by}</Button></td>
                                          </tr>
                                        )
                                      })
                                      }
                                    </tbody>
                                  </Table>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </td>
                          {/* FeedBack Form Modal  ends here */}

                          <td className="table-tr-th-border">{conertToAsiaTime(user.reminder_date)}	</td>
                          <td className="table-tr-th-border"> {user.ordernumber}</td>


                          {/* Purchase Time Modal  Starts here */}
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}
                            <Button type="button" className="table-td-purchase-time" data-bs-toggle="modal"
                              data-bs-target={`#exampleModal1-${i}`} style={{ backgroundColor: "#4141e7", color: "white" }}
                              onClick={() => {
                                setPurchaseTime(user?.number)
                                // fetchPTImage(user?.shopping_order_id)
                              }}
                            >
                              <i className="fa-solid fa-business-time"></i>
                            </Button>

                            {/* <!-- Modal --> */}

                            <div className="modal fade" id={`exampleModal1-${i}`} tabIndex="-1" aria-labelledby={`exampleModalLabel1-${i}`} aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                    <h1 className="modal-title fs-8" id={`exampleModalLabel1-${i}`}>Order Summary</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel1-${i}`} style={{ textAlign: "center", margin: "20px" }}>
                                    Customer All Previous  Orders For <strong><i>{user.number}</i></strong></h1>
                                  <hr style={{ width: "40%", margin: "0 auto" }} />
                                  <div className="modal-body">

                                    {Array.isArray(purchaseTimeData) && purchaseTimeData.map((pt, i) => {
                                      return (
                                        <React.Fragment key={i}>
                                          <div className="element-index-heading" key={i}>Order Summary of #<strong>{pt.ordernumber}</strong></div>

                                          <Table className="align-items-center table-flush" responsive>
                                            <tbody style={{ border: "1px solid black" }}>
                                              <tr className="table-thead-tr-headings table-thead-main-body">
                                                <th scope="col" style={{ border: "1px solid black" }}>Image</th>
                                                <th scope="col" style={{ border: "1px solid black" }}>Product Name</th>
                                                <th scope="col" style={{ border: "1px solid black" }}>Price</th>
                                                <th scope="col" style={{ border: "1px solid black" }}>QTY</th>
                                                <th scope="col" style={{ border: "1px solid black" }}>Date</th>
                                                <th scope="col" style={{ border: "1px solid black" }}>Total Amount</th>
                                              </tr>

                                              <tr className="text-center" key={i}>
                                                <td className="table-tr-th-border"> <img src={require(`../../assets/img/theme/${pt.invoice_image}`)} alt="loading"></img></td>
                                                <td className="table-tr-th-border">{pt.product_item} </td>
                                                <td className="table-tr-th-border">{pt.p_price} </td>
                                                <td className="table-tr-th-border">{pt.total_quantity}</td>
                                                <td className="table-tr-th-border">{pt.date_pay}</td>
                                                <td className="table-tr-th-border">{pt.amount}</td>
                                              </tr>

                                            </tbody>
                                          </Table>

                                        </React.Fragment>
                                      )
                                    })}
                                  </div>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Purchase Time Modal  ends here */}


                          {/* Follow up Modal  starts here */}
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}
                            <Button type="button" className="table-td-purchase-fa-history" data-bs-toggle="modal" data-bs-target={`#exampleModal3-${i}`}
                              onClick={() => { fetchdataIHmodal2(user?.number) }}// Set ordernumber when opening modal
                            >
                              <i className="fa fa-history" />
                            </Button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id={`exampleModal3-${i}`} tabIndex="-1" aria-labelledby={`exampleModalLabel3-${i}`} aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                    <h1 className="modal-title fs-8" id={`exampleModalLabel3-${i}`} >Interaction History</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel3-${i}`} style={{ textAlign: "center", margin: "20px" }}>Customer All orders
                                  </h1>
                                  <hr style={{ width: "20%", margin: "0 auto" }} />
                                  <div className="modal-body">


                                    <Table className="align-items-center table-flush" responsive>
                                      <thead className="table-thead-main-body">
                                        <tr className="table-thead-tr-headings">
                                          <th scope="col" style={{ border: "1px solid black" }}>Order No.</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Customer Name</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Customer Message</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Reply Message</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Feedback Status</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Ticket Status</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Date</th>
                                          <th scope="col" style={{ border: "1px solid black" }}>Added By</th>
                                        </tr>
                                      </thead>
                                      <tbody style={{ border: "1px solid black" }}>
                                        {
                                          userdata2.map((user, i) => {
                                            return (
                                              <tr className="text-center" key={i}>
                                                <td className="table-tr-th-border"><Button className="table-td-contact">{user.ordernumber}</Button></td>
                                                <td className="table-tr-th-border">{user.name}</td>
                                                <td className="table-tr-th-border">{user.message}</td>
                                                <td className="table-tr-th-border">{user.message_reply}</td>
                                                <td className="table-tr-th-border">{user.feedback_status}</td>
                                                <td className="table-tr-th-border"><Button className="table-td-shipping-status"> {user.status}</Button></td>
                                                <td className="table-tr-th-border"> {user.date}</td>
                                                <td className="table-tr-th-border"><Button className="table-td-createby">{user.add_by}</Button></td>

                                              </tr>
                                            )
                                          })
                                        }

                                      </tbody>
                                    </Table>
                                  </div>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </td>
                          {/* follow up Modal  ends here */}


                          <td className="table-tr-th-border">{user.name}</td>
                          <td className="table-tr-th-border">{user.email}</td>
                          <td className="table-tr-th-border"><Button className="table-td-contact">{user.number}</Button></td>
                          <td className="table-tr-th-border">{user.message}</td>
                          <td className="table-tr-th-border">{user.add_by}</td>
                          <td className="table-tr-th-border">{user.message_reply}</td>
                          <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.feedback_status}</Button></td>
                          <td className="table-tr-th-border"><Button className="table-td-status">{user.status}</Button></td>
                          <td className="table-tr-th-border">{user.reply_by}</td>
                          <td className="table-tr-th-border"></td>
                        </tr>
                      )
                    })}

                  </tbody>

                </Table>

                <CustomPagination totalPages={Math.ceil(totalRecords / (selectedOptionrecordPerPage || 25))} currentPage={currentPage} onPageChange={changeCPage} />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
