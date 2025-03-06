import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyTrips from "./pages/MyTrips";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

const PrivateAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.isAdmin ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/admin" element={<PrivateAdminRoute><Admin /></PrivateAdminRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
