import { Link } from "react-router-dom";

const Home = () => {
  const images = [
    { id: 1, src: "/images/5.png", title: "City View" },
    { id: 2, src: "/images/2.png", title: "Western Ghats" },
    { id: 3, src: "/images/1.png", title: "Ancient Temples" },
    { id: 4, src: "/images/3.jpg", title: "Tea Plantations" },
    { id: 5, src: "/images/4.jpg", title: "Lush Greenery" }
  ];

  const featuredTours = [
    { id: 1, name: "Ooty Hills Tour", price: 5000, image: "/ooty.jpeg" },
    { id: 2, name: "Wildlife Safari", price: 3500, image: "/wildlife.jpg" },
    { id: 3, name: "Temple & Culture Trip", price: 2500, image: "/temple.jpg" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex flex-col items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('/cbe.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">Welcome to Coimbatore Voyage Vista</h1>
          <p className="text-xl mt-3">Explore the beauty of Coimbatore with the best travel packages.</p>
          <div className="mt-6">
            <Link to="/tours">
              <button className="bg-blue-500 text-white px-6 py-3 rounded text-lg shadow-lg hover:bg-blue-600">
                Explore Tours
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Bento Grid Section (5 Images) */}
      <section className="p-6">
        <h2 className="text-4xl font-semibold text-center mb-8">Explore Coimbatore</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 grid-rows-2">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-xl shadow-lg">
            <img src={images[0].src} alt={images[0].title} className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-xl shadow-lg">
            <img src={images[1].src} alt={images[1].title} className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-xl shadow-lg">
            <img src={images[2].src} alt={images[2].title} className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 row-span-1 overflow-hidden rounded-xl shadow-lg">
            <img src={images[3].src} alt={images[3].title} className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-xl shadow-lg">
            <img src={images[4].src} alt={images[4].title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
<section className="p-6 text-center">
  <h2 className="text-4xl font-semibold mb-6">Featured Tours</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {featuredTours.map((tour) => (
      <div key={tour.id} className="border p-4 rounded-lg shadow-lg">
        <div className="w-full aspect-[16/9] overflow-hidden rounded">
          <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-semibold mt-2">{tour.name}</h3>
        <p className="text-gray-600">₹{tour.price}</p>
        <Link to={`/tours/${tour.id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">View Details</button>
        </Link>
      </div>
    ))}
  </div>
  <div className="mt-6">
    <Link to="/tours">
      <button className="bg-gray-700 text-white px-6 py-2 rounded">Show More</button>
    </Link>
  </div>
</section>


      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-10">
        <p>&copy; {new Date().getFullYear()} Coimbatore Voyage Vista. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
