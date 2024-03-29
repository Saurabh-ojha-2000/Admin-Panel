    import React, { useState } from 'react';
    import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, } from "reactstrap";
    import axios from "axios";
    import { Link, useNavigate } from "react-router-dom";

    const Register = () => {

      const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
      });

      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post("http://localhost:5000/register", values)
          .then(res => {
            if (res.data.Status === "Success") {
              navigate('/login');
            } else {
              alert('something wrong with signup');
            }
          })
          .catch(err => {
            console.log("something went wrong");
          });
      };

      return (
        <>
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4">
                  <small>Sign up with</small>
                </div>
                <div className="text-center">

                  <Button className="btn-neutral btn-icon mr-4" color="default" href="#pablo" onClick={(e) => e.preventDefault()} >
                    <span className="btn-inner--icon"> <img alt="..." src={require("../../assets/img/icons/common/github.svg").default} /> </span>
                    <span className="btn-inner--text">Github</span>
                  </Button>

                  <Button
                    className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()} >
                    <span className="btn-inner--icon"> <img alt="..." src={require("../../assets/img/icons/common/google.svg").default} /> </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>

                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4"> <small>Or sign up with credentials</small> </div>
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Name" type="text" name="name" onChange={(e) => setValues({ ...values, name: e.target.value })} required />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon> <Input placeholder="Email" type="email" autoComplete="new-email"
                        name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} required /></InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon> <Input placeholder="Password" type="password" autoComplete="new-password"
                        name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} required /></InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic"> <small> password strength:{" "} <span className="text-success font-weight-700">strong</span> </small> </div>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" id="customCheckRegister" type="checkbox" required />
                        <label className="custom-control-label" htmlFor="customCheckRegister" >
                          <span className="text-muted"> I agree with the{" "}
                            <a href="#pablo" onClick={(e) => e.preventDefault()}> Privacy Policy </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">Sign Up </Button>
                    <Link to="/login" className="mt-4" color="primary" type="button"> Login </Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </>
      );
    };

    export default Register;
