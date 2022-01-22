import React, { useContext, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contactContext } from "../context/ContactContext";

const Edit = () => {
  const { gottenContact, editContact } = useContext(contactContext);
  const [newName, setNewName] = useState(gottenContact.name);

  const navigate = useNavigate();

  return (
    <div>
      <FormControl
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <Button
        className="button"
        onClick={() => {
          editContact({ ...gottenContact, name: newName });
          navigate("/");
        }}
      >
        Update
      </Button>
    </div>
  );
};

export default Edit;
