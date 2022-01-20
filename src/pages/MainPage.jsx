import axios from "axios";
import React, { useEffect } from "react";
import Contact from "../components/Contact";

const MainPage = () => {
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

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <div>
        <Contact />
        {/* on the main page we call the LIST component */}
      </div>
    </div>
  );
};

export default MainPage;
