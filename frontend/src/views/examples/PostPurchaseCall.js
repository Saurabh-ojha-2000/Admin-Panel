import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table, } from "reactstrap";
import Header from "components/Headers/Header.js";  // core components
import "../../assets/css/profile.css";
import { useState } from "react";

function PostPurchaseCall()  {
    // for remainder date field
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
        <Container className='mt--7' fluid>
          <div className="row-profile-section">
            <Col className='order-xl-1' xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className='align-items-center'>
                    <Col xs="8">
                      <h3 className='mb-0'>Post Purchase Call Manage</h3>
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
                        <div>
                          <Button className="form-control-table-inner-button-leads-tfn" style={{ backgroundColor: 'blue' }}>Submit </Button>
                        </div>
                      </Row>
                    </div>
                  </Form>
                  <hr />
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="table-thead-main-body">
                      <tr className="table-thead-tr-headings text-center">
                        <th scope="col">S.no</th>
                        <th scope="col">Order No.</th>
                        <th scope="col">Action</th>
                        <th scope="col">Customer Information</th>
                        <th scope="col">Assigned Date</th>
                        <th scope="col">Update Date</th>
                        <th scope="col">Assigned By	</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Task status</th>
                        <th scope="col">Task Category</th>
                        <th scope="col">Completion date	</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Remark assignee</th>
                        <th scope="col">Purchase Time	</th>
                        <th scope="col"># of Follow up</th>
                      </tr>
                    </thead>
                    <tbody>
  
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

export default PostPurchaseCall
