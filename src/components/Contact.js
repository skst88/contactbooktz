import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contactContext } from "./context/ContactContext";
import { AiOutlineContacts } from "react-icons/ai";

const Contact = () => {
  //POCHEMU NE RABOTAET???
  const { contacts, getContact } = useContext(contactContext);
  // console.log(contacts);
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
    <div>
      <Container>
        <h1>
          <AiOutlineContacts
            style={{ width: "70px", height: "70px", marginRight: "40px" }}
          />
          Contact Book{" "}
        </h1>
        <InputGroup size="lg">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="search"
            onChange={(e) => setValue(e.target.value)}
          />
        </InputGroup>

        {/* //Sort */}

        <button type="button" onClick={() => setSortedField("name")}>
          alphabet
        </button>

        <ul>
          {filteredContacts.map((item) => (
            <ListGroup
              className="m-3 list-group"
              as="ol"
              numbered
              key={item.id}
            >
              <ListGroup.Item className="list-group-item">
                {item.name}
                <div className="list-group-item-buttons">
                  <Button
                    className="button"
                    onClick={() => {
                      getContact(item);
                      navigate("/edit");
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Contact;
