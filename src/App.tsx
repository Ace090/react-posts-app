import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with the list of posts */}
        <Route path="/" element={<PostListPage />} />

        {/* User detail page */}
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
