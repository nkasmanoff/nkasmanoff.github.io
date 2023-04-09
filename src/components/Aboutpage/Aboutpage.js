import React from "react";
import "../../pages/style.css";
import { Container, Row, Col } from "react-bootstrap";

function Aboutpage() {
  return (
    <div className="aboutpagebackground">
      <Container>
        <Row className="textbackground">
          <Col md={7}>
            <h3 className="aboutmetext">
              About <span>Me</span>
            </h3>
            <p className="aboutdetails">
              I am passionate about exploring inter-disciplinary applications of
              machine learning and data science. Along the way, the way, I have
              learned a lot about this field by working on projects in
              Cosmology, Business Analytics, Healthcare, Earth Science, and
              more. In my current role, I serve as a Full Stack / Machine
              Learning Engineer for a leading fintech start-up,{" "}
              <a href="https://dwightfunding.com/">Dwight Funding</a>. In my
              free time I enjoy running, watching TV, reading, messing with my NVIDIA Jetson, and trying to
              keep up with the latest trends in tech & AI.
            </p>
            <ul className="skilllist">
              <Row>
                <h3>Skills</h3>
                <Col md={7}>
                  <li>Python</li>
                  <li>JavaScript</li>
                  <li>PyTorch</li>
                  <li>Docker</li>
                  <li>Tableau</li>
                </Col>
                <Col md={5}>
                  <li>React Js</li>
                  <li>Redux Js</li>
                  <li>PostgreSQL</li>
                  <li>Pandas</li>
                  <li>Git/Github</li>
                </Col>
              </Row>
            </ul>
          </Col>
          <Col md={5}>
            <div className="webimage"></div>
            Picture generated with{" "}
            <a href="https://www.craiyon.com/">Craiyon</a>.
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Aboutpage;
