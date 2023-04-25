import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import DataTable from "./components/adminPannel/DataTable";
import VideosManagement from "./components/adminPannel/VideosManagement";
import Homepage2 from "./pages/Homepage2";
import userContext from "./context/userContext";

function App() {
  const [userAuth, setUserAuth] = useState("");
  return (
    <userContext.Provider value={(userAuth, setUserAuth)}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage2 />} />
            <Route path="/connexion" element={<ConnectionPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="adminPanel" element={<AdminPanel />}>
              <Route path="usersTable" element={<DataTable />} />
              <Route path="videosTable" element={<VideosManagement />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
