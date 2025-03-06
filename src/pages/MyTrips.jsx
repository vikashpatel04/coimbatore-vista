import { useState } from "react";

const MyTrips = () => {
  const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  const [trips, setTrips] = useState(storedTrips);

  const handleCancel = (index) => {
    const updatedTrips = [...trips];
    updatedTrips.splice(index, 1); // Remove selected trip
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    alert("Trip cancelled successfully!");
  };

  if (trips.length === 0) return <p className="text-center mt-10 text-xl">No booked trips.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">My Trips</h2>
      <div className="grid gap-4">
        {trips.map((trip, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{trip.tourName}</h3>
            <p>Date: {trip.date}</p>
            <p>Phone: {trip.phone}</p>
            <p>Guide: {trip.guide}</p>
            <p>Total Cost: ₹{trip.totalCost}</p>
            <button onClick={() => handleCancel(index)} className="bg-red-600 text-white px-4 py-2 rounded mt-2">
              Cancel Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
