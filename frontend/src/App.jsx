import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Banderole from "./components/descriptiveZoom/Banderole";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<ConnectionPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminPanel/*" element={<AdminPanel />} />
          <Route path="/banderole" element={<Banderole />} />
          <Route path="/advert" element={<Advert />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
