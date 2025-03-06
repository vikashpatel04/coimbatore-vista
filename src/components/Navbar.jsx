import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/tours" className="hover:underline">Tours</Link>
        {user && <Link to="/my-trips" className="hover:underline">My Trips</Link>}
        {user?.isAdmin && <Link to="/admin" className="hover:underline">Admin Page</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-500 px-4 py-1 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
