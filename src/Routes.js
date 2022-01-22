import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactContextProvider from "./context/ContactContext";
import Navibar from "./components/Navibar";
import EditPage from "./pages/EditPage";
import MainPage from "./pages/MainPage";

const MyRoutes = () => {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  );
};

export default MyRoutes;
