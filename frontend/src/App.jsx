import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import Advert from "./components/advertising/Advert";
import Footer from "./components/footer/Footer";
import DataTable from "./components/adminPannel/DataTable";
import VideosManagement from "./components/adminPannel/VideosManagement";
import Homepage2 from "./pages/Homepage2";

import { AuthProvider } from "./context/AuthContext";
import AdvertManagement from "./components/advertising/AdvertManagement";

function App() {
  return (
    <div className="App">
      <AuthProvider>
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
        <Advert />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
