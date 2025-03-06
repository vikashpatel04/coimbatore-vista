import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const guides = [
  { id: 1, name: "Ravi Kumar", cost: 1000, rating: 4.5 },
  { id: 2, name: "Anjali Singh", cost: 1200, rating: 4.8 },
  { id: 3, name: "Prakash Menon", cost: 900, rating: 4.2 }
];

const tours = {
  1: { name: "Ooty Hills Tour", price: 5000, image: "/ooty.jpeg" },
  2: { name: "Wildlife Safari", price: 3500, image: "/wildlife.jpg" },
  3: { name: "Temple & Culture Trip", price: 2500, image: "/temple.jpg" }
};

const TourDetails = () => {
  const { id } = useParams();
  const tour = tours[id];
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // Added Phone Number Field
  const [date, setDate] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(null);

  if (!tour) return <p className="text-center mt-10 text-xl">Tour not found!</p>;

  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("You must be logged in to book a tour!");
      navigate("/login");
      return;
    }

    if (!name || !phone || !date || !selectedGuide) {
      alert("Please fill all details!");
      return;
    }

    const trip = {
      tourName: tour.name,
      date,
      phone, // Store phone number
      guide: selectedGuide.name,
      totalCost: tour.price + selectedGuide.cost,
      bookedBy: user.email
    };

    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));

    alert("Booking confirmed!");
    navigate("/my-trips");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold">{tour.name}</h2>
      <img src={tour.image} alt={tour.name} className="w-full h-60 object-cover rounded mt-4" />
      <p className="text-xl mt-4">Price: ₹{tour.price}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Booking Details</h3>
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 mt-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 mt-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 mt-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h3 className="text-xl font-semibold mt-4">Select a Guide</h3>
        <div className="flex gap-4 mt-2">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`p-3 border rounded-lg ${selectedGuide?.id === guide.id ? "bg-green-500 text-white" : "bg-gray-100"}`}
            >
              {guide.name} (₹{guide.cost}, ⭐ {guide.rating})
            </button>
          ))}
        </div>

        <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default TourDetails;
