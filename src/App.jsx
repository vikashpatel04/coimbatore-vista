// App.jsx - Updated with Footer component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Places from "./pages/Places";
import ViewPlace from "./pages/ViewPlace";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Customizer from "./pages/Customizer";
import CustomPlan from "./pages/CustomPlan";
import { AppProvider } from "./context/AppContext"; // New context provider

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/places" element={<Places />} />
              <Route path="/places/:id" element={<ViewPlace />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/customize" element={<Customizer />} />
              <Route path="/custom-plan" element={<CustomPlan />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
