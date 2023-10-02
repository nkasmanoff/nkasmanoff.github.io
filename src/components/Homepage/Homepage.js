import React from "react";
import "../../pages/style.css";
import { Container, Row, Col } from "react-bootstrap";
import Text from "../Homepage/Text";
import { AiFillGithub, AiOutlineTwitter, AiFillSmile } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home() {
  return (
    <div className="homepagebackground">
      <Container>
        <Row> </Row>
        <Row> </Row>
        <Row>
          <Col md={8}>
            <h2 className="headtext">Noah Kasmanoff</h2>

            <span></span>
            <Text />
            <button
              onClick={() => {
                window.open("https://github.com/nkasmanoff");
              }}
              className="socialmediabtn"
            >
              <AiFillGithub className="icon" />
            </button>
            <button
              onClick={() => {
                window.open("https://www.linkedin.com/in/noahkasmanoff/");
              }}
              className="socialmediabtn"
            >
              <FaLinkedinIn className="icon" />
            </button>
            <button
              onClick={() => {
                window.open("https://twitter.com/noahpunintended");
              }}
              className="socialmediabtn"
            >
              <AiOutlineTwitter className="icon" />
            </button>
         
          </Col>

          <Col md={4}>
            <center>
            <div className="homepageImg1"></div>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
