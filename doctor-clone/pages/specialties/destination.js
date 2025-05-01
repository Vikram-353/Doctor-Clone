import "../../app/globals.css";
import { ChevronDown, Filter, Phone, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { listDoctors } from "../../utils/api";
import contact_image from "../../public/contact_image.png";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import DoctorCard from "../../components/DoctorCard";

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Experience");
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [filters, setFilters] = useState({});
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageSize = 10;
  const containerRef = useRef(null);
  const [scrollTriggerActive, setScrollTriggerActive] = useState(false);

  useEffect(() => {
    fetchDoctors(filters);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;

      if (
        window.scrollY <= threshold &&
        !loading &&
        !loadingMore &&
        !scrollTriggerActive
      ) {
        setScrollTriggerActive(true);
        fetchDoctors(filters, true).then(() => {
          setScrollTriggerActive(false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filters, loading, loadingMore, scrollTriggerActive]);

  const fetchDoctors = async (activeFilters = {}, reset = true) => {
    try {
      if (reset) {
        setLoading(true);
        setPage(1);
      } else {
        setLoadingMore(true);
      }

      const paginationParams = {
        page: reset ? 1 : page + 1,
        limit: pageSize,
      };

      const response = await listDoctors({
        ...activeFilters,
        ...paginationParams,
      });

      if (reset) {
        setDoctors(response.data.doctors || []);
      } else {
        setDoctors((prevDoctors) => [
          ...prevDoctors,
          ...(response.data.doctors || []),
        ]);
        setPage((prevPage) => prevPage + 1);
      }

      setTotalDoctors(response.data.total || 0);
      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
      setLoading(false);
      setLoadingMore(false);
      console.error("Error fetching doctors:", err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchDoctors(newFilters, true);
  };

  const handleSortChange = (option) => {
    const updatedFilters = { ...filters, sortBy: option };
    setSortBy(option);
    setFilters(updatedFilters);
    fetchDoctors(updatedFilters, true);
    setShowSortOptions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const updatedFilters = { ...filters, query: searchQuery };
    setFilters(updatedFilters);
    fetchDoctors(updatedFilters, true);
  };

  const handleLoadMore = () => {
    fetchDoctors(filters, false);
  };

  const sortOptions = [
    "Experience",
    "Rating",
    "Price: Low to High",
    "Price: High to Low",
  ];

  // return (
  //   <div ref={containerRef} className="bg-gray-50 min-h-screen pb-16 ">
  //     <Head>
  //       <title>General Physician / Internal Medicine | Apollo</title>
  //       <meta
  //         name="description"
  //         content="Find the best general physicians and internal medicine doctors at Apollo Hospitals."
  //       />
  //     </Head>

  //     <Header />

  //     <div className="bg-white shadow-sm  ">
  //       <div className="max-w-7xl mx-auto px-4 py-3">
  //         <div className="flex items-center text-sm">
  //           <a href="#" className="text-teal-600 hover:underline">
  //             Home
  //           </a>
  //           <span className="mx-2 text-gray-500">&gt;</span>
  //           <a href="#" className="text-teal-600 hover:underline">
  //             Doctors
  //           </a>
  //           <span className="mx-2 text-gray-500">&gt;</span>
  //           <span className="text-gray-500">General Physicians</span>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="max-w-7xl mx-auto px-4 py-6">
  //       <div className="md:hidden flex justify-between mb-4">
  //         <button
  //           onClick={() => setShowMobileFilters(!showMobileFilters)}
  //           className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
  //         >
  //           <Filter size={18} className="mr-2" />
  //           Filters
  //         </button>
  //         <div className="relative">
  //           <button
  //             className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
  //             onClick={() => setShowSortOptions(!showSortOptions)}
  //           >
  //             <span className="mr-2">Sort</span>
  //             <ChevronDown size={18} />
  //           </button>
  //           {showSortOptions && (
  //             <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
  //               {sortOptions.map((option) => (
  //                 <div
  //                   key={option}
  //                   onClick={() => handleSortChange(option)}
  //                   className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
  //                     sortBy === option ? "font-semibold text-teal-600" : ""
  //                   }`}
  //                 >
  //                   {option}
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       <div className="flex flex-col md:flex-row gap-4">
  //         <aside
  //           className={`md:w-1/4 lg:w-1/5 transition-all duration-300 ${
  //             showMobileFilters ? "block" : "hidden md:block"
  //           }`}
  //         >
  //           <div className="sticky top-4">
  //             <Filters onFilterChange={handleFilterChange} />
  //           </div>
  //         </aside>

  //         <main className="md:w-3/4 lg:w-4/5 space-y-6">
  //           <div className="hidden md:flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
  //             <p className="text-gray-700 text-sm">
  //               Showing <span className="font-semibold">{doctors.length}</span>{" "}
  //               of <span className="font-semibold">{totalDoctors}</span> doctors
  //             </p>

  //             <div className="relative">
  //               <button
  //                 onClick={() => setShowSortOptions(!showSortOptions)}
  //                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:shadow-sm transition"
  //               >
  //                 <span>Sort by: {sortBy}</span>
  //                 <ChevronDown size={18} />
  //               </button>
  //               {showSortOptions && (
  //                 <div className="absolute right-0 mt-2 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-md">
  //                   {sortOptions.map((option) => (
  //                     <div
  //                       key={option}
  //                       onClick={() => handleSortChange(option)}
  //                       className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
  //                         sortBy === option ? "font-semibold text-teal-600" : ""
  //                       }`}
  //                     >
  //                       {option}
  //                     </div>
  //                   ))}
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           <div className="space-y-4">
  //             {loading ? (
  //               <div className="bg-white p-10 text-center rounded-lg shadow-sm">
  //                 <div className="animate-spin inline-block h-8 w-8 border-4 border-gray-300 border-t-teal-600 rounded-full mb-4"></div>
  //                 <p className="text-gray-600">
  //                   Finding the best doctors for you...
  //                 </p>
  //               </div>
  //             ) : error ? (
  //               <div className="bg-white p-10 text-center rounded-lg shadow-sm">
  //                 <p className="text-red-600 mb-4">{error}</p>
  //                 <button
  //                   onClick={() => fetchDoctors(filters)}
  //                   className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition"
  //                 >
  //                   Try Again
  //                 </button>
  //               </div>
  //             ) : doctors.length > 0 ? (
  //               doctors.map((doctor) => (
  //                 <DoctorCard
  //                   key={doctor._id || doctor.id || doctor.name}
  //                   doctor={doctor}
  //                 />
  //               ))
  //             ) : (
  //               <div className="bg-white p-10 text-center rounded-lg shadow-sm">
  //                 <p className="text-gray-600 mb-4">
  //                   No doctors found matching your criteria.
  //                 </p>
  //                 <button
  //                   onClick={() => {
  //                     setFilters({});
  //                     fetchDoctors({});
  //                     setSearchQuery("");
  //                   }}
  //                   className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition"
  //                 >
  //                   Clear Filters
  //                 </button>
  //               </div>
  //             )}
  //           </div>

  //           {!loading &&
  //             doctors.length > 0 &&
  //             doctors.length < totalDoctors && (
  //               <div className="text-center pt-4">
  //                 <button
  //                   onClick={handleLoadMore}
  //                   disabled={loadingMore}
  //                   className="bg-white hover:bg-gray-50 text-teal-600 font-medium py-3 px-6 rounded-lg border border-gray-300 flex items-center justify-center mx-auto transition"
  //                 >
  //                   {loadingMore ? (
  //                     <>
  //                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-teal-600 mr-2"></div>
  //                       Loading...
  //                     </>
  //                   ) : (
  //                     <>
  //                       Load More Doctors{" "}
  //                       <ArrowRight size={16} className="ml-2" />
  //                     </>
  //                   )}
  //                 </button>
  //               </div>
  //             )}
  //         </main>
  //       </div>
  //     </div>

  //     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md py-3 px-4 md:hidden">
  //       <div className="flex justify-between items-center">
  //         <a
  //           href="tel:+918040245807"
  //           className="flex items-center text-teal-600 font-medium"
  //         >
  //           <Phone size={18} className="mr-2" />
  //           Call for Help
  //         </a>
  //         <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition duration-150">
  //           Book Appointment
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen pb-20">
      <Head>
        <title>General Physician / Internal Medicine | Apollo</title>
        <meta
          name="description"
          content="Find the best general physicians and internal medicine doctors at Apollo Hospitals."
        />
      </Head>

      <Header />

      {/* Breadcrumb - Full width with proper spacing */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center text-sm">
            <a href="#" className="text-teal-600 hover:underline">
              Home
            </a>
            <span className="mx-2 text-gray-500">&gt;</span>
            <a href="#" className="text-teal-600 hover:underline">
              Doctors
            </a>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-500">General Physicians</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile Filter/Sort Controls */}
        <div className="lg:hidden flex justify-between mb-4 gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex flex-1 items-center justify-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
          >
            <Filter size={16} className="mr-2" /> Filters
          </button>
          <div className="relative flex-1">
            <button
              className="flex w-full items-center justify-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <span className="mr-2">Sort</span>
              <ChevronDown size={16} />
            </button>
            {showSortOptions && (
              <div className="absolute right-0 z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      handleSortChange(option);
                      setShowSortOptions(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortBy === option ? "font-semibold text-teal-600" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-40 lg:hidden bg-opacity-50">
              <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                  <Filters
                    onFilterChange={(filters) => {
                      handleFilterChange(filters);
                      setShowMobileFilters(false);
                    }}
                  />
                </div>
                {/* Remove this section as the Apply button is now in the Filters component */}
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <div className="sticky top-4">
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Desktop Sort Controls */}
            <div className="hidden lg:flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-4">
              <p className="text-gray-700 text-sm">
                Showing <span className="font-semibold">{doctors.length}</span>{" "}
                of <span className="font-semibold">{totalDoctors}</span> doctors
              </p>

              <div className="relative">
                <button
                  onClick={() => setShowSortOptions(!showSortOptions)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:shadow-sm transition"
                >
                  <span>Sort by: {sortBy}</span>
                  <ChevronDown size={16} />
                </button>
                {showSortOptions && (
                  <div className="absolute right-0 mt-2 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-md">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          handleSortChange(option);
                          setShowSortOptions(false);
                        }}
                        className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                          sortBy === option ? "font-semibold text-teal-600" : ""
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Results */}
            <div className="space-y-4">
              {loading ? (
                <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                  <div className="animate-spin inline-block h-8 w-8 border-4 border-gray-300 border-t-teal-600 rounded-full mb-4"></div>
                  <p className="text-gray-600">
                    Finding the best doctors for you...
                  </p>
                </div>
              ) : error ? (
                <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => fetchDoctors(filters)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition"
                  >
                    Try Again
                  </button>
                </div>
              ) : doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor._id || doctor.id || doctor.name}
                    doctor={doctor}
                  />
                ))
              ) : (
                <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    No doctors found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({});
                      fetchDoctors({});
                      setSearchQuery("");
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {!loading &&
              doctors.length > 0 &&
              doctors.length < totalDoctors && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-white hover:bg-gray-50 text-teal-600 font-medium py-3 px-6 rounded-lg border border-gray-300 flex items-center justify-center mx-auto transition"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-teal-600 mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Doctors{" "}
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}
          </main>
        </div>
      </div>

      {/* Mobile Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md py-3 px-4 lg:hidden z-30">
        <div className="flex justify-between items-center">
          <a
            href="tel:+918040245807"
            className="flex items-center justify-center text-teal-600 font-medium px-4 py-2"
          >
            <Phone size={16} className="mr-2" /> Call for Help
          </a>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
