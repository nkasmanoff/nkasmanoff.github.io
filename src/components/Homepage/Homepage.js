import React from 'react';
import '../../pages/style.css';
import { Container, Row, Col } from 'react-bootstrap';
import Text from '../Homepage/Text';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';

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
                                window.open('https://github.com/nkasmanoff');
                            }}
                            className="socialmediabtn"
                        >
                            <AiFillGithub className="icon" />
                        </button>
                        <button
                            onClick={() => {
                                window.open('https://www.linkedin.com/in/noahkasmanoff/');
                            }}
                            className="socialmediabtn"
                        >
                            <FaLinkedinIn className="icon" />
                        </button>
                        <button
                            onClick={() => {
                                window.open('https://twitter.com/noahpunintended');
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
            <Container>
                <Row className="textbackground">
                    <Col md={7}>
                        <h3 className="aboutmetext">
                            About <span>Me</span>
                        </h3>
                        <p className="aboutdetails">
                            I am passionate about exploring inter-disciplinary applications of
                            machine learning and data science. Along the way, I have learned a lot
                            about this field by working on projects in Cosmology, Business
                            Analytics, Healthcare, Earth Science, Finance, and more! In my free time
                            I enjoy running, watching TV, reading, messing with my Raspberry Pis,
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
                    <Col md={5}>
                        <Row>
                            <a href="https://github.com/nkasmanoff/pi-card" target="">
                                <img
                                    src="https://trendshift.io/api/badge/repositories/10159"
                                    alt="nkasmanoff%2Fpi-card | Trendshift"
                                    width="250"
                                    height="55"
                                    border="0"
                                    // center the image
                                    style={{ display: 'block', margin: 'auto' }}
                                />
                            </a>
                        </Row>
                        <Row>
                            <iframe
                                title="latest"
                                height="454"
                                width="300"
                                frameborder="0"
                                allowtransparency="true"
                                scrolling="no"
                                src="https://www.strava.com/athletes/84024114/latest-rides/50bb16f4ea78240738ca023b14a9caba581f81f0"
                            ></iframe>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
