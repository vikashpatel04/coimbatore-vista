import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Sample attractions database with categories
const attractions = [
  { id: 1, name: "Marudhamalai Temple", category: "religious", duration: 2, description: "Ancient hill temple dedicated to Lord Murugan with panoramic views" },
  { id: 2, name: "Brookefields Mall", category: "shopping", duration: 3, description: "Modern shopping complex with international brands and entertainment" },
  { id: 3, name: "Dhyanalinga Temple", category: "religious", duration: 2.5, description: "Spiritual space designed for meditation and inner well-being" },
  { id: 4, name: "Black Thunder", category: "adventure", duration: 5, description: "Popular water and amusement park with thrilling rides" },
  { id: 5, name: "Ooty Bus Transport", category: "transportation", duration: 8, description: "Day trip to the nearby hill station of Ooty" },
  { id: 6, name: "VOC Park", category: "nature", duration: 1.5, description: "Urban park with boating facilities and children's play area" },
  { id: 7, name: "Kovai Kondattam", category: "adventure", duration: 4, description: "Amusement park with water rides and entertainment options" },
  { id: 8, name: "Siruvani Waterfalls", category: "nature", duration: 3, description: "Natural waterfall known for its pure and sweet water" },
  { id: 9, name: "Isha Yoga Center", category: "wellness", duration: 3, description: "Spiritual retreat offering yoga and meditation programs" },
  { id: 10, name: "Perur Temple", category: "religious", duration: 1.5, description: "Ancient temple with intricate Dravidian architecture" },
];

// Category options for filtering
const categories = [
  { id: "all", label: "All Places" },
  { id: "religious", label: "Temples & Religious" },
  { id: "nature", label: "Nature & Parks" },
  { id: "adventure", label: "Adventure & Fun" },
  { id: "shopping", label: "Shopping" },
  { id: "wellness", label: "Wellness" },
  { id: "transportation", label: "Transportation" },
];

const Customizer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [availableTime, setAvailableTime] = useState(8); // Default 8 hours per day
  const [numDays, setNumDays] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);

  // Check if we came from recommendations with a specific day selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const days = params.get("days");
    if (days && !isNaN(parseInt(days))) {
      setNumDays(parseInt(days));
      setAvailableTime(parseInt(days) * 8); // 8 hours per day
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location]);

  // Calculate total duration whenever selected attractions change
  useEffect(() => {
    const total = selectedAttractions.reduce((sum, attraction) => sum + attraction.duration, 0);
    setTotalDuration(total);
  }, [selectedAttractions]);

  // Filter attractions based on selected category
  const filteredAttractions = selectedCategory === "all" 
    ? attractions 
    : attractions.filter(attraction => attraction.category === selectedCategory);

  // Toggle attraction selection
  const toggleAttraction = (attraction) => {
    if (isAttractionSelected(attraction.id)) {
      setSelectedAttractions(selectedAttractions.filter(item => item.id !== attraction.id));
    } else {
      setSelectedAttractions([...selectedAttractions, attraction]);
    }
  };

  // Check if an attraction is already selected
  const isAttractionSelected = (id) => {
    return selectedAttractions.some(attraction => attraction.id === id);
  };

  // Handle day change
  const handleDayChange = (days) => {
    setNumDays(days);
    setAvailableTime(days * 8); // 8 hours per day
  };

  // Save and view the custom plan
  const handleSavePlan = () => {
    setIsLoading(true);
    
    // Here you would typically save the plan to state/context/backend
    // For now, we'll just navigate with the selected IDs
    const attractionIds = selectedAttractions.map(a => a.id).join(',');
    
    setTimeout(() => {
      navigate(`/custom-plan?attractions=${attractionIds}&days=${numDays}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Customize Your Trip</h2>
          <p className="text-gray-600 mt-2">Create your perfect Coimbatore itinerary by selecting the places you want to visit</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters and Selected */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Trip Duration</h3>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of days:
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 5, 7].map((days) => (
                    <button
                      key={days}
                      onClick={() => handleDayChange(days)}
                      className={`px-3 py-2 rounded-md text-sm ${
                        numDays === days 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {days}
                    </button>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Total available time: <span className="font-semibold">{availableTime} hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Your Selections</h3>
              </div>
              <div className="p-6">
                {selectedAttractions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No attractions selected yet</p>
                ) : (
                  <div>
                    <ul className="space-y-3 mb-4">
                      {selectedAttractions.map((attraction) => (
                        <li key={attraction.id} className="flex justify-between items-center text-sm">
                          <span>{attraction.name}</span>
                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">{attraction.duration}h</span>
                            <button 
                              onClick={() => toggleAttraction(attraction)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between text-sm font-medium border-t pt-3">
                      <span>Total Duration:</span>
                      <span className={totalDuration > availableTime ? "text-red-600" : "text-green-600"}>
                        {totalDuration} / {availableTime} hours
                      </span>
                    </div>
                    {totalDuration > availableTime && (
                      <p className="text-red-600 text-xs mt-2">
                        Your plan exceeds the available time. Consider adding more days or removing some attractions.
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={handleSavePlan}
                  disabled={selectedAttractions.length === 0 || isLoading}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition duration-300 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Save & View Plan"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Attractions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Available Attractions</h3>
              </div>
              
              {/* Categories */}
              <div className="p-4 border-b overflow-x-auto">
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Attractions List */}
              <div className="p-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredAttractions.map(attraction => (
                      <div 
                        key={attraction.id}
                        className={`border rounded-lg p-4 transition-all duration-200 ${
                          isAttractionSelected(attraction.id) 
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{attraction.name}</h4>
                            <span className="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-gray-100 text-gray-700">
                              {attraction.duration} hours
                            </span>
                          </div>
                          <button
                            onClick={() => toggleAttraction(attraction)}
                            className={`p-2 rounded-full ${
                              isAttractionSelected(attraction.id)
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                          >
                            {isAttractionSelected(attraction.id) ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{attraction.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Trip Planning Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Time Allocation</h4>
              <p className="text-gray-600 text-sm">Allow buffer time between attractions for transportation and rest. We recommend 30-60 minutes extra per location.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Weather Considerations</h4>
              <p className="text-gray-600 text-sm">Coimbatore has a pleasant climate year-round, but outdoor activities are best enjoyed during the cooler months of November to February.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Local Transport</h4>
              <p className="text-gray-600 text-sm">Auto-rickshaws and taxis are readily available. Consider booking a car for the day if visiting multiple attractions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;