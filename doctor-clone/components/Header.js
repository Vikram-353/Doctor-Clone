import "../app/globals.css";

import { useState } from "react";
import { Search, MapPin, ChevronDown, User } from "lucide-react";

export default function ApolloHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation items matching Apollo 24/7
  const navItems = [
    { name: "Buy Medicines", href: "/medicines" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Lab Tests", href: "/lab-tests" },
    { name: "Circle Membership", href: "/circle" },
    { name: "Health Records", href: "/records" },
    { name: "Diabetes Reversal", href: "/diabetes" },
    { name: "Buy Insurance", href: "/insurance", isNew: true },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center py-3 px-4 gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center">
            <span className="text-cyan-600 font-bold text-2xl">Apollo</span>
            <span className="bg-orange-500 text-white font-bold px-1 rounded text-lg">
              24/7
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center text-gray-700 ml-6 cursor-pointer">
          <MapPin size={20} className="text-gray-500" />
          <div className="ml-2">
            <div className="text-xs text-gray-500">Select Location</div>
            <div className="flex items-center font-medium">
              Select Address <ChevronDown size={16} className="ml-1" />
            </div>
          </div>
        </div>

        <div className="flex-grow mx-4 relative hidden md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300"
            />
          </div>
        </div>

        <div className="ml-auto">
          <button className="flex items-center gap-2 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-4 py-1.5 rounded-full">
            <span>Login</span>
            <User size={20} />
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-teal-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex space-x-6 overflow-x-auto py-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 whitespace-nowrap hover:text-cyan-600 font-medium text-sm"
              >
                {item.name}
                {item.isNew && (
                  <span className="ml-1 text-xs text-cyan-600 font-semibold">
                    New
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-lg">
          {/* Mobile Search */}
          <div className="mb-4 pt-2">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Doctors, Specialities, Conditions etc."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300"
              />
            </div>
          </div>

          <div className="flex items-center text-gray-700 mb-4 pb-2 border-b">
            <MapPin size={18} className="text-gray-500" />
            <div className="ml-2">
              <div className="text-xs text-gray-500">Select Location</div>
              <div className="flex items-center font-medium text-sm">
                Select Address <ChevronDown size={16} className="ml-1" />
              </div>
            </div>
          </div>

          {/* Mobile Nav Items */}
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 py-1 hover:text-cyan-600 font-medium"
              >
                {item.name}
                {item.isNew && (
                  <span className="ml-1 text-xs text-cyan-600 font-semibold">
                    New
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
