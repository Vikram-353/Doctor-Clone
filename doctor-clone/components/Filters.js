// import { useState } from "react";
// import "../app/globals.css";

// export default function Filters({ onFilterChange }) {
//   const [location, setLocation] = useState("");
//   const [speciality, setSpeciality] = useState("");
//   const [rating, setRating] = useState("");
//   const [fee, setFees] = useState("");
//   const [mode, setMode] = useState("");

//   const handleApplyFilters = () => {
//     onFilterChange({ location, speciality, rating, fee, mode });
//   };

//   return (
//     <aside className="bg-white w-full sm:w-64 p-4 border:hidden rounded-lg shadow-md  sticky top-4">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">
//         Filter Doctors
//       </h2>

//       <div className="flex flex-col gap-4">
//         <select
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="p-2 border rounded-md text-gray-700"
//         >
//           <option value="">Select Location</option>
//           <option value="Delhi">Delhi</option>
//           <option value="Noida">Noida</option>
//           <option value="Chennai">Chennai</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Bangaluru">Bangaluru</option>
//         </select>
//         <select
//           value={mode}
//           onChange={(e) => setMode(e.target.value)}
//           className="p-2 border rounded-md text-gray-700"
//         >
//           <option value="">Select Mode</option>
//           <option value="Online">Online</option>
//           <option value="Hospital">Hospital Visit</option>
//         </select>

//         <select
//           value={speciality}
//           onChange={(e) => setSpeciality(e.target.value)}
//           className="p-2 border rounded-md text-gray-700"
//         >
//           <option value="">Select Specialty</option>
//           <option value="Cardiologist">Cardiology</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="Pediatrician">Pediatrician</option>
//           <option value="Gynecologist">Gynecologist</option>
//         </select>

//         <select
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           className="p-2 border rounded-md text-gray-700"
//         >
//           <option value="">User Rating</option>
//           <option value="90">90★ & above</option>
//           <option value="80">80★ & above</option>
//           <option value="70">70★ & above</option>
//         </select>

//         <select
//           value={fee}
//           onChange={(e) => setFees(e.target.value)}
//           className="p-2 border rounded-md text-gray-700"
//         >
//           <option value="">Consultation Fees</option>
//           <option value="0-500">Below ₹500</option>
//           <option value="500-1000">₹500 - ₹1000</option>
//           <option value="1000+">Above ₹1000</option>
//         </select>

//         <button
//           onClick={handleApplyFilters}
//           className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </aside>
//   );
// }

import { useState } from "react";
import "../app/globals.css";

export default function Filters({ onFilterChange }) {
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [rating, setRating] = useState("");
  const [fee, setFees] = useState("");
  const [mode, setMode] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({ location, speciality, rating, fee, mode });
  };

  const handleResetFilters = () => {
    setLocation("");
    setSpeciality("");
    setRating("");
    setFees("");
    setMode("");
    onFilterChange({
      location: "",
      speciality: "",
      rating: "",
      fee: "",
      mode: "",
    });
  };

  // return (
  //   <aside className="bg-white w-full sm:w-64 p-4 border:hidden rounded-lg shadow-md sticky top-4">
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-xl font-semibold text-gray-800">Filter Doctors</h2>
  //       <button
  //         onClick={handleResetFilters}
  //         className="text-sm text-teal-700 hover:underline hover:cursor-pointer"
  //       >
  //         Reset
  //       </button>
  //     </div>

  //     <div className="flex flex-col gap-4">
  //       <select
  //         value={location}
  //         onChange={(e) => setLocation(e.target.value)}
  //         className="p-2 border rounded-md text-gray-700"
  //       >
  //         <option value="">Select Location</option>
  //         <option value="Delhi">Delhi</option>
  //         <option value="Noida">Noida</option>
  //         <option value="Chennai">Chennai</option>
  //         <option value="Mumbai">Mumbai</option>
  //         <option value="Bangaluru">Bangaluru</option>
  //       </select>

  //       <select
  //         value={mode}
  //         onChange={(e) => setMode(e.target.value)}
  //         className="p-2 border rounded-md text-gray-700"
  //       >
  //         <option value="">Select Mode</option>
  //         <option value="Online">Online</option>
  //         <option value="Hospital">Hospital Visit</option>
  //       </select>

  //       <select
  //         value={speciality}
  //         onChange={(e) => setSpeciality(e.target.value)}
  //         className="p-2 border rounded-md text-gray-700"
  //       >
  //         <option value="">Select Specialty</option>
  //         <option value="Cardiologist">Cardiology</option>
  //         <option value="Dermatologist">Dermatologist</option>
  //         <option value="Pediatrician">Pediatrician</option>
  //         <option value="Gynecologist">Gynecologist</option>
  //       </select>

  //       <select
  //         value={rating}
  //         onChange={(e) => setRating(e.target.value)}
  //         className="p-2 border rounded-md text-gray-700"
  //       >
  //         <option value="">User Rating</option>
  //         <option value="90">90★ & above</option>
  //         <option value="80">80★ & above</option>
  //         <option value="70">70★ & above</option>
  //       </select>

  //       <select
  //         value={fee}
  //         onChange={(e) => setFees(e.target.value)}
  //         className="p-2 border rounded-md text-gray-700"
  //       >
  //         <option value="">Consultation Fees</option>
  //         <option value="0-500">Below ₹500</option>
  //         <option value="500-1000">₹500 - ₹1000</option>
  //         <option value="1000+">Above ₹1000</option>
  //       </select>

  //       <button
  //         onClick={handleApplyFilters}
  //         className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition hover:cursor-pointer"
  //       >
  //         Apply Filters
  //       </button>
  //     </div>
  //   </aside>
  // );

  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filter Doctors</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-teal-600 hover:underline hover:cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value="">Select Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangaluru">Bangaluru</option>
        </select>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Hospital">Hospital Visit</option>
        </select>

        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value="">Select Specialty</option>
          <option value="Cardiologist">Cardiology</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value="">User Rating</option>
          <option value="90">90★ & above</option>
          <option value="80">80★ & above</option>
          <option value="70">70★ & above</option>
        </select>

        <select
          value={fee}
          onChange={(e) => setFees(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value="">Consultation Fees</option>
          <option value="0-500">Below ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000+">Above ₹1000</option>
        </select>

        <button
          onClick={handleApplyFilters}
          className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition hover:cursor-pointer font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
