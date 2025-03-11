import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Sample trip plans
const tripPlans = {
  1: ["Marudhamalai Temple", "Brookefields Mall"],
  2: ["Dhyanalinga Temple", "Black Thunder", "Brookefields Mall"],
  3: ["Ooty Bus Transport", "Black Thunder", "Dhyanalinga Temple", "Marudhamalai Temple"],
  7: ["All Tourist Spots, Hotels, and Treks in Coimbatore"], // Simplified
};

// Additional trip descriptions
const tripDescriptions = {
  1: "Perfect for a quick visit to experience the spiritual and shopping highlights of Coimbatore.",
  2: "A balanced trip combining spirituality, adventure, and shopping.",
  3: "A comprehensive trip including a day trip to Ooty, adventure, and cultural experiences.",
  7: "The complete Coimbatore experience with time to explore everything the region has to offer."
};

const Recommendation = () => {
  const [selectedDays, setSelectedDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = () => {
    // Could add some page transition logic or data fetching here
    setIsLoading(true);
    setTimeout(() => {
      navigate("/places");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Trip Recommendations</h2>
          <p className="text-gray-600 mt-2">Discover the perfect Coimbatore itinerary for your stay</p>
        </div>
        
        {/* Day Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Select the duration of your trip:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 7].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`px-4 py-3 rounded-lg font-medium transition duration-300 ${
                  selectedDays === days 
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {days} Day{days > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Plan */}
        <div className={`rounded-lg border border-gray-200 overflow-hidden transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              Your {selectedDays}-Day Coimbatore Adventure
            </h3>
            <p className="text-gray-600 mt-1">{tripDescriptions[selectedDays]}</p>
          </div>
          
          <div className="bg-white p-6">
            <h4 className="font-medium text-gray-700 mb-3">Recommended Places:</h4>
            <ul className="space-y-2 mb-6">
              {tripPlans[selectedDays].map((place, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{place}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button 
                onClick={handleViewDetails}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : "View Details & Map"}
              </button>
              <Link 
                to="/customize"
                className="flex-1 text-center border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Customize This Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl text-center px-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Why Choose Our Recommendations</h3>
        <p className="text-gray-600 mb-6">
          Our recommendations are based on traveler reviews, optimal routing, and seasonal attractions to give you the best Coimbatore experience within your timeframe.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Local Expertise</h4>
            <p className="text-gray-600 text-sm">Curated by Coimbatore residents who know the city inside out</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Time Optimized</h4>
            <p className="text-gray-600 text-sm">Routes designed to minimize travel time between attractions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Personalized</h4>
            <p className="text-gray-600 text-sm">Easily customize any plan to match your interests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;