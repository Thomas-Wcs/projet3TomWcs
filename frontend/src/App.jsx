import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/dashbord/UserProfile";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import Advert from "./components/advertising/Advert";
import Footer from "./components/footer/Footer";
import DataTable from "./components/adminPannel/DataTable";
import VideosManagement from "./components/adminPannel/VideosManagement";
import SectionsManagement from "./components/adminPannel/SectionsManagement";
import Homepage2 from "./pages/Homepage2";
import SectionUpdate from "./components/adminPannel/SectionUpdate";
import SectionAdd from "./components/adminPannel/SectionAdd";

import { AuthProvider } from "./context/AuthContext";
import AdminWall from "./utils/AdminWall";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage2 />} />
            <Route path="/connexion" element={<ConnectionPage />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile/userid" element={<UserProfile />} />
            </Route>
            <Route
              path="adminPanel"
              element={
                <AdminWall>
                  <AdminPanel />
                </AdminWall>
              }
            >
              <Route path="usersTable" element={<DataTable />} />
              <Route path="videosTable" element={<VideosManagement />} />
              <Route path="sectionsTable" element={<SectionsManagement />} />
            </Route>
            <Route path="/sections/:id" element={<SectionUpdate />} />
            <Route path="/newSection" element={<SectionAdd />} />
          </Routes>
        </Router>
        <Advert />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
