import { useEffect, useState } from "react";

const Admin = () => {
  const [trips, setTrips] = useState([]);
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    const allTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(allTrips);
  }, []);

  const filteredTrips = trips.filter((trip) =>
    filterUser ? trip.bookedBy.includes(filterUser) : true
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel - Booked Tours</h2>

      <input
        type="text"
        placeholder="Search by user email..."
        className="border p-2 w-full mb-4"
        value={filterUser}
        onChange={(e) => setFilterUser(e.target.value)}
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Tour Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Guide</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No bookings found</td>
            </tr>
          ) : (
            filteredTrips.map((trip, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{trip.tourName}</td>
                <td className="border p-2">{trip.date}</td>
                <td className="border p-2">{trip.guide}</td>
                <td className="border p-2">{trip.bookedBy}</td>
                <td className="border p-2">₹{trip.totalCost}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
