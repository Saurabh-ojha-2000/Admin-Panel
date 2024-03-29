import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table, Label } from "reactstrap";
import Header from "components/Headers/Header.js"; // core components
import "../../assets/css/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";


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
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    fetchdata();
    purchasetime();
  }, [])
  const [userdata1, setuserdata1] = useState([]);
  const fetchdata = async () => {
    try {
      const result = await axios('http://localhost:5000/reminder');
      setuserdata1(result.data);
    }
    catch (err) {
      console.log('error cocured in fetching axios from pending-reminder' + err.stack);
    }
  }

  const [puchasetimedata, setPuchasetimedata] = useState([]);
  const purchasetime = async (pt) => {
    try {
      const response = await axios.get(`http://localhost:5000/purchaseTime?ordernumber=${pt}`);
      console.log("Response of purchaseTime is:", response.data); // Log the response data
      setPuchasetimedata(response.data);
    } catch (error) {
      console.log("Error in purchaseTime:", error);
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
                <Form>

                  <div className="pl-lg-4">
                    <Row className="form-control-main-section">
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email" > Care Team </label>
                          <select id="option" value={selectedOption} onChange={handleChange} className="form-control-alternative">
                            <option value={""}>Select Employee</option>
                            <option value={" pallavi@vedobi.com"}>pallavi@vedobi.com</option>
                            <option value={" dr.vishakha@vedobi.com"}>dr.vishakha@vedobi.com</option>
                            <option value={" kiruthika@vedobi.com"}>kiruthika@vedobi.com</option>
                            <option value={" mansi.rajput@vedobi.com"}>mansi.rajput@vedobi.com</option>
                            <option value={" nikita.mukeria@vedobi.com"}>nikita.mukeria@vedobi.com</option>
                          </select>
                          <p>Selected option:{selectedOption}</p>
                        </FormGroup>
                      </Col>
                      <Col> <Button className="form-control-outer-button">Submit </Button></Col>
                    </Row>
                  </div>
                </Form>
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
                    {userdata1.map((user, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <th className="table-tr-th-border" scope="row">{i + 1}</th>
                          <td className="table-tr-th-border">
                            <Button type="button" className="btn table-tr-td-action">
                              <i className="fa fa-pencil" />
                            </Button>

                          </td>
                          <td className="table-tr-th-border">{conertToAsiaTime(user.reminder_date)}	</td>
                          <td className="table-tr-th-border"> {user.ordernumber}</td>


                          {/* Purchase Time Modal  Starts here */}
                          <td className="table-tr-th-border">
                            {/* <!-- Button trigger modal --> */}
                            <Button type="button" className="table-td-purchase-time" data-bs-toggle="modal"
                              data-bs-target={`#exampleModal1-${i}`} style={{ backgroundColor: "#4141e7", color: "white" }}
                              onClick={() => { purchasetime(user?.ordernumber) }}
                            ><i class="fa-solid fa-business-time"></i>
                              {/* {puchasetimedata.length > 0 && puchasetimedata[0].no_purchasetime} */}
                            </Button>

                            {/* <!-- Modal --> */}

                            <div className="modal fade" id={`exampleModal1-${i}`} tabIndex="-1" aria-labelledby={`exampleModalLabel1-${i}`} aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header" style={{ backgroundColor: "antiquewhite" }}>
                                    <h1 className="modal-title fs-8" id={`exampleModalLabel1-${i}`}>Order Summary</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel1-${i}`} style={{ textAlign: "center", margin: "20px" }}>Customer Support Queries Order No. {user.ordernumber}
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
                                        {puchasetimedata.map((item, index) => (
                                          <tr key={index}>
                                            <td className="table-tr-th-border"> <img src={require(`../../assets/img/theme/${item.invoice_image}`)} alt="loading"></img></td>
                                            <td className="table-tr-th-border">{item.product_item}</td>
                                            <td className="table-tr-th-border">{item.p_price}</td>
                                            <td className="table-tr-th-border">{item.total_quantity}</td>
                                            <td className="table-tr-th-border">{item.date_pay}</td>
                                            <td className="table-tr-th-border">{item.amount}</td>
                                          </tr>
                                        ))}
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

                           {/* Follow up Modal  starts here */}
                        <td className="table-tr-th-border">
                          {/* <!-- Button trigger modal --> */}
                          <Button type="button" className="table-td-purchase-fa-history" data-bs-toggle="modal" data-bs-target={`#exampleModal3-${i}`}>
                          <i class="fa-solid fa-repeat"></i>
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
                                        <td className="table-tr-th-border"><Button className="table-td-contact">{userdata1[i]?.ordernumber}</Button></td>
                                        <td className="table-tr-th-border">{userdata1[i]?.name}</td>
                                        <td className="table-tr-th-border">{userdata1[i]?.message}</td>
                                        <td className="table-tr-th-border">{userdata1[i]?.message_reply}</td>
                                        <td className="table-tr-th-border">{userdata1[i]?.feedback_status}</td>
                                        <td className="table-tr-th-border"><Button className="table-td-shipping-status">{userdata1[i]?.status}</Button></td>
                                        <td className="table-tr-th-border">{userdata1[i]?.date}</td>
                                        <td className="table-tr-th-border"><Button className="table-td-createby">{userdata1[i]?.add_by}</Button></td>

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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
