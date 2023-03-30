import VideosManagement from "../components/adminPannel/VideosManagement";
import UserManagement from "../components/adminPannel/UserManagement";

export default function Home() {
  return (
    <header className="App-header">
      <UserManagement />
      <VideosManagement />
    </header>
  );
}
