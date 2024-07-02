import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Footer from "./components/common/Footer";
import Update from "./components/userpage/Update";
import Profile from "./components/userpage/Profile";
import { isAdminOnly, isUserOnly } from "./components/service/UserService";
import AdminDashboard from "./components/adminpage/AdminDashboard";
import UserDashboard from "./components/userpage/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            {/* Check if user is authenticated as admin before rendering admin-only routes */}
            {isAdminOnly && (
              <>
                <Route path="/register" element={<Signup />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/update/:userId" element={<Update />} />
              </>
            )}
            {isUserOnly && (
              <>
                <Route path="/user/dashboard" element={<UserDashboard />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
