import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

function ProjectCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const size = props.isBlog ? "lg" : "lg";
  return (
    <>
      <Card className="project-card-view">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          className="card-img"
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>

          <Button className="viewbtn" variant="primary" onClick={handleShow}>
            See more
          </Button>
          {"\n"}
          {"\n"}
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        closeButton={true}
        size={size}
      >
        <Card className="project-card-view">
          <Card.Img variant="top" src={props.imgPath} alt="card-img" />
          <Card.Body>
          <center>
          <h2>{props.title}</h2>
          </center>
            <Card.Text style={{ textAlign: "justify" }}>
              {props.descriptionFull}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}
export default ProjectCard;
