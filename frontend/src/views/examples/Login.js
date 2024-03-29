import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, } from "reactstrap";
import axios from 'axios';

const Login = () => {

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          alert(res.data.Error || 'Something went wrong in the login page');
        }
      })
      .catch(err => {
        console.log('Error in login request:', err);
      });
  }


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">

            <div className="text-muted text-center mt-2 mb-3"> <small>Login with</small> </div>
            <div className="btn-wrapper text-center">

              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()} >
                <span className="btn-inner--icon"> <img alt="..." src={require("../../assets/img/icons/common/github.svg").default} /> </span>
                <span className="btn-inner--text">Github</span>
              </Button>

              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()} >
                <span className="btn-inner--icon"> <img alt="..." src={require("../../assets/img/icons/common/google.svg").default} /> </span>
                <span className="btn-inner--text">Google</span>
              </Button>

            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4"> <small>Or sign in with credentials</small> </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText> <i className="ni ni-email-83" /> </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText> <i className="ni ni-lock-circle-open" /> </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} required />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" id=" customCheckLogin" type="checkbox" required />
                <label className="custom-control-label" htmlFor=" customCheckLogin" >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" >Login</Button>
                <Link to="/register" type="button" className="registerbtn"> Create Account</Link>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()} > <small>Forgot password?</small> </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()} > <small>Create new account</small> </a>
          </Col>
        </Row>
      </Col >
    </>
  );
};
export default Login;