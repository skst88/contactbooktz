import { AiFillRead } from "react-icons/ai";
import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Navibar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Nav.Link href="/">
          <AiFillRead
            style={{ width: "40px", height: "auto", color: "black" }}
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Contact Book</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
