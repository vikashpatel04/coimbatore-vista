import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { placesData } from "../data/placesData";

const Home = () => {
  const navigate = useNavigate();
  const [featuredPlaces, setFeaturedPlaces] = useState([]);

  useEffect(() => {
    // Get 3 random places for featured section
    const randomPlaces = [...placesData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setFeaturedPlaces(randomPlaces);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto max-w-6xl">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold mb-6">Welcome to Coimbatore Explorer</h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover the Manchester of South India. From ancient temples to modern malls, 
                adventure parks to serene nature spots - explore the best of Coimbatore with our 
                curated guides and personalized trip plans.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate("/places")}
                  className="px-8 py-3 bg-white text-blue-700 text-lg font-medium rounded-lg hover:bg-blue-50 transition shadow-lg"
                >
                  Explore Places
                </button>
                <button
                  onClick={() => navigate("/recommendations")}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition"
                >
                  Trip Plans
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/hero.jpg" 
                  alt="Coimbatore Cityscape" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">Coimbatore Cityscape</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlaces.map((place) => (
              <div key={place.id} className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
                <div className="h-48 bg-gray-300 relative">
                  {place.images && place.images.length > 0 ? (
                    <img 
                      src={place.images[0]} 
                      alt={place.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-tr-lg">
                    {place.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{place.name}</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex items-center">
                      <span className="text-yellow-500 mr-1">★</span> {place.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{place.description.substring(0, 100)}...</p>
                  <button
                    onClick={() => navigate(`/place/${place.id}`)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Explore by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Tourist', 'Shopping', 'Amusement Park', 'Nature'].map((category) => (
              <div 
                key={category} 
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/places?category=${category}`)}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">
                    {category === 'Tourist' && '🏛️'}
                    {category === 'Shopping' && '🛍️'}
                    {category === 'Amusement Park' && '🎡'}
                    {category === 'Nature' && '🌳'}
                  </span>
                </div>
                <h3 className="text-lg font-medium">{category}</h3>
                <p className="text-gray-600 mt-2">Explore {category.toLowerCase()} destinations</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for your Coimbatore adventure?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Sign up now to create personalized trip plans, save your favorite places, and get exclusive recommendations!
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-white text-blue-700 text-lg font-medium rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Travelers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                comment: "Coimbatore Explorer made our family trip so much easier! The recommendations were spot on, and we discovered places we wouldn't have found otherwise.",
                rating: 5
              },
              {
                name: "Rahul Mehta",
                comment: "As a solo traveler, I found this app incredibly useful. The detailed information about each place helped me plan my itinerary efficiently.",
                rating: 4
              },
              {
                name: "Anjali Patel",
                comment: "I'm a local, but this app showed me hidden gems in my own city! The user interface is intuitive and makes exploring Coimbatore fun.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <div className="flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;