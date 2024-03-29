import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";// react component that copies the given text inside your clipboard
import {  Card,  CardHeader,  CardBody,  Container,  Row,  Col,  UncontrolledTooltip,  Button,} from "reactstrap";
import Header from "components/Headers/Header.js";
import "../../assets/css/calls.css"

const Icons = () => {
  const [copiedText, setCopiedText] = useState();
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">calls</h3>
              </CardHeader>
              <CardBody>
                <div className="icons-main-section">
                  <Row className="icons-main-section-outer">
                    <label className="icons-main-section-label text-center">Customer Number<span className="required-marker">*</span>
                      <input type="search" placeholder="Customner Number" className="icons-main-section-input-field"></input>
                    </label>
                  </Row>
                </div>
                <hr />
                <div className="icons-main-section-outer-button">
                <Button className="icons-main-section-inner-button">Call</Button></div>

              </CardBody>
               
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
