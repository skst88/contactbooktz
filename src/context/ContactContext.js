import React, { useReducer } from "react";
import axios from "axios";

export const contactContext = React.createContext();

//our constants
const GET_CONTACT = "GET_CONTACT";
const EDIT_CONTACT = "EDIT_CONTACT";

const INIT_STATE = {
  contacts: JSON.parse(localStorage.getItem("CONTACTS")), //take from our localstorage
  gottenContact: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CONTACT": {
      return { ...state, gottenContact: action.payload };
    }
    case "EDIT_CONTACT": {
      const filteredContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
      return { ...state, contacts: [...filteredContacts, action.payload] };
    }
    default:
      return state;
  }
};

const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //when clicked, we need to know the id

  const getContact = (id) => {
    dispatch({
      type: GET_CONTACT,
      payload: id,
    });
  };

  //
  const editContact = (newContact) => {
    dispatch({
      type: EDIT_CONTACT,
      payload: newContact,
    });
  };

  const saveEditedContact = async (editContact) => {
    try {
      await axios.patch(`users/${editContact.id}`, editContact);
      getContact();
    } catch (e) {
      console.log(e);
    }
  };

  const getContacts = () => {
    //save data from api to localstorage for further work with data
    axios
      .get("https://demo.sibers.com/users")
      .then((response) => {
        localStorage.setItem("CONTACTS", JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        gottenContact: state.gottenContact,
        saveEditedContact,
        getContact,
        editContact,
        getContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactContextProvider;
