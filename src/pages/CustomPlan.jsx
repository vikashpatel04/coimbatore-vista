import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Sample attractions database (same as in Customizer.jsx)
const attractions = [
  { id: 1, name: "Marudhamalai Temple", category: "religious", duration: 2, description: "Ancient hill temple dedicated to Lord Murugan with panoramic views", address: "Kovai, Coimbatore, Tamil Nadu 641043", image: "temple.jpg" },
  { id: 2, name: "Brookefields Mall", category: "shopping", duration: 3, description: "Modern shopping complex with international brands and entertainment", address: "67-71, Brookefields, Poonamallee High Rd, Coimbatore, Tamil Nadu 641001", image: "mall.jpg" },
  { id: 3, name: "Dhyanalinga Temple", category: "religious", duration: 2.5, description: "Spiritual space designed for meditation and inner well-being", address: "Isha Yoga Center, Velliangiri Foothills, Coimbatore, Tamil Nadu 641114", image: "dhyanalinga.jpg" },
  { id: 4, name: "Black Thunder", category: "adventure", duration: 5, description: "Popular water and amusement park with thrilling rides", address: "Mettupalayam Road, Coimbatore, Tamil Nadu 641305", image: "blackthunder.jpg" },
  { id: 5, name: "Ooty Bus Transport", category: "transportation", duration: 8, description: "Day trip to the nearby hill station of Ooty", address: "Coimbatore to Ooty", image: "ooty.jpg" },
  { id: 6, name: "VOC Park", category: "nature", duration: 1.5, description: "Urban park with boating facilities and children's play area", address: "Trichy Rd, Ram Nagar, Coimbatore, Tamil Nadu 641018", image: "vocpark.jpg" },
  { id: 7, name: "Kovai Kondattam", category: "adventure", duration: 4, description: "Amusement park with water rides and entertainment options", address: "Siruvani Main Road, Coimbatore, Tamil Nadu 641114", image: "kovai.jpg" },
  { id: 8, name: "Siruvani Waterfalls", category: "nature", duration: 3, description: "Natural waterfall known for its pure and sweet water", address: "Boluvampatti, Coimbatore, Tamil Nadu 641114", image: "siruvani.jpg" },
  { id: 9, name: "Isha Yoga Center", category: "wellness", duration: 3, description: "Spiritual retreat offering yoga and meditation programs", address: "Velliangiri Foothills, Ishana Vihar Post, Coimbatore, Tamil Nadu 641114", image: "isha.jpg" },
  { id: 10, name: "Perur Temple", category: "religious", duration: 1.5, description: "Ancient temple with intricate Dravidian architecture", address: "Perur, Coimbatore, Tamil Nadu 641010", image: "perur.jpg" },
];

// Optimally group attractions by day
const optimizeItinerary = (selectedAttractions, days) => {
  // Sort attractions by duration (longest first)
  const sortedAttractions = [...selectedAttractions].sort((a, b) => b.duration - a.duration);
  
  // Initialize days array with empty arrays
  const itinerary = Array(days).fill().map(() => ({
    attractions: [],
    totalDuration: 0
  }));
  
  // Greedy algorithm to distribute attractions
  sortedAttractions.forEach(attraction => {
    // Find the day with the least duration
    const dayIndex = itinerary.reduce(
      (minIndex, day, currentIndex, arr) => 
        day.totalDuration < arr[minIndex].totalDuration ? currentIndex : minIndex, 
      0
    );
    
    // Add attraction to that day
    itinerary[dayIndex].attractions.push(attraction);
    itinerary[dayIndex].totalDuration += attraction.duration;
  });
  
  return itinerary;
};

const CustomPlan = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [itinerary, setItinerary] = useState([]);
  const [numDays, setNumDays] = useState(1);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchPlan = () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(location.search);
        const attractionIds = params.get("attractions")?.split(",").map(id => parseInt(id));
        const days = parseInt(params.get("days") || "1");
        
        if (!attractionIds || attractionIds.length === 0) {
          setError("No attractions selected. Please go back and select attractions.");
          setIsLoading(false);
          return;
        }
        
        setNumDays(days);
        
        // Find the selected attractions
        const selectedAttractions = attractions.filter(attraction => 
          attractionIds.includes(attraction.id)
        );
        
        // Create optimized itinerary
        const optimizedPlan = optimizeItinerary(selectedAttractions, days);
        setItinerary(optimizedPlan);
        
        // Simulate loading delay
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error creating plan:", err);
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    };
    
    fetchPlan();
  }, [location]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-xl font-medium text-gray-700 mb-1">Creating Your Perfect Itinerary</h2>
          <p className="text-gray-500">Optimizing your selections for the best experience...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-medium text-gray-800 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">Please go back and make sure you've selected attractions for your trip.</p>
          <Link 
            to="/customize" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Back to Customizer
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Personalized Coimbatore Adventure</h2>
          <p className="text-gray-600 mt-2">{numDays}-Day custom itinerary based on your preferences</p>
        </div>
        
        {/* Itinerary */}
        <div className="mb-8">
          {itinerary.map((day, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Day {index + 1}</h3>
                <p className="text-blue-100 text-sm">Total duration: {day.totalDuration} hours</p>
              </div>
              <div className="p-6">
                {day.attractions.length === 0 ? (
                  <p className="text-gray-500 italic">Free day - explore on your own or rest</p>
                ) : (
                  <div className="space-y-6">
                    {day.attractions.map((attraction, attrIndex) => (
                      <div key={attraction.id} className="border-b pb-5 last:border-b-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="bg-gray-200 h-32 w-32 rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-4 flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center">
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mr-2">
                                    {attrIndex + 1}
                                  </span>
                                  <h4 className="font-medium text-gray-800 text-lg">{attraction.name}</h4>
                                </div>
                                <span className="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                  {attraction.duration} hours
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                                {attrIndex === 0 ? "Start here" : `+${attrIndex} hour${attrIndex > 1 ? "s" : ""} from start`}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-2">{attraction.description}</p>
                            <div className="mt-3 text-sm text-gray-600">
                              <p><strong>Address:</strong> {attraction.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link 
            to="/customize" 
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-300 text-center"
          >
            Edit Itinerary
          </Link>
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition duration-300"
          >
            Print / Save PDF
          </button>
        </div>
        
        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Trip Notes</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Transportation:</strong> This itinerary is optimized for time but doesn't account for travel between locations. We recommend allowing 30-60 minutes for travel between attractions.
            </p>
            <p>
              <strong>Meals:</strong> Plan for meals between attractions. Coimbatore is famous for its South Indian cuisine - try local specialties like Coimbatore-style biryani and filter coffee.
            </p>
            <p>
              <strong>Weather:</strong> Check the weather forecast before your trip. Coimbatore generally has a pleasant climate, but it's good to be prepared.
            </p>
            <p>
              <strong>Need Help?</strong> Our local guides are available for personalized assistance. Contact our support team for booking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPlan;