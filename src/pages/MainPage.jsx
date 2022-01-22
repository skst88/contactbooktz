import React, { useEffect, useContext } from "react";
import Contact from "../components/Contact";
import { contactContext } from "../context/ContactContext";

const MainPage = () => {
  const { getContacts } = useContext(contactContext);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <div>
        <Contact />
      </div>
    </div>
  );
};

export default MainPage;
