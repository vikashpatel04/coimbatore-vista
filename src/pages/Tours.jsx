import { Link } from "react-router-dom";

const tours = [
  { id: 1, name: "Ooty Hills Tour", price: 5000, image: "/ooty.jpeg" },
  { id: 2, name: "Wildlife Safari", price: 3500, image: "/wildlife.jpg" },
  { id: 3, name: "Temple & Culture Trip", price: 2500, image: "/temple.jpg" }
];

const Tours = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Our Featured Tours</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="border p-4 rounded-lg shadow-lg">
            {/* ✅ Maintain 16:9 Aspect Ratio */}
            <div className="w-full aspect-[16/9] overflow-hidden rounded">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold mt-2">{tour.name}</h3>
            <p className="text-gray-600">₹{tour.price}</p>
            <Link to={`/tours/${tour.id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
