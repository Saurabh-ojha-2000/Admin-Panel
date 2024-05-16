import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, Form, Progress, Table, Container, Row, Col, FormGroup, Input, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // header 
import axios from "axios";
import CustomPagination from "./CustomPagination";

function Leadsweb() {

  // function to handle the data of searched data from tbl_payment_orders
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseSearch = await axios.get(`http://localhost:5000/search-leadWW/Fb?searchTerm=${searchTerm}&tablename=tbl_lead_fb_webwhatsapp`);

      if (responseSearch.data && responseSearch.data.length > 0) {
        setLeadfbwebdata(responseSearch.data); // Update userdata state with search results
        setTotalRecords(responseSearch.data.length); // Assuming totalRecords should be the length of the search results

      } else {
        // No search results found
        setLeadfbwebdata([]); // Clear userdata state
        setTotalRecords(0); // Reset totalRecords to 0
        console.log("No search results found");
      }

    } catch (error) {
      console.error("Error Fetching search results:", error);
    }

  };


  // for option employee field
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange1 = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    fetch_lead_fbweb_purchasetime();
  }, [])

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


  // Pagination
  const [leadfbwebdata, setLeadfbwebdata] = useState([]);
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

  // route for showing data of lead-fb-web-manage

  const fetchdata = async () => {
    try {
      const result = await axios(`http://localhost:5000/lead-fb-web?page=${currentPage}&limit=${selectedOptionrecordPerPage}`);
      setLeadfbwebdata(result.data.data);
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
                            placeholder="9210XXXXXX"
                            type="number"
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail" className="feedback-modal-label"> Status<span className="required-marker" >*</span> </Label>
                          <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
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
                          <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
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

                    <div className="modal-footer" style={{ justifyContent: 'center' }}>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </Form>
                </div>

                <hr />
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
                    <Col lg="4" style={{ position: " absolute", right: "0%" }}>
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
                    {leadfbwebdata.length > 0 ? (
                      leadfbwebdata.map((user, i) => {
                        return (
                          <tr className="text-center" key={i}>
                            <th className="table-tr-th-border" scope="row" >{i + 1}</th>
                            <td className="table-tr-th-border"><Button className="table-td-contact">{user.number}</Button></td>
                            <td className="table-tr-th-border"><Button className="table-td-action p-1">{user.source}</Button></td>

                            {/* Purchase Time Modal  Starts here */}
                            <td className="table-tr-th-border">
                              {/* <!-- Button trigger modal --> */}
                              <Button type="button" className="table-td-purchase-time" data-bs-toggle="modal"
                                data-bs-target={`#exampleModal1-${i}`} style={{ backgroundColor: "#4141e7", color: "white" }}
                                onClick={() => {
                                  setPurchaseTime(user?.number)
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
                                            <div className="element-index-heading" key={i}>Order Summary<strong>{pt.number}</strong></div>

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
                              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                  <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                      <h1 className="modal-title fs-8" id="exampleModalLabel">FeedBack</h1>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ textAlign: "center", margin: "20px" }}>Customer Support Queries Related To- <b>{user.number}</b>

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
                                                  placeholder="9210XXXXXX"
                                                  type="number"
                                                />
                                              </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                              <FormGroup>
                                                <Label for="exampleEmail" className="feedback-modal-label"> Status<span className="required-marker" >*</span> </Label>
                                                <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
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
                                                <select id="option" value={selectedOption} onChange={handleChange1} className="form-control-alternative">
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

                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red", color: "white" }}>Close</button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                          </div>
                                        </Form>
                                      </div>
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
                        <th className="table-tr-th-border" colSpan="14" style={{ backgroundColor: "bisque" }}>
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
      </Container>
    </>
  );
};

export default Leadsweb;
