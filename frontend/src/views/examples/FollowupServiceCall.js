import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col, FormGroup, Input, Form, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
// import "../assets/css/dashboard.css" //css file
import axios from "axios";

const Index = (props) => {

    // to show date =  curretn date in feedback modal
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
            seconds: '2-digit'
        };
        return date.toLocaleString('en-US', options).replace(/\//g, '-');
    }

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
        fetchcustomerdata();
        fetch_call_form_fill_data();
        fetch_all_calldata();
        fetchdataIHmodal();
        fetchdataIHmodal2();
    }, [])



    const [userdata, setUserdata] = useState([]);
    const fetchcustomerdata = async () => {
        try {
            const result = await axios('http://localhost:5000/Index');
            setUserdata(result.data);
        }
        catch (err) {
            console.log("error fetching in api of Index from database" + err.stack);
        }
    };

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
        console.log(feedbackvalues);
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/feedback-form-modal`, feedbackvalues);

            if (response.data.Status === 'Success') {
                alert('Data updated successfully');
                // window.location.reload();
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
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0 table-main-heading">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Follow-up / Service Call Manage</h3>
                                    </div>
                                </Row>
                            </CardHeader>
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
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-date">From Date:</label>
                                            <Input type="date" placeholder="dd/mm/yyyy" className="form-control-alternative" value={selectedDate} onChange={handleDateChange} />
                                            {selectedDate}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-date">To Date:</label>
                                            <Input type="date" className="form-control-alternative" value={selectedDate} onChange={handleDateChange} placeholder="dd/mm/yyyy" />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-search">Search</label>
                                            <Input type="search" className="form-control-alternative" placeholder="Name, Mobile No., Order ID" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="table-thead-main-body">
                                    <tr className="table-thead-tr-headings">
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Order No.</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col"># of Follow up</th>
                                        <th scope="col">Last History</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">ED Date</th>
                                        <th scope="col">D Date</th>
                                        <th scope="col">Courier</th>
                                        <th scope="col">Purchase Time</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Number</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Payment Mode</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Create by</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">AWS</th>
                                        <th scope="col">Shipping Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userdata.map((user, i) => {
                                        return (
                                            <tr className="text-center" key={i}     >
                                                <th className="table-tr-th-border" scope="row" >{i + 1}</th>
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
                                                        {user.shopping_order_id}
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
                                                                                    <td className="table-tr-th-border"> {user.status}</td>
                                                                                    <td className="table-tr-th-border"> {user.date}</td>
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

                                                {/* Follow up Modal  starts here */}
                                                <td className="table-tr-th-border">
                                                    {/* <!-- Button trigger modal --> */}

                                                    <Button type="button" className="table-td-purchase-fa-history" data-bs-toggle="modal" data-bs-target={`#exampleModal3-${i}`}>
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
                                                                            <tr className="text-center">
                                                                                <td className="table-tr-th-border">{userdata1[i]?.ordernumber}</td>
                                                                                <td className="table-tr-th-border">{userdata1[i]?.name}</td>
                                                                                <td className="table-tr-th-border">{userdata1[i]?.message}</td>
                                                                                <td className="table-tr-th-border">{userdata1[i]?.message_reply}</td>
                                                                                <td className="table-tr-th-border">{userdata1[i]?.feedback_status}</td>
                                                                                <td className="table-tr-th-border"> {userdata1[i]?.status}</td>
                                                                                <td className="table-tr-th-border"> {userdata1[i]?.date}</td>
                                                                                <td className="table-tr-th-border">{userdata1[i]?.add_by}</td>

                                                                            </tr>
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
                                                <td className="table-tr-th-border">{user.tags}</td>
                                                <td className="table-tr-th-border">{conertToAsiaTime(user.placed_date)}</td>
                                                <td className="table-tr-th-border">{conertToAsiaTime(user.ed_date)} </td>
                                                <td className="table-tr-th-border">{conertToAsiaTime(user.delivereddate)}</td>
                                                <td className="table-tr-th-border">{user.carrier_name}</td>

                                                {/* Purchase Time Modal  Starts here */}
                                                <td className="table-tr-th-border">
                                                    {/* <!-- Button trigger modal --> */}
                                                    <Button type="button" className="table-td-purchase-time" data-bs-toggle="modal"
                                                        data-bs-target={`#exampleModal1-${i}`} style={{ backgroundColor: "#4141e7", color: "white" }}
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
                                                                <h1 className="modal-title fs-5" id={`exampleModalLabel1-${i}`} style={{ textAlign: "center", margin: "20px" }}>Customer Support Queries Order No. {user.shopping_order_id}
                                                                </h1>
                                                                <hr style={{ width: "40%", margin: "0 auto" }} />
                                                                <div className="modal-body">


                                                                    <Table className="align-items-center table-flush" responsive>
                                                                        <thead className="table-thead-main-body">
                                                                            <tr className="table-thead-tr-headings">
                                                                                <th scope="col" style={{ border: "1px solid black" }}>Image</th>
                                                                                <th scope="col" style={{ border: "1px solid black" }}>Product Name</th>
                                                                                <th scope="col" style={{ border: "1px solid black" }}>Price</th>
                                                                                <th scope="col" style={{ border: "1px solid black" }}>QTY</th>
                                                                                <th scope="col" style={{ border: "1px solid black" }}>Date</th>
                                                                                <th scope="col" style={{ border: "1px solid black" }}>Total Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ border: "1px solid black" }}>
                                                                            <tr className="text-center">
                                                                                <td className="table-tr-th-border"> <img src={require(`../../assets/img/theme/${user.invoice_image}`)} alt="loading"></img></td>
                                                                                <td className="table-tr-th-border">{user.product_item} </td>
                                                                                <td className="table-tr-th-border">{user.p_price} </td>
                                                                                <td className="table-tr-th-border"> {user.total_quantity}</td>
                                                                                <td className="table-tr-th-border"> {user.date_pay}</td>
                                                                                <td className="table-tr-th-border"> {user.amount}</td>
                                                                            </tr>
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
                                                {/* Purchase Time Modal  ends here */}

                                                <td className="table-tr-th-border"> {user.name}</td>
                                                <td className="table-tr-th-border"><Button className="table-td-contact">{user.contact}</Button></td>
                                                <td className="table-tr-th-border">{user.state}</td>
                                                <td className="table-tr-th-border">{user.amount}</td>
                                                <td className="table-tr-th-border">{user.payment_method}</td>
                                                <td className="table-tr-th-border">{user.payment_method}</td>
                                                <td className="table-tr-th-border">{user.created_by ? user.created_by : "user"}
                                                    <div> <Button className="table-td-createby">{user.ordertype}</Button> 	</div>
                                                </td>
                                                <td className="table-tr-th-border">{user.source}</td>
                                                <td className="table-tr-th-border">{user.awb_number}</td>
                                                <td className="table-tr-th-border"><Button className="table-td-shipping-status">{user.shipping_status}</Button></td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default Index;
