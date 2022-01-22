import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contactContext } from "../context/ContactContext";
import "./contact.css";

const Contact = () => {
  const { contacts, getContact } = useContext(contactContext);

  // For search
  const [value, setValue] = useState("");

  let filteredContacts = (contacts || []).filter((item) => {
    // Convert to lower case for correct search
    return item.name.toLowerCase().includes(value.toLowerCase());
  });

  const navigate = useNavigate();

  const [sortedField, setSortedField] = useState(null);
  let sortedContacts;
  if (contacts) {
    sortedContacts = [...contacts];
  }

  if (sortedField) {
    sortedContacts = (contacts || []).filter((item) => {
      // Convert to lower case for correct search
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    //sorting is done with the sort method
    sortedContacts.sort((a, b) => {
      if (sortedField !== null) {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      }
    });
    filteredContacts = sortedContacts;
  }

  return (
    <>
      <div className="search-sort">
        {/* Search all users from Sibers */}
        <InputGroup className="search-plchldr">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
          />
        </InputGroup>
        {/* Sort contacts by alphabet */}
        <Button
          className="sort"
          type="button"
          onClick={() => setSortedField("name")}
        >
          Sort contacts
        </Button>
      </div>
      <Container>
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* All users from Sibers */}
          {filteredContacts.map((item) => (
            <Card
              key={item.id}
              style={{
                width: "18rem",
                marginTop: "15px",
              }}
            >
              <Card.Body>
                <Card.Title> {item.name}</Card.Title>
                <Card.Title> {item.phone}</Card.Title>
                <Card.Text>{item.username}</Card.Text>
                {console.log(item)}
                <footer>
                  <small className="text-muted">{item.email}</small>
                </footer>
                <Button
                  className="button"
                  onClick={() => {
                    getContact(item);
                    navigate(`/edit/${item.id}`);
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Contact;
