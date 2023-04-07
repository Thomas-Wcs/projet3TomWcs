import React from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Banderole from "./components/Banderole";
import Lists from "./components/Lists";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banderole />
              <Lists title="Section 1" />
              <Lists title="Section 2" />
              <Lists title="Section 3" />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
