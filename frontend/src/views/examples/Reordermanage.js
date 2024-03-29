import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col, FormGroup, Input, Form, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
// import "../assets/css/dashboard.css" //css file

const Index = (props) => {
    const [selectedDate, setSelectedDate] = useState("");
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // for option employee field
    const [selectedOption, setSelectedOption] = useState("");
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
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
                                        <h3 className="mb-0">Re-Order Manage</h3>
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
