import React from 'react'
import '../../pages/style.css';
import { Container, Row, Col } from 'react-bootstrap'
import Text from '../Homepage/Text'
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillSmile,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home() {
  return (
    <div className='homepagebackground'>
      <Container>
        <Row> </Row>
        <Row> </Row>
        <Row>
          <Col md={8}>
            <h2 className='headtext'>Noah Kasmanoff</h2>

            <span></span>
            <Text />
            <button onClick={() => {
              window.open("https://github.com/nkasmanoff");
            }}
              className='socialmediabtn'><AiFillGithub className='icon' /></button>
            <button onClick={() => {
              window.open("https://www.linkedin.com/in/noahkasmanoff/");
            }}
              className='socialmediabtn'><FaLinkedinIn className='icon' /></button>
            <button onClick={() => {
              window.open("https://twitter.com/noahpunintended");
            }}
              className='socialmediabtn'><AiOutlineTwitter className='icon' /></button>
            <button onClick={() => {
              window.open("https://huggingface.co/nkasmanoff");
            }}
              className='socialmediabtn'><AiFillSmile className='icon' /></button>
          </Col>

          <Col md={4}>
            <div className="homepageImg1">
            </div>
   
          </Col>
        
 
        </Row>
        <hr className='line' />
        <p className='copyright'>© Copyright 2023.
        <br /> 
        Graciously adapted from <span><a href="https://github.com/rahulvijay81/portfolio">rahulvijay</a></span></p>
      </Container>
    </div>
  )
}

export default Home