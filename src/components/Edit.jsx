import * as yup from "yup";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { contactContext } from "../context/ContactContext";

const Edit = () => {
  // const [newName, setNewName] = useState(gottenContact.name);
  const { gottenContact, editContact, saveEditedContact } =
    useContext(contactContext);
  const params = useParams();
  useEffect(() => {
    editContact(params.id);
  }, []);
  const schema = yup.object().shape({
    name: yup.string().min(2).max(30).required("Required"),
    username: yup.string().min(2).max(30).required("Required"),
    phone: yup.string().min(3).max(255).required("Required"),
  });
  const navigate = useNavigate();

  return (
    <div>
      <h2>Редактирование</h2>
      {gottenContact ? (
        <Formik
          validationSchema={schema}
          onSubmit={(data, { resetForm }) => {
            saveEditedContact(data);
            // resetForm()
            navigate("/");
          }}
          initialValues={gottenContact}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              style={{ width: "90%", margin: "0 auto" }}
              className="bg-light p-4"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Название услуги</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название услуги"
                  name="name"
                  onChange={handleChange}
                  isValid={!errors.name && touched.name}
                  isInvalid={!!errors.name}
                  value={values.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Название услуги</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название услуги"
                  name="username"
                  onChange={handleChange}
                  isValid={!errors.username && touched.username}
                  isInvalid={!!errors.username}
                  value={values.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail2">
                <Form.Label>Цена услуги</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите цену услуги"
                  name="phone"
                  onChange={handleChange}
                  isValid={!errors.phone && touched.phone}
                  isInvalid={!!errors.phone}
                  value={values.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" а>
                Отправить
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
    // <div>
    //   <FormControl
    //     value={newName}
    //     onChange={(e) => setNewName(e.target.value)}
    //   />

    //   <Button
    //     className="button"
    //     onClick={() => {
    //       editContact({ ...gottenContact, name: newName });
    //       navigate("/");
    //     }}
    //   >
    //     Update
    //   </Button>
    // </div>
  );
};

export default Edit;
