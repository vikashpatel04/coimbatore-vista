import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { placesData } from "../data/placesData";

const ViewPlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = placesData.find((p) => p.id === parseInt(id));

  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [relatedPlaces, setRelatedPlaces] = useState([]);

  useEffect(() => {
    // Check if place exists and has been previously liked
    if (place) {
      const savedLiked = localStorage.getItem(`liked_${place.id}`);
      if (savedLiked) {
        setLiked(JSON.parse(savedLiked));
      }
      
      // Find related places based on category or location
      const related = placesData.filter(p => 
        p.id !== place.id && 
        (p.category === place.category || p.location === place.location)
      ).slice(0, 3);
      
      setRelatedPlaces(related);
    }
  }, [place]);

  const handleLike = () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    localStorage.setItem(`liked_${place.id}`, JSON.stringify(newLikedStatus));
  };

  const handleRating = (value) => {
    setRating(value);
    // Here you could add logic to save the user's rating
  };

  const sharePlace = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: `Check out ${place.name} in ${place.location}!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.log('Error copying to clipboard', error));
    }
  };

  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-2xl text-gray-700">Place not found!</p>
        <button 
          onClick={() => navigate("/places")} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Places
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Navigation and action buttons */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate("/places")} 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center transition duration-300"
        >
          <span className="mr-1">←</span> Back to Places
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleLike}
            className={`px-4 py-2 rounded-lg flex items-center transition duration-300 ${
              liked ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
          
          <button 
            onClick={sharePlace}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Share
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Image */}
        <div className="md:w-1/2">
          <img 
            src={place.images && place.images.length > 0 ? place.images[0] : "/api/placeholder/800/500"} 
            alt={place.name} 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          
          {/* Map toggle */}
          <button 
            onClick={() => setShowMap(!showMap)}
            className="mt-4 px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-300"
          >
            {showMap ? "Hide Map" : "Show on Map"}
          </button>
          
          {/* Map display */}
          {showMap && (
            <div className="mt-2 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map view of {place.name} would display here</p>
            </div>
          )}
        </div>
        
        {/* Right side - Details */}
        <div className="md:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
            <div className="flex items-center mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {place.category}
              </span>
              <span className="ml-2 text-gray-600">{place.location}</span>
            </div>
            
            <div className="flex items-center mt-4">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 font-medium">{place.rating}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-600">{Math.floor(place.rating * 20)}% recommend</span>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <span className="w-8">🕒</span>
                <div>
                  <span className="font-medium">Timing:</span>
                  <span className="ml-2">{place.timing}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="w-8">🎟️</span>
                <div>
                  <span className="font-medium">Ticket:</span>
                  <span className="ml-2">{place.ticket}</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-8">📝</span>
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="mt-1 text-gray-700">{place.description}</p>
                </div>
              </div>
            </div>
            
            {/* User rating section */}
            <div className="mt-6">
              <p className="font-medium mb-2">Rate your experience:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related places section */}
      {relatedPlaces.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPlaces.map((relatedPlace) => (
              <div 
                key={relatedPlace.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300"
                onClick={() => navigate(`/place/${relatedPlace.id}`)}
              >
                <img 
                  src={relatedPlace.images && relatedPlace.images.length > 0 ? relatedPlace.images[0] : "/api/placeholder/800/500"} 
                  alt={relatedPlace.name} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-semibold">{relatedPlace.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">{relatedPlace.location}</span>
                  <span className="flex items-center text-sm">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {relatedPlace.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPlace;