import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { placesData } from "../data/placesData";

const Places = () => {
  const { isPlaceLiked, toggleLike } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filters, setFilters] = useState({
    category: categoryFilter || "",
    search: "",
    sortBy: "name"
  });

  useEffect(() => {
    setPlaces(placesData);
  }, []);

  useEffect(() => {
    let result = [...places];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(place => place.category === filters.category);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(place => 
        place.name.toLowerCase().includes(searchLower) || 
        place.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (filters.sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
    
    setFilteredPlaces(result);
  }, [places, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleLikeToggle = (e, place) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(place);
  };

  const categories = ["Tourist", "Shopping", "Amusement Park", "Nature", "Transport", "Recreation"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Explore Coimbatore</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search places..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">{filteredPlaces.length} places found</p>
        </div>
        
        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <Link 
              to={`/places/${place.id}`} 
              key={place.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-48 bg-gray-300 relative">
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-tr-lg">
                  {place.category}
                </div>
                <button
                  onClick={(e) => handleLikeToggle(e, place)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                >
                  {isPlaceLiked(place.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{place.name}</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex items-center">
                    <span className="text-yellow-500 mr-1">★</span> {place.rating}
                  </span>
                </div>
                <p className="text-gray-500 mb-2">{place.location}</p>
                <p className="text-gray-600 mb-4">{place.description.substring(0, 100)}...</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>📍 {place.category}</div>
                  <div>{place.timing}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No places found matching your criteria.</p>
            <button
              onClick={() => setFilters({ category: "", search: "", sortBy: "name" })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;