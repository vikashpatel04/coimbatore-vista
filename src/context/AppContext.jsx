import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [user, setUser] = useState(null);

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
    
    // Load liked places
    const savedLikedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];
    setLikedPlaces(savedLikedPlaces);
  }, []);

  // Handle likes
  const toggleLike = (place) => {
    if (!isLoggedIn) {
      alert("Please login to like places");
      return false;
    }

    const placeId = place.id;
    const newLikedPlaces = [...likedPlaces];
    const index = newLikedPlaces.findIndex(p => p.id === placeId);
    
    if (index === -1) {
      // Add to liked places
      newLikedPlaces.push(place);
    } else {
      // Remove from liked places
      newLikedPlaces.splice(index, 1);
    }
    
    setLikedPlaces(newLikedPlaces);
    localStorage.setItem("likedPlaces", JSON.stringify(newLikedPlaces));
    return true;
  };

  // Check if a place is liked
  const isPlaceLiked = (placeId) => {
    return likedPlaces.some(place => place.id === placeId);
  };

  // Login function
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
      return false;
    }

    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    setUser(storedUser);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    setUser(null);
  };

  // Signup function
  const signup = (username, password, email) => {
    if (!username || !password) {
      return false;
    }

    const newUser = { username, password, email };
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        likedPlaces,
        toggleLike,
        isPlaceLiked,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
