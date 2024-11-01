import React from 'react';
import '../../pages/style.css';
import { Container, Row, Col } from 'react-bootstrap';

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
                            machine learning and data science. Along the way I have learned a lot
                            about this field by working on projects in Cosmology, Business
                            Analytics, Healthcare, Earth Science, Finance, and more! In my free time
                            I enjoy running, watching TV, reading, messing with my NVIDIA Jetson,
                            and trying to keep up with the latest trends in tech & AI.
                        </p>
                        <p className="aboutdetails">
                            I am currently a Data Scientist at{' '}
                            <a href="https://www.ae.studio/">AE Studio</a>, applying machine
                            learning to solve real-world problems. I am always looking for
                            opportunities to learn, grow, and use technology to make the world a
                            better place, so feel free to reach out to me if you have any ideas or
                            opportunities. reach out to me via email or LinkedIn!
                        </p>
                        <ul className="skilllist">
                            <Row>
                                <h3>Skills / Stack</h3>
                                <Col md={7}>
                                    <li>Python</li>
                                    <li>JavaScript</li>
                                    <li>PyTorch</li>
                                    <li>Docker</li>
                                    <li>Tableau</li>
                                </Col>
                                <Col md={5}>
                                    <li>LLMs</li>
                                    <li>React Js</li>
                                    <li>PostgreSQL</li>
                                    <li>Pandas</li>
                                    <li>Git/Github</li>
                                </Col>
                            </Row>
                        </ul>
                    </Col>
                    <Col md={5}></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Aboutpage;
