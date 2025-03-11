// Updated Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-3xl mr-2">🏞️</span>
            Coimbatore Explorer
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/places" className="hover:text-blue-200 transition-colors">Places</Link>
            <Link to="/recommendations" className="hover:text-blue-200 transition-colors">Plans</Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors">About</Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center hover:text-blue-200 transition-colors">
                  <span className="bg-white text-blue-700 rounded-full p-1 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {user?.username || 'Profile'}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                <Link to="/signup" className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-blue-100 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-3">
            <Link to="/" className="hover:bg-blue-700 p-2 rounded">Home</Link>
            <Link to="/places" className="hover:bg-blue-700 p-2 rounded">Places</Link>
            <Link to="/recommendations" className="hover:bg-blue-700 p-2 rounded">Plans</Link>
            <Link to="/about" className="hover:bg-blue-700 p-2 rounded">About</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-left hover:bg-blue-700 p-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:bg-blue-700 p-2 rounded">Login</Link>
                <Link to="/signup" className="hover:bg-blue-700 p-2 rounded">Sign Up</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
