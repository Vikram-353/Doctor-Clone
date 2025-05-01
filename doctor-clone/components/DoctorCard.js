import { Info, ThumbsUp, MapPin, Clock, Award, Building } from "lucide-react";
import Image from "next/image";

export default function DoctorCard({ doctor }) {
  return (
    <div className="rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/4 aspect-[4/3] md:aspect-auto">
          <Image
            src={doctor.image || "/api/placeholder/200/200"}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
          {doctor.badge && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-teal-600 to-teal-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <span>{doctor.badge}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>

            <p className="text-teal-600 font-medium flex items-center">
              <Award className="w-4 h-4 mr-2" />
              {doctor.speciality}
            </p>

            <p className="text-gray-600 text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {doctor.experience} YEARS • {doctor.qualification}
            </p>

            <div className="flex flex-col space-y-1 text-gray-600 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                {doctor.location}
              </div>

              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-gray-500" />
                {doctor.clinicName}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="font-medium">{doctor.rating}%</span>
              </div>
              <span className="text-gray-500 text-sm ml-2">
                ({doctor.reviewCount}+ Patients)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
        <div className="mb-3 sm:mb-0">
          <p className="text-xl font-bold text-gray-800">₹{doctor.fee}</p>
          <p className="text-green-600 text-xs flex items-center">
            <Info className="w-3 h-3 mr-1" />
            No Booking Fees
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-6 rounded-md transition-colors w-full sm:w-auto">
          Visit Doctor
        </button>
      </div>
    </div>
  );
}
