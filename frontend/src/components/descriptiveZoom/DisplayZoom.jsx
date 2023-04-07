import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../footer/Footer";
import Banderole from "./Banderole";

function DisplayZoom() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Banderole />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default DisplayZoom;
