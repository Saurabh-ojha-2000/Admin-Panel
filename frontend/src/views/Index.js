import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col, FormGroup, Input, Form, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import "../assets/css/dashboard.css" //css file
import axios from "axios";
import Charts from '../variables/Charts';
import CustomPagination from "./examples/CustomPagination";


const Index = (props) => {

  // to show date =  current date in feedback modal
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [selectedDateModal, setSelectedDateModal] = useState(currentDate);

  const conertToAsiaTime = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      seconds: '2-digit',
    };
    return date.toLocaleString('en-US', options).replace(/\//g, '-');
  }

  useEffect(() => {
    fetch_call_form_fill_data();
    fetch_all_calldata();
    fetchdataIHmodal();
    fetchdataIHmodal2();
  }, [])

  const [userdata, setUserdata] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0); // Initialize totalRecords state
  const [currentPage, setCurrentPage] = useState(1);

  // for option to filter data showing rows field
  const [selectedOptionrecordPerPage, setSelectedOptionrecordPerPage] = useState("");
  const handleChange = (event) => {
    setSelectedOptionrecordPerPage(event.target.value);
  };


  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await fetchcustomerdata(); // Fetch data using the selected option
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    // Retrieve the current page from local storage if available
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    } else {
      setCurrentPage(1); // Default to page 1 if not found in local storage
    }
  }, []);

  // function to handle the data of searched data from tbl_payment_orders
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseSearch = await axios.get(`http://localhost:5000/search?searchTerm=${searchTerm}&tablename=tbl_payment_orders`);

      if (responseSearch.data && responseSearch.data.length > 0) {
        setUserdata(responseSearch.data); // Update userdata state with search results
        setTotalRecords(responseSearch.data.length); // Assuming totalRecords should be the length of the search results
        // console.log("Searching results for: ", responseSearch);
      } else {
        // No search results found
        setUserdata([]); // Clear userdata state
        setTotalRecords(0); // Reset totalRecords to 0
        console.log("No search results found");
      }
    } catch (error) {
      console.error("Error Fetching search results:", error);
    }
  };

  // function to handle the data of Datesearched from tbl_payment_orders

  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const handleDateChangeFrom = (event) => {
    setSelectedDateFrom(event.target.value);
  };

  const [selectedDateTo, setSelectedDateTo] = useState("");
  const handleDateChangeTo = (event) => {
    setSelectedDateTo(event.target.value);
  };

  const handleDateSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseDateSearch = await axios.get(`http://localhost:5000/date-search?fromDate=${selectedDateFrom}&toDate=${selectedDateTo}&tablename=tbl_payment_orders`);
      // console.log("Searching results for datesearch is : ", responseDateSearch);

      if (responseDateSearch.data && responseDateSearch.data.length > 0) {
        setUserdata(responseDateSearch.data);
        setTotalRecords(responseDateSearch.data.length);
        console.log("Searching results for datesearch is : ", responseDateSearch);
      } else {
        // No search results found
        setUserdata([]); // Clear userdata state
        setTotalRecords(0); // Reset totalRecords to 0
        console.log("No search results found");
      }

    } catch (error) {
      console.log("Error occured in fetching dateSearch results:", error);
    }
  }


  useEffect(() => {
    fetchcustomerdata();
  }, [currentPage])

  // route for showing data of All-orders-manage from index route and tbl_payment_orders table
  const fetchcustomerdata = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/Index?page=${currentPage}&limit=${selectedOptionrecordPerPage}`);
      setUserdata(result.data.data);
      setTotalRecords(result.data.totalRecords);
    } catch (err) {
      console.log("error fetching in api of Index from database", err.stack);
    }
  };


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

  // route for showing data of purchaseTime from purchaseTime-image route and tbl_payment_orders table
  // const [purchaseTimeImage, setPurchaseTimeImage] = useState([]);
  // const fetchPTImage = async (ordernumber) => {
  //   try {
  //     const result = await axios.get(`http://localhost:5000/purchaseTimeImage?shopping_order_id=${ordernumber}`);
  //     setPurchaseTimeImage(result.data);
  //     console.log("purchasetimeImage is ", result);
  //   } catch (error) {
  //     console.log("error occured int fetching data of purchase time-Image", err.stack);
  //   }
  // }

  // Pagination

  const changeCPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // route for showing data of interaction-history manage modal
  const [userdata1, setUserdata1] = useState([]);
  const fetchdataIHmodal = async () => {
    try {
      const modalresult = await axios('http://localhost:5000/reminder');
      setUserdata1(modalresult.data);
    }
    catch (err) {
      console.log('error cocured in fetching axios from reminder' + err.stack);
    }
  }

  // route for showing data of feedback form manage modal- last table at bottom
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


  const [calldata, setCalldata] = useState([]);
  const fetch_all_calldata = async () => {
    try {
      const csresult = await axios('http://localhost:5000/combined-data');
      setCalldata(csresult.data.callSummary);
    }
    catch (err) {
      console.log("error occured in fetching api of call-form ");
    }
  }

  const [callformfilldata, setCallFormfilldata] = useState([]);
  const fetch_call_form_fill_data = async () => {
    try {
      const cfresult = await axios('http://localhost:5000/combined-data');
      setCallFormfilldata(cfresult.data.callForm);
    }
    catch (err) {
      console.log("error occured in fetching api of call-form ");
    }
  }


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

  // function to handle the data of all-order-manage feedbackform
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          {/* Call Progress table */}
          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0" style={{ textAlign: 'center' }}>Call Details</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light text-center">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Call Progress</th>
                    <th scope="col">Answered Call</th>
                    <th scope="col">Not Response</th>
                    <th scope="col">Call / Form</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {calldata.map((alldata, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row" >{alldata.service}</th>
                        <td className="td-progress-bar" style={{ display: "flex", justifyContent: "center", marginTop: "-0.5px", borderBottom: "none" }}>
                          <Progress max="100" value={alldata?.totalCalls || 0} barClassName="bg-gradient-success" style={{ marginTop: '10px', height: '10px' }} />
                        </td>
                        <td>{alldata?.answeredCalls || 0}</td>
                        <td>{alldata?.notAnsweredCalls || 0}</td>
                        <td>{alldata?.totalCalls || 0}/{callformfilldata[i]?.callform || 0}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>

          {/* chart  */}
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart " style={{ maxHeight: '230px' }}>
                  <Charts />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>

        {/* Order Manage table starts here */}
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0 table-main-heading">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All-Order Manage</h3>
                  </div>
                </Row>
              </CardHeader>
              <div className="pl-lg-4">
                <Row className="form-control-main-section">
                  <Col lg="2">
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
                          <Button type="submit" className="form-control-table-inner-button" style={{ marginLeft: "10px" }}>Go</Button>
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col lg="4" className="d-flex justify-content-between">
                    <Form onSubmit={handleDateSearchSubmit}>
                      <FormGroup>

                        <div style={{ display: "flex" }}>

                          <Col lg="23">
                            <div><label className="form-control-label" htmlFor="input-date">From Date:</label></div>
                            <Input type="date" placeholder="dd/mm/yyyy" className="form-control-alternative" value={selectedDateFrom} onChange={handleDateChangeFrom} />
                          </Col>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Col lg="23">
                            <div><label className="form-control-label" htmlFor="input-date">To Date:</label></div>
                            <Input type="date" className="form-control-alternative" value={selectedDateTo} onChange={handleDateChangeTo} placeholder="dd/mm/yyyy" />
                          </Col>

                          <div> <Button type="submit" className="form-control-table-inner-button" style={{ marginLeft: "10px", marginTop: "30px" }}>Go</Button> </div>

                        </div>

                      </FormGroup>
                    </Form>
                  </Col>

                  <Col lg="2">
                    <Form onSubmit={handleSearchSubmit}>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-search">Search</label>
                        <div style={{ display: "flex" }}>

                          <Input type="search" placeholder="Name, Mobile No., Order ID" value={searchTerm} onChange={handleSearchChange} className="form-control-alternative" />
                          <Button type="submit" className="form-control-table-inner-button" style={{ marginLeft: "10px" }}>Go</Button>
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="table-thead-main-body">
                  <tr className="table-thead-tr-headings">
                    <th scope="col">S.No.</th>
                    <th scope="col">Order No.</th>
                    <th scope="col">Action</th>
                    <th scope="col">Customer Information</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Purchase Time</th>
                    <th scope="col"># of Follow up</th>
                    <th scope="col">Paid Amount (Rs.)</th>
                    <th scope="col">Payment Date</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Create by</th>
                    <th scope="col">Source</th>
                    <th scope="col">Shipping Status</th>
                    <th scope="col">Delivered Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <th className="table-tr-th-border" scope="row" >{i + 1}</th>
                          <td className="table-tr-th-border">{user.shopping_order_id}</td>

                          {/* FeedBack Form Modal  Starts here */}
                          <td className="table-tr-th-border">

                            {/* <!-- Button trigger modal --> */}

                            <Button type="button" className="btn table-td-action" data-bs-toggle="modal" style={{ backgroundColor: "#4141e7", color: "white" }}
                              data-bs-target={`#exampleModal-${i}`}
                              onClick={() => {
                                setFeedbackValues({ ...feedbackvalues, ordernumber: user.shopping_order_id, date: selectedDateModal })
                                fetchdataIHmodal2(user?.contact);
                              }} // Set ordernumber when opening modal
                            >
                              Feedback
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
                                    Customer Support Queries Order No. {user.shopping_order_id}
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
                                              value={user.shopping_order_id}
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
                                              defaultValue={user.contact}
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


                          <td className="table-tr-th-border"> {user.name}</td>
                          <td className="table-tr-th-border"><Button className="table-td-contact">{user.contact}</Button></td>


                          {/* Purchase Time Modal  Starts here */}
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}
                            <Button type="button" className="table-td-purchase-time" data-bs-toggle="modal"
                              data-bs-target={`#exampleModal1-${i}`} style={{ backgroundColor: "#4141e7", color: "white" }}
                              onClick={() => {
                                setPurchaseTime(user?.contact)
                                // fetchPTImage(user?.shopping_order_id)
                              }}
                            >
                              {user.no_purchasetime}
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
                                    Customer All Previous  Orders For <strong><i>{user.contact}</i></strong></h1>
                                  <hr style={{ width: "40%", margin: "0 auto" }} />
                                  <div className="modal-body">

                                    {Array.isArray(purchaseTimeData) && purchaseTimeData.map((pt, i) => {
                                      return (
                                        <React.Fragment key={i}>
                                          <div className="element-index-heading" key={i}>Order Summary of #<strong>{pt.shopping_order_id}</strong></div>

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
                                                <td className="table-tr-th-border"> <img src={require(`../assets/img/theme/${pt.invoice_image}`)} alt="loading"></img></td>
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
                              onClick={() => { fetchdataIHmodal2(user?.contact) }}// Set ordernumber when opening modal
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

                          <td className="table-tr-th-border">{user.amount}</td>
                          <td className="table-tr-th-border">{conertToAsiaTime(user.placed_date)}</td>
                          <td className="table-tr-th-border">{user.payment_method}</td>
                          <td className="table-tr-th-border">{user.created_by ? user.created_by : "user"}
                            <div> <Button className="table-td-createby">{user.ordertype}</Button> 	</div>
                          </td>
                          <td className="table-tr-th-border">{user.source}</td>
                          <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.shipping_status}</Button></td>
                          <td className="table-tr-th-border"></td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="text-center">
                      <th className="table-tr-th-border" colSpan="14" style={{ backgroundColor: "bisque" }}>
                        No Results Found
                      </th>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CustomPagination totalPages={Math.ceil(totalRecords / (selectedOptionrecordPerPage || 25))} currentPage={currentPage} onPageChange={changeCPage} />
            </Card>
          </Col>

        </Row>
      </Container >
    </>
  );

};

export default Index;
