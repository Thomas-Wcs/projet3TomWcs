import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/dashbord/UserProfile";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import DataTable from "./components/adminPannel/DataTable";
import VideosManagement from "./components/adminPannel/VideosManagement";
import SectionsManagement from "./components/adminPannel/SectionsManagement";
import Homepage2 from "./pages/Homepage2";
import SectionUpdate from "./components/adminPannel/SectionUpdate";
import VideoUpdate from "./components/adminPannel/VideoUpdate";
import SectionAdd from "./components/adminPannel/SectionAdd";
import VideoAdd from "./components/adminPannel/VideoAdd";
import { AuthProvider } from "./context/AuthContext";
import AdminWall from "./utils/AdminWall";
import VideoDescription from "./components/VideoDescription/VideoDescription";

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
            <Route path="/videos/:id" element={<VideoUpdate />} />
            <Route
              path="video_description/:id"
              element={<VideoDescription />}
            />

            <Route path="/newSection" element={<SectionAdd />} />
            <Route path="/newVideo" element={<VideoAdd />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
