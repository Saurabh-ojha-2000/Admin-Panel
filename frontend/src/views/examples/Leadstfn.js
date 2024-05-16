import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Form, Table, Container, Row, Col, FormGroup, Input, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import axios from "axios";
import CustomPagination from "./CustomPagination";

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

    // function to handle the data of searched data from tbl_payment_orders
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const responseSearch = await axios.get(`http://localhost:5000/search-leadstfn?searchTerm=${searchTerm}&tablename=tbl_servertel_lead`);

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
            const responseDateSearch = await axios.get(`http://localhost:5000/date-search-leadstfn?fromDate=${selectedDateFrom}&toDate=${selectedDateTo}&tablename=tbl_servertel_lead`);
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




    // for option employee field
    const [selectedOption, setSelectedOption] = useState("");
    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        fetch_lead_remark_data();
    }, [])

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

    // route for showing data of Leadstfn-manage

    const fetchdata = async () => {
        try {
            const result = await axios(`http://localhost:5000/leadstfn?page=${currentPage}&limit=${selectedOptionrecordPerPage}`);
            setUserdata(result.data.data);
            setTotalRecords(result.data.totalRecords);
        }
        catch (err) {
            console.log('error cocured in fetching axios from reminder' + err.stack);
        }
    }

    const changeCPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);



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

                                                        <div> <Button type="submit" className="form-control-table-inner-button" style={{ marginTop: "30px" }}>Go</Button> </div>

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
                                        {userdata.length > 0 ? (
                                            userdata.map((user, i) => {
                                                return (
                                                    <tr className="text-center" key={i}     >
                                                        <th className="table-tr-th-border" scope="row" >{i + 1}</th>
                                                        <td className="table-tr-th-border"><Button className="table-td-contact">{user.client_number}</Button></td>
                                                        <td className="table-tr-th-border"><Button className="table-td-createby">{user.status}</Button></td>
                                                        <td className="table-tr-th-border"> {user.service || '-'}</td>
                                                        <td className="table-tr-th-border">{conertToAsiaTime(user?.startdatetime || 'NA')}</td>
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
                                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                                                placeholder="9210XXXXXX"
                                                                                                type="number"
                                                                                            // defaultValue={user.client_number}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </Col>

                                                                                    <Col md={6}>
                                                                                        <FormGroup>
                                                                                            <Label for="exampleEmail" className="feedback-modal-label"> Status<span className="required-marker" >*</span> </Label>
                                                                                            <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
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
                                                );
                                            })
                                        ) : (
                                            <tr className="text-center">
                                                <th className="table-tr-th-border" colSpan="20" style={{ backgroundColor: "bisque" }}>
                                                    No Results Found
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                                <CustomPagination totalPages={Math.ceil(totalRecords / (selectedOptionrecordPerPage || 25))} currentPage={currentPage} onPageChange={changeCPage} />

                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </Container >
        </>
    );
};

export default Leadstfn
