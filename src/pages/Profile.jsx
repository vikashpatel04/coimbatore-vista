import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { likedPlaces, toggleLike } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to remove a place from liked places
  const removeLikedPlace = (place) => {
    toggleLike(place);
  };

  return (
    <div className="mt-5 p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          {likedPlaces.length}
        </div>
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-800">My Favorite Places</h2>
          <p className="text-gray-600">Keep track of places you want to visit</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-pulse flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      ) : (
        <>
          {likedPlaces.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {likedPlaces.map((place) => (
                <li key={place.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition-colors">
                  <Link to={`/places/${place.id}`} className="font-medium text-gray-800 hover:text-blue-600">{place.name}</Link>
                  <button 
                    onClick={() => removeLikedPlace(place)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${place.name} from liked places`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="mt-4 text-gray-600 font-medium">You haven't liked any places yet</p>
              <p className="mt-2 text-gray-500">Explore the app and start adding places to your favorites!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;