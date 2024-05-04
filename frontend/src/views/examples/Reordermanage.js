import { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col, FormGroup, Input, Form, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import CustomPagination from "./CustomPagination";
import axios from "axios";
// import "../assets/css/dashboard.css" //css file

const Index = (props) => {
    const [selectedDate, setSelectedDate] = useState("");
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    
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

//   useEffect(() => {
//     fetchcustomerdata();
//   }, [currentPage])

//   // route for showing data of Re-orders-manage from index route and tbl_payment_orders table
//   const fetchcustomerdata = async () => {
//     try {
//       const result = await axios.get(`http://localhost:5000/Index?page=${currentPage}&limit=${selectedOptionrecordPerPage}`);
//       setUserdata(result.data.data);
//       setTotalRecords(result.data.totalRecords);
//     } catch (err) {
//       console.log("error fetching in api of Index from database", err.stack);
//     }
//   };


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

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(totalRecords / recordPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);



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

                            <CustomPagination totalPages={Math.ceil(totalRecords / (selectedOptionrecordPerPage || 25))} currentPage={currentPage} onPageChange={changeCPage} />

                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default Index;
