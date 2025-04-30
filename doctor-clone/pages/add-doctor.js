import "../app/globals.css";
const axios = require("axios");
import { useState } from "react";
import {
  User,
  Map,
  Award,
  Briefcase,
  Home,
  Star,
  Users,
  DollarSign,
  BarChart,
  MessageSquare,
  Video,
  Shield,
  Camera,
  AlertCircle,
} from "lucide-react";

export default function AddDoctorPage() {
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    experience: "",
    location: "",
    qualification: "",
    clinicName: "",
    reviewCount: "",
    fee: "",
    rating: "",
    language: "",
    mode: "",
    badge: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    if (image) {
      form.append("image", image);
    }

    try {
      //   In a real app, this would send data to your backend
      const res = await axios.post(
        "http://localhost:5000/api/add-doctor",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Doctor added successfully!");
      setLoading(false);
      //   Optional: Reset form after successful submission
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add doctor.");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      speciality: "",
      experience: "",
      location: "",
      qualification: "",
      clinicName: "",
      reviewCount: "",
      fee: "",
      rating: "",
      language: "",
      mode: "",
      badge: "",
    });
    setImage(null);
    setPreview(null);
    setStep(1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const FormStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>

      <div className="relative">
        <User className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="name"
          placeholder="Doctor's Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Briefcase className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="speciality"
          placeholder="Speciality (e.g., Cardiologist, Pediatrician)"
          value={formData.speciality}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Award className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification (e.g., MBBS, MD)"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <BarChart className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={nextStep}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );

  const FormStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Practice Details</h2>

      <div className="relative">
        <Home className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="clinicName"
          placeholder="Clinic/Hospital Name"
          value={formData.clinicName}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Map className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="location"
          placeholder="Location/Address"
          value={formData.location}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <DollarSign className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.fee}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <MessageSquare
          className="absolute top-3 left-3 text-gray-400"
          size={18}
        />
        <input
          type="text"
          name="language"
          placeholder="Languages Spoken (e.g., English, Spanish)"
          value={formData.language}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );

  const FormStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Additional Details
      </h2>

      <div className="relative">
        <Star className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Users className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="reviewCount"
          placeholder="Number of Reviews"
          value={formData.reviewCount}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Video className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="mode"
          placeholder="Consultation Mode (e.g., In-person, Video, Both)"
          value={formData.mode}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="relative">
        <Shield className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="badge"
          placeholder="Badge/Verification Status"
          value={formData.badge}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Doctor's Photo
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {preview ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={preview}
                  alt="Doctor preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-grow">
            <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2">
              <Camera size={18} className="mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-teal-500 p-2 rounded-lg">
          <Briefcase className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Doctor</h1>
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md flex items-center ${
            message.includes("success")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.includes("success") ? (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle size={18} className="mr-2" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= stepNumber
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stepNumber}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">
                {stepNumber === 1 && "Basic Info"}
                {stepNumber === 2 && "Practice Details"}
                {stepNumber === 3 && "Additional Info"}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`h-1 w-24 mx-2 ${
                    step > stepNumber ? "bg-teal-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && <FormStep1 />}
        {step === 2 && <FormStep2 />}
        {step === 3 && <FormStep3 />}
      </form>
    </div>
  );
}
