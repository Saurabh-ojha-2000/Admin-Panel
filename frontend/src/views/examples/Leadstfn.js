import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Form, Table, Container, Row, Col, FormGroup, Input, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import axios from "axios";
function Leadstfn() {

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
        fetch_leadtfn_data();
        fetch_lead_remark_data();
    }, [])

    const [leadata, setLeadata] = useState([]);
    const fetch_leadtfn_data = async () => {
        try {
            const csresult = await axios('http://localhost:5000/leadstfn');
            setLeadata(csresult.data);
        }
        catch (err) {
            console.log("error occured in fetching api of call-form ");
        }
    }

    const [leadremark, setLeadremark] = useState([]);
    const fetch_lead_remark_data = async () => {
        try {
            const cfresult = await axios('http://localhost:5000/leadstfn-remark');
            setLeadremark(cfresult.data);
        }
        catch (err) {
            console.log("error occured in fetching api of call-form ");
        }
    }

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
                                        <h3 className='mb-0'>Leads Toll Free Number</h3>
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
                                            <Col >
                                                <Button className="form-control-table-inner-button-leads-tfn" style={{ backgroundColor: 'blue' }}>Submit </Button>
                                                <Button className="form-control-table-inner-button-leads-tfn" style={{ backgroundColor: '#03A63C' }}>Refresh Page </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                                <hr />
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="table-thead-main-body">
                                        <tr className="table-thead-tr-headings text-center">
                                            <th scope="col">S.No.</th>
                                            <th scope="col">Client Number</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Attend By</th>
                                            <th scope="col">Call Receive Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Call End</th>
                                            <th scope="col">Call Duration (In sec.)	</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Remark</th>
                                            <th scope="col">Call Feedback</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leadata.map((user, i) => {
                                            return (
                                                <tr className="text-center" key={i}     >
                                                    <th className="table-tr-th-border" scope="row" >{i + 1}</th>
                                                    <td className="table-tr-th-border"><Button className="table-td-contact">{user.client_number}</Button></td>
                                                    <td className="table-tr-th-border"><Button className="table-td-createby">{user.status}</Button></td>
                                                    <td className="table-tr-th-border"> {user.service}</td>
                                                    <td className="table-tr-th-border">{conertToAsiaTime(user.startdatetime)}</td>
                                                    <td className="table-tr-th-border">{user.time}</td>
                                                    <td className="table-tr-th-border">{conertToAsiaTime(user.end_stamp)}</td>
                                                    <td className="table-tr-th-border"><Button className="table-td-purchase-time">{user?.call_duration || 0} </Button></td>
                                                    <td className="table-tr-th-border"></td>
                                                    <td className="table-tr-th-border">{leadremark[i]?.remark || 0}</td>
                                                    <td className="table-tr-th-border"> </td>
                                                    <td className="table-tr-th-border">
                                                        {/* <!-- Button trigger modal --> */}

                                                        <Button type="button" className="btn table-td-action" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "#4141e7", color: "white" }}>
                                                            Remark
                                                        </Button>

                                                        {/* <!-- Modal --> */}
                                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-xl">
                                                                <div className="modal-content">
                                                                    <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                                                        <h1 className="modal-title fs-8" id="exampleModalLabel">Remark</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>

                                                                    <div className="modal-body p-">
                                                                        <Form>
                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Number<span className="required-marker" >*</span> </Label>
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
                                                                                            <option value={"option1"}>Call disconnect by customer after Opening</option>
                                                                                            <option value={"option2"}>Repeat</option>
                                                                                            <option value={"option3"}>Spam Call</option>
                                                                                            <option value={"option4"}>Details shared with customer </option>
                                                                                            <option value={"option5"}>Not Answering</option>
                                                                                            <option value={"option5"}>Not interested by mistake dial our number</option>
                                                                                            <option value={"option4"}>Blocked Number Alert</option>
                                                                                            <option value={"option4"}>Blank call</option>
                                                                                            <option value={"option4"}>Language barrier</option>
                                                                                            <option value={"option4"}>Sale </option>
                                                                                            <option value={"option4"}>Not Reachable </option>
                                                                                            <option value={"option4"}>Office test call </option>
                                                                                            <option value={"option4"}>Switched off</option>
                                                                                            <option value={"option4"}>Test call </option>
                                                                                            <option value={"option4"}>Looking for job</option>
                                                                                        </select>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>

                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <FormGroup>
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Remark </Label>
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
                                                                                        <Label for="exampleEmail" className="feedback-modal-label">Call Feedback </Label>
                                                                                        <Input
                                                                                            id="exampleAddress"
                                                                                            name="MailText"
                                                                                            placeholder="Type Your Feedback Here"
                                                                                            type="textarea"
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                        </Form>
                                                                    </div>

                                                                    <div className="modal-footer" style={{ justifyContent: 'center' }}>
                                                                        <button type="button" className="btn btn-primary">Save changes</button>
                                                                    </div>
                                                                    <Row style={{ justifyContent: "center" }}>
                                                                        <Col md={10} >
                                                                            <Table className="align-items-center table-flush" responsive>
                                                                                <thead className="table-thead-main-body">
                                                                                    <tr className="table-thead-tr-headings">
                                                                                        <th scope="col">S.No.</th>
                                                                                        <th scope="col">Remark</th>
                                                                                        <th scope="col">Call FeedBack</th>
                                                                                        <th scope="col">Date</th>
                                                                                        <th scope="col">Added By</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                </tbody>
                                                                            </Table>
                                                                        </Col>
                                                                    </Row>

                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
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

export default Leadstfn
